import { createContext, createRef, RefObject } from "react";
import { DefaultTheme, Theme } from "@/styles/tailwind.theme";

export interface ThemeContextValue {
  theme: Required<Theme>;
  ctwThemeRef: RefObject<HTMLDivElement>;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: DefaultTheme,
  ctwThemeRef: createRef<HTMLDivElement>(),
});
