import "./App.css";
import { Conditions } from "./components/content/conditions";
import { CTWProvider } from "./components/core/ctw-provider";
import { PatientProvider } from "./components/core/patient-provider";
import "./styles/tailwind-gen.css";

const { VITE_SYSTEM_URL, VITE_AUTH_TOKEN, VITE_PATIENT_ID } = import.meta.env;

function App() {
  return (
    <CTWProvider env="dev" authToken={VITE_AUTH_TOKEN} theme={{}}>
      <PatientProvider patientID={VITE_PATIENT_ID} systemURL={VITE_SYSTEM_URL}>
        <div className="App ctw-space-y-5">
          <h1>CTW Component Library</h1>
          <Conditions />
        </div>
      </PatientProvider>
    </CTWProvider>
  );
}

export default App;
