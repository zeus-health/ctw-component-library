import "./App.css";
import { Conditions } from "./components/content/conditions";
import { CTWProvider } from "./components/core/ctw-provider";
import { PatientProvider } from "./components/core/patient-provider";
import "./styles/tailwind-gen.css";

const { SYSTEM_URL, AUTH_TOKEN, PATIENT_ID } = import.meta.env;

function App() {
  return (
    <CTWProvider env="dev" authToken={AUTH_TOKEN} theme={{}}>
      <PatientProvider patientID={PATIENT_ID} systemURL={SYSTEM_URL}>
        <div className="App ctw-space-y-5">
          <h1>CTW Component Library</h1>
          <Conditions />
        </div>
      </PatientProvider>
    </CTWProvider>
  );
}

export default App;
