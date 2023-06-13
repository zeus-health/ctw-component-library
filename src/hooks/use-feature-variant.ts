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
  const [clientError, setClientError] = useState<boolean>();
  const [clientRefetched, setClientRefetched] = useState<boolean>();
  const { userId } = client.getContext();

  useEffect(() => {
    client.on("error", () => {
      setClientError(true);
    });
  }, [client]);

  useEffect(() => {
    if (userId) {
      client.on("update", () => {
        setClientRefetched(true);
      });
    }
  }, [client, userId]);

  // return "ready" if unleash failed to bootstrap
  if (clientError) {
    return { ready: true };
  }
  // return "ready" if unleash failed to load flags
  if (status.flagsError) {
    return { ready: true };
  }
  // return "not ready" if unleash hasn't refetched flags after the context changed.
  if (!clientRefetched) {
    return { ready: false };
  }
  // return "not ready" if unleash is still fetching flags
  if (!status.flagsReady && !status.flagsError) {
    return { ready: false };
  }
  // return "not ready" if unleash doesn't have a user id
  if (!client.getContext().userId) {
    return { ready: false };
  }

  // return "ready" /w a variant(!)
  return { ...variant, ready: true };
}
