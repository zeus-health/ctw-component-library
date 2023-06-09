import { useVariant } from "@unleash/proxy-client-react";

export function useFQSFeatureToggle(resourceType: string) {
  // fetch the variant and check if the resource type is enabled
  const variant = useVariant("ctw-fqs");
  if (variant.enabled) {
    const value = variant.payload?.value;
    if (value !== undefined) {
      const valueJson = JSON.parse(value);
      if (valueJson[resourceType] === true) {
        return true;
      }
    }
  }
  return false;
}
