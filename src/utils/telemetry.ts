import { datadogLogs } from "@datadog/browser-logs";
import { datadogRum } from "@datadog/browser-rum-slim";
import jwtDecode from "jwt-decode";
import packageJson from "../../package.json";
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

// Assume environment is production unless localhost
let defaultEnvironment = "production";
if (/https?:\/\/(localhost|\d+\.\d+\.\d+\.\d+)/.test(window.location.origin)) {
  defaultEnvironment = "development";
}

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
  private static namespaceMap = new WeakMap();

  static logger = datadogLogs.logger;

  private static get telemetryIsAvailable() {
    return isInitialized;
  }

  static init(environment = defaultEnvironment) {
    if (this.telemetryIsAvailable) {
      return;
    }
    const datadogClientToken = "pub29b659b1cd402a88d57c4f8c923c1eea";
    const datadogApplicationId = "48fec1f8-b187-492a-afdd-e809cc6b3b82";

    datadogRum.init({
      allowedTracingUrls: [], // No allowed tracing urls
      applicationId: datadogApplicationId,
      clientToken: datadogClientToken,
      defaultPrivacyLevel: "mask",
      env: environment,
      service: "ctw-component-library",
      sessionReplaySampleRate: 20,
      sessionSampleRate: 100,
      site: "datadoghq.com",
      trackLongTasks: true,
      trackResources: false,
      trackUserInteractions: false,
      version: packageJson.version,
    });
    datadogLogs.init({
      clientToken: datadogClientToken,
      env: environment,
      forwardConsoleLogs: [], // No console logs to datadog.
      forwardErrorsToLogs: false,
      service: "ctw-component-library",
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
    window.document.body.addEventListener("click", (event) => {
      const { target } = event;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      this.processClickEvent(target);
    });
    isInitialized = true;
  }

  static setBuilder(builderId?: string) {
    datadogLogs.setUserProperty("builderId", builderId);
  }

  static setUser(accessToken?: string) {
    if (accessToken) {
      const user = jwtDecode(accessToken) as ZusJWT;
      datadogLogs.setUser({
        id: user[AUTH_USER_ID],
        type: user[AUTH_USER_TYPE],
        email: user[AUTH_EMAIL],
        practitionerId: user[AUTH_PRACTITIONER_ID],
        builderName: user[AUTH_BUILDER_NAME],
        builderId: user[AUTH_BUILDER_ID],
        patientId: user[AUTH_PATIENT_ID],
        isSuperOrg: user[AUTH_IS_SUPER_ORG],
      });
    }
  }

  static clearUser() {
    datadogLogs.setUser({});
  }

  static logError(error: Error) {
    this.logger.error(error.message, {
      error: {
        stack: error.stack,
      },
    });
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
    if (target.dataset.zusTelemetryNamespace) {
      const nextNamespace = target.dataset.zusTelemetryNamespace;
      ns = ns ? `${nextNamespace} > ${ns}` : nextNamespace;
    }
    if (target.parentElement && target.parentElement !== window.document.body) {
      return this.lookupComponentNamespace(target.parentElement, ns);
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
  static processClickEvent(target: HTMLElement, explicitTargetName?: string) {
    let clickedTarget: HTMLElement | null = null;

    if (explicitTargetName) {
      clickedTarget = target;
    } else {
      let nextTarget: HTMLElement | null = target;
      let depth = 5;
      while (!clickedTarget && depth > 0 && nextTarget) {
        if (nextTarget.dataset.zusTelemetryClick) {
          clickedTarget = nextTarget;
        }
        nextTarget = nextTarget.parentElement;
        depth -= 1;
      }
    }

    const targetName =
      clickedTarget?.dataset.zusTelemetryClick ?? explicitTargetName;
    if (clickedTarget && targetName) {
      if (!this.namespaceMap.has(clickedTarget)) {
        this.namespaceMap.set(
          clickedTarget,
          this.lookupComponentNamespace(clickedTarget)
        );
      }
      const namespace = this.namespaceMap.get(clickedTarget);
      this.trackInteraction("click", namespace, targetName);
    }
  }
}
