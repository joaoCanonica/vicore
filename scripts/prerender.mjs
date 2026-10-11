/**
 * Pós-build: injeta o HTML do <App /> (renderToString) dentro do #root,
 * o JSON-LD no <head> e gera robots.txt e sitemap.xml em dist/.
 * Tudo deriva de SITE_URL/COMPANY (src/lib/company.ts).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const { SITE_URL, COMPANY, SERVICES, INSTAGRAM_URL, render } = ssr;

const htmlPath = path.join(dist, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const attr = (name, key = "name") =>
  html.match(new RegExp(`<meta\\s+${key}="${name}"\\s+content="([^"]*)"`))?.[1];
const title = html.match(/<title>([^<]*)<\/title>/)[1];
const description = attr("description");

/** Remove chaves vazias ("" / undefined / objetos sem conteúdo). */
function compact(value) {
  if (Array.isArray(value)) return value.map(compact).filter((v) => v !== undefined);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const c = compact(v);
      if (c !== undefined) out[k] = c;
    }
    const meaningful = Object.keys(out).filter((k) => k !== "@type");
    return meaningful.length ? out : undefined;
  }
  return value === "" || value === undefined || value === null ? undefined : value;
}

const orgId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const ogImage = `${SITE_URL}/og-image.jpg`;

const graph = compact({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": orgId,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` },
      image: ogImage,
      description,
      sameAs: [INSTAGRAM_URL],
      areaServed: { "@type": "Country", name: "Brasil" },
      knowsAbout: [
        "Marketing de conteúdo",
        "Produção de vídeo",
        "Personal branding",
        "Posicionamento de marca",
        "Gestão de redes sociais",
      ],
      telephone: COMPANY.telephone,
      email: COMPANY.email,
      foundingDate: COMPANY.foundingDate,
      vatID: COMPANY.cnpj,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.streetAddress,
        addressLocality: COMPANY.addressLocality,
        addressRegion: COMPANY.addressRegion,
        postalCode: COMPANY.postalCode,
        addressCountry: COMPANY.addressLocality || COMPANY.streetAddress ? "BR" : "",
      },
      founder: { "@type": "Person", name: COMPANY.founder.name, jobTitle: COMPANY.founder.jobTitle },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços Vicore",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": orgId },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: COMPANY.name,
      inLanguage: "pt-BR",
      publisher: { "@id": orgId },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: title,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
      primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
      inLanguage: "pt-BR",
    },
  ],
});
// Uma pessoa sem nome não é fundador: descarta founder se só sobrou jobTitle.
const org = graph["@graph"][0];
if (org.founder && !org.founder.name) delete org.founder;

const jsonLd = JSON.stringify(graph).replace(/</g, "\\u003c");
const appHtml = render();

if (!html.includes('<div id="root"></div>')) throw new Error("#root vazio não encontrado em dist/index.html");
html = html
  .replaceAll("__SITE_URL__", SITE_URL)
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace("</head>", `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`);
if (html.includes("__SITE_URL__")) throw new Error("placeholder __SITE_URL__ restante");
fs.writeFileSync(htmlPath, html);

let lastmod = "";
try {
  lastmod = execSync("git log -1 --format=%cs", { cwd: root, encoding: "utf8" }).trim();
} catch {
  /* sem git no ambiente de build: o sitemap sai sem <lastmod> */
}

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>
</urlset>
`,
);

console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} KB de HTML em #root, SITE_URL=${SITE_URL}, lastmod=${lastmod || "-"}`);
