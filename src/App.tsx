import "./App.css";
import { ConditionsTableLoader } from "./components/content/conditions-table-loader";
import { CTWProvider } from "./components/core/ctw-provider";
import "./styles/tailwind-gen.css";

const FHIR_URL = import.meta.env.VITE_FHIR_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const DEV_PENNY_UPID = "1b997957-e275-4e86-8f9a-8e0d03cecbab";

function App() {
  return (
    <CTWProvider url={FHIR_URL} authToken={AUTH_TOKEN}>
      <div className="App space-y-5 foo">
        <div>CTW Component Library</div>
        <ConditionsTableLoader patientUPID={DEV_PENNY_UPID} />
      </div>
    </CTWProvider>
  );
}

export default App;
