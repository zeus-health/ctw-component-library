import { useContext } from "react";
import { ThemeContext } from "./context";

export function useCtwThemeRef(): React.RefObject<HTMLDivElement> {
  const context = useContext(ThemeContext);
  return context.ctwThemeRef;
}
