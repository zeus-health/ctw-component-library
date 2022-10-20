import { capitalize } from "lodash";
import { useContext, useEffect, useState } from "react";
import { MedicationModel } from "@/models/medication";
import {
  CTWPatientContext,
  usePatient,
} from "@/components/core/patient-provider";
import { useFhirClientRef } from "@/fhir/utils";
import { DataListStack } from "../core/data-list-table";
import { Spinner } from "../core/spinner";
import type {
  DataListStackEntries,
  DataListStackEntry,
} from "../core/data-list-table";

const MEDICATION_HISTORY_LIMIT = 10;

export type MedicationHistoryProps = {
  rxNorm?: string;
};

export function MedicationHistory({ rxNorm }: MedicationHistoryProps) {
  const { patientID, systemURL } = useContext(CTWPatientContext);
  const fhirClientRef = useFhirClientRef();
  const patient = usePatient();
  const [medications, setMedications] = useState<DataListStackEntries>([]);
  const [loading, setLoading] = useState(true);

  const patientUPID = patient.data?.UPID;
  useEffect(() => {
    // @todo need to reimplement this without fetcher
    // if (fetcher.state === "idle" && !fetcher.data) {
    //   fetcher.load(`/patients/${patientUPID}/medications/${rxNorm}`);
    // }
  }, [patientUPID, rxNorm]);

  useEffect(() => {
    // @todo need to reimplement this without fetcher
    // const result = fetcher.data;
    // if (result && fetcher.state === "idle") {
    //   const models = result.medications.map(
    //     (medication) =>
    //       new MedicationModel(medication, result.includedResources)
    //   );
    //   setMedications(models.map((model) => setupData(model)));
    //   setLoading(false);
    // }
  }, []);

  function setupData(medication: MedicationModel): DataListStackEntry {
    return {
      id: medication.id,
      data: [
        {
          label: "Event",
          value: resourceTypeRename(medication.resourceType),
        },
        {
          label: "Status",
          value: capitalize(medication.status),
        },
        {
          label: "Date",
          value: medication.dateLocal,
        },
        { label: "Dosage", value: medication.dosage },
        {
          label: "Organization",
          value: medication.performer ?? medication.patient?.organization?.name,
        },
      ],
    };
  }

  if (!rxNorm) {
    return <div>No history found.</div>;
  }

  if (medications.length === 0) {
    return <div>History failed to load.</div>;
  }

  if (loading) {
    return (
      <div className="space-x-2">
        <span className="text-sm italic">Loading medication history...</span>
        <Spinner />
      </div>
    );
  }

  return (
    <DataListStack entries={medications} limit={MEDICATION_HISTORY_LIMIT} />
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
