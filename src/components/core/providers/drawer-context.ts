import { createContext } from "react";
import { DrawerProps } from "../drawer";

export type OpenDrawerProps = {
  component: ({
    isOpen,
    onClose,
    onOpen,
    onAfterOpen,
  }: Pick<DrawerProps, "isOpen" | "onClose" | "onOpen" | "onAfterOpen">) =>
    | JSX.Element
    | undefined;
};

export type DrawerState = {
  openDrawer: (props: OpenDrawerProps) => void;
};

export const DrawerContext = createContext<DrawerState | undefined>(undefined);
