import {
  IVariant,
  useFlagsStatus,
  useUnleashClient,
  useVariant,
} from "@unleash/proxy-client-react";
import { useEffect, useState } from "react";

export type FeatureVariant = Partial<IVariant> & {
  ready: boolean;
};

export function useFeatureVariant(name: string): FeatureVariant {
  const client = useUnleashClient();
  const status = useFlagsStatus();
  const variant = useVariant(name);
  const [failed, setFailed] = useState<boolean>();
  useEffect(() => {
    client.on("error", () => {
      setFailed(true);
    });
  }, [client]);

  // return "not ready" if unleash is still fetching flags
  if (!status.flagsReady && !status.flagsError) {
    return { ready: false };
  }
  // return "not ready" if unleash doesn't have a user id
  if (!client.getContext().userId) {
    return { ready: false };
  }
  // return "ready" if unleash failed to bootstrap
  if (failed) {
    return { ready: true };
  }
  // return "ready" if unleash failed to load flags
  if (status.flagsError) {
    return { ready: true };
  }
  // return "ready" /w a variant(!)
  return { ...variant, ready: true };
}