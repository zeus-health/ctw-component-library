import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/models/medication";
import { useEffect, useState } from "react";
import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { Loading } from "@/components/core/loading";
import { CollapsibleDataListStack } from "@/components/core/collapsible-data-list-stack";
import { MedicationStatementModel } from "@/models/medication-statement";
import { Medication } from "@/fhir/medication";
import { MedicationDispenseModel } from "@/models/medication-dispense";
import { format } from "date-fns";

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
      const { medications } = medHistoryQuery.data;
      setEntries(medications.map(createMedicationDetailsCard));
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

function createMedicationStatementCard(medication: MedicationModel) {
  const resource = medication.resource as fhir4.MedicationStatement;
  const medStatement = new MedicationStatementModel(resource);

  return {
    date: format(new Date(medication.date || ""), "MM/dd/yyyy"),
    id: medication.id,
    title: "Medication Reviewed",
    hideEmpty: false,
    subTitle: medStatement.informationSourceDisplay,
    data: [
      {
        label: "Status",
        value: medStatement.status,
      },
      {
        label: "Instructions",
        value: medStatement.dosage,
      },
    ],
  };
}

function createMedicationDetailsCard(
  med: Medication
): CollapsibleDataListProps {
  const medication = new MedicationModel(med);
  if (medication.resourceType === "MedicationStatement") {
    return createMedicationStatementCard(medication);
  }
  if (medication.resourceType === "MedicationRequest") {
    return createMedicationRequestCard(medication);
  }

  if (medication.resourceType === "MedicationDispense") {
    return createMedicationDispenseCard(medication);
  }

  throw new Error(
    `Unknown medication resource type "${medication.resourceType}"`
  );
}

function createMedicationRequestCard(medication: MedicationModel) {
  const resource = medication.resource as fhir4.MedicationRequest;
  // @todo: For prescriber & pharmacy tell ODS to include more info in request
  const prescriber = resource.requester?.display || "";
  const pharmacy = resource.dispenseRequest?.performer?.display || "";

  const { numberOfRepeatsAllowed, initialFill } =
    resource.dispenseRequest || {};
  const { value = "", unit = "" } = initialFill?.quantity || {};

  return {
    date: format(new Date(medication.date || ""), "MM/dd/yyyy"),
    id: medication.id,
    title: "Prescription Ordered",
    subTitle: prescriber,
    hideEmpty: false,
    data: [
      { label: "Quantity", value: [value, unit].join(" ") },
      {
        label: "Refills Allowed",
        value: resource.dispenseRequest?.numberOfRepeatsAllowed || "",
      },
      {
        label: "Instructions",
        value: resource.dosageInstruction,
      },
      { label: "Prescriber", value: prescriber },
      {
        label: "Pharmacy",
        value: pharmacy,
      },
    ],
  };
}

function createMedicationDispenseCard(medication: MedicationModel) {
  const resource = medication.resource as fhir4.MedicationDispense;
  const medDispense = new MedicationDispenseModel(
    resource,
    medication.includedResources
  );

  const { quantityDisplay, supplied, performerDetails } = medDispense;

  return {
    date: format(new Date(medication.date || ""), "MM/dd/yyyy"),
    hideEmpty: false,
    id: medication.id,
    title: "Medication Filled",
    data: [
      { label: "Quantity", value: quantityDisplay },
      {
        label: "Days supply",
        value: supplied,
      },
      {
        label: "Pharmacy",
        value: [
          performerDetails.name,
          performerDetails.address,
          performerDetails.telecom ? `T: ${performerDetails.telecom}` : "",
        ].join("\n"),
      },
    ],
  };
}
