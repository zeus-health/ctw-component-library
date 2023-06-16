import { IVariant, useFlagsStatus, useUnleashClient } from "@unleash/proxy-client-react";
import { useContext } from "react";
import { FeatureFlagContext } from "@/components/core/providers/feature-flag-provider";

export type FeatureVariant = Partial<IVariant> & {
  ready: boolean;
};

export function useFeatureVariant(name: string): FeatureVariant {
  const client = useUnleashClient();
  const status = useFlagsStatus();
  const { unleashClientFailed } = useContext(FeatureFlagContext);

  // return "ready" if unleash client failed to load or failed to load flags
  if (unleashClientFailed || status.flagsError) {
    return { ready: true };
  }

  // return "not ready" if flags are still being fetched
  if (!status.flagsReady && !status.flagsError) {
    return { ready: false };
  }

  // return "ready" /w a variant
  const variant = client.getVariant(name);
  return { ...variant, ready: true };
}
