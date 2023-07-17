import { BrowserRouter, Routes, Route } from "react-router-dom";
import Debug from "./Debug";
import ZAP from "./ZAP";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/debug" element={<Debug />} />
        <Route path="/ZAP" element={<ZAP />} />
      </Routes>
    </BrowserRouter>
  );
}
