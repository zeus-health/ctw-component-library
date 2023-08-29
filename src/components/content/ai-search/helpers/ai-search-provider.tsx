import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type AiSearchContextValue = {
  value: string;
};

type AiSearchProviderProps = object;

const AiSearchContext = createContext<AiSearchContextValue>({
  value: "", // default search value
});

export function useAiSearch() {
  const context = useContext(AiSearchContext);
  const setValue = (value: string) => {
    context.value = value;
  };

  return [context.value, setValue];
}

export function AiSearchProvider({ children }: PropsWithChildren<AiSearchProviderProps>) {
  const contextValue = useMemo(
    () => ({
      value: "",
    }),
    []
  );

  return <AiSearchContext.Provider value={contextValue}>{children}</AiSearchContext.Provider>;
}
