import { Auth0Provider } from "@auth0/auth0-react";
import { trim } from "lodash/fp";
import type { ReactNode } from "react";
import { PatientHistoryTable } from "./components/content/patient-history/patient-history-table";
import { ErrorBoundary } from "./error-boundary";
import { SecuredApp } from "@/SecuredApp";
import "./App.css";

import {
  CTWProvider,
  PatientAllergies,
  PatientConditions,
  PatientConditionsOutside,
  PatientDiagnosticReports,
  PatientDocuments,
  PatientImmunizations,
  PatientMedications,
  PatientMedicationsOutside,
  PatientProvider,
  PatientSearch,
  PatientTimeline,
  ZusAggregatedProfile,
} from ".";

const {
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CALLBACK_PATH,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_DOMAIN,
  VITE_AUTH_TOKEN,
  VITE_BUILDER_ID,
  VITE_DEMO_APP_COMPONENTS,
  VITE_ENV = "dev",
  VITE_PATIENT_ID,
  VITE_SYSTEM_URL,
} = import.meta.env;

type DemoComponent = {
  render: () => ReactNode;
  title?: string;
  name: string;
  note?: string;
};

// componentsToRender is a comma seperated list of prefixes used to determine which components
// should render in dev demo by comparing against the `name` property of each `DemoComponent`.
const componentsToRender = VITE_DEMO_APP_COMPONENTS.split(",").map(trim);

// Feel free to play with this theme object
const theme = {
  colors: {
    notification: {
      main: "#a855f7",
      light: "#f3e8ff",
    },
  },
};

// Glossary for translation
const locals = {
  en: {
    glossary: {
      condition_one: "condition",
      condition_other: "conditions",
    },
    main: {
      "zap.tabs.conditionsOutside": "conditions",
      "zap.tabs.medicationsOutside": "medications",
    },
  },
};

const components: DemoComponent[] = [
  { name: "allergies", render: () => <PatientAllergies />, title: "Patient Allergies" },
  { name: "conditions", render: () => <PatientConditions />, title: "Patient Conditions" },
  {
    name: "conditions-outside",
    render: () => <PatientConditionsOutside />,
    title: "Patient Conditions Outside",
  },
  {
    name: "diagnostic-reports",
    render: () => <PatientDiagnosticReports />,
    title: "Patient Diagnostic Reports",
  },
  {
    name: "documents",
    render: () => <PatientDocuments />,
    title: "Patient Documents",
  },
  {
    name: "immunizations",
    render: () => <PatientImmunizations />,
    title: "Patient Immunizations",
  },
  {
    name: "medications",
    render: () => <PatientMedications />,
    title: "Patient Medications",
  },
  {
    name: "medications-outside",
    render: () => <PatientMedicationsOutside />,
    title: "Patient Medications Outside",
  },
  {
    name: "patient-history",
    render: () => <PatientHistoryTable />,
    title: "Patient History Table",
  },
  { name: "patient-search", render: () => <PatientSearch />, title: "Patient Search" },
  { name: "timeline", render: () => <PatientTimeline />, title: "Patient Timeline" },
  {
    name: "zap",
    render: () => (
      <ZusAggregatedProfile
        conditionsOutsideProps={{
          hideRequestRecords: true,
        }}
        conditionsAllProps={{ onlyAllowAddOutsideConditions: true }}
        includePatientDemographicsForm={false}
        resources={[
          "conditions-all",
          "medications-all",
          "diagnostic-reports",
          "allergies",
          "documents",
          "immunizations",
          "care-team",
        ]}
        title="ZAP"
      />
    ),
  },
];

const demoComponents = components.filter(({ name }) =>
  componentsToRender.some((prefix: string) => name.startsWith(prefix))
);

const DemoApp = ({ accessToken = "" }) => (
  <CTWProvider
    env={VITE_ENV}
    authToken={accessToken}
    builderId={VITE_BUILDER_ID}
    enableTelemetry
    theme={theme}
    locals={locals}
    ehr="test"
    onResourceSave={(resource, action, error) => {
      console.log("Result of saving a resource", resource, action, error);
    }}
  >
    <PatientProvider patientID={VITE_PATIENT_ID} systemURL={VITE_SYSTEM_URL}>
      <div className="App">
        <h1>CTW Component Library</h1>

        {demoComponents.map((demo, index) => (
          <div className="ctw-space-y-5 ctw-bg-white ctw-p-1" key={index}>
            <h3>
              {demo.title} <small>{demo.note}</small>
            </h3>
            <ErrorBoundary>{demo.render()}</ErrorBoundary>
          </div>
        ))}
      </div>
    </PatientProvider>
  </CTWProvider>
);

function Debug() {
  if (VITE_AUTH0_DOMAIN && VITE_AUTH0_CLIENT_ID && VITE_AUTH0_AUDIENCE) {
    return (
      <Auth0Provider
        domain={VITE_AUTH0_DOMAIN}
        clientId={VITE_AUTH0_CLIENT_ID}
        audience={VITE_AUTH0_AUDIENCE}
        redirectUri={`${window.location.origin}${VITE_AUTH0_CALLBACK_PATH}`}
      >
        <SecuredApp AppComponent={DemoApp} />
      </Auth0Provider>
    );
  }

  return <DemoApp accessToken={VITE_AUTH_TOKEN} />;
}

export default Debug;
