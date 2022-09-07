import "./App.css";
import { Conditions } from "./components/content/conditions";
import { CTWProvider } from "./components/core/ctw-provider";
import "./styles/tailwind-gen.css";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const DEV_PENNY_UPID = "1b997957-e275-4e86-8f9a-8e0d03cecbab";

function App() {
  return (
    <CTWProvider env="dev" authToken={AUTH_TOKEN}>
      <div className="App ctw-space-y-5">
        <h1>CTW Component Library</h1>
        <Conditions patientUPID={DEV_PENNY_UPID} />
      </div>
    </CTWProvider>
  );
}

export default App;
