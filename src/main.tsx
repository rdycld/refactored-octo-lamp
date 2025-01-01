import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import BuilderPage from "@@builder/builder-page";
import { Builder } from "@builder.io/react";
import { colors } from "@@theme/designTokens";
import { Toaster } from "react-hot-toast";

Builder.register("editor.settings", {
  designTokens: { colors },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BuilderPage />
    <Toaster />
  </StrictMode>
);
