import { useFeatureVariant } from "./use-feature-variant";

export type FQSFeatureToggle = {
  enabled: boolean;
  ready: boolean;
};

export function useFQSFeatureToggle(resourceType: string): FQSFeatureToggle {
  const variant = useFeatureVariant("ctw-fqs");

  console.log("variant", variant);

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
