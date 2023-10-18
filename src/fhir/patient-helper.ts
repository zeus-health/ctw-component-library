import { SearchParams } from "fhir-kit-client";
import { getIncludedResources } from "./bundle";
import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { PatientModel } from "@/fhir/models/patient";
import { errorResponse } from "@/utils/errors";
import { pickBy } from "@/utils/nodash";
import { hasNumber } from "@/utils/types";
import { QUERY_KEY_MATCHED_PATIENTS, QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";
import { MAX_OBJECTS_PER_REQUEST, createGraphqlClient, fqsRequest, useQueryWithPatient } from "..";
import {
  PatientGraphqlResponse,
  patientsForBuilderQuery,
  patientsForUPIDQuery,
} from "@/services/fqs/queries/patients";

export function useMatchedPatients() {
  const matchedPatientsQuery = useQueryWithPatient(
    QUERY_KEY_MATCHED_PATIENTS,
    [],
    withTimerMetric(getPatientsForUPIDFQS(), "req.timing.matched_patients")
  );

  return matchedPatientsQuery;
}

function getPatientsForUPIDFQS() {
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const graphClient = createGraphqlClient(requestContext);
      const { data } = await fqsRequest<PatientGraphqlResponse>(graphClient, patientsForUPIDQuery, {
        upid: patient.UPID,
        cursor: "",
        first: MAX_OBJECTS_PER_REQUEST,
        sort: {
          lastUpdated: "DESC",
        },
      });
      return data.PatientConnection.edges.map((x) => new PatientModel(x.node));
    } catch (e) {
      throw new Error(`Failed fetching patients: ${e}`);
    }
  };
}

export async function getPatientsForBuilder(
  requestContext: CTWRequestContext,
  first: number,
  cursor?: string
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<PatientGraphqlResponse>(
      graphClient,
      patientsForBuilderQuery,
      {
        builderID: requestContext.builderId,
        cursor: cursor ?? "",
        first: first,
        sort: {
          lastUpdated: "DESC",
        },
      }
    );
    return data.PatientConnection.edges.map((x) => new PatientModel(x.node));
  } catch (e) {
    throw new Error(`Failed fetching patients: ${e}`);
  }
}

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

type GetPatientsTableResults = {
  patients: PatientModel[];
  searchParams: SearchParams;
  total: number;
};

export async function getBuilderPatientListWithSearch(
  requestContext: CTWRequestContext,
  paginationOptions: (number | string | undefined)[] = []
): Promise<Omit<GetPatientsTableResults, "total">> {
  const [pageSize, pageOffset, searchValue] = paginationOptions;
  const offset = parseInt(`${pageOffset ?? "0"}`, 10) * parseInt(`${pageSize ?? "1"}`, 10);

  const searchParams = pickBy({
    _count: pageSize,

    _offset: offset,
    ...(hasNumber(searchValue) ? { identifier: searchValue } : { name: searchValue }),
  }) as SearchParams;

  try {
    const { resources } = await searchBuilderRecords("Patient", requestContext, searchParams);

    return {
      searchParams,
      patients: resources.map((patient) => new PatientModel(patient)),
    };
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

export async function getBuilderPatientsList(
  requestContext: CTWRequestContext,
  paginationOptions: (number | string | undefined)[] = []
): Promise<GetPatientsTableResults> {
  const [pageSize, pageOffset, searchValue] = paginationOptions;
  const offset = parseInt(`${pageOffset ?? "0"}`, 10) * parseInt(`${pageSize ?? "1"}`, 10);

  const searchParams = pickBy({
    _count: pageSize,
    _total: "accurate",
    _offset: offset,
    _sort: "family",
    ...(hasNumber(searchValue) ? { identifier: searchValue } : { name: searchValue }),
  }) as SearchParams;

  try {
    const { total, resources } = await searchBuilderRecords(
      "Patient",
      requestContext,
      searchParams
    );

    return {
      searchParams,
      patients: resources.map((patient) => new PatientModel(patient)),
      total,
    };
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

export async function getBuilderPatientsListByIdentifier(
  requestContext: CTWRequestContext,
  paginationOptions: (number | string | undefined)[] = [],
  identifiers: string[] = []
): Promise<GetPatientsTableResults> {
  const [pageSize, pageOffset] = paginationOptions;
  const offset = parseInt(`${pageOffset ?? "0"}`, 10) * parseInt(`${pageSize ?? "1"}`, 10);

  const searchParams = pickBy({
    _id: identifiers.join(","),
    _count: pageSize,
    _total: "accurate",
    _offset: offset,
  }) as SearchParams;

  try {
    const { total, resources } = await searchBuilderRecords(
      "Patient",
      requestContext,
      searchParams
    );

    return {
      searchParams,
      patients: resources.map((patient) => new PatientModel(patient)),
      total,
    };
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}
