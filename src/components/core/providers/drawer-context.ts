import { createContext } from "react";
import { DrawerProps } from "../drawer";

export type OpenDrawerProps = {
  component: ({
    title,
    isOpen,
    onClose,
    onOpen,
    onAfterOpen,
  }: Pick<DrawerProps, "isOpen" | "onClose" | "onOpen" | "onAfterOpen" | "title">) =>
    | JSX.Element
    | undefined;
};

export type DrawerState = {
  openDrawer: (props: OpenDrawerProps) => void;
};

export const DrawerContext = createContext<DrawerState | undefined>(undefined);
