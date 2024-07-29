import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import SetStaticCookie from "./contexts/SetStaticCookie.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
    <SetStaticCookie />
      <App />
    </HashRouter>
  </React.StrictMode>
);
