import { QueryFunctionContext } from "@tanstack/react-query";
import { getBuilderFhirPatient } from "./patient-helper";
import { Tag } from "./types";
import { getFhirClientFromQuery } from "./utils";

export type QueryKeyPatient = [string, string, string, Tag[] | undefined];

export async function getPatient(
  queryParams: QueryFunctionContext<QueryKeyPatient>
) {
  const { meta, queryKey } = queryParams;
  const fhirClient = getFhirClientFromQuery(meta);
  const [_, patientID, systemURL, tags] = queryKey;

  try {
    const response = await getBuilderFhirPatient(
      fhirClient,
      patientID,
      systemURL,
      { _tag: tags?.map((tag) => `${tag.system}|${tag.code}`) ?? [] }
    );
    return response;
  } catch (e) {
    throw new Error(
      `Failed fetching patient information for patient: ${patientID} and system: ${systemURL}`
    );
  }
}
