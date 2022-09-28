import { PatientModel } from "@/models/patients";
import { errorResponse } from "@/utils/errors";
import Client from "fhir-kit-client";
import { getIncludedResources } from "./bundle";
import { searchBuilderRecords } from "./search-helpers";

export async function getBuilderFhirPatient(
  fhirClient: Client,
  patientID: string,
  systemURL: string
): Promise<PatientModel> {
  let patients = [];
  let bundle;
  try {
    const response = await searchBuilderRecords("Patient", fhirClient, {
      identifier: `${systemURL}|${patientID}`,
      _count: 1,
      _include: "Patient:organization",
    });

    patients = response.resources;
    bundle = response.bundle;
    console.log("response", response);
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
