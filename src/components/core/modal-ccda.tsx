import { ReactNode } from "react";
import { ModalProps } from "./modal";

export type CCDAModalProps = {
  data: ReactNode;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children" | "onAfterClosed">;

export const CCDAModal = ({
  data,
  onClose,
  ...modalProps
}: CCDAModalProps) => {};
