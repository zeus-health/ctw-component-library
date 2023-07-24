import { env } from "process";
import { useEffect, useState } from "react";
import { ZusAggregatedProfileProps } from "./zus-aggregated-profile";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatient } from "@/components/core/providers/patient-provider";
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
  const { getRequestContext } = useCTW();
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
        setZAPURL(`https://zap.${env}.zusapi.com`);
      }

      const iframe = document.getElementById(iframeId) as HTMLIFrameElement;

      iframe.contentWindow?.postMessage(
        {
          type: ZusAggregatedProfileIframeConfigMessageType,
          config: {
            CTWProviderProps: {
              authToken: requestContext.authToken,
              env: requestContext.env,
              builderId: requestContext.builderId,
              // todo - theme/locals/etc
            },
            PatientProviderProps: {
              patientID: patient.data?.UPID,
              systemURL: SYSTEM_ZUS_UNIVERSAL_ID,
            },
            ZusAggregatedProfileProps: zapProps,
          },
        },
        zapURL as string
      );
    }

    if (hostedZapReady) {
      void load();
    }
  }, [hostedZapReady, getRequestContext, iframeId, patient.data?.UPID, zapProps, zapURL]);

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
};

export const ZusAggregatedProfileIframe = withErrorBoundary(
  ZusAggregatedProfileIframeComponent,
  "ZusAggregatedProfileIframe",
  true
);
