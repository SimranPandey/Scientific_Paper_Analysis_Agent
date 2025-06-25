import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import IndexPage from "./pages/index";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <IndexPage />
    </React.StrictMode>
  );
}
