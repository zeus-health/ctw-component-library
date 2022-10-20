import React from "react";
// ReactDOM is technically a "dev" dependency but eslint will complain if it's
// not installed as a regular dependency. We probably don't need customers to
// install our specific version though
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
