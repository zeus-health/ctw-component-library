import { ReactNode, useContext, useMemo, useState } from "react";
import { DrawerContext, DrawerState, OpenDrawerProps } from "./drawer-context";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";

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
  const analytics = useAnalytics();

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
          analytics.trackInteraction("open_drawer", {
            // Datadog we write the drawer name into the metric name itself (prop ignored by analytics)
            datadogMetricName: `open_drawer.${props.telemetryName ?? ""}`.replace(/(\.)$/, ""),
            // For analytics, we pass the name of the drawer as an event attribute name
            name: props.telemetryName,
          });
        });
      },
    }),

    [analytics]
  );

  return (
    <DrawerContext.Provider value={state}>
      {drawerProps.component({
        isOpen,
        onClose: () => {
          setIsOpen(false);
          setProps({
            component: dummyChild,
          });
        },
      })}
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
