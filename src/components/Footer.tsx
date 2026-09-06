import { Logo } from "./Logo";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 pb-28 pt-12 md:py-12 md:pl-10 md:pr-28">
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <Logo />

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Instagram — {INSTAGRAM_HANDLE}
        </a>

        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Marketing de conteúdo &amp; posicionamento
        </p>

        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          © {new Date().getFullYear()} Vicore
        </p>
      </div>
    </footer>
  );
}
