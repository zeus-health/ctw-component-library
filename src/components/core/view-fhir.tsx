import { Drawer } from "./drawer";
import { useDrawer } from "./providers/drawer-provider";

export type ViewFHIRProps = {
  name: string;
  resource: fhir4.Encounter;
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
        <pre>
          <div>{JSON.stringify(resource, null, 2)}</div>
        </pre>
      </Drawer.Body>
    </Drawer>
  );
}
