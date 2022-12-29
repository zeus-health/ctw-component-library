import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { z } from "zod";
import {
  DrawerFormWithFields,
  DrawerFormWithFieldsProps,
} from "../form/drawer-form-with-fields";

export type ShowFormDrawerProps<T> = Omit<
  DrawerFormWithFieldsProps<T>,
  "isOpen" | "onClose"
>;

type DrawerState = {
  showFormDrawer: <T>(props: ShowFormDrawerProps<T>) => void;
};

const DrawerContext = createContext<DrawerState | undefined>(undefined);

interface DrawerProviderProps {
  children: ReactNode;
}

export function DrawerFormWithFieldsProvider({
  children,
}: DrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formProps, setFormProps] = useState<ShowFormDrawerProps<unknown>>({
    // Create some dummy initial props for the drawer. These will get
    // overwritten when showFormDrawer() is used.
    data: [],
    action: async () => {},
    title: "",
    schema: z.object({}),
  });

  const drawerState = useMemo(
    () => ({
      showFormDrawer: <T,>(props: ShowFormDrawerProps<T>) => {
        setFormProps(props as ShowFormDrawerProps<unknown>);
        setIsOpen(true);
      },
    }),
    []
  );

  return (
    <DrawerContext.Provider value={drawerState}>
      <DrawerFormWithFields
        {...formProps}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawerFormWithFields = (): DrawerState => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error(
      "useDrawerFormWithFields must be used within a DrawerFormWithFieldsProvider"
    );
  }

  return context;
};
