import { CTWRequestContext } from "@/components/core/ctw-context";
import { PatientModel } from "@/fhir/models/patient";
import { errorResponse } from "@/utils/errors";
import { SearchParams } from "fhir-kit-client";
import { getIncludedResources } from "./bundle";
import { searchBuilderRecords } from "./search-helpers";

export async function getBuilderFhirPatient(
  requestContext: CTWRequestContext,
  patientID: string,
  systemURL: string,
  searchParams?: SearchParams
): Promise<PatientModel> {
  let patients = [];
  let bundle;
  try {
    const response = await searchBuilderRecords("Patient", requestContext, {
      ...searchParams,
      identifier: `${systemURL}|${patientID}`,
      _count: 1,
      _include: "Patient:organization",
    });

    patients = response.resources;
    bundle = response.bundle;
  } catch (e) {
    throw errorResponse("Failed fetching patient", e);
  }

  if (!patients[0]) {
    throw errorResponse(
      `Failed fetching patient information for patient from patientID ${patientID} with system ${systemURL}`
    );
  }

  return new PatientModel(patients[0], getIncludedResources(bundle));
}
