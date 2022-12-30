import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import { Conditions } from "./components/content/conditions";
import { PatientMedications } from "./components/content/medications/patient-medications";
import { CTWProvider } from "./components/core/providers/ctw-provider";
import { PatientProvider } from "./components/core/providers/patient-provider";
import { ErrorBoundary } from "./error-boundary";
import { SecuredApp } from "./SecuredApp";
import { PatientConditions } from "./components/content/conditions/patient-conditions";

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

const DemoApp = ({ accessToken = "" }) => (
  <CTWProvider
    env={VITE_ENV}
    authToken={accessToken}
    builderId={VITE_BUILDER_ID}
  >
    <PatientProvider patientID={VITE_PATIENT_ID} systemURL={VITE_SYSTEM_URL}>
      <div className="App">
        <h1>CTW Component Library</h1>

        <div className="ctw-space-y-5">
          <h3>
            Patient Conditions <small>(default)</small>
          </h3>
          <ErrorBoundary>
            <Conditions />
          </ErrorBoundary>
        </div>

        <div className="ctw-space-y-5 ctw-bg-white">
          <h3>
            Patient Conditions 2.0 <small>(default)</small>
          </h3>
          <ErrorBoundary>
            <PatientConditions />
          </ErrorBoundary>
        </div>

        <div className="ctw-space-y-5">
          <h3>
            Patient Meds <small>(default)</small>
          </h3>
          <ErrorBoundary>
            <PatientMedications />
          </ErrorBoundary>
        </div>
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
