import type { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import { Conditions } from "./components/content/conditions";
import { PatientMedications } from "./components/content/medications/patient-medications";
import { CTWProvider } from "./components/core/providers/ctw-provider";
import { PatientProvider } from "./components/core/providers/patient-provider";
import { ErrorBoundary } from "./error-boundary";
import { SecuredApp } from "./SecuredApp";
import { PatientConditions } from "./components/content/conditions/patient-conditions";
import { PatientMedicationsTabbed } from "./components/content/medications/patient-medications-tabbed";
import { PatientAllergies } from "@/components/content/allergies/patient-allergies";
import { PatientImmunizations } from "./components/content/immunizations/patient-immunizations";

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

type DemoComponent = {
  render: () => ReactNode;
  title: string;
  note?: string;
};
const demoComponents: DemoComponent[] = [
  {
    render: () => (
      <PatientMedicationsTabbed
        handleAddToRecord={() => null}
        forceHorizontalTabs
      />
    ),
    title: "Patient Medications Tabbed",
    note: "(forceHorizontalTabs)",
  },
  {
    render: () => <PatientMedicationsTabbed handleAddToRecord={() => null} />,
    title: "Patient Medications Tabbed",
  },
  { render: () => <PatientAllergies />, title: "Patient Allergies" },
  { render: () => <PatientImmunizations />, title: "Patient Immunizations" },
  { render: () => <Conditions />, title: "Patient Conditions" },
  { render: () => <PatientConditions />, title: "Patient Conditions 2.0" },
  { render: () => <PatientMedications />, title: "Patient Medications" },
  {
    render: () => <PatientMedications readOnly />,
    title: "Patient Medications",
    note: "(readonly)",
  },
];

const DemoApp = ({ accessToken = "" }) => (
  <CTWProvider
    env={VITE_ENV}
    authToken={accessToken}
    builderId={VITE_BUILDER_ID}
    enableTelemetry
  >
    <PatientProvider patientID={VITE_PATIENT_ID} systemURL={VITE_SYSTEM_URL}>
      <div className="App">
        <h1>CTW Component Library</h1>

        {demoComponents.map((demo, index) => (
          <div className="ctw-space-y-5 ctw-bg-white" key={index}>
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
