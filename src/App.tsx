import { trim } from "lodash/fp";
import { Auth0Provider } from "@auth0/auth0-react";
import { ErrorBoundary } from "./error-boundary";
import { PatientHistoryTable } from "./components/content/patient-history/patient-history-table";
import type { ReactNode } from "react";
import { SecuredApp } from "@/SecuredApp";
import "./App.css";

import {
  PatientRecordSearch,
  CTWProvider,
  PatientAllergies,
  PatientDiagnosticReports,
  PatientDocuments,
  PatientEncounters,
  PatientImmunizations,
  PatientMedicationsAll,
  PatientProvider,
  PatientSearch,
  PatientTimeline,
  ZusAggregatedProfile,
  ZusAggregatedProfileIFrame,
  PatientConditionsAll,
} from ".";

import { PatientMedicationDispense } from "./components/content/medication-dispense/patient-medication-dispense";
import { ThemeProviderProps } from "@/components/core/providers/theme/theme-provider";

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
const theme: ThemeProviderProps["theme"] = {
  colors: {
    notification: {
      main: "#a855f7",
      light: "#f3e8ff",
    },
  },
  // iframe: {
  //   fontFamily: "Avenir",
  //   headerSize: "12px",
  // },
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
  { name: "conditions", render: () => <PatientConditionsAll />, title: "Patient Conditions" },
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
    render: () => <PatientMedicationsAll />,
    title: "Patient Medications (All)",
  },
  {
    name: "patient-history",
    render: () => <PatientHistoryTable />,
    title: "Patient History Table",
  },
  { name: "patient-search", render: () => <PatientSearch />, title: "Patient Search" },
  { name: "patient-record-search", render: () => <PatientRecordSearch />, title: "Search Records" },
  { name: "timeline", render: () => <PatientTimeline />, title: "Patient Timeline" },
  { name: "encounters", render: () => <PatientEncounters />, title: "Patient Encounters" },
  {
    name: "medication-dispense",
    render: () => <PatientMedicationDispense />,
    title: "Patient Medication Dispense",
  },
  {
    name: "zap",
    render: () => {
      return <ZusAggregatedProfile title="ZAP" includePatientDemographicsForm={false} />;
    },
  },
  {
    name: "iframe-zap",
    render: () => {
      return (
        <div style={{ height: "600px" }}>
          <ZusAggregatedProfileIFrame
            title="IFrame ZAP"
            conditionsOutsideProps={{
              hideRequestRecords: true,
            }}
            conditionsAllProps={{ onlyAllowAddOutsideConditions: true }}
            includePatientDemographicsForm={false}
          />
        </div>
      );
    },
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
      {demoComponents.map((demo, index) => (
        <div className="ctw-space-y-5 ctw-bg-white" key={index}>
          <h3>
            {demo.title} <small>{demo.note}</small>
          </h3>
          <ErrorBoundary>{demo.render()}</ErrorBoundary>
        </div>
      ))}
    </PatientProvider>
  </CTWProvider>
);

function App() {
  if (VITE_AUTH0_DOMAIN && VITE_AUTH0_CLIENT_ID && VITE_AUTH0_AUDIENCE) {
    return (
      <Auth0Provider
        cacheLocation="localstorage"
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

export default App;
