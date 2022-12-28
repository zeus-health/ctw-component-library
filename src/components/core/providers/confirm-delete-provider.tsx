import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
  ModalConfirmDelete,
  ModalConfirmDeleteProps,
} from "../modal-confirm-delete";

export type ConfirmDeleteProps = Pick<
  ModalConfirmDeleteProps,
  "resource" | "resourceName" | "onDelete"
>;

type State = {
  confirmDelete: (props: ConfirmDeleteProps) => void;
};

const Context = createContext<State | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function ConfirmDeleteProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ConfirmDeleteProps>();

  const state = useMemo(
    () => ({
      confirmDelete: (props: ConfirmDeleteProps) => {
        setModalProps(props);
        setIsOpen(true);
      },
    }),
    []
  );

  return (
    <Context.Provider value={state}>
      <ModalConfirmDelete
        // These are dummy props that should get overwritten by modalProps
        // when really used.
        resource={{ resourceType: "Basic" }}
        resourceName=""
        onDelete={async () => {}}
        {...modalProps}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
      {children}
    </Context.Provider>
  );
}

export const useConfirmDelete = (): State => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useConfirmDelete must be used within a ConfirmDeleteProvider"
    );
  }

  return context;
};
