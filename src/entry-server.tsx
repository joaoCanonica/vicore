import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export { SITE_URL, COMPANY } from "./lib/company";
export { SERVICES } from "./lib/services";
export { INSTAGRAM_URL } from "./lib/links";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
