import { createContext, ReactNode, useContext, useMemo, useState } from "react";

// NOTE: This is basically identical to DrawerProvider.
// We use a seperate provider for modals for two reasons:
//  1. Allows us to have both a drawer and a modal open at
//     the same time via the providers.
//  2. Allows modals and drawer interfaces to diverge a bit if needed.

type OpenModalProps = {
  component: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => JSX.Element;
};

type State = {
  openModal: (props: OpenModalProps) => void;
};

const Context = createContext<State | undefined>(undefined);

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
    <Context.Provider value={state}>
      {modalProps.component({
        isOpen,
        onClose: () => setIsOpen(false),
      })}
      {children}
    </Context.Provider>
  );
}

export const useModal = (): State => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
