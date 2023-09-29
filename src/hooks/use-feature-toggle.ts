import { useFlagsStatus, useUnleashClient } from "@unleash/proxy-client-react";
import { useContext } from "react";
import { useFeatureVariant } from "./use-feature-variant";
import { FeatureFlagContext } from "@/components/core/providers/feature-flag-provider";

export type FeatureToggle = {
  enabled?: boolean;
  ready: boolean;
  errorGettingToggles?: boolean;
};

export function useFQSFeatureToggle(resourceType: string): FeatureToggle {
  const variant = useFeatureVariant("ctw-fqs");

  if (!variant.ready) {
    return { enabled: false, ready: false };
  }

  // fetch the variant and check if the resource type is enabled
  let enabled = false;
  if (variant.enabled) {
    const value = variant.payload?.value;
    if (value !== undefined) {
      const valueJson = JSON.parse(value);
      if (valueJson[resourceType] === true) {
        enabled = true;
      }
    }
  }
  return { enabled, ready: true };
}

export function useFeatureToggle(name: string): FeatureToggle {
  const client = useUnleashClient();
  const status = useFlagsStatus();
  const { unleashClientFailed } = useContext(FeatureFlagContext);

  if (unleashClientFailed || status.flagsError) {
    return { ready: true, errorGettingToggles: true };
  }

  if (!status.flagsReady && !status.flagsError) {
    return { ready: false };
  }

  return { ready: true, enabled: client.isEnabled(name) };
}
