import i18next from "i18next";
import { Loading } from "@/components/core/loading";
import { ErrorAlert, usePatient } from "@/index";
import {
  PatientSubscription,
  usePatientSubscription,
} from "@/services/subscriptions/subscriptions";
import { compact, uniq } from "@/utils/nodash";

export const PatientSubscriptionDetails = () => {
  const patientSubscription = usePatientSubscription();
  const patient = usePatient();

  if (patientSubscription.isLoading || patient.isLoading) {
    return <Loading />;
  }

  if (patientSubscription.isError || patient.isError) {
    return <ErrorAlert header="Error loading data" />;
  }

  if (!patientSubscription.data.package) {
    return (
      <>
        <span className="ctw-font-medium">{patient.data.display}</span> is not enrolled for any
        automatic data updates. You must make ad-hoc requests for outside data. Please reach out to
        your admin to enroll this patient.
      </>
    );
  }

  const dataSources = getDataSources(patientSubscription.data);

  return (
    <>
      <div>
        <span className="ctw-font-medium">{patient.data.display}</span> is enrolled in{" "}
        <span className="ctw-font-medium">{patientSubscription.data.package.name}</span>
      </div>
      <div className="ctw-pt-3">This provides access to the following data:</div>
      <ul className="ctw-mx-0 ctw-list-disc ctw-pl-4">
        {dataSources.map((s) => (
          <li key={s.name}>
            <span className="ctw-font-medium">{s.name}</span> - {s.details.join(", ")}
          </li>
        ))}
      </ul>
    </>
  );
};

// Take subscription metadata and return a list of translated data sources and the details on their acquisition models
const getDataSources = (patientSubscription: PatientSubscription) => {
  const translatedPackages = {
    freshmakerProviders:
      patientSubscription.package?.meta.freshmakerProviders?.map((x) =>
        // @ts-ignore
        i18next.exists(x) ? i18next.t(x) : x
      ) ?? [],
    initialProviders:
      patientSubscription.package?.meta.initialProviders?.map((x) =>
        // @ts-ignore
        i18next.exists(x) ? i18next.t(x) : x
      ) ?? [],
    subscriptionProviders:
      patientSubscription.package?.meta.subscriptionProviders?.map((x) =>
        // @ts-ignore
        i18next.exists(x) ? i18next.t(x) : x
      ) ?? [],
    recurringProvidersWithInterval:
      patientSubscription.package?.meta.recurringProvidersWithInterval?.map((x) => ({
        // @ts-ignore
        provider: i18next.exists(x.provider) ? i18next.t(x.provider) : x.provider,
        intervalDays: x.intervalDays,
      })) ?? [],
  };

  const dataSources = uniq([
    ...translatedPackages.freshmakerProviders,
    ...translatedPackages.initialProviders,
    ...translatedPackages.subscriptionProviders,
    ...translatedPackages.recurringProvidersWithInterval.map((x) => x.provider),
  ]);

  return dataSources.map((s) => {
    const source = {
      name: s,
      details: compact([
        translatedPackages.initialProviders.includes(s) && "initial history pull",
        translatedPackages.freshmakerProviders.includes(s) && "intelligent refresh",
        translatedPackages.recurringProvidersWithInterval.some((x) => x.provider === s) &&
          `full refresh at least every ${
            translatedPackages.recurringProvidersWithInterval.find((x) => x.provider === s)
              ?.intervalDays
          } days`,
        translatedPackages.subscriptionProviders.includes(s) && "new data alerts",
      ]),
    };
    return source;
  });
};
