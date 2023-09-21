import { HistoryEntries } from "../../resource/helpers/history";
import { HistoryEntryProps } from "@/components/content/resource/helpers/history-entry";
import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/fhir/models/medication";
import { MedicationAdministrationModel } from "@/fhir/models/medication-administration";
import { MedicationDispenseModel } from "@/fhir/models/medication-dispense";
import { MedicationRequestModel } from "@/fhir/models/medication-request";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { capitalize, compact } from "@/utils/nodash";
import { UseQueryResultBasic } from "@/utils/request";

export function useMedicationHistoryEntries(
  medication: MedicationStatementModel
): UseQueryResultBasic<HistoryEntries | undefined> {
  const medHistoryQuery = useMedicationHistory(medication.resource);
  return {
    data: medHistoryQuery.data?.medications.map(createMedicationDetailsCard),
    isLoading: medHistoryQuery.isLoading,
  };
}

function createMedicationDetailsCard(medication: MedicationModel): HistoryEntryProps {
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

  throw new Error(`Unknown medication resource type "${medication.resourceType}"`);
}

function createMedicationStatementCard(medication: MedicationModel): HistoryEntryProps {
  const resource = medication.resource as fhir4.MedicationStatement;
  const medStatement = new MedicationStatementModel(resource, medication.includedResources);

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

function createMedicationRequestCard(medication: MedicationModel): HistoryEntryProps {
  const resource = medication.resource as fhir4.MedicationRequest;
  const { prescriber } = medication;
  const { name, address, telecom } = new MedicationRequestModel(
    resource,
    medication.includedResources
  ).pharmacy;
  const { numberOfRepeatsAllowed = "", initialFill } = resource.dispenseRequest || {};
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

function createMedicationDispenseCard(medication: MedicationModel): HistoryEntryProps {
  const resource = medication.resource as fhir4.MedicationDispense;
  const medDispense = new MedicationDispenseModel(resource, medication.includedResources);

  const { quantityDisplay, supplied, performerDetails } = medDispense;
  const { name, address, telecom } = performerDetails;

  return {
    date: medication.dateLocal,
    hideEmpty: false,
    id: medication.id,
    title: "Medication Filled",
    subtitle: compact([quantityDisplay, supplied ? `${supplied} supplied` : null]).join(", "),
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

function createMedicationAdminCard(medication: MedicationModel): HistoryEntryProps {
  const resource = medication.resource as fhir4.MedicationAdministration;
  const medAdmin = new MedicationAdministrationModel(resource, medication.includedResources);

  return {
    id: medication.id,
    date: medication.dateLocal,
    hideEmpty: false,
    title: "Medication Administered",
    subtitle: compact([medAdmin.dosageDisplay, medAdmin.dosageRoute]).join(", "),
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
