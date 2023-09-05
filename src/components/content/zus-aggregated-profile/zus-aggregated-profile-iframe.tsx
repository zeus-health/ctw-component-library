import { Resource } from "fhir/r4";
import { useEffect, useRef, useState } from "react";
import { ZusAggregatedProfileProps } from "./zus-aggregated-profile";
import { getZusZapUrl } from "@/api/urls";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { CTWProviderProps } from "@/components/core/providers/ctw-provider";
import { usePatientContext } from "@/components/core/providers/patient-provider";
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

export const ZusAggregatedProfileIFrameConfigMessageType = "ZusAggregatedProfileIFrameConfig";
export const ZusAggregatedProfileIFrameReadyMessageType = "ZusAggregatedProfileIFrameReady";
export const ZusAggregatedProfileOnResourceSaveMessageType = "ZusAggregatedProfileOnResourceSave";
export const ZusAggregatedProfileOnAddToRecordMessageType = "ZusAggregatedProfileOnAddToRecord";

export type ZusEventData =
  | {
      type: "ZusAggregatedProfileOnAddToRecord";
      payload: {
        resource: fhir4.MedicationStatement;
        includedResources?: Record<string, fhir4.Resource>;
        component: "medications-outside" | "medications-all";
      };
      id: string;
    }
  | {
      type: "ZusAggregatedProfileOnResourceSave";
      resource: Resource;
      action: "create" | "update";
      error?: string;
    }
  | {
      type: "ZusAggregatedProfileIFrameConfig" | "ZusAggregatedProfileIFrameReady";
    };

type MessageResponsePayload = { id: string; type: string; payload?: unknown; error?: string };

const ZusAggregatedProfileIFrameComponent = (props: ZusAggregatedProfileProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hostedZapReady, setHostedZapReady] = useState(false);
  const [sentZapConfig, setSentZapConfig] = useState(false);
  const [zapURL, setZapUrl] = useState<string | undefined>(undefined);
  const { getRequestContext, featureFlags } = useCTW();
  const patient = usePatientContext();
  const telemetry = useTelemetry().context;
  const theme = useTheme();
  const [onAddToRecord, setOnAddToRecord] = useState<(e: MessageEvent<ZusEventData>) => void>();

  useEffect(() => {
    const onAddToRecordHandler = async ({ data }: MessageEvent<ZusEventData>) => {
      if (data.type === ZusAggregatedProfileOnAddToRecordMessageType) {
        const medicationStatement = new MedicationStatementModel(
          data.payload.resource,
          data.payload.includedResources
        );
        const response: MessageResponsePayload = {
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

    // Set the current listener so we can remove it later if this effect is called again.
    setOnAddToRecord(() => onAddToRecordHandler);
    return () => window.removeEventListener("message", onAddToRecordHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.medicationsOutsideProps?.readOnly,
    props.medicationsOutsideProps?.onAddToRecord,
    zapURL,
  ]);

  useEffect(() => {
    // listener to know when iframe ZAP is ready
    const onMessageReady = ({ data }: MessageEvent<ZusEventData>) => {
      if (data.type === ZusAggregatedProfileIFrameReadyMessageType) {
        setHostedZapReady(true);
      }
    };
    window.addEventListener("message", onMessageReady);
    return () => window.removeEventListener("message", onMessageReady);
  }, []);

  useEffect(() => {
    // set up ZAP URL and listener for resource save
    let requestContext: CTWRequestContext | undefined;
    const onMessageSave = ({ data }: MessageEvent<ZusEventData>) => {
      if (data.type === ZusAggregatedProfileOnResourceSaveMessageType) {
        requestContext?.onResourceSave(data.resource, data.action, new Error(data.error));
      }
    };
    void (async () => {
      requestContext = await getRequestContext();
      setZapUrl(getZusZapUrl(requestContext.env));
    })();

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
          type: ZusAggregatedProfileIFrameConfigMessageType,
          config: {
            CTWProviderProps: ctwProviderProps,
            PatientProviderProps: patientProviderProps,
            ZusAggregatedProfileProps: {
              ...props,
              medicationsOutsideProps: props.medicationsOutsideProps
                ? {
                    ...omit("onAddToRecord", props.medicationsOutsideProps),
                  }
                : undefined,
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
