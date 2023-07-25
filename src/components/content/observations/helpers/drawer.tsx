import { useAdditionalResourceActions } from "../../resource/use-additional-resource-actions";
import { ObservationDetails } from "@/components/content/observations/helpers/details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { DiagnosticReportModel } from "@/fhir/models";

export function useObservationsDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (diagnosticReport: DiagnosticReportModel) => {
    openDrawer({
      telemetryName: "observations_details",
      component: (props) => <ObservationsDrawer diagnosticReport={diagnosticReport} {...props} />,
    });
  };
}

export type ObservationsDrawerProps = {
  className?: string;
  diagnosticReport: DiagnosticReportModel;
  isOpen: boolean;
  onClose: () => void;
};

export function ObservationsDrawer({
  className,
  diagnosticReport,
  isOpen,
  onClose,
}: ObservationsDrawerProps) {
  const ResourceActions = useAdditionalResourceActions({ enableDismissAndReadActions: true });

  return (
    <Drawer className={className} title="Diagnostic Report" isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>
        <ObservationDetails diagnosticReport={diagnosticReport} />
      </Drawer.Body>
      <Drawer.Footer>
        <div className="ctw-flex ctw-justify-between">
          <Drawer.CloseButton onClose={onClose} label="Close" />
          {ResourceActions && <ResourceActions record={diagnosticReport} onSuccess={onClose} />}
        </div>
      </Drawer.Footer>
    </Drawer>
  );
}
