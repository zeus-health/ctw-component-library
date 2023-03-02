import type { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import { CTWProvider } from "./components/core/providers/ctw-provider";
import { PatientProvider } from "./components/core/providers/patient-provider";
import { ErrorBoundary } from "./error-boundary";
import { SecuredApp } from "./SecuredApp";
import { PatientConditions } from "./components/content/conditions/patient-conditions";
import { PatientMedications } from "./components/content/medications/patient-medications";
import { PatientAllergies } from "@/components/content/allergies/patient-allergies";
import { PatientImmunizations } from "./components/content/immunizations/patient-immunizations";
import { PatientCareTeam } from "./components/content/care-team/patient-careteam";
import { PatientDocuments } from "./components/content/document/patient-documents";
import { ZusAggregatedProfile } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { PatientSearch } from "./components/content/patients/patients-search";

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
      main: "#FFFFFF",
      light: "#BD0B00",
    },
  },
};

type DemoComponent = {
  render: () => ReactNode;
  title: string;
  note?: string;
};
const demoComponents: DemoComponent[] = [
  { render: () => <PatientCareTeam />, title: "Patient CareTeam" },
  {
    render: () => (
      <ZusAggregatedProfile
        resources={[
          "medications",
          "timelines",
          "allergies",
          "conditions-outside",
        ]}
      />
    ),
    title: "ZAP",
  },
  {
    render: () => <PatientMedications handleAddToRecord={() => null} />,
    title: "Patient Medications",
  },
  {
    render: () => <PatientConditions />,
    title: "Patient Conditions 2.0",
  },
  {
    render: () => <PatientDocuments />,
    title: "Patient Documents",
  },
  { render: () => <PatientAllergies />, title: "Patient Allergies" },
  { render: () => <PatientImmunizations />, title: "Patient Immunizations" },
  { render: () => <PatientSearch />, title: "Patient Search" },
];

const DemoApp = ({ accessToken = "" }) => (
  <CTWProvider
    env={VITE_ENV}
    authToken={accessToken}
    builderId={VITE_BUILDER_ID}
    enableTelemetry
    theme={theme}
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
