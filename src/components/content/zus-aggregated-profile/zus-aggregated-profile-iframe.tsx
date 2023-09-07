import { Resource } from "fhir/r4";
import { useEffect, useRef, useState } from "react";
import { ZusAggregatedProfileProps } from "./zus-aggregated-profile";
import { getZusZapUrl } from "@/api/urls";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { CTWProviderProps } from "@/components/core/providers/ctw-provider";
import {
  PatientProviderProps,
  usePatientContext,
} from "@/components/core/providers/patient-provider";
import { useTelemetry } from "@/components/core/providers/telemetry/use-telemetry";
import { useTheme } from "@/components/core/providers/theme/use-theme";
import { useCTW } from "@/components/core/providers/use-ctw";
import { MedicationStatementModel } from "@/fhir/models";
import { omit } from "@/utils/nodash/fp";

// Theming for iframe which can't be handled via global tailwind theme
export type IFrameTheme = {
  fontFamily?: "Avenir" | "Roboto";
  fontSize?: string;
  lineHeight?: string;
};
export type ZapIFrameConfig = {
  CTWProviderProps: CTWProviderProps;
  PatientProviderProps: PatientProviderProps;
  ZusAggregatedProfileProps: ZusAggregatedProfileProps;
  iframeTheme: IFrameTheme;
};
export const ZapIFrameConfigMessageType = "ZusAggregatedProfileIFrameConfig";
export const ZapIFrameReadyMessageType = "ZusAggregatedProfileIFrameReady";
export const ZapOnResourceSaveMessageType = "ZusAggregatedProfileOnResourceSave";
export const ZapOnPatientSaveMessageType = "ZusAggregatedProfileOnPatientSave";
export const ZapOnAddToRecordMessageType = "ZusAggregatedProfileOnAddToRecord";

export type ZapMessageEventData<EventType, EventPayload = undefined> = {
  type: EventType;
  id?: string;
} & ({ payload: EventPayload; error: never } | { payload: never; error: string });

export type ZapIFrameConfigMessageEvent = ZapMessageEventData<typeof ZapIFrameConfigMessageType>;
export type ZapIFrameReadyMessageEvent = ZapMessageEventData<typeof ZapIFrameReadyMessageType>;
export type ZapOnResourceSaveMessageEvent = ZapMessageEventData<
  typeof ZapOnResourceSaveMessageType,
  {
    resource: Resource;
    action: "create" | "update";
    error?: string;
  }
>;
export type ZapOnAddToRecordMessageEvent = ZapMessageEventData<
  typeof ZapOnAddToRecordMessageType,
  {
    resource: fhir4.MedicationStatement;
    includedResources?: Record<string, fhir4.Resource>;
    component: "medications-outside" | "medications-all";
  }
>;
export type ZapMessageEvent = MessageEvent<
  | ZapOnAddToRecordMessageEvent
  | ZapOnResourceSaveMessageEvent
  | ZapIFrameConfigMessageEvent
  | ZapIFrameReadyMessageEvent
>;

