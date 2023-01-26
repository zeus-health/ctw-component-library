import { ReactJason } from "react-jason";
import github from "react-jason/themes/github";
import { Drawer } from "./drawer";
import { useDrawer } from "./providers/drawer-provider";

export type ViewFHIRProps = {
  name: string;
  resource: fhir4.Resource;
};

export function useFHIRDrawer() {
  const { openDrawer } = useDrawer();

  return (name: string, resource: fhir4.Resource) => {
    openDrawer({
      component: (props) => (
        <FHIRDrawer name={name} resource={resource} {...props} />
      ),
    });
  };
}

export function ViewFHIR({ name, resource }: ViewFHIRProps) {
  const openDrawer = useFHIRDrawer();

  return (
    <button
      type="button"
      className="ctw-btn-primary"
      onClick={(event) => {
        // Prevents any rowClick handler from firing.
        event.stopPropagation();
        openDrawer(name, resource);
      }}
    >
      View FHIR
    </button>
  );
}

type FHIRDrawerProps = {
  name: string;
  className?: string;
  resource: fhir4.Resource;
  isOpen: boolean;
  onClose: () => void;
};

function FHIRDrawer({
  resource,
  isOpen,
  onClose,
  className,
  name,
}: FHIRDrawerProps) {
  return (
    <Drawer
      className={className}
      title={name}
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <ReactJason value={resource} theme={github} />
      </Drawer.Body>
    </Drawer>
  );
}
