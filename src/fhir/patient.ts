import { QueryFunctionContext } from "@tanstack/react-query";
import { getBuilderFhirPatient } from "./patient-helper";
import { getFhirClientFromQuery } from "./utils";

export type QueryKeyPatient = [string, string, string];

export async function getPatient(
  queryParams: QueryFunctionContext<QueryKeyPatient>
) {
  const { meta, queryKey } = queryParams;
  const fhirClient = getFhirClientFromQuery(meta);
  const [_, patientID, systemURL] = queryKey;

  try {
    return await getBuilderFhirPatient(
      fhirClient,
      patientID,
      systemURL
    );
  } catch (e) {
    throw new Error(
      `Failed fetching patient information for patient: ${patientID} and system: ${systemURL}`
    );
  }
}
