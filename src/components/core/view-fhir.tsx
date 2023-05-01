import { FireIcon } from "@heroicons/react/solid";
import cx from "classnames";
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
      component: (props) => <FHIRDrawer name={name} resource={resource} {...props} />,
    });
  };
}

export function ViewFHIR({ name, resource }: ViewFHIRProps) {
  const openDrawer = useFHIRDrawer();

  return (
    <button
      type="button"
      className="ctw-btn-primary ctw-text-sm"
      onClick={(event) => {
        // Prevents any rowClick handler from firing.
        event.stopPropagation();
        openDrawer(name, resource);
      }}
    >
      <span className="ctw-relative ctw-inline-block ctw-w-4 ctw-pr-4 ctw-align-middle">
        <FireIcon className="ctw-absolute -ctw-top-2.5 ctw-left-0 ctw-h-4" />
      </span>{" "}
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

function FHIRDrawer({ resource, isOpen, onClose, className, name }: FHIRDrawerProps) {
  return (
    <Drawer
      className={cx(className, "ctw-view-fhir")}
      title={name}
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-text-sm">
          <ReactJason value={resource} theme={github} />
        </div>
      </Drawer.Body>
    </Drawer>
  );
}
