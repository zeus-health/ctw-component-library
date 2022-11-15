import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { CollapsibleDataListStack } from "@/components/core/collapsible-data-list-stack";
import { Loading } from "@/components/core/loading";
import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/models/medication";
import { MedicationDispenseModel } from "@/models/medication-dispense";
import { MedicationStatementModel } from "@/models/medication-statement";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";

const MEDICATION_HISTORY_LIMIT = 10;

export type MedicationHistoryProps = {
  medication: MedicationStatementModel;
};

export function MedicationHistory({ medication }: MedicationHistoryProps) {
  const [entries, setEntries] = useState<CollapsibleDataListProps[]>([]);
  const medHistoryQuery = useMedicationHistory(medication.resource);
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
        <h2 className="ctw-text-lg ctw-font-semibold">Medication History</h2>
        <Loading message="" />
      </>
    );
  }

  return (
    <>
      <h2 className="ctw-text-lg ctw-font-semibold">Medication History</h2>
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
    date: medication.dateLocal,
    id: medication.id,
    title: "Medication Reviewed",
    hideEmpty: false,
    // @todo Get the practitioners name
    subTitle: "",
    data: [
      {
        label: "Status",
        value: capitalize(medStatement.status),
      },
      {
        label: "Instructions",
        value: medStatement.dosage,
      },
    ],
  };
}

function createMedicationDetailsCard(
  medication: MedicationModel
): CollapsibleDataListProps {
  if (medication.resourceType === "MedicationStatement") {
    return createMedicationStatementCard(medication);
  }
  if (medication.resourceType === "MedicationRequest") {
    return createMedicationRequestCard(medication);
  }

  if (medication.resourceType === "MedicationDispense") {
    return createMedicationDispenseCard(medication);
  }

  if (medication.resourceType === "MedicationAdministration") {
    return createMedicationAdminCard(medication);
  }

  throw new Error(
    `Unknown medication resource type "${medication.resourceType}"`
  );
}

function createMedicationRequestCard(medication: MedicationModel) {
  const resource = medication.resource as fhir4.MedicationRequest;
  const prescriber = resource.requester?.display || "";
  const pharmacy = resource.dispenseRequest?.performer?.display || "";

  const { numberOfRepeatsAllowed = "", initialFill } =
    resource.dispenseRequest || {};
  const { value = "", unit = "" } = initialFill?.quantity || {};

  return {
    date: medication.dateLocal,
    id: medication.id,
    title: "Prescription Ordered",
    subTitle: prescriber,
    hideEmpty: false,
    data: [
      { label: "Quantity", value: [value, unit].join(" ") },
      {
        label: "Refills Allowed",
        value: numberOfRepeatsAllowed,
      },
      {
        label: "Instructions",
        value: medication.dosage,
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
  const { name, address, telecom } = performerDetails;
  return {
    date: medication.dateLocal,
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
        value: (
          <>
            {name && <div>{name}</div>}
            {address && <div>{address}</div>}
            {telecom && <div>T: {telecom}</div>}
          </>
        ),
      },
    ],
  };
}

function createMedicationAdminCard(medication: MedicationModel) {
  return {
    id: medication.id,
    date: medication.dateLocal,
    hideEmpty: false,
    title: "Medication Administered",
    data: [],
  };
}
