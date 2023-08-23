import { createContext, createRef, RefObject } from "react";
import { IFrameTheme } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile-iframe";
import { Locals } from "@/i18n";
import { DefaultTheme, Theme } from "@/styles/tailwind.theme";

export interface ThemeContextValue {
  theme: Required<Theme>;
  iframeTheme?: IFrameTheme;
  ctwThemeRef: RefObject<HTMLDivElement>;
  locals?: Locals;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: DefaultTheme,
  ctwThemeRef: createRef<HTMLDivElement>(),
});
