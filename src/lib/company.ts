import { INSTAGRAM_URL } from "./links";

/**
 * Dados da empresa — ponto único de edição para SEO (canonical, og:url,
 * sitemap, robots, JSON-LD). Campo vazio = não é gerado em lugar nenhum.
 * Quando o domínio próprio existir, basta definir VITE_SITE_URL na Vercel.
 */
export const SITE_URL: string = (
  import.meta.env.VITE_SITE_URL || "https://vicore-ten.vercel.app"
).replace(/\/+$/, "");

export const COMPANY = {
  name: "Vicore",
  instagram: INSTAGRAM_URL,
  legalName: "",
  cnpj: "",
  /** E.164, ex.: +5511999999999 */
  telephone: "",
  email: "",
  whatsapp: "",
  /** AAAA ou AAAA-MM-DD */
  foundingDate: "",
  addressLocality: "",
  addressRegion: "",
  streetAddress: "",
  postalCode: "",
  founder: { name: "", jobTitle: "" },
};
