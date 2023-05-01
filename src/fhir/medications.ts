import type { FhirResource, MedicationStatement } from "fhir/r4";
import { useEffect, useState } from "react";
import { bundleToResourceMap, getIncludedResources, getMergedIncludedResources } from "./bundle";
import { getIdentifyingRxNormCode } from "./medication";
import { MedicationDispenseModel } from "./models";
import { MedicationRequestModel } from "./models/medication-request";
import {
  searchAllRecords,
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords,
  SearchReturn,
  searchSummaryRecords,
} from "./search-helpers";
import {
  CTW_EXTENSION_LENS_AGGREGATED_FROM,
  LENS_EXTENSION_AGGREGATED_FROM,
  LENS_EXTENSION_MEDICATION_DAYS_SUPPLY,
  LENS_EXTENSION_MEDICATION_LAST_FILL_DATE,
  LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE,
  LENS_EXTENSION_MEDICATION_LAST_PRESCRIBER,
  LENS_EXTENSION_MEDICATION_QUANTITY,
  LENS_EXTENSION_MEDICATION_REFILLS,
  SYSTEM_RXNORM,
  SYSTEM_ZUS_UNIVERSAL_ID,
} from "./system-urls";
import { ResourceTypeString } from "./types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { MedicationModel } from "@/fhir/models/medication";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { PatientModel } from "@/fhir/models/patient";
import { errorResponse } from "@/utils/errors";
import { cloneDeep, uniqWith } from "@/utils/nodash";
import {
  compact,
  filter,
  find,
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
} from "@/utils/nodash/fp";
import { QUERY_KEY_MEDICATION_HISTORY } from "@/utils/query-keys";
import { sort } from "@/utils/sort";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

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

export type MedicationResults = {
  bundle: fhir4.Bundle;
  medications: fhir4.MedicationStatement[];
};

const omitClientFilters = omit(["informationSourceNot", "informationSource"]);

function applySearchFiltersToResponse(
  response: SearchReturn<"MedicationStatement">,
  searchFilters: MedicationFilter = {},
  removeMedsWithNoRxNorm = false
) {
  let medications = removeMedsWithNoRxNorm
    ? filterMedicationsWithNoRxNorms(response.resources, response.bundle)
    : response.resources;

  if (searchFilters.informationSource) {
    medications = medications.filter(
      (medication) => medication.informationSource?.type === searchFilters.informationSource
    );
  }

  if (searchFilters.informationSourceNot) {
    medications = medications.filter(
      (medication) => medication.informationSource?.type !== searchFilters.informationSourceNot
    );
  }

  return medications;
}

/* Note when filtering the bundle may contain data that will no longer be in the returned medications. */
export async function getBuilderMedications(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: object[] = []
): Promise<MedicationResults> {
  const [searchFilters = {}] = keys;

  try {
    const response = await searchBuilderRecords("MedicationStatement", requestContext, {
      patientUPID: patient.UPID,
      _include: "MedicationStatement:medication",
      ...omitClientFilters(searchFilters),
    });

    const medications = applySearchFiltersToResponse(response, searchFilters, false);

    return { bundle: response.bundle, medications };
  } catch (e) {
    throw errorResponse("Failed fetching medications for patient", e);
  }
}

export async function getCommonMedicationRequests(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: object[] = []
) {
  const [searchFilters = {}] = keys;

  try {
    const { bundle, resources } = await searchCommonRecords("MedicationRequest", requestContext, {
      patientUPID: patient.UPID,
      ...omitClientFilters(searchFilters),
    });

    return resources.map((r) => new MedicationRequestModel(r, getIncludedResources(bundle)));
  } catch (e) {
    throw errorResponse("Failed fetching medication requests for patient", e);
  }
}

export async function getCommonMedicationDispenses(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: object[] = []
) {
  const [searchFilters = {}] = keys;

  try {
    const { bundle, resources } = await searchCommonRecords("MedicationDispense", requestContext, {
      patientUPID: patient.UPID,
      ...omitClientFilters(searchFilters),
      _include: ["MedicationRequest:medication", "MedicationDispense:performer"],
    });

    return resources.map((r) => new MedicationDispenseModel(r, getIncludedResources(bundle)));
  } catch (e) {
    throw errorResponse("Failed fetching medication dispenses for patient", e);
  }
}

export async function getMedicationStatements(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: (string | undefined)[] = []
) {
  const [rxNorm] = keys;
  if (!rxNorm) {
    return [];
  }
  try {
    const { bundle, resources } = await searchSummaryRecords(
      "MedicationStatement",
      requestContext,
      {
        patientUPID: patient.UPID,
        code: `${SYSTEM_RXNORM}|${rxNorm}`,
      }
    );

    return resources.map((r) => new MedicationStatementModel(r, getIncludedResources(bundle)));
  } catch (e) {
    throw errorResponse("Failed fetching medication statements for patient", e);
  }
}

