import { useFlagsStatus, useUnleashClient, useVariant } from "@unleash/proxy-client-react";
import { useEffect, useState } from "react";

export type FQSFeatureToggle = {
  enabled: boolean;
  ready: boolean;
};

export function useFQSFeatureToggle(resourceType: string): FQSFeatureToggle {
  const { failed, status, variant } = useUnleash();

  // return if unleash failed to bootstrap
  if (failed) {
    console.log("failed", failed);
    return { enabled: false, ready: true };
  }
  // return if unleash is still fetching flags
  if (!status.flagsReady && !status.flagsError) {
    console.log("status.flagsReady", status.flagsReady, "status.flagsError", status.flagsError);
    return { enabled: false, ready: false };
  }
  // return if unleash failed to load flags
  if (status.flagsError) {
    console.log("flagStatus.flagsError", status.flagsError);
    return { enabled: false, ready: true };
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
  console.log("variant", variant);
  return { enabled, ready: true };
}

function useUnleash() {
  const client = useUnleashClient();
  const status = useFlagsStatus();
  const variant = useVariant("ctw-fqs");
  const [failed, setFailed] = useState<boolean>();
  useEffect(() => {
    client.on("error", () => {
      setFailed(true);
    });
  }, [client]);
  return {
    failed,
    status,
    variant,
  };
}
