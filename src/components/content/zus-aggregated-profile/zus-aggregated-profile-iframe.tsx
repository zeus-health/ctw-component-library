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

// Theming for iframe which can't be handled via global tailwind theme
export type IFrameTheme = {
  fontFamily?: "Avenir" | "Roboto";
  fontSize?: string;
  lineHeight?: string;
};

export const ZusAggregatedProfileIFrameConfigMessageType = "ZusAggregatedProfileIFrameConfig";
export const ZusAggregatedProfileIFrameReadyMessageType = "ZusAggregatedProfileIFrameReady";
export const ZusAggregatedProfileOnResourceSaveMessageType = "ZusAggregatedProfileOnResourceSave";

const ZusAggregatedProfileIFrameComponent = (props: ZusAggregatedProfileProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hostedZapReady, setHostedZapReady] = useState(false);
  const [sentZapConfig, setSentZapConfig] = useState(false);
  const [zapURL, setZapUrl] = useState<string | undefined>(undefined);
  const { getRequestContext, featureFlags } = useCTW();
  const patient = usePatientContext();
  const telemetry = useTelemetry().context;
  const theme = useTheme();

  useEffect(() => {
    // listener to know when iframe ZAP is ready
    const onMessageReady = ({ data }: WindowEventMap["message"]) => {
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
    const onMessageSave = ({ data }: WindowEventMap["message"]) => {
      if (data.type === ZusAggregatedProfileOnResourceSaveMessageType) {
        requestContext?.onResourceSave(data.resource, data.action, data.error);
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
            ZusAggregatedProfileProps: props,
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
