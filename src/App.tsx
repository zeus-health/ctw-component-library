import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { SecuredApp } from "./SecuredApp";
import { Conditions } from "./components/content/conditions";
import { PatientMedications } from "./components/content/patient-medications";
import { CTWProvider } from "./components/core/ctw-provider";
import { ErrorBoundary } from "./error-boundary";
import { PatientProvider } from "./components/core/patient-provider";
import { Theme } from "./styles/tailwind.theme";

const {
  VITE_SYSTEM_URL,
  VITE_AUTH_TOKEN,
  VITE_PATIENT_ID,
  VITE_BUILDER_ID,
  VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CALLBACK_PATH,
} = import.meta.env;

const theme: Theme = {
  colors: {
    primary: {
      light: "#F2F6FD",
      main: "#5C8EDC",
      dark: "#3E6197",
    },
    content: {
      black: "#1A2848",
      light: "#4A4A4A",
      lighter: "#999999",
    },
    bg: {
      light: "#F1F1F1",
    },
  },
};

const DemoApp = ({ accessToken = "" }) => (
  <CTWProvider
    env="dev"
    authToken={accessToken}
    theme={theme}
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

        <div className="ctw-space-y-5">
          <h3>
            Patient Meds <small>(default)</small>
          </h3>
          <ErrorBoundary>
            <PatientMedications />
          </ErrorBoundary>
        </div>

        <div className="ctw-space-y-5">
          <h3>
            Patient Meds <small>(no add button or confirmed meds)</small>
          </h3>
          <ErrorBoundary>
            <PatientMedications
              showConfirmedMedsTable={false}
              readOnly={false}
            />
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
