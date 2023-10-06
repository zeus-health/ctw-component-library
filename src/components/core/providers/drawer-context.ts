import { createContext } from "react";
import { TrackingMetadata } from "./analytics/use-analytics";
import { DrawerProps } from "../drawer";

export type OpenDrawerProps = {
  trackingMetadata?: TrackingMetadata;
  component: ({
    isOpen,
    onClose,
    onOpen,
    onAfterOpen,
    trackingMetadata,
  }: Pick<DrawerProps, "isOpen" | "onClose" | "onOpen" | "onAfterOpen" | "trackingMetadata">) =>
    | JSX.Element
    | undefined;
};

export type DrawerState = {
  closeDrawer: () => void;
  openDrawer: (props: OpenDrawerProps) => void;
};

export const DrawerContext = createContext<DrawerState | undefined>(undefined);
