import "./App.css";
import { ConditionsTableLoader } from "./components/content/conditions-table-loader";
import "./styles/tailwind-gen.css";

function App() {
  return (
    <div className="App space-y-5 foo">
      <div>CTW Component Library</div>
      <ConditionsTableLoader />
    </div>
  );
}

export default App;
