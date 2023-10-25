import { getZusApiBaseUrl } from "@/api/urls";
import { CTWRequestContext, useQueryWithPatient } from "@/index";
import { errorResponse } from "@/utils/errors";
import { QUERY_KEY_PATIENT_SUBSCRIPTION } from "@/utils/query-keys";
import { ctwFetch } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

export type PackageMetaProvider = "commonwell" | "surescripts" | "bamboo" | "collective" | "quest";

export type PatientSubscription = {
  patientId: string;
  package?: {
    id: string;
    name: string;
    description: string;
    meta: PackageMeta;
  };
};

export type PackageMeta = {
  freshmakerProviders?: string[];
  initialProviders?: string[];
  recurringProvidersWithInterval?: {
    intervalDays: number;
    provider: string;
  }[];
  subscriptionProviders?: string[];
};

type PatientSubscriptionData = {
  type: string;
  id: string;
  attributes: {
    createdAt: string;
    status: string;
    practitioner: {
      npi: string;
      name: string;
      role: string;
    };
  };
  relationships: {
    package: {
      data: { id: string };
    };
  };
};

type GetPatientSubscriptionAPIResponse = {
  data: PatientSubscriptionData[];
};

type GetPackageAPIResponse = {
  type: string;
  id: string;
  attributes: {
    description: string;
    name: string;
    meta: PackageMeta;
  };
};

export async function getPatientSubscription(requestContext: CTWRequestContext, patientId: string) {
  try {
    const response = await ctwFetch(
      `${getZusApiBaseUrl(
        requestContext.env
      )}/zap-data-subscriptions/enrollment-statuses?filter[patient-id]=${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${requestContext.authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (err) {
    throw errorResponse("Failed fetching patient subscription", err);
  }
}

export async function getPackage(requestContext: CTWRequestContext, packageId: string) {
  try {
    const response = await ctwFetch(
      `${getZusApiBaseUrl(requestContext.env)}/zap-data-subscriptions/packages/${packageId}`,
      {
        headers: {
          Authorization: `Bearer ${requestContext.authToken}`,
        },
      }
    );

    return await response.json();
  } catch (err) {
    throw errorResponse("Failed fetching packages", err);
  }
}

export function usePatientSubscription() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_SUBSCRIPTION,
    [],
    async (requestContext, patient) => {
      try {
        const patientSubscriptionResponse = (await getPatientSubscription(
          requestContext,
          patient.id
        )) as GetPatientSubscriptionAPIResponse;

        const patientSubscription = {
          patientId: patient.id,
        } as PatientSubscription;

        if (patientSubscriptionResponse.data.length === 0) {
          return patientSubscription;
        }

        const packageId = patientSubscriptionResponse.data[0].relationships.package.data.id;

        const zusPackage = (await getPackage(requestContext, packageId)) as GetPackageAPIResponse;

        patientSubscription.package = {
          id: packageId,
          description: zusPackage.attributes.description,
          name: zusPackage.attributes.name,
          meta: zusPackage.attributes.meta,
        };

        return patientSubscription;
      } catch (e) {
        Telemetry.logError(e as Error, "Failed fetching patient history details");
        throw new Error(`Failed fetching patient history details for patient: ${e}`);
      }
    }
  );
}
