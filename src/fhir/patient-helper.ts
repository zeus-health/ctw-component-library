import { SearchParams } from "fhir-kit-client";
import { getIncludedResources } from "./bundle";
import { PatientModel } from "./models";
import { searchBuilderRecords } from "./search-helpers";
import { SYSTEM_ZUS_OWNER, SYSTEM_ZUS_UPI_RECORD_TYPE } from "./system-urls";
import { useQueryWithPatient } from "..";
import { CTWRequestContext } from "../components/core/providers/ctw-context";
import { useQueryWithCTW } from "../components/core/providers/use-query-with-ctw";
import {
  createGraphqlClient,
  fqsRequest,
  GraphqlPageInfo,
  MAX_OBJECTS_PER_REQUEST,
} from "../services/fqs/client";
import {
  PatientGraphqlResponse,
  patientsForBuilderQuery,
  patientsForUPIDQuery,
} from "@/services/fqs/queries/patients";
import { errorResponse } from "@/utils/errors";
import { pickBy } from "@/utils/nodash";
import {
  QUERY_KEY_MATCHED_PATIENTS,
  QUERY_KEY_PATIENTS_LIST_FQS,
  QUERY_KEY_PATIENTS_LIST_ODS,
} from "@/utils/query-keys";
import { sort } from "@/utils/sort";
import { withTimerMetric } from "@/utils/telemetry";
import { hasNumber } from "@/utils/types";

export function useMatchedPatients() {
  const matchedPatientsQuery = useQueryWithPatient(
    QUERY_KEY_MATCHED_PATIENTS,
    [],
    withTimerMetric(
      async (requestContext: CTWRequestContext, patient: PatientModel) =>
        getPatientsForUPIDFQS(requestContext, patient, {
          tag: {
            nonematch: [`${SYSTEM_ZUS_OWNER}|builder/${requestContext.builderId}`],
          },
        }),
      "req.timing.matched_patients"
    )
  );

  return matchedPatientsQuery;
}

export async function getPatientsForUPIDFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  filter: Record<string, unknown> = {}
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<PatientGraphqlResponse>(graphClient, patientsForUPIDQuery, {
      upid: patient.UPID,
      cursor: "",
      first: MAX_OBJECTS_PER_REQUEST,
      sort: {
        lastUpdated: "DESC",
      },
      filter,
    });
    return data.PatientConnection.edges
      .filter(
        (p) =>
          !p.node.meta?.tag?.some(
            (t) => t.system === SYSTEM_ZUS_UPI_RECORD_TYPE && t.code === "universal"
          )
      )
      .map((x) => new PatientModel(x.node));
  } catch (e) {
    throw new Error(`Failed fetching patients: ${e}`);
  }
}

// Returns a single FHIR patient given a patientID and systemURL.
// If multiple patients are found then it returns the last updated.
export async function getBuilderFhirPatientByExternalIdentifier(
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

  return new PatientModel(
    sort(patients, "meta.lastUpdated", "desc", true)[0],
    getIncludedResources(bundle)
  );
}

export async function getPatientByID(
  requestContext: CTWRequestContext,
  patientID: string
): Promise<PatientModel> {
  const response = await requestContext.fhirClient.read({
    resourceType: "Patient",
    id: patientID,
  });

  return new PatientModel(response as fhir4.Patient);
}

export function usePatientsListFQS(pageSize: number, cursor: string) {
  return useQueryWithCTW(
    QUERY_KEY_PATIENTS_LIST_FQS,
    [pageSize, cursor],
    getBuilderPatientsListFQS
  );
}

export function usePatientsListODS(pageSize: number, pageOffset: number, searchNameValue?: string) {
  return useQueryWithCTW(
    QUERY_KEY_PATIENTS_LIST_ODS,
    [pageSize, pageOffset, searchNameValue],
    getBuilderPatientsListODS
  );
}

type GetPatientsTableResultsODS = {
  patients: PatientModel[];
  searchParams: SearchParams;
  total: number;
};

type GetPatientsTableResultsFQS = {
  patients: PatientModel[];
  pageInfo: GraphqlPageInfo;
};

export async function getBuilderPatientListWithSearch(
  requestContext: CTWRequestContext,
  paginationOptions: (number | string | undefined)[] = []
): Promise<Omit<GetPatientsTableResultsODS, "total">> {
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

export async function getBuilderPatientsListFQS(
  requestContext: CTWRequestContext,
  paginationOptions: (number | string | undefined)[] = []
): Promise<GetPatientsTableResultsFQS> {
  const [pageSize, cursor] = paginationOptions;
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<PatientGraphqlResponse>(
      graphClient,
      patientsForBuilderQuery,
      {
        builderID: requestContext.builderId,
        cursor,
        first: pageSize,
        sort: {
          lastUpdated: "DESC",
        },
        filter: {
          tag: {
            nonematch: ["https://zusapi.com/thirdparty/source"],
          },
        },
      }
    );
    const models = data.PatientConnection.edges.map((x) => new PatientModel(x.node));
    return {
      patients: models,
      pageInfo: data.PatientConnection.pageInfo,
    };
  } catch (e) {
    throw new Error(`Failed fetching patients: ${e}`);
  }
}

export async function getBuilderPatientsListODS(
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
): Promise<GetPatientsTableResultsODS> {
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

type GetPatientsTableResults = {
  patients: PatientModel[];
  searchParams: SearchParams;
  total: number;
};
