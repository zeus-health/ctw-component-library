import { SearchParams } from "fhir-kit-client";
import { GraphQLClient } from "graphql-request";
import { getIncludedResources } from "./bundle";
import { PatientModel } from "./models";
import { searchBuilderRecords } from "./search-helpers";
import {
  createGraphqlClient,
  CTWRequestContext,
  fqsRequest,
  GraphqlPageInfo,
  useQueryWithCTW
} from "..";
import { PatientGraphqlResponse, patientsForBuilderQuery } from "@/services/fqs/queries/patients";
import { errorResponse } from "@/utils/errors";
import { pickBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENTS_LIST } from "@/utils/query-keys";
import { hasNumber } from "@/utils/types";

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
      _include: "Patient:organization"
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

export function usePatientsList(pageSize: number, cursor: string) {
  return useQueryWithCTW(QUERY_KEY_PATIENTS_LIST, [pageSize, cursor], getBuilderPatientsList);
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
    ...(hasNumber(searchValue) ? { identifier: searchValue } : { name: searchValue })
  }) as SearchParams;

  try {
    const { resources } = await searchBuilderRecords("Patient", requestContext, searchParams);

    return {
      searchParams,
      patients: resources.map((patient) => new PatientModel(patient))
    };
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}

async function accumulatePatientsResult(
  requestContext: CTWRequestContext,
  graphClient: GraphQLClient,
  patients: PatientModel[],
  cursor: string,
  pageSize: number,
  iterations = 0
) {
  const { data } = await fqsRequest<PatientGraphqlResponse>(graphClient, patientsForBuilderQuery, {
    builderID: requestContext.builderId,
    cursor,
    first: pageSize,
    sort: {
      lastUpdated: "DESC"
    }
  });
  const models = data.PatientConnection.edges.map((x) => new PatientModel(x.node));
  const firstPartyModels = models.filter(
    (model) => model.ownedByBuilder(requestContext.builderId) && !model.isThirdPartyData
  );
  patients.push(...firstPartyModels);
  if (
    patients.length < pageSize &&
    data.PatientConnection.pageInfo.hasNextPage &&
    iterations < 10
  ) {
    return accumulatePatientsResult(
      requestContext,
      graphClient,
      patients,
      data.PatientConnection.pageInfo.endCursor ?? "",
      pageSize,
      iterations + 1
    );
  }
  return { patients, pageInfo: data.PatientConnection.pageInfo };
}

export async function getBuilderPatientsList(
  requestContext: CTWRequestContext,
  paginationOptions: (number | string | undefined)[] = []
): Promise<GetPatientsTableResultsFQS> {
  const [pageSize, cursor] = paginationOptions;
  try {
    const graphClient = createGraphqlClient(requestContext);
    return accumulatePatientsResult(
      requestContext,
      graphClient,
      [],
      cursor as string,
      pageSize as number
    );
  } catch (e) {
    throw new Error(`Failed fetching patients: ${e}`);
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
    _offset: offset
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
      total
    };
  } catch (e) {
    throw errorResponse("Failed fetching patients", e);
  }
}
