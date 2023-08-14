import { datadogLogs } from "@datadog/browser-logs";
import jwtDecode from "jwt-decode";
import { Session } from "./session";
import packageJson from "../../package.json";
import { getMetricsBaseUrl } from "@/api/urls";
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
import { compact, snakeCase } from "@/utils/nodash";

type TelemetryEventKey = "zusTelemetryClick" | "zusTelemetryFocus";

const prodDatadogConfig = {
  service: "ctw-component-library",
  clientToken: "pub7f1b01887ceb412fd989f5e08cf60d9a",
  applicationId: "44011d8b-3aa4-4672-9c7b-ee23ddac16b5",
};
const devDatadogConfig = {
  service: "ctw-component-library",
  clientToken: "pub29b659b1cd402a88d57c4f8c923c1eea",
  applicationId: "48fec1f8-b187-492a-afdd-e809cc6b3b82",
};

let origin = "";
let body: HTMLElement | undefined;
if (typeof window !== "undefined") {
  origin = window.location.origin;
  body = window.document.body;
}

// Assume local development if origin is localhost or just an IP address
const isLocalDevelopment = /https?:\/\/(localhost|\d+\.\d+\.\d+\.\d+)/i.test(origin);
// Avoid initializing telemetry or event listeners multiple times
let isInitialized = false;
let listenersHaveBeenAdded = false;

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
  private static accessToken = "";

  private static get telemetryIsAvailable() {
    return Boolean(this.environment && isInitialized);
  }

  private static datadogLoggingEnabled = false;

  static logger = datadogLogs.logger;

  static environment = "";

  static ehr = "unknown";

  /**
   * We need to normalize environment name in order to effectively use template
   * variables on dashboards in Datadog. Otherwise, users of the dashboard would
   * need to know to select all variations of an environment.
   */
  static setEnv(environment: string) {
    this.environment = environment.toLowerCase();
    if (["dev", "development"].includes(this.environment)) {
      this.environment = "dev";
    }
    if (["prod", "production"].includes(this.environment)) {
      this.environment = "prod";
    }
  }

  static init(environment: string, ehr = "unknown", allowDataDogLogging = false) {
    this.datadogLoggingEnabled = allowDataDogLogging;
    this.setEnv(environment);
    this.ehr = ehr;

    // Turning on Datadog Logging is conditional. However, the event handlers
    // that explicitly send internal /report/metrics to ctw are not optional.
    if (!this.telemetryIsAvailable && allowDataDogLogging) {
      datadogLogs.init({
        ...(isLocalDevelopment ? devDatadogConfig : prodDatadogConfig),
        env: this.environment,
        forwardConsoleLogs: [], // No console logs to datadog.
        forwardErrorsToLogs: false,
        site: "datadoghq.com",
        version: packageJson.version,
      });
    }

    // We need to ensure that this will run in browser context, not just server.
    if (!listenersHaveBeenAdded && body) {
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
      body.addEventListener("click", (event: MouseEvent) => {
        const { target, isTrusted } = event;
        if (!(isTrusted && target instanceof Element)) {
          return;
        }
        const htmlElement = this.closestHTMLElement(target);
        if (htmlElement instanceof HTMLElement) {
          this.processHTMLEvent(htmlElement, "zusTelemetryClick");
        }
      });
      body.addEventListener("focusin", (event) => {
        const { target, isTrusted } = event;
        if (isTrusted && target instanceof HTMLElement) {
          this.processHTMLEvent(target, "zusTelemetryFocus");
        }
      });
      listenersHaveBeenAdded = true;
    }

    isInitialized = true;
  }

  static setBuilder(builderId?: string) {
    if (this.datadogLoggingEnabled) {
      datadogLogs.setGlobalContextProperty("builderId", builderId);
    }
  }

  static setUser(accessToken?: string) {
    if (accessToken) {
      this.accessToken = accessToken;
      const user = jwtDecode(accessToken) as ZusJWT;

      Session.setSessionUserId(user[AUTH_USER_ID]);
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

      if (this.datadogLoggingEnabled) {
        datadogLogs.setUser(decodedUser);
      }
    }
  }

  static clearUser() {
    datadogLogs.setUser({});
  }

  static trackView(viewName: string) {
    this.countMetric(`component.${viewName}.loaded`);
  }

  static logError(error: Error, overrideMessage?: string): Error {
    const err = new Error(overrideMessage ?? error.message);
    this.logger.error(err.message, {
      error: {
        stack: error.stack,
      },
    });
    return err;
  }

  static logFhirError(error: FhirError, message: string) {
    const context = fhirErrorResponse(message, error);
    this.logger.error(message, context);
  }

  static trackInteraction(
    action: string,
    metadata: Record<string, unknown> & { datadogMetricName?: string } = {}
  ) {
    // If `datadogMetricName` is not provided, we default to the action name.
    // This allows us to send a different metric name to DataDog if needed.
    const { datadogMetricName = action, ...eventMetadata } = metadata;
    // We send an action metric to CTW
    this.countMetric(`action.${datadogMetricName}`, 1);
    // We report an active session to CTW
    this.reportActiveSession().catch((error) => Telemetry.logError(error as Error));
    this.analyticsEvent(action, eventMetadata).catch((error) => Telemetry.logError(error as Error));
  }

  /**
   * Metrics names are alphanumeric, lowercase, seperated by only "." or "_"
   */
  private static normalizeMetricName(metric: string) {
    return metric
      .split(".")
      .map(snakeCase)
      .join(".")
      .replace(/[^a-z0-9_.]/gi, "");
  }

  /*
   * In dev/test environments we should skip sending any metrics
   */
  static shouldSkipSendingMetrics() {
    return (
      !this.environment ||
      (process.env.NODE_ENV !== "test" && /(localhost|127\.0\.0\.1)/.test(window.location.origin))
    );
  }

  /**
   * Report a metric to CTW
   */
  static async reportMetric(
    type: string,
    metric: string,
    value: number,
    additionalTags: string[] = []
  ) {
    if (this.shouldSkipSendingMetrics()) {
      return;
    }

    let user;
    const name = this.normalizeMetricName(metric);
    try {
      user = jwtDecode(this.accessToken) as ZusJWT;
    } catch {
      user = {};
    }

    const tags = compact([
      "service:ctw-component-library",
      `env:${this.environment}`,
      user[AUTH_BUILDER_NAME] ? `builder_name:${user[AUTH_BUILDER_NAME]}` : undefined,
      `user_id:${user[AUTH_USER_ID]}`,
      `is_super:${user[AUTH_IS_SUPER_ORG] || "false"}`,
      this.ehr ? `ehr:${this.ehr}` : undefined,
      `version:${packageJson.version}`,
      ...additionalTags,
    ]);

    await fetch(`${getMetricsBaseUrl(this.environment)}/report/metric`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify({ name, type, tags, value }),
      mode: "cors",
    });
  }

  /**
   * Report User analytic events
   */
  static async analyticsEvent(eventName: string, eventProperties: Record<string, unknown> = {}) {
    if (this.shouldSkipSendingMetrics()) {
      return;
    }

    try {
      const analyticEvent = {
        event: eventName,
        metadata: {
          ...eventProperties,
          ehr: this.ehr || undefined,
          libraryVersion: packageJson.version,
        },
      };

      await fetch(`${getMetricsBaseUrl(this.environment)}/report/analytic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        // Base64 encode the event name and user information
        body: JSON.stringify(analyticEvent),
        mode: "cors",
      });
    } catch {
      // Nothing to do here.
    }
  }

  static countMetric(name: string, value = 1, tags: string[] = []) {
    Telemetry.reportMetric("increment", name, value, tags).catch((error) =>
      Telemetry.logError(error as Error)
    );
  }

  static histogramMetric(name: string, value: number, tags: string[] = []) {
    Telemetry.reportMetric("histogram", name, value, tags).catch((error) =>
      Telemetry.logError(error as Error)
    );
  }

  static timeMetric(metric: string, tags: string[] = []) {
    const start = new Date().getTime();

    // Callback should not return a promise or throw errors to the consumer
    return function endTiming() {
      const end = new Date().getTime();
      Telemetry.reportMetric("timing", metric, end - start, tags).catch((error) =>
        Telemetry.logError(error as Error)
      );
    };
  }

  static reportActionSuccess(metric: string, tags: string[] = []) {
    Telemetry.countMetric(`action.${metric}.success`, 1, tags);
  }

  static reportActionFailure(metric: string, tags: string[] = []) {
    Telemetry.countMetric(`action.${metric}.failure`, 1, tags);
  }

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
      this.trackInteraction(targetName);
    }
  }

  private static closestHTMLElement(target: Element | Node | null): HTMLElement | null {
    if (!target || target instanceof HTMLElement) {
      return target;
    }
    if (target.parentElement instanceof HTMLElement) {
      return target.parentElement;
    }
    return this.closestHTMLElement(target.parentNode);
  }

  static async reportActiveSession() {
    // Return if the session is already active or we don't need to report
    if (Session.isActive() || this.shouldSkipSendingMetrics()) {
      return;
    }

    try {
      // Set last active timestamp so we don't report the same session twice
      const user = jwtDecode(this.accessToken) as ZusJWT;
      Session.setSessionUserId(user[AUTH_USER_ID]);
      Session.setSessionLastActiveTimestamp();
      await Telemetry.reportMetric("increment", "active_session", 1, []);
    } catch (error) {
      // Clear the session last active timestamp because we didn't report it
      Session.clearSessionLastActiveTimestamp();
    }
  }
}

/**
 * Wrapper to time a function
 *
 * @example
 * ```
 * withTimerMetric(async (requestContext, patient) => {
 *   const data = await getData(requestContext, patient);
 *   return applyTransform(data);
 * }, "req.data_transform")
 * ```
 */
export const withTimerMetric =
  <Args extends unknown[], Return>(
    fn: (...args: Args) => Promise<Return>,
    name: string,
    tags: string[] = []
  ) =>
  async (...args: Args) => {
    let sendMetric;
    try {
      sendMetric = Telemetry.timeMetric(name, tags);
      return await fn(...args);
    } catch (error) {
      sendMetric = undefined;
      throw error;
    } finally {
      sendMetric?.();
    }
  };
