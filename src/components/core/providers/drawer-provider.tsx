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

export function DrawerProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerProps, setProps] = useState<OpenDrawerProps>({
    // eslint-disable-next-line react/no-unstable-nested-components
    drawerChild: (props) => <div />,
    title: "",
  });

  const state = useMemo(
    () => ({
      openDrawer: (props: OpenDrawerProps) => {
        console.log("open the drawer", props);
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
    throw new Error("useOpenDrawer must be used within a DrawerProvider");
  }

  return context;
};
