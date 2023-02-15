import { datadogLogs } from "@datadog/browser-logs";
import { datadogRum } from "@datadog/browser-rum-slim";
import jwtDecode from "jwt-decode";
import packageJson from "../../package.json";
import { FhirError, fhirErrorResponse } from "@/fhir/errors";
import {
  AUTH_BUILDER_ID,
  AUTH_BUILDER_NAME,
  AUTH_EMAIL,
  AUTH_IS_SUPER_ORG,
  AUTH_PATIENT_ID,
  AUTH_PRACTITIONER_ID,
  AUTH_USER_ID,
  AUTH_USER_TYPE,
  ZusJWT,
} from "@/utils/auth";

type TelemetryEventKey = "zusTelemetryClick" | "zusTelemetryFocus";

const prodAccountConfig = {
  service: "ctw-component-library",
  clientToken: "pub7f1b01887ceb412fd989f5e08cf60d9a",
  applicationId: "44011d8b-3aa4-4672-9c7b-ee23ddac16b5",
};
const devAccountConfig = {
  service: "ctw-component-library",
  clientToken: "pub29b659b1cd402a88d57c4f8c923c1eea",
  applicationId: "48fec1f8-b187-492a-afdd-e809cc6b3b82",
};

const origin = typeof window !== "undefined" ? window.location.origin : "";
const body = typeof window !== "undefined" ? window.document.body : undefined;

// Assume local development if origin is localhost or just an IP address
const isLocalDevelopment = /https?:\/\/(localhost|\d+\.\d+\.\d+\.\d+)/i.test(
  origin
);
// Avoid initializing telemetry multiple times
let isInitialized = false;

/**
 * Bootstrap APM Tracing
 *
 * @function bootstrapTracing
 * @description Starts up DataDog RUM and tracing. Depending on the configuration the
 * RUM client will decorate requests to allowed origins with x-datadog-trace-id
 * headers, profile the in-browser app and optionally even record sessions.
 * Visit the docs for important configuration options.
 *
 * https://docs.datadoghq.com/real_user_monitoring/browser/#configuration
 */
export class Telemetry {
  static logger = datadogLogs.logger;

  private static namespaceMap = new WeakMap();

  private static eventTypes: Record<TelemetryEventKey, string> = {
    zusTelemetryClick: "click",
    zusTelemetryFocus: "focus",
  };

  private static get telemetryIsAvailable() {
    return isInitialized;
  }

  static init(environment: string) {
    if (this.telemetryIsAvailable) {
      return;
    }
    const isDev = isLocalDevelopment || /dev.*/i.test(environment);

    datadogRum.init({
      ...(isDev ? devAccountConfig : prodAccountConfig),
      allowedTracingUrls: [], // No allowed tracing urls
      defaultPrivacyLevel: "mask",
      env: environment,
      sessionReplaySampleRate: 20,
      sessionSampleRate: 100,
      site: "datadoghq.com",
      trackLongTasks: true,
      trackResources: false,
      trackUserInteractions: false,
      trackViewsManually: true, // url path names are useless to cwl-cl
      version: packageJson.version,
    });
    datadogLogs.init({
      ...(isDev ? devAccountConfig : prodAccountConfig),
      env: environment,
      forwardConsoleLogs: [], // No console logs to datadog.
      forwardErrorsToLogs: false,
      site: "datadoghq.com",
      version: packageJson.version,
    });

    // We are listening to click events propagating to the document body as that
    // is the lowest level HTMLElement we actually know will both exist at this
    // time and which won't be removed from the DOM by React causing a small
    // memory leak.
    // Additionally, because we aren't listening directly to events on elements
    // that have `data-zus-telemetry-*` attributes, we don't have the luxury of
    // knowing whether an event triggered from inside one of these telemetry
    // elements, so we'll have to traverse the DOM tree ourselves. To minimize
    // this work we'll put a `depth` level and adjust it over time if needed.
    // For example, imagine the user clicked an element with CSS selector path
    // of "button[data-zus-telemetry-click="submit"] > span > span". Because we
    // are listening on body and not button, we would have to walk up 2 parent
    // nodes of the DOM before knowing whether this event was relevant to us.
    body?.addEventListener("click", (event) => {
      const { target, isTrusted } = event;
      if (!(isTrusted && target instanceof Element)) {
        return;
      }
      const htmlElement = this.closestHTMLElement(target);
      if (htmlElement instanceof HTMLElement) {
        this.processHTMLEvent(htmlElement, "zusTelemetryClick");
      }
    });
    body?.addEventListener("focusin", (event) => {
      const { target, isTrusted } = event;
      if (isTrusted && target instanceof HTMLElement) {
        this.processHTMLEvent(target, "zusTelemetryFocus");
      }
    });
    isInitialized = true;
  }

