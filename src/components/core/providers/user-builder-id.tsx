import { useEffect, useState } from "react";
import { useCTW } from "./use-ctw";

export function useUserBuilderId() {
  const { getRequestContext } = useCTW();
  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  return userBuilderId;
}
