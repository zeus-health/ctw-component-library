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

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formProps, setFormProps] = useState<unknown>(undefined);

  const drawerState = useMemo(
    () => ({
      showFormDrawer: <T,>(props: ShowFormDrawerProps<T>) => {
        setFormProps(props);
        setIsFormOpen(true);
      },
    }),
    []
  );

  return (
    <DrawerContext.Provider value={drawerState}>
      <DrawerFormWithFields
        // This is a dummy prop that will get overwritten by formProps.
        schema={z.object({})}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(formProps as any)}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawer = (): DrawerState => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return context;
};
