import "./App.css";
import { Conditions } from "./components/content/conditions";
import { CTWProvider } from "./components/core/ctw-provider";
import { PatientProvider } from "./components/core/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "./fhir/system-urls";
import "./styles/tailwind-gen.css";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
// const SB_SARAH_ID = "000002";
// const SYSTEM_HEALTHIE_ID = "https://www.gethealthie.com";

const DEV_PENNY_UPID = "1b997957-e275-4e86-8f9a-8e0d03cecbab";

function App() {
  return (
    <CTWProvider env="dev" authToken={AUTH_TOKEN} theme={{}}>
      <PatientProvider
        patientID={DEV_PENNY_UPID}
        systemURL={SYSTEM_ZUS_UNIVERSAL_ID}
      >
        <div className="App ctw-space-y-5">
          <h1>CTW Component Library</h1>
          <Conditions />
        </div>
      </PatientProvider>
    </CTWProvider>
  );
}

export default App;
