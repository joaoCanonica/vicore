/**
 * Links externos da marca — ponto único de edição.
 */
export const INSTAGRAM_URL = "https://www.instagram.com/_vicore/";
export const INSTAGRAM_HANDLE = "@_vicore";

const DIAGNOSTIC_FORM_BASE = "https://vicore.yayforms.link/wYWdglX";

/** Formulário de diagnóstico, marcado com a posição do botão no site. */
export function diagnosticFormUrl(position: "header" | "hero" | "final") {
  return `${DIAGNOSTIC_FORM_BASE}?utm_source=site&utm_medium=website&utm_content=${position}`;
}
