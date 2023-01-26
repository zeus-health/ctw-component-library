import { useEffect, useState } from "react";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { CodingList } from "@/components/core/coding-list";
import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { Loading } from "@/components/core/loading";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { getBinaryId } from "@/fhir/binaries";
import { EncounterModel } from "@/fhir/models/encounter";
import { searchProvenances } from "@/fhir/provenance";
import { capitalize } from "@/utils/nodash";

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
  const openCCDAModal = useCCDAModal();
  const [isLoading, setIsLoading] = useState(true);
  const [binaryId, setBinaryId] = useState<string>();
  const { getRequestContext } = useCTW();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const requestContext = await getRequestContext();
      const provenances = await searchProvenances(requestContext, [encounter]);
      setBinaryId(getBinaryId(provenances, encounter.id));
      setIsLoading(false);
    }

    void load();
  }, [encounter, getRequestContext]);

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

        {isLoading ? (
          <Loading message="Loading encounter data..." />
        ) : (
          <Details
            data={encounterData(encounter)}
            documentButton={
              binaryId ? (
                <DocumentButton
                  onClick={() => openCCDAModal(binaryId, "Encounter")}
                  text="Source Document"
                />
              ) : undefined
            }
          />
        )}
      </Drawer.Body>
    </Drawer>
  );
}

export const encounterData = (encounter: EncounterModel) => [
  { label: "Period Start", value: encounter.periodStart },
  { label: "Period End", value: encounter.periodEnd },
  { label: "Status", value: capitalize(encounter.status) },
  { label: "Class", value: encounter.class },
  {
    label: "Type",
    value: encounter.typeCodings.length ? (
      <CodingList codings={encounter.typeCodings} />
    ) : undefined,
  },
  { label: "Location", value: encounter.location },
  { label: "Participants", value: encounter.participants },
  { label: "Reason", value: encounter.reason },
  { label: "Diagnosis", value: encounter.diagnosis },
  { label: "Discharge Disposition", value: encounter.dischargeDisposition },
];
