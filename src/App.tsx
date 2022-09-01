import "./App.css";
import { Conditions } from "./components/content/conditions";
import { CTWProvider } from "./components/core/ctw-provider";
import { IDProvider } from "./components/core/id-provider";
import { SYSTEM_HEALTHIE_ID } from "./fhir/system-urls";
import "./styles/tailwind-gen.css";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const SB_SARAH_ID = "000002";

function App() {
  return (
    <CTWProvider env="sandbox" authToken={AUTH_TOKEN} theme={{}}>
      <IDProvider patientID={SB_SARAH_ID} systemURL={SYSTEM_HEALTHIE_ID}>
        <div className="App ctw-space-y-5">
          <h1>CTW Component Library</h1>
          <Conditions />
        </div>
      </IDProvider>
    </CTWProvider>
  );
}

export default App;
