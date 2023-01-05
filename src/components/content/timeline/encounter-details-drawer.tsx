import { capitalize } from "lodash";
import { CodingList } from "@/components/core/coding-list";
import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { EncounterModel } from "@/fhir/models/encounter";

export function useEncounterDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (encounter: EncounterModel) => {
    openDrawer({
      component: (props) => (
        <EncounterDetailsDrawer encounter={encounter} {...props} />
      ),
    });
  };
}

export type EncounterDetailsDrawerProps = {
  className?: string;
  encounter: EncounterModel;
  isOpen: boolean;
  onClose: () => void;
};

export function EncounterDetailsDrawer({
  encounter,
  className,
  isOpen,
  onClose,
}: EncounterDetailsDrawerProps) {
  return (
    <Drawer
      className={className}
      title="Encounter Details"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-py-2">
          <div className="ctw-text-2xl">
            {encounter.periodStart} - {encounter.periodEnd}
          </div>
          <div className="ctw-text-sm">{encounter.typeDisplay}</div>
        </div>

        <Details data={encounterData(encounter)} />
      </Drawer.Body>
    </Drawer>
  );
}

export const encounterData = (encounter: EncounterModel) => [
  { label: "Period Start", value: encounter.periodStart },
  { label: "Period End", value: encounter.periodEnd },
  { label: "Status", value: capitalize(encounter.status) },
  { label: "Type", value: <CodingList codings={encounter.typeCodings} /> },
  { label: "Location", value: encounter.location },
  { label: "Participants", value: encounter.participants },
  { label: "Reason", value: encounter.reason },
  { label: "Diagnosis", value: encounter.diagnosis },
  { label: "Discharge Disposition", value: encounter.dischargeDisposition },
];
