import { createContext, PropsWithChildren, useMemo } from "react";

type FeedbackContext = {
  id: string;
};

export const FeedbackContext = createContext<FeedbackContext>({
  id: "",
});

export function FeedbackProvider({ children, id }: PropsWithChildren<FeedbackContext>) {
  const contextValue = useMemo(
    () => ({
      id,
    }),
    [id]
  );

  return <FeedbackContext.Provider value={contextValue}>{children}</FeedbackContext.Provider>;
}
