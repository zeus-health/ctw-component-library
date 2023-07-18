import { useEffect, useState } from "react";
import { ZusAggregatedProfileProps } from "./zus-aggregated-profile";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

export type ZusAggregatedProfileIframeProps = {
  height: string;
  width: string;
  iframeId?: string;
} & ZusAggregatedProfileProps;

const ZusAggregatedProfileIframeComponent = ({
  height,
  width,
  iframeId = "zus-aggregated-profile",
  ...zapProps
}: ZusAggregatedProfileIframeProps) => {
  const [hostedZapReady, setHostedZapReady] = useState(false);
  const { getRequestContext } = useCTW();
  const patient = usePatient();

  const zapURL = "http://localhost:3000";

  useEffect(() => {
    window.addEventListener("message", ({ data }) => {
      if (data.type === "zus-ready") {
        setHostedZapReady(true);
      }
    });
  }, []);

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();

      const iframe = document.getElementById(iframeId) as HTMLIFrameElement;

      iframe.contentWindow?.postMessage(
        {
          type: "ZusAggregatedProfileIframeConfig",
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
        zapURL
      );
    }

    if (hostedZapReady) {
      void load();
    }
  }, [hostedZapReady, getRequestContext, iframeId, patient.data?.UPID, zapProps]);

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

export const ZusAggregatedProfile = withErrorBoundary(
  ZusAggregatedProfileIframeComponent,
  "ZusAggregatedProfileIframe",
  true
);
