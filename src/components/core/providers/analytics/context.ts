import { createContext } from "react";

type AnalyticsContextValue = {
  componentName?: string;
};

export const AnalyticsContext = createContext<AnalyticsContextValue>({});
