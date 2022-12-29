import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { DrawerProps } from "../drawer";

type OpenDrawerProps = {
  component: ({
    isOpen,
    onClose,
  }: Pick<DrawerProps, "isOpen" | "onClose">) => JSX.Element;
};

type State = {
  openDrawer: (props: OpenDrawerProps) => void;
};

const Context = createContext<State | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

// Define this outside of the rendered component to avoid eslint error.
const dummyChild = (_props: unknown) => <div />;

export function DrawerProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerProps, setProps] = useState<OpenDrawerProps>({
    // Create some dummy initial props for the drawer. These will get
    // overwritten when openDrawer() is used.
    component: dummyChild,
  });

  const state = useMemo(
    () => ({
      openDrawer: (props: OpenDrawerProps) => {
        setProps(props);

        // Ensure isOpen starts as false and then async set it to true.
        // This ensures the drawer is added first before isOpen is set to
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
      {drawerProps.component({
        isOpen,
        onClose: () => setIsOpen(false),
      })}
      {children}
    </Context.Provider>
  );
}

export const useDrawer = (): State => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return context;
};
