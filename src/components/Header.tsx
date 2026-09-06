import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { DIAGNOSTIC_FORM_URL } from "@/lib/links";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Método", href: "#metodo" },
  { label: "Cases", href: "#cases" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-border bg-background/75 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <a href="#top" aria-label="Vicore — voltar ao topo" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href={DIAGNOSTIC_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold"
            >
              Diagnóstico grátis
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="text-foreground"
            >
              <Menu className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile — tela cheia */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-background transition-[opacity,visibility] duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="text-foreground"
            >
              <X className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1 px-5" aria-label="Menu">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="block overflow-hidden">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block font-display text-4xl font-semibold leading-[1.25] tracking-tight text-foreground ${
                  menuOpen ? "reveal-line" : ""
                }`}
                style={{ animationDelay: `${0.12 + i * 0.07}s` }}
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        <div className="px-5 pb-10">
          <a
            href={DIAGNOSTIC_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-solid inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[13px] font-semibold"
          >
            Diagnóstico grátis
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </>
  );
}
