import "./App.css";
import { ConditionsTableLoader } from "./components/content/conditions-table-loader";
import { CTWProvider } from "./components/core/ctw-provider";
import "./styles/tailwind-gen.css";

function App() {
  return (
    <CTWProvider url="http://localhost:3000" bearerToken="12345fake">
      <div className="App space-y-5 foo">
        <div>CTW Component Library</div>
        <ConditionsTableLoader />
      </div>
    </CTWProvider>
  );
}

export default App;
