import { useFeatureVariant } from "./use-feature-variant";

export function useTrendingLabsFeatureToggle(): FeatureToggle {
  const variant = useFeatureVariant("ctw-trending-labs");

  if (!variant.ready) {
    return { enabled: false, ready: false };
  }
  let enabled = false;
  if (variant.enabled) {
    const value = variant.payload?.value;
    enabled = value === "true";
  }
  return { enabled, ready: true };
}

export type FeatureToggle = {
  enabled: boolean;
  ready: boolean;
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