import { usePatient } from "@/components/core/patient-provider";
import { useMedicationHistory } from "@/fhir/medications";
import { MedicationModel } from "@/models/medication";
import { useEffect, useState } from "react";
import {
  CollapsibleDataListEntry,
  CollapsibleDataListProps,
} from "../core/collapsible-data-list";
import { CollapsibleDataListStack } from "../core/collapsible-data-list-stack";
import { useCTW } from "../core/ctw-provider";
import { Spinner } from "../core/spinner";

const MEDICATION_HISTORY_LIMIT = 10;

export type MedicationHistoryProps = {
  rxNorm: string;
};

export function MedicationHistory({ rxNorm }: MedicationHistoryProps) {
  const patient = usePatient();
  const [medications, setMedications] = useState<CollapsibleDataListProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const patientUPID = patient.data?.UPID;
  const { getRequestContext } = useCTW();

  useEffect(() => {
    (async () => {
      const requestContext = await getRequestContext();
      const res = await useMedicationHistory(
        rxNorm,
        patientUPID || "",
        requestContext
      );
      const models = res.medications.map(
        (medication) => new MedicationModel(medication, res.includedResources)
      );
      setMedications(models.map((model) => setupData(model)));
      setLoading(false);
    })();
  }, []);

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

      const value = resource?.quantity?.value;
      const unit = resource?.quantity?.unit;
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
        value: resource.performer?.[0]?.actor?.reference,
      });
    }

    return card;
  }

  if (!rxNorm) {
    return <div>No history found.</div>;
  }

  if (loading) {
    return (
      <div className="space-x-2">
        <span className="ctw-text-sm ctw-italic">
          Loading medication history...
        </span>
        <Spinner />
      </div>
    );
  }

  if (medications.length === 0) {
    return <div>History failed to load.</div>;
  }

  return (
    <CollapsibleDataListStack
      entries={medications}
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
