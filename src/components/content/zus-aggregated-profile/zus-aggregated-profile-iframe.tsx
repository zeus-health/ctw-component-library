import { useEffect, useState } from "react";
import { ZusAggregatedProfileProps } from "./zus-aggregated-profile";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { CTWProviderProps } from "@/components/core/providers/ctw-provider";
import { PatientProviderProps, usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export type ZusAggregatedProfileIframeProps = {
  height?: string;
  width?: string;
  iframeId?: string;
} & ZusAggregatedProfileProps;

export const ZusAggregatedProfileIframeConfigMessageType = "ZusAggregatedProfileIframeConfig";
export const ZusAggregatedProfileIframeReadyMessageType = "ZusAggregatedProfileIframeReady";

const ZusAggregatedProfileIframeComponent = ({
  height = "100%",
  width = "100%",
  iframeId = "zus-aggregated-profile",
  ...zapProps
}: ZusAggregatedProfileIframeProps) => {
  const [hostedZapReady, setHostedZapReady] = useState(false);
  const [sentZapConfig, setSentZapConfig] = useState(false);
  const { getRequestContext, featureFlags } = useCTW();
  const patient = usePatient();

  const [zapURL, setZAPURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.addEventListener("message", ({ data }) => {
      if (data.type === ZusAggregatedProfileIframeReadyMessageType) {
        setHostedZapReady(true);
      }
    });
  }, []);

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      if (requestContext.env === "production") {
        setZAPURL("https://zap.zusapi.com");
      } else {
        setZAPURL(`https://zap.${requestContext.env}.zusapi.com`);
      }
    }

    void load();
  }, [getRequestContext]);

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();

      const iframe = document.getElementById(iframeId) as HTMLIFrameElement;

      const ctwProviderProps = {
        authToken: requestContext.authToken,
        env: requestContext.env,
        builderId: requestContext.builderId,
        ehr: requestContext.ehr,
        featureFlags,
        enableTelemetry: requestContext.enableTelemetry,
        headers: requestContext.headers,
        locals: requestContext.locals,
        theme: requestContext.theme,
        // TODO
        // onResourceSave
      } as CTWProviderProps;

      const patientProviderProps = {
        patientID: patient.data?.UPID,
        systemURL: SYSTEM_ZUS_UNIVERSAL_ID,
        // TODO
        // onPatientSave
        // onResourceSave
      } as PatientProviderProps;

      iframe.contentWindow?.postMessage(
        {
          type: ZusAggregatedProfileIframeConfigMessageType,
          config: {
            CTWProviderProps: ctwProviderProps,
            PatientProviderProps: patientProviderProps,
            ZusAggregatedProfileProps: zapProps,
          },
        },
        zapURL as string
      );

      setSentZapConfig(true);
    }

    if (hostedZapReady && !sentZapConfig && patient.data?.UPID) {
      void load();
    }
  }, [
    hostedZapReady,
    getRequestContext,
    iframeId,
    patient.data?.UPID,
    zapProps,
    zapURL,
    sentZapConfig,
    featureFlags,
  ]);

  if (zapURL) {
    return (
      <iframe
        id={iframeId}
        title="zus-aggregated-profile"
        height={height}
        width={width}
        src={`${zapURL}/zap-1`}
        frameBorder="0"
      />
    );
  }
  return <>Loading</>;
};

export const ZusAggregatedProfileIframe = withErrorBoundary(
  ZusAggregatedProfileIframeComponent,
  "ZusAggregatedProfileIframe",
  true
);
