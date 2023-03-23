import type { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { ErrorBoundary } from "./error-boundary";
import { SecuredApp } from "@/SecuredApp";
import {
  CTWProvider,
  PatientAllergies,
  PatientCareTeam,
  PatientConditions,
  PatientDocuments,
  PatientImmunizations,
  PatientMedications,
  PatientProvider,
  PatientSearch,
  PatientTimeline,
  ZusAggregatedProfile,
} from ".";
import "./App.css";
import { PatientTimelineV2 } from "./components/content/timeline-2.0/patient-timeline";

const {
  VITE_SYSTEM_URL,
  VITE_AUTH_TOKEN,
  VITE_PATIENT_ID,
  VITE_BUILDER_ID,
  VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CALLBACK_PATH,
  VITE_ENV = "dev",
} = import.meta.env;

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
      condition_one: "problem",
      condition_other: "problems",
    },
    main: {
      "zap.tabs.conditionsOutside": "problems",
      "zap.tabs.medicationsOutside": "medications",
    },
  },
};

type DemoComponent = {
  render: () => ReactNode;
  title: string;
  note?: string;
};
const demoComponents: DemoComponent[] = [
  // {
  //   render: () => (
  //     <ZusAggregatedProfile
  //       resources={["observations-outside", "observations"]}
  //       title="Observations"
  //     />
  //   ),
  //   title: "Patient Observations",
  // },
  // { render: () => <PatientCareTeam />, title: "Patient CareTeam" },
  // {
  //   render: () => (
  //     <ZusAggregatedProfile
  //       resources={[
  //         "conditions-outside",
  //         "medications-outside",
  //         "allergies",
  //         "immunizations",
  //         "documents",
  //         "care-team",
  //         "timelines",
  //       ]}
  //       conditionsOutsideProps={{
  //         hideRequestRecords: true,
  //         readOnly: true,
  //       }}
  //       medicationsOutsideProps={{
  //         readOnly: true,
  //       }}
  //     />
  //   ),
  //   title: "ZAP",
  // },
  // {
  //   render: () => <PatientMedications />,
  //   title: "Patient Medications",
  // },
  // {
  //   render: () => <PatientConditions />,
  //   title: "Patient Conditions",
  // },
  // {
  //   render: () => <PatientDocuments />,
  //   title: "Patient Documents",
  // },
  // { render: () => <PatientAllergies />, title: "Patient Allergies" },
  // { render: () => <PatientImmunizations />, title: "Patient Immunizations" },
  // { render: () => <PatientSearch />, title: "Patient Search" },
  { render: () => <PatientTimelineV2 />, title: "WOOOOOO THIS TOOK 3 Weeks" },
];

const DemoApp = ({ accessToken = "" }) => (
  <CTWProvider
    env={VITE_ENV}
    authToken={accessToken}
    builderId={VITE_BUILDER_ID}
    enableTelemetry
    theme={theme}
    locals={locals}
  >
    <PatientProvider patientID={VITE_PATIENT_ID} systemURL={VITE_SYSTEM_URL}>
      <div className="App">
        <h1>CTW Component Library</h1>

        {demoComponents.map((demo, index) => (
          <div className="ctw-space-y-5 ctw-bg-white ctw-p-1" key={index}>
            <h3>
              {demo.title} <small>{demo.note ?? "(default)"}</small>
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
