import { trim } from "lodash/fp";
import { Auth0Provider } from "@auth0/auth0-react";
import { ErrorBoundary } from "./error-boundary";
import { PatientHistoryTable } from "./components/content/patient-history/patient-history-table";
import type { ReactNode } from "react";
import { SecuredApp } from "@/SecuredApp";
import "./App.css";

import {
  CTWProvider,
  PatientConditions,
  PatientConditionsOutside,
  PatientDocuments,
  PatientMedications,
  PatientMedicationsOutside,
  PatientProvider,
  PatientSearch,
  PatientTimeline,
  ZusAggregatedProfile,
} from ".";
import { binary } from "./components/content/story-helpers/mocks/resources/binary";

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
  { name: "conditions", render: () => <PatientConditions />, title: "Patient Conditions" },
  {
    name: "conditions-outside",
    render: () => <PatientConditionsOutside />,
    title: "Patient Conditions Outside",
  },
  {
    name: "documents",
    render: () => (
      <PatientDocuments
        onAddToRecord={async (document, binary) => {
          try {
            const response = await fetch("ehr_api/clinical_documents/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                patient: 0, // Replace with the current patient ID
                authoring_practice: 0, // Replace with the current practice ID
                xml_file: {
                  original_filename: document.title, // TODO: Should this have some kind of date added to it or some formatting ensured (ie. no special characters)?
                  content_type: "application/octet-stream",
                  base64_content: btoa(binary.data ?? ""), // Assuming the binary data is provided in base64 format
                },
                data_format: "ccda", // TODO: How can we tell if a document is a CCDA?,
              }),
            });

            const data = await response.json();

            // Handle the response from the API as needed
            console.log("API response:", data);
          } catch (error) {
            // Handle any errors that occur during the API request
            console.error("API request error:", error);
          }
        }}
      />
    ),
    title: "Patient Documents",
  },
  { name: "medications", render: () => <PatientMedications />, title: "Patient Medications" },
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
        includePatientDemographicsForm={false}
        resources={[
          "allergies",
          "conditions",
          "conditions-outside",
          "medications",
          "medications-outside",
          "observations",
          "timeline",
          "observations-outside",
          "care-team",
          "documents",
          "immunizations",
        ]}
        title="ZAP"
        timelineProps={{ enableFQS: true }}
        observationsProps={{ enableFQS: true }}
        immunizationsProps={{ enableFQS: true }}
        allergiesProps={{ enableFQS: true }}
        documentsProps={{ enableFQS: true }}
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

function App() {
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

export default App;
