import { compact } from "lodash/fp";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { usePatient } from "@/components/core/patient-provider";
import { useFhirClientRef } from "@/fhir/utils";
import {
  getBuilderMedications,
  getPatientLensMedications,
} from "@/fhir/medications";
import type { MedicationBuilder } from "@/fhir/medications";

export function useQueryPatientMeds(
  statusParam = ""
): UseQueryResult<MedicationBuilder, unknown> {
  const fhirClientRef = useFhirClientRef();
  const patient = usePatient();

  const queryKey = compact(["patient-medications", statusParam || null]).join(
    "-"
  );
  return useQuery(
    [
      queryKey,
      patient.data?.UPID,
      {
        informationSource: "Patient",
        ...(statusParam === "active" && { status: "active" }),
      },
    ],
    getBuilderMedications,
    {
      enabled: !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );
}

export function useQueryPatientLensMeds(): UseQueryResult<
  MedicationBuilder,
  unknown
> {
  const fhirClientRef = useFhirClientRef();
  const patient = usePatient();

  return useQuery(
    ["patient-medications-lens", patient.data?.UPID, {}],
    getPatientLensMedications,
    {
      enabled: !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );
}