const ZusAggregatedProfileIFrameComponent = (props: ZusAggregatedProfileProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hostedZapReady, setHostedZapReady] = useState(false);
  const [sentZapConfig, setSentZapConfig] = useState(false);
  const [zapURL, setZapUrl] = useState<string | undefined>(undefined);
  const [onAddToRecord, setOnAddToRecord] = useState<(e: ZapMessageEvent) => void>();
  const { getRequestContext, featureFlags } = useCTW();
  const patient = usePatientContext();
  const telemetry = useTelemetry().context;
  const theme = useTheme();

  useEffect(() => {
    const onAddToRecordHandler = async ({ data }: ZapMessageEvent) => {
      if (data.type === ZapOnAddToRecordMessageType && typeof data.payload !== "undefined") {
        const medicationStatement = new MedicationStatementModel(
          data.payload.resource,
          data.payload.includedResources
        );
        const response: Partial<ZapOnAddToRecordMessageEvent> = {
          id: data.id,
          type: data.type,
        };
        try {
          switch (data.payload.component) {
            case "medications-outside":
              await props.medicationsOutsideProps?.onAddToRecord?.(medicationStatement);
              break;
            case "medications-all":
              await props.medicationsAllProps?.onAddToRecord?.(medicationStatement);
              break;
            default:
              response.error = `Unhandled onAddToRecord for component: ${data.payload.component}`;
          }
        } catch (e) {
          response.error = e instanceof Error ? e.message : "Unknown error";
        }
        iframeRef.current?.contentWindow?.postMessage(response, String(zapURL));
      }
    };

    // Add this listener
    window.addEventListener("message", onAddToRecordHandler);
    // Remove previous listener if exists
    if (onAddToRecord) {
      window.removeEventListener("message", onAddToRecord);
    }

    // Set the current listener and remove it later if this effect is called again.
    setOnAddToRecord(() => onAddToRecordHandler);
    return () => window.removeEventListener("message", onAddToRecordHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.medicationsOutsideProps?.readOnly,
    props.medicationsOutsideProps?.onAddToRecord,
    props.medicationsAllProps?.readOnly,
    props.medicationsAllProps?.onAddToRecord,
    zapURL,
  ]);

  useEffect(() => {
    // listener to know when iframe ZAP is ready
    const onMessageReady = ({ data }: ZapMessageEvent) => {
      if (data.type === ZapIFrameReadyMessageType) {
        setHostedZapReady(true);
      }
    };
    window.addEventListener("message", onMessageReady);
    return () => window.removeEventListener("message", onMessageReady);
  }, []);

  useEffect(() => {
    // set up ZAP URL and listener for resource save
    let requestContext: CTWRequestContext | undefined;
    void (async () => {
      requestContext = await getRequestContext();
      setZapUrl(getZusZapUrl(requestContext.env));
    })();

    const onMessageSave = ({ data }: ZapMessageEvent) => {
      if (data.type === ZapOnResourceSaveMessageType && typeof data.payload !== "undefined") {
        const { resource, action, error } = data.payload;
        requestContext?.onResourceSave(resource, action, new Error(error));
      }
    };

    window.addEventListener("message", onMessageSave);
    return () => window.removeEventListener("message", onMessageSave);
  }, [getRequestContext]);

  useEffect(() => {
    // Pass config to iframe
    async function load() {
      const requestContext = await getRequestContext();

      //  & { locals?: Locals, enableTelemetry: boolean, ehr: string }
      const ctwProviderProps: CTWProviderProps = {
        authToken: requestContext.authToken,
        env: requestContext.env,
        builderId: requestContext.builderId,
        featureFlags,
        ehr: telemetry.ehr,
        enableTelemetry: telemetry.enableTelemetry,
        headers: requestContext.headers as Record<string, string> | undefined,
        locals: theme.locals,
        theme: theme.theme,
      };

      const patientProviderProps = {
        patientID: patient.patientID,
        systemURL: patient.systemURL,
      };

      iframeRef.current?.contentWindow?.postMessage(
        {
          type: ZapIFrameConfigMessageType,
          config: {
            CTWProviderProps: ctwProviderProps,
            PatientProviderProps: patientProviderProps,
            ZusAggregatedProfileProps: {
              ...props,
              medicationsOutsideProps: omit("onAddToRecord", props.medicationsOutsideProps),
              medicationsAllProps: omit("onAddToRecord", props.medicationsAllProps),
            },
            iframeTheme: theme.iframeTheme,
          },
        },
        zapURL as string
      );

      setSentZapConfig(true);
    }

    if (hostedZapReady) {
      void load();
    }
  }, [
    hostedZapReady,
    getRequestContext,
    patient.patientID,
    patient.systemURL,
    props,
    zapURL,
    sentZapConfig,
    featureFlags,
    theme.theme,
    theme.locals,
    telemetry.enableTelemetry,
    telemetry.ehr,
    theme.iframeTheme,
  ]);

  if (!zapURL) {
    return false;
  }
  return (
    <iframe
      ref={iframeRef}
      title="zus-aggregated-profile"
      height="100%"
      width="100%"
      src={`${zapURL}/v1`}
      className="ctw-border-0"
    />
  );
};

export const ZusAggregatedProfileIFrame = withErrorBoundary(
  ZusAggregatedProfileIFrameComponent,
  "ZusAggregatedProfileIFrame",
  true
);
