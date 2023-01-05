import { createContext } from "react";

export type OpenModalProps = {
  component: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => JSX.Element;
};

export type ModalState = {
  openModal: (props: OpenModalProps) => void;
};

export const ModalContext = createContext<ModalState | undefined>(undefined);
