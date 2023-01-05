import { ReactNode, useContext, useMemo, useState } from "react";
import { ModalContext, ModalState, OpenModalProps } from "./modal-context";

// NOTE: This is basically identical to DrawerProvider.
// We use a seperate provider for modals for two reasons:
//  1. Allows us to have both a drawer and a modal open at
//     the same time via the providers.
//  2. Allows modals and drawer interfaces to diverge a bit if needed.

interface ProviderProps {
  children: ReactNode;
}

// Define this outside of the rendered component to avoid eslint error.
const dummyChild = (_props: unknown) => <div />;

export function ModalProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setProps] = useState<OpenModalProps>({
    // Create some dummy initial props for the modal. These will get
    // overwritten when openModal() is used.
    component: dummyChild,
  });

  const state = useMemo(
    () => ({
      openModal: (props: OpenModalProps) => {
        setProps(props);

        // Ensure isOpen starts as false and then async set it to true.
        // This ensures the modal is added first before isOpen is set to
        // true which fixes an issue around initial opening animation/transition.
        setIsOpen(false);
        setTimeout(() => {
          setIsOpen(true);
        });
      },
    }),
    []
  );

  return (
    <ModalContext.Provider value={state}>
      {modalProps.component({
        isOpen,
        onClose: () => setIsOpen(false),
      })}
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalState => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
