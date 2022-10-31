import { compact } from "lodash/fp";
import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/models/medication";
import { useEffect, useState } from "react";
import {
  CollapsibleDataListEntry,
  CollapsibleDataListProps,
} from "@/components/core/collapsible-data-list";
import { Loading } from "@/components/core/loading";
import { CollapsibleDataListStack } from "@/components/core/collapsible-data-list-stack";
import { MedicationStatementModel } from "@/models/medication-statement";
import { Medication } from "@/fhir/medication";
import { MedicationDispenseModel } from "@/models/medication-dispense";

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
      setEntries(medications.map(setupData));
    }
  }, [medHistoryQuery.data]);

  if (loading) {
    return (
      <>
        <h3>Medication History</h3>
        <Loading message="" />
      </>
    );
  }

  return (
    <>
      <h3>Medication History</h3>
      {entries.length ? (
        <CollapsibleDataListStack
          entries={entries}
          limit={MEDICATION_HISTORY_LIMIT}
        />
      ) : (
        <span>No history available for this medication.</span>
      )}
    </>
  );
}

const titleMap: Map<fhir4.FhirResource["resourceType"], string> = new Map();
titleMap.set("MedicationStatement", "Medication Reviewed");
titleMap.set("MedicationRequest", "Prescription Ordered");
titleMap.set("MedicationDispense", "Medication Filled");

function setupData(med: Medication): CollapsibleDataListProps {
  const medication = new MedicationModel(med);
  const detailData: CollapsibleDataListEntry[] = [];
  const card: CollapsibleDataListProps = {
    id: medication.id,
    date: medication.date,
    title: titleMap.get(medication.resourceType),
    data: detailData,
  };

  if (medication.resourceType === "MedicationStatement") {
    const resource = medication.resource as fhir4.MedicationStatement;
    const medStatement = new MedicationStatementModel(resource);
    card.subTitle = medStatement.informationSourceDisplay;

    detailData.push(
      {
        label: "Status",
        value: medStatement.status,
      },
      {
        label: "Instructions",
        value: medStatement.dosage,
      }
    );
  } else if (medication.resourceType === "MedicationRequest") {
    const resource = medication.resource as fhir4.MedicationRequest;

    // TODO: convert prescriber reference into name, address, and telecom
    const prescriber = resource.requester?.reference;
    card.subTitle = prescriber;

    if (resource.dispenseRequest?.initialFill?.quantity) {
      const { value, unit } = resource.dispenseRequest.initialFill.quantity;
      detailData.push({ label: "Quantity", value: `${value} ${unit}` });
    }

    detailData.push({
      label: "Refills",
      value: resource.dispenseRequest?.numberOfRepeatsAllowed || "0",
    });

    detailData.push({
      label: "Instructions",
      value: resource.dosageInstruction,
    });

    detailData.push({ label: "Prescriber", value: prescriber });

    const pharmacy = resource.dispenseRequest?.performer?.reference;
    if (pharmacy) {
      // TODO: convert into name, address, and telecom
      detailData.push({
        label: "Pharmacy",
        value: pharmacy,
      });
    }
  } else if (medication.resourceType === "MedicationDispense") {
    const resource = medication.resource as fhir4.MedicationDispense;
    const medDispense = new MedicationDispenseModel(
      resource,
      medication.includedResources
    );

    const { quantityDisplay, refillsRemaining, supplied, performerDetails } =
      medDispense;

    card.subTitle = compact([
      quantityDisplay,
      `${refillsRemaining} refills`,
    ]).join(", ");

    detailData.push({ label: "Quantity", value: quantityDisplay });

    detailData.push({
      label: "Days supply",
      value: `${supplied} days`,
    });

    detailData.push({ label: "Refills", value: medDispense.dosageInstruction });

    detailData.push({
      label: "Pharmacy",
      value: [
        performerDetails.name,
        performerDetails.address,
        `T: ${performerDetails.telecom}`,
      ].join("\n"),
    });
  }

  return card;
}
