import { useEffect, useState } from "react";
import { sortMedHistory } from "../history/helpers";
import { History } from "@/components/content/resource/helpers/history";
import { HistoryEntryProps } from "@/components/content/resource/helpers/history-entry";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/fhir/models/medication";
import { MedicationAdministrationModel } from "@/fhir/models/medication-administration";
import { MedicationDispenseModel } from "@/fhir/models/medication-dispense";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { capitalize, compact } from "@/utils/nodash";

const MEDICATION_HISTORY_LIMIT = 10;

export type MedicationHistoryProps = {
  medication: MedicationStatementModel;
};

/**
 * Displays the history of a medication
 */
export const MedicationHistory = withErrorBoundary(
  ({ medication }: MedicationHistoryProps) => {
    const [entries, setEntries] = useState<HistoryEntryProps[]>([]);
    const medHistoryQuery = useMedicationHistory(medication.resource);
    const loading = medHistoryQuery.isLoading;

    useEffect(() => {
      if (medHistoryQuery.data) {
        const { medications } = medHistoryQuery.data;
        setEntries(
          sortMedHistory(medications).map(createMedicationDetailsCard)
        );
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
          <History
            entries={entries}
            limit={MEDICATION_HISTORY_LIMIT}
            resourceTypeTitle={medication.resourceTypeTitle}
          />
        ) : (
          <span>No history available for this medication.</span>
        )}
      </>
    );
  },
  "MedicationHistory"
);

function createMedicationStatementCard(medication: MedicationModel) {
  const resource = medication.resource as fhir4.MedicationStatement;
  const medStatement = new MedicationStatementModel(
    resource,
    medication.includedResources
  );

  return {
    date: medication.dateLocal,
    id: medication.id,
    title: "Medication Reviewed",
    hideEmpty: false,
    subtitle: medStatement.patient?.organization?.name,
    details: [
      {
        label: "Status",
        value: capitalize(medStatement.displayStatus),
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
): HistoryEntryProps {
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
  const { prescriber } = medication;
  const { name, address, telecom } = new MedicationRequestModel(
    resource,
    medication.includedResources
  ).pharmacy;
  const { numberOfRepeatsAllowed = "", initialFill } =
    resource.dispenseRequest || {};
  const { value = "", unit = "" } = initialFill?.quantity || {};

  return {
    date: medication.dateLocal,
    id: medication.id,
    title: "Prescription Ordered",
    subtitle: prescriber,
    hideEmpty: false,
    details: [
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
    subtitle: compact([
      quantityDisplay,
      supplied ? `${supplied} supplied` : null,
    ]).join(", "),
    details: [
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
  const resource = medication.resource as fhir4.MedicationAdministration;
  const medAdmin = new MedicationAdministrationModel(
    resource,
    medication.includedResources
  );

  return {
    id: medication.id,
    date: medication.dateLocal,
    hideEmpty: false,
    title: "Medication Administered",
    subtitle: compact([medAdmin.dosageDisplay, medAdmin.dosageRoute]).join(
      ", "
    ),
    details: [
      { label: "Dosage", value: medAdmin.dosageDisplay },
      {
        label: "Route",
        value: medAdmin.dosageRoute,
      },
      {
        label: "Start Date",
        value: medAdmin.effectivePeriod.start,
      },
      {
        label: "End Date",
        value: medAdmin.effectivePeriod.end,
      },
    ],
  };
}
