import { useEffect, useRef } from "react";
import { PhoneMock } from "./PhoneMock";

const TONE_CYCLE = ["a", "b", "c"] as const;

const CASES = [
  {
    niche: "Odontologia",
    caption: "POV: a Dra. estende o braço na altura da câmera, estilo selfie, e confia. 🙏",
    goal: "Meta: +200% de alcance em 90 dias",
  },
  {
    niche: "Advocacia",
    caption: "Autoridade não se compra. Se constrói vídeo a vídeo. ⚖️",
    goal: "Meta: virar referência no nicho",
  },
  {
    niche: "Diretoria executiva",
    caption: "POV: leva a cadeira ali no meio, fica parado e confia. ✨",
    goal: "Meta: personal branding do fundador",
  },
  {
    niche: "Operações & indústria",
    caption: "Bastidor vira conteúdo. Rotina vira prova social.",
    goal: "Meta: humanizar a operação",
  },
  {
    niche: "Estética & bem-estar",
    caption: "GRWM: o conteúdo pronto antes mesmo de você sair de casa. 💫",
    goal: "Meta: agenda cheia sem anúncio pago",
  },
  {
    niche: "Consultoria & serviços",
    caption: "Cada gravação vira 10 formatos diferentes de conteúdo.",
    goal: "Meta: pipeline de leads recorrente",
  },
] as const;

export function Cases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add(el.dataset["reveal"] === "line" ? "reveal-line" : "is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="cases"
      ref={sectionRef}
      aria-label="Cases Vicore por segmento"
      className="relative overflow-hidden bg-background px-5 py-[14vh] md:px-10"
    >
      <div className="mb-14 md:mb-16">
        <p className="eyebrow mb-6" data-reveal="card">
          03 — Pra quem já rodamos
        </p>
        <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight">
          <span className="block overflow-hidden">
            <span
              data-reveal="line"
              className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-foreground"
            >
              Conteúdo que se
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-reveal="line"
              className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-accent"
              style={{ animationDelay: "0.1s" }}
            >
              parece com você
            </span>
          </span>
        </h2>
        <p
          data-reveal="card"
          className="reveal-card mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          style={{ transitionDelay: "0.2s" }}
        >
          Cada segmento pede um tom diferente. A gente adapta o roteiro, o
          ritmo e a linguagem — sem perder o que te deixa reconhecível.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <article
            key={c.niche}
            data-reveal="card"
            className="reveal-card group relative overflow-hidden rounded-3xl border border-border"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="flex h-full gap-5 p-5 md:p-6">
              <PhoneMock
                tag={c.niche}
                caption={c.caption}
                tone={TONE_CYCLE[i % TONE_CYCLE.length]}
                className="max-w-[130px] shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {c.niche}
                </p>
                <p className="font-display mt-2 text-lg font-semibold leading-snug text-foreground">
                  {c.goal}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
