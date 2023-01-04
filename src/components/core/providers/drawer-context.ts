import { createContext } from "react";
import { DrawerProps } from "../drawer";

export type OpenDrawerProps = {
  component: ({
    isOpen,
    onClose,
  }: Pick<DrawerProps, "isOpen" | "onClose">) => JSX.Element;
};

export type DrawerState = {
  openDrawer: (props: OpenDrawerProps) => void;
};

export const DrawerContext = createContext<DrawerState | undefined>(undefined);
