import { createContext, createRef, RefObject } from "react";
import { Locals } from "@/i18n";
import { DefaultTheme, Theme } from "@/styles/tailwind.theme";

export interface ThemeContextValue {
  theme: Required<Theme>;
  ctwThemeRef: RefObject<HTMLDivElement>;
  locals?: Locals;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: DefaultTheme,
  ctwThemeRef: createRef<HTMLDivElement>(),
});
