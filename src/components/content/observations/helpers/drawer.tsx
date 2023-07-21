import { useAdditionalResourceActions } from "../../resource/use-additional-resource-actions";
import { ObservationDetails } from "@/components/content/observations/helpers/details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { LOINC_ANALYTES } from "@/fhir/models/observation";
import { usePatientObservations } from "@/fhir/observations";
import { keys } from "@/utils/nodash";

export function useObservationsDetailsDrawer() {
  const { openDrawer } = useDrawer();
  const { data } = usePatientObservations(keys(LOINC_ANALYTES));

  return (diagnosticReport: DiagnosticReportModel) => {
    openDrawer({
      component: (props) => (
        <ObservationsDrawer diagnosticReport={diagnosticReport} observations={data} {...props} />
      ),
    });
  };
}

export type ObservationsDrawerProps = {
  className?: string;
  diagnosticReport: DiagnosticReportModel;
  observations?: ObservationModel[];
  isOpen: boolean;
  onClose: () => void;
};

export function ObservationsDrawer({
  className,
  diagnosticReport,
  observations,
  isOpen,
  onClose,
}: ObservationsDrawerProps) {
  const ResourceActions = useAdditionalResourceActions({ enableDismissAndReadActions: true });

  return (
    <Drawer className={className} title="Diagnostic Report" isOpen={isOpen} onClose={onClose}>
      <Drawer.Body>
        <ObservationDetails diagnosticReport={diagnosticReport} observationTrends={observations} />
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
