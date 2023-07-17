import { useEffect, useState } from "react";
import {
  ZusAggregatedProfile,
  ZusAggregatedProfileProps,
} from "./components/content/zus-aggregated-profile/zus-aggregated-profile";
import { CTWProvider, CTWProviderProps } from "./components/core/providers/ctw-provider";
import {
  PatientProvider,
  PatientProviderProps,
} from "./components/core/providers/patient-provider";

export type ZusAggregatedProfileIframeConfig = {
  CTWProviderProps: CTWProviderProps;
  PatientProviderProps: PatientProviderProps;
  ZusAggregatedProfileProps: ZusAggregatedProfileProps;
};

export const ZusAggregatedProfileIframeConfigMessageType = "ZusAggregatedProfileIframeConfig";

function ZAP() {
  const [zapConfig, setZapConfig] = useState<ZusAggregatedProfileIframeConfig | undefined>(
    undefined
  );

  useEffect(() => {
    const handler = ({ data }) => {
      if (data.type === ZusAggregatedProfileIframeConfigMessageType) {
        setZapConfig(data.config);
      }
    };

    window.addEventListener("message", handler);

    window.parent.postMessage(
      {
        type: "zus-ready",
      },
      "*"
    );

    // clean up
    return () => window.removeEventListener("message", handler);
  }, []);

  if (zapConfig) {
    return (
      <CTWProvider {...zapConfig.CTWProviderProps}>
        <PatientProvider {...zapConfig.PatientProviderProps}>
          <ZusAggregatedProfile {...zapConfig.ZusAggregatedProfileProps} />
        </PatientProvider>
      </CTWProvider>
    );
  }

  return <div>Waiting...</div>;
}

export default ZAP;
