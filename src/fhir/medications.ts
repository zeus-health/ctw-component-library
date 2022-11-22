import { CTWRequestContext } from "@/components/core/ctw-context";
import { useQueryWithPatient } from "@/components/core/patient-provider";
import { MedicationModel } from "@/fhir/models/medication";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { PatientModel } from "@/fhir/models/patient";
import { errorResponse } from "@/utils/errors";
import { QUERY_KEY_MEDICATION_HISTORY } from "@/utils/query-keys";
import { sort } from "@/utils/sort";
import type { FhirResource, MedicationStatement } from "fhir/r4";
import { uniqWith } from "lodash";
import {
  compact,
  filter,
  get,
  groupBy,
  last,
  map,
  mapValues,
  omit,
  pipe,
  propEq,
  sortBy,
  split,
} from "lodash/fp";
import { useEffect, useState } from "react";
import { bundleToResourceMap, getMergedIncludedResources } from "./bundle";
import { getIdentifyingRxNormCode } from "./medication";
import {
  searchAllRecords,
  searchBuilderRecords,
  searchLensRecords,
  SearchReturn,
} from "./search-helpers";
import { ResourceMap, ResourceTypeString } from "./types";

export type InformationSource =
  | "Patient"
  | "Practitioner"
  | "PractitionerRole"
  | "RelatedPerson"
  | "Organization";

type MedicationFilter = {
  status?: fhir4.MedicationStatement["status"];
  informationSource?: InformationSource;
  informationSourceNot?: InformationSource;
};

export type MedicationBuilder = {
  bundle: fhir4.Bundle;
  medications: fhir4.MedicationStatement[];
};

const omitClientFilters = omit(["informationSourceNot", "informationSource"]);

function applySearchFiltersToResponse(
  response: SearchReturn<"MedicationStatement">,
  searchFilters: MedicationFilter = {}
) {
  let medications = filterMedicationsWithNoRxNorms(
    response.resources,
    response.bundle
  );

  if (searchFilters.informationSource) {
    medications = medications.filter(
      (medication) =>
        medication.informationSource?.type === searchFilters.informationSource
    );
  }

  if (searchFilters.informationSourceNot) {
    medications = medications.filter(
      (medication) =>
        medication.informationSource?.type !==
        searchFilters.informationSourceNot
    );
  }

  return medications;
}

/* Note when filtering the bundle may contain data that will no longer be in the returned medications. */
export async function getBuilderMedications(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: object[] = []
): Promise<MedicationBuilder> {
  const [searchFilters = {}] = keys;

  try {
    const response = await searchBuilderRecords(
      "MedicationStatement",
      requestContext,
      {
        patientUPID: patient.UPID as string,
        _include: "MedicationStatement:medication",
        ...omitClientFilters(searchFilters),
      }
    );

    const medications = applySearchFiltersToResponse(response, searchFilters);

    return { bundle: response.bundle, medications };
  } catch (e) {
    throw errorResponse("Failed fetching medications for patient", e);
  }
}

/* Note when filtering the bundle may contain data that will no longer be in the returned medications. */
export async function getActiveMedications(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys = []
): Promise<MedicationBuilder> {
  const [searchFilters = {}] = keys;

  try {
    const response = await searchLensRecords(
      "MedicationStatement",
      requestContext,
      "ActiveMedications",
      {
        patientUPID: patient.UPID as string,
        _include: "MedicationStatement:medication",
        ...omitClientFilters(searchFilters),
      }
    );

    const medications = applySearchFiltersToResponse(response, searchFilters);

    return { bundle: response.bundle, medications };
  } catch (e) {
    throw errorResponse("Failed fetching medications for patient", e);
  }
}

// Helper function to filter out medications missing RxNorm codes.
export function filterMedicationsWithNoRxNorms(
  medications: MedicationStatement[],
  bundle: FhirResource
) {
  const resourceMap = bundleToResourceMap(bundle);
  return medications.filter(
    (m) => getIdentifyingRxNormCode(m, resourceMap) !== undefined
  );
}

// Splits summarized medications into those that the builder already knows about ("Provider Medications")
// and those that they do not know about ("Other Provider Medications").
export function splitSummarizedMedications(
  summarizedMedications: MedicationStatement[],
  builderOwnedMedications: MedicationStatement[],
  includedResources?: ResourceMap
) {
  const builderMedications: MedicationStatement[] = [];
  const otherProviderMedications: MedicationStatement[] = [];
  const splitData = summarizedMedications.reduce(
    (sd, summaryMed) => {
      sd[
        builderOwnedMedications.some(
          (builderMed) =>
            getIdentifyingRxNormCode(builderMed, includedResources) ===
            getIdentifyingRxNormCode(summaryMed, includedResources)
        )
          ? "builderMedications"
          : "otherProviderMedications"
      ].push(summaryMed);
      return sd;
    },
    { builderMedications, otherProviderMedications }
  );
  return splitData;
}

