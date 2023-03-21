import { ObservationDetails } from "@/components/content/observations/helpers/details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { DiagnosticReportModel } from "@/fhir/models";

export function useObservationsDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (diagnosticReport: DiagnosticReportModel) => {
    openDrawer({
      component: (props) => (
        <ObservationsDrawer diagnosticReport={diagnosticReport} {...props} />
      ),
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
  return (
    <Drawer
      className={className}
      title="Diagnostic Report"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <ObservationDetails diagnosticReport={diagnosticReport} />
      </Drawer.Body>
    </Drawer>
  );
}
