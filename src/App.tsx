import "./App.css";
import { Conditions } from "./components/content/conditions";
import { PatientMedications } from "./components/content/patient-medications";
import { CTWProvider } from "./components/core/ctw-provider";
import { ErrorBoundary } from "./components/core/error-boundary";
import { PatientProvider } from "./components/core/patient-provider";
import { Theme } from "./styles/tailwind.theme";

const { VITE_SYSTEM_URL, VITE_AUTH_TOKEN, VITE_PATIENT_ID } = import.meta.env;

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

function App() {
  return (
    <CTWProvider env="dev" authToken={VITE_AUTH_TOKEN} theme={theme}>
      <PatientProvider patientID={VITE_PATIENT_ID} systemURL={VITE_SYSTEM_URL}>
        <div className="App ctw-space-y-5">
          <h1>CTW Component Library</h1>
          <ErrorBoundary>
            <Conditions />
          </ErrorBoundary>

          <br />

          <h3>Patient Meds default</h3>
          <ErrorBoundary>
            <PatientMedications />
          </ErrorBoundary>
          <br />

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
      </PatientProvider>
    </CTWProvider>
  );
}

export default App;