export function useMedicationHistory(medication?: fhir4.MedicationStatement) {
  const aggregatedFromReferences = !medication
    ? []
    : new MedicationStatementModel(medication).aggregatedFrom;

  const getRefId = pipe(get("reference"), split("/"), last);
  const resources = pipe(
    groupBy(get("type")),
    mapValues(map(getRefId))
  )(aggregatedFromReferences);

  return useQueryWithPatient(
    QUERY_KEY_MEDICATION_HISTORY,
    [medication?.id || "empty"],
    async (requestContext, patient) => {
      try {
        if (!medication) {
          return {
            includedResources: {},
            medications: [],
          };
        }
        const [
          medicationStatementResponse,
          medicationAdministrationResponse,
          medicationRequestResponse,
          medicationDispenseResponse,
        ] = await Promise.all([
          searchWrapper(
            "MedicationStatement",
            requestContext,
            resources.MedicationStatement
          ),
          searchWrapper(
            "MedicationAdministration",
            requestContext,
            resources.MedicationAdministration
          ),
          searchWrapper(
            "MedicationRequest",
            requestContext,
            resources.MedicationRequest,
            ["MedicationRequest:requester"]
          ),
          searchWrapper(
            "MedicationDispense",
            requestContext,
            resources.MedicationDispense,
            ["MedicationDispense:performer"]
          ),
        ]);

        const includedResources = getMergedIncludedResources(
          compact([
            medicationStatementResponse.bundle,
            medicationAdministrationResponse.bundle,
            medicationRequestResponse.bundle,
            medicationDispenseResponse.bundle,
          ])
        );

        const medicationResources = compact([
          ...medicationStatementResponse.resources,
          ...medicationAdministrationResponse.resources,
          ...medicationRequestResponse.resources,
          ...medicationDispenseResponse.resources,
        ]).map((m) => new MedicationModel(m, includedResources));

        const medications = sort(
          uniqWith(
            medicationResources,
            (a, b) =>
              a.date === b.date &&
              a.resource.resourceType === b.resource.resourceType
          ),
          "date",
          "desc",
          true
        );

        return { medications, includedResources };
      } catch (e) {
        throw new Error(
          `Failed fetching medication history for medication ${medication?.id}: ${e}`
        );
      }
    }
  );
}

/**
 * Currently MedicationStatements don't have lens data with the lastPrescriber
 * reliably populated. We are instead getting that information from the meds
 * history and reusing the `useMedicationHistory` query to avoid making extra
 * ODS requests (as the history ui and details ui are always together atm).
 */
export function useLastPrescriber(medication?: fhir4.MedicationStatement) {
  const [lastPrescriber, setLastPrescriber] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const historyQuery = useMedicationHistory(medication);

  useEffect(() => {
    const { includedResources = {}, medications = [] } =
      historyQuery.data || {};

    if (lastPrescriber === undefined && medications.length) {
      const prescriber = pipe(
        // 1. Get underlying resources from the medication models.
        map(get("resource")),
        // 2. Throw away any resources that are not MedicationRequests.
        filter(propEq("resourceType", "MedicationRequest")),
        // 3. Sort by the authored on date.
        sortBy((m) => Date.parse(m.authoredOn)),
        // 4. If there are med dispense records, make them models.
        map((mr) => new MedicationModel(mr, includedResources)),
        // 5. Take the last (latest) from our filtered list.
        last,
        // 6. Get the prescriber from the medication model.
        get("prescriber")
      )(medications);

      // Fall back to a string, so we don't try to find prescriber again.
      setLastPrescriber(prescriber || "");
      setIsLoading(false);
    }
  }, [lastPrescriber, historyQuery.data]);

  return { isLoading, lastPrescriber };
}

type NoopSearchResults = { resources: []; bundle: undefined };
function searchWrapper<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  ids: string[] = [],
  included: string[] = []
): Promise<SearchReturn<T>> | NoopSearchResults {
  if (ids.length > 0) {
    return searchAllRecords(resourceType, requestContext, {
      _id: ids.join(","),
      _include: [
        `${resourceType}:patient`,
        `${resourceType}:medication`,
        ...included,
      ],
      "_include:iterate": "Patient:organization",
    });
  }
  return { resources: [], bundle: undefined };
}
