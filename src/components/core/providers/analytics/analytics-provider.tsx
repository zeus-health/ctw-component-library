import { PropsWithChildren, useMemo } from "react";
import { AnalyticsContext } from "./context";

type TelemetryProviderProps = {
  componentName?: string;
};

export function AnalyticsProvider({
  children,
  componentName,
}: PropsWithChildren<TelemetryProviderProps>) {
  const contextValue = useMemo(
    () => ({
      componentName,
    }),
    [componentName]
  );

  return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>;
}