/* Note when filtering the bundle may contain data that will no longer 
be in the returned medications, such as medications with no RxNorm code. */
export async function getActiveMedications(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: Record<string, string>[] = []
): Promise<MedicationResults> {
  const [searchFilters = {}] = keys;

  try {
    const sendMetric = Telemetry.timeMetric("req.active_medications");
    const response = await searchLensRecords(
      "MedicationStatement",
      requestContext,
      "ActiveMedications",
      {
        patientUPID: patient.UPID,
        _include: "MedicationStatement:medication",
        ...omitClientFilters(searchFilters),
      }
    );

    const medications = applySearchFiltersToResponse(response, searchFilters, true);

    sendMetric();
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
  return medications.filter((m) => getIdentifyingRxNormCode(m, resourceMap) !== undefined);
}

// Splits medications into those that the builder already knows about ("Provider Medications"),
// those that they do not know about ("Other Provider Medications"), and those they didn't know
// about originally and then dismissed ("Dismissed Other Provider Medications").
export function splitMedications(
  summarizedMedications: MedicationStatementModel[],
  builderOwnedMedications: MedicationStatementModel[]
) {
  // Get active medications where there does not exist a matching builder owned record.
  const otherProviderMedications = summarizedMedications.filter(
    (medication) =>
      !builderOwnedMedications.some((builderMed) => builderMed.rxNorm === medication.rxNorm)
  );

  // Get builder owned medications and splash in some data from lens meds if available.
  const builderMedications = builderOwnedMedications.map((m) => {
    const summarizedMed = find((a) => a.rxNorm === m.rxNorm, summarizedMedications);

    if (!summarizedMed) {
      return m;
    }

    // If we did find an active med then copy the builder med and add in the lens extensions.
    const builderMedResource = cloneDeep(m.resource);

    const LENS_MEDICATION_EXTENSIONS = [
      LENS_EXTENSION_MEDICATION_LAST_FILL_DATE,
      LENS_EXTENSION_MEDICATION_LAST_PRESCRIBED_DATE,
      LENS_EXTENSION_MEDICATION_QUANTITY,
      LENS_EXTENSION_MEDICATION_DAYS_SUPPLY,
      LENS_EXTENSION_MEDICATION_REFILLS,
      LENS_EXTENSION_MEDICATION_LAST_PRESCRIBER,
    ];

    builderMedResource.extension = summarizedMed.resource.extension?.filter((x) =>
      LENS_MEDICATION_EXTENSIONS.includes(x.url)
    );

    const medHistory = cloneDeep(
      find({ url: LENS_EXTENSION_AGGREGATED_FROM }, summarizedMed.resource.extension)
    );
    if (medHistory) {
      // To avoid confusion about the lens extension (since "aggregated from" doesn't really
      // make sense on this builder record), use a different extension URL.
      medHistory.url = CTW_EXTENSION_LENS_AGGREGATED_FROM;
      builderMedResource.extension?.push(medHistory);
    }

    return new MedicationStatementModel(builderMedResource, m.includedResources, m.revIncludes);
  });

  return {
    builderMedications,
    otherProviderMedications,
  };
}

export function useMedicationHistory(medication?: fhir4.MedicationStatement) {
  const aggregatedFromReferences = !medication
    ? []
    : new MedicationStatementModel(medication).aggregatedFrom;

  const getRefId = pipe(get("reference"), split("/"), last);
  const resources = pipe(groupBy(get("type")), mapValues(map(getRefId)))(aggregatedFromReferences);

  return useQueryWithPatient(
    QUERY_KEY_MEDICATION_HISTORY,
    [medication?.id || "empty"],
    withTimerMetric(async (requestContext, patient) => {
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
            patient.UPID,
            resources.MedicationStatement
          ),
          searchWrapper(
            "MedicationAdministration",
            requestContext,
            patient.UPID,
            resources.MedicationAdministration
          ),
          searchWrapper(
            "MedicationRequest",
            requestContext,
            patient.UPID,
            resources.MedicationRequest,
            ["MedicationRequest:requester"]
          ),
          searchWrapper(
            "MedicationDispense",
            requestContext,
            patient.UPID,
            resources.MedicationDispense,
            ["MedicationDispense:performer", "MedicationDispense:prescription"]
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
            (a, b) => a.date === b.date && a.resource.resourceType === b.resource.resourceType
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
    }, "req.medication_history")
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
  const historyQuery = useMedicationHistory(medication);

  useEffect(() => {
    const { includedResources = {}, medications = [] } = historyQuery.data || {};

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
    }
  }, [lastPrescriber, historyQuery.data]);

  return { isLoading: historyQuery.isFetching, lastPrescriber };
}

type NoopSearchResults = { resources: []; bundle: undefined };
function searchWrapper<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  patientUPID: string,
  ids: string[] = [],
  included: string[] = []
): Promise<SearchReturn<T>> | NoopSearchResults {
  if (ids.length > 0) {
    return searchAllRecords(resourceType, requestContext, {
      _id: ids.join(","),
      _include: [`${resourceType}:patient`, `${resourceType}:medication`, ...included],
      "_include:iterate": "Patient:organization",
      // UPID required as a query param to engage "CPR mode" and provide access to other builder's data.
      // TODO: However, the CPR query will not run correctly if the Zus-Account header is set, thus
      // this is incompatible with our current builder selector.
      "patient.identifier": `${SYSTEM_ZUS_UNIVERSAL_ID}|${patientUPID}`,
    });
  }
  return { resources: [], bundle: undefined };
}
