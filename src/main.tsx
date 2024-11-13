import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import BuilderPage from "@@builder/builder-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BuilderPage />
  </StrictMode>
);
