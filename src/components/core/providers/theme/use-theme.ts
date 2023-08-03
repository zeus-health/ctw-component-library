import { useContext } from "react";
import { ThemeContext } from "./context";
import { CTWStateContext } from "@/components/core/providers/ctw-context";

export function useTheme() {
  const context = useContext(ThemeContext);
  const ctw = useContext(CTWStateContext);
  return {
    theme: context.theme,
    locals: ctw?.locals,
  };
}
