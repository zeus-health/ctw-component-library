import "./App.css";
import { Conditions } from "./components/content/conditions";
import { CTWProvider } from "./components/core/ctw-provider";
import { PatientProvider } from "./components/core/patient-provider";
import "./styles/tailwind-gen.css";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const SB_SARAH_ID = "000002";
const SYSTEM_HEALTHIE_ID = "https://www.ctwhealth.com";

function App() {
  return (
    <CTWProvider env="dev" authToken={AUTH_TOKEN} theme={{}}>
      <PatientProvider patientID={SB_SARAH_ID} systemURL={SYSTEM_HEALTHIE_ID}>
        <div className="App ctw-space-y-5">
          <h1>CTW Component Library</h1>
          <Conditions />
        </div>
      </PatientProvider>
    </CTWProvider>
  );
}

export default App;
