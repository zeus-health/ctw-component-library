import { useContext } from "react";
import { ThemeContext } from "./context";
import { Theme } from "@/styles/tailwind.theme";

export function useTheme(): Required<Theme> {
  const context = useContext(ThemeContext);
  return context.theme;
}