  static setBuilder(builderId?: string) {
    datadogLogs.setGlobalContextProperty("builderId", builderId);
    datadogRum.setGlobalContextProperty("builderId", builderId);
  }

  static setUser(accessToken?: string) {
    if (accessToken) {
      const user = jwtDecode(accessToken) as ZusJWT;
      const decodedUser = {
        id: user[AUTH_USER_ID],
        type: user[AUTH_USER_TYPE],
        email: user[AUTH_EMAIL],
        practitionerId: user[AUTH_PRACTITIONER_ID],
        builderName: user[AUTH_BUILDER_NAME],
        builderId: user[AUTH_BUILDER_ID],
        patientId: user[AUTH_PATIENT_ID],
        isSuperOrg: user[AUTH_IS_SUPER_ORG],
      };
      datadogLogs.setUser(decodedUser);
      datadogRum.setUser(decodedUser);
    }
  }

  static clearUser() {
    datadogLogs.setUser({});
    datadogRum.setUser({});
  }

  static trackView(viewName: string) {
    datadogRum.startView(viewName);
  }

  static logError(error: Error, overrideMessage?: string) {
    this.logger.error(overrideMessage || error.message, {
      error: {
        stack: error.stack,
      },
    });
  }

  static logFhirError(error: FhirError, message: string) {
    const context = fhirErrorResponse(message, error);
    this.logger.error(message, context);
  }

  static trackInteraction(
    eventType: string,
    namespace: string,
    action: string
  ) {
    if (this.telemetryIsAvailable) {
      this.logger.log(`${eventType} event: ${namespace} > ${action}`, {
        eventType,
        action,
        namespace,
      });
    }
  }

  /**
   * Lookup Component Namespace - Events are tracked with dataset attributes
   * such as `data-zus-telemetry-click="Submit"` which informs us that a submit
   * button was clicked. However, our "Submit" button may be part of a reusable
   * form component and to get context as to which component the event took place
   * in, we traverse up the DOM tree looking for `data-zus-telemetry-namespace`
   * attributes.
   */
  private static lookupComponentNamespace(
    target: HTMLElement,
    namespace = ""
  ): string {
    let ns = namespace;
    const closest = target.closest("[data-zus-telemetry-namespace]");
    if (closest instanceof HTMLElement) {
      const nextNamespace = closest.dataset.zusTelemetryNamespace;
      if (typeof nextNamespace === "string") {
        ns = ns ? `${nextNamespace} > ${ns}` : nextNamespace;
      }
      if (closest.parentElement) {
        return this.lookupComponentNamespace(closest.parentElement, ns);
      }
    }
    return ns || "unknown";
  }

  /**
   * Process Click Event - This function takes a target element and an optional
   * explicitTargetName. If the `explicitTargetName` is NOT passed in, we need to
   * traverse the DOM and verify whether it corresponds with a zus telemetry
   * event or not. However, if `explicitTargetName` is passed in, then we can
   * assume this is an event ready for processing.
   */
  static processHTMLEvent(
    target: HTMLElement,
    telemetryKey: TelemetryEventKey,
    explicitTargetName?: string
  ) {
    let eventTarget: HTMLElement | null = null;

    if (explicitTargetName) {
      eventTarget = target;
    } else {
      let nextTarget: HTMLElement | null = target;
      let depth = 5;
      while (!eventTarget && depth > 0 && nextTarget) {
        if (nextTarget.dataset[telemetryKey]) {
          eventTarget = nextTarget;
        }
        nextTarget = nextTarget.parentElement;
        depth -= 1;
      }
    }

    const targetName = eventTarget?.dataset[telemetryKey] ?? explicitTargetName;
    if (eventTarget && targetName) {
      if (!this.namespaceMap.has(eventTarget)) {
        this.namespaceMap.set(
          eventTarget,
          this.lookupComponentNamespace(eventTarget)
        );
      }
      const namespace = this.namespaceMap.get(eventTarget);
      this.trackInteraction(
        this.eventTypes[telemetryKey],
        namespace,
        targetName
      );
    }
  }

  private static closestHTMLElement(
    target: Element | Node | null
  ): HTMLElement | null {
    if (!target || target instanceof HTMLElement) {
      return target;
    }
    if (target.parentElement instanceof HTMLElement) {
      return target.parentElement;
    }
    return this.closestHTMLElement(target.parentNode);
  }
}
