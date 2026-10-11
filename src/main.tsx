import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Em produção o HTML já vem pré-renderizado (scripts/prerender.mjs);
// no `vite dev` o #root chega vazio.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
