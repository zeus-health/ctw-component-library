import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/models/medication";
import { useEffect, useState } from "react";
import {
  CollapsibleDataListEntry,
  CollapsibleDataListProps,
} from "@/components/core/collapsible-data-list";
import { Loading } from "@/components/core/loading";
import { CollapsibleDataListStack } from "@/components/core/collapsible-data-list-stack";

const MEDICATION_HISTORY_LIMIT = 10;

export type MedicationHistoryProps = {
  rxNorm: string;
};

export function MedicationHistory({ rxNorm }: MedicationHistoryProps) {
  const [entries, setEntries] = useState<CollapsibleDataListProps[]>([]);
  const medHistoryQuery = useMedicationHistory(rxNorm);
  const loading = medHistoryQuery.isLoading;

  useEffect(() => {
    if (medHistoryQuery.data) {
      const { medications, includedResources } = medHistoryQuery.data;
      const histories = medications.map((med) =>
        setupData(new MedicationModel(med, includedResources))
      );
      setEntries(histories);
    }
  }, [medHistoryQuery.data]);

  if (loading) {
    return <Loading message="" />;
  }
  if (!(rxNorm && entries.length)) {
    return <div>No history available for this medication.</div>;
  }

  return (
    <CollapsibleDataListStack
      entries={entries}
      limit={MEDICATION_HISTORY_LIMIT}
    />
  );
}

export function resourceTypeRename(name: string): string {
  switch (name) {
    case "MedicationStatement":
      return "Usage Reported";
    case "MedicationAdministration":
      return "Administered";
    case "MedicationDispense":
      return "Filled";
    case "MedicationRequest":
      return "Prescribed";
    default:
      return name;
  }
}

function setupData(medication: MedicationModel): CollapsibleDataListProps {
  const detailData: CollapsibleDataListEntry[] = [];

  const titleMap: Record<string, string> = {
    MedicationStatement: "Medication Reviewed",
    MedicationRequest: "Presciption Ordered",
    MedicationDispense: "Medication Filled",
  };

  const card: CollapsibleDataListProps = {
    id: medication.id,
    date: medication.date,
    title: titleMap[medication.resourceType],
    data: detailData,
    // subTitle: "Placeholder subtitle",
  };

  if (medication.resourceType === "MedicationStatement") {
    const resource = medication.resource as fhir4.MedicationStatement;
    // TODO: informationSource is a reference, would be a good idea to have this
    // included in the includedResources field
    card.subTitle = resource.informationSource?.reference;
    detailData.push(
      {
        label: "Status",
        value: medication.status,
      },
      {
        label: "Instructions",
        value: medication.dosage,
      }
    );
  } else if (medication.resourceType === "MedicationRequest") {
    const resource = medication.resource as fhir4.MedicationRequest;

    // TODO: convert prescriber reference into name, address, and telecom
    const prescriber = resource.requester?.reference;
    card.subTitle = prescriber;

    const value = resource.dispenseRequest?.initialFill?.quantity?.value;
    const unit = resource.dispenseRequest?.initialFill?.quantity?.unit;
    detailData.push({ label: "Quantity", value: `${value} ${unit}` });

    detailData.push({
      label: "Refills",
      value: resource.dispenseRequest?.numberOfRepeatsAllowed,
    });

    detailData.push({
      label: "Instructions",
      value: resource.dosageInstruction,
    });

    detailData.push({ label: "Prescriber", value: prescriber });

    // TODO: convert into name, address, and telecom
    detailData.push({
      label: "Pharmacy",
      value: resource.dispenseRequest?.performer?.reference,
    });
  } else if (medication.resourceType === "MedicationDispense") {
    const resource = medication.resource as fhir4.MedicationDispense;

    const value = resource.quantity?.value;
    const unit = resource.quantity?.unit;
    const quantity = `${value} ${unit}`;
    // TODO: how to get the number of refills?
    // medication dispense does not have numberOfRepeatsAllowed
    card.subTitle = `${quantity}, 0 refills`;
    detailData.push({ label: "Quantity", value: quantity });

    detailData.push({
      label: "Days supply",
      value: `${resource.daysSupply?.value} days`,
    });

    detailData.push({ label: "Refills", value: "TODO" });

    // TODO: convert to performer name, address, and telecom
    detailData.push({
      label: "Pharmacy",
      value: resource.performer?.[0]?.actor.reference,
    });
  }

  return card;
}
