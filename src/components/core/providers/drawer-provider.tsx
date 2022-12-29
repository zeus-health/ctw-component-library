import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Drawer } from "../drawer";

type OpenDrawerProps = {
  drawerChild: (props: { onClose: () => void }) => JSX.Element;
  title: string;
  className?: string;
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
    drawerChild: dummyChild,
    title: "",
  });

  const state = useMemo(
    () => ({
      openDrawer: (props: OpenDrawerProps) => {
        setProps(props);
        setIsOpen(true);
      },
    }),
    []
  );

  return (
    <Context.Provider value={state}>
      <Drawer
        className={drawerProps.className}
        title={drawerProps.title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {drawerProps.drawerChild({ onClose: () => setIsOpen(false) })}
      </Drawer>
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
