import { ArrowUpRight, Volume2 } from "lucide-react";
import { VideoShowcase } from "./VideoShowcase";
import { DIAGNOSTIC_FORM_URL } from "@/lib/links";

const AUDIENCE = ["Médicos & dentistas", "Advogados", "Executivos", "Donos de negócio"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28"
    >
      {/* Fundo — blobs em tons de cinza lentos + grão, sem foto de banco */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div
          className="ken-burns absolute -left-[10%] -top-[15%] h-[55vh] w-[55vh] rounded-full opacity-[0.1] blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-foreground), transparent 70%)" }}
        />
        <div
          className="ken-burns absolute -right-[8%] top-[8%] h-[48vh] w-[48vh] rounded-full opacity-[0.07] blur-[110px]"
          style={{
            background: "radial-gradient(circle, var(--color-foreground), transparent 70%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--color-foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-foreground) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
          }}
        />
        <div className="grain absolute inset-0" />
      </div>

      {/* Metadados — topo, assimétricos, eco do Hero editorial */}
      <div className="flex items-start justify-between px-5 md:px-10">
        <p className="eyebrow fade-up" style={{ animationDelay: "0.4s" }}>
          Marketing de conteúdo
          <br />
          &amp; posicionamento
        </p>
        <p className="eyebrow fade-up text-right" style={{ animationDelay: "0.5s" }}>
          Estratégia · Vídeo
          <br />
          Posicionamento · Vendas
        </p>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-16 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:px-10 md:py-16">
        {/* Coluna de texto */}
        <div>
          <h1 className="font-display font-bold uppercase leading-[0.98] tracking-tight">
            <span className="block overflow-hidden">
              <span
                className="reveal-line block text-[clamp(2.6rem,7.4vw,5.5rem)] text-foreground"
                style={{ animationDelay: "0.15s" }}
              >
                Sua marca vai
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="reveal-line block text-[clamp(2.6rem,7.4vw,5.5rem)] text-accent"
                style={{ animationDelay: "0.3s" }}
              >
                vender mais.
              </span>
            </span>
          </h1>

          <p
            className="fade-up mt-8 max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base"
            style={{ animationDelay: "0.55s" }}
          >
            Desenvolvemos a estratégia e o conteúdo que posicionam o seu negócio.
            Em <span className="font-semibold text-foreground">90 dias</span>, seu
            perfil trabalha por você — sem depender de sorte, nem de postar por
            postar.
          </p>

          <div
            className="fade-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.7s" }}
          >
            <a
              href={DIAGNOSTIC_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[13px] font-semibold"
            >
              Quero meu diagnóstico grátis
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
            <a
              href="#cases"
              className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[13px] font-semibold text-foreground"
            >
              Ver resultados
            </a>
          </div>

          <div
            className="fade-up mt-12 flex flex-wrap gap-2.5"
            style={{ animationDelay: "0.85s" }}
          >
            {AUDIENCE.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Coluna visual — vídeo real da Vicore */}
        <div
          className="fade-up relative mx-auto w-full max-w-[300px] md:max-w-none"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="absolute -inset-x-6 -inset-y-10 -z-10 hidden rounded-[3rem] border border-border/60 md:block" />
          <VideoShowcase
            src="/videos/vicore-hero.mp4"
            poster="/videos/vicore-hero-poster.jpg"
            className="shadow-[0_40px_120px_-40px_rgba(0,0,0,0.45)]"
          />

          <div className="absolute -right-4 -top-4 hidden items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 backdrop-blur-md md:flex">
            <Volume2 className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
            <span className="text-[11px] font-medium text-muted-foreground">
              Toque no vídeo pra ativar o som
            </span>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className="fade-up relative z-10 mx-auto mb-8 flex flex-col items-center gap-3 md:mb-10"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          role para descobrir
        </span>
        <span className="scroll-cue-line block h-10 w-px bg-foreground/40" />
      </div>
    </section>
  );
}
