import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const STEPS = [
  {
    phase: "Semana 1–2",
    title: "Diagnóstico & posicionamento",
    description:
      "Mergulhamos no seu negócio, no seu público e na concorrência pra definir exatamente o que a sua marca precisa dizer — e pra quem.",
  },
  {
    phase: "Semana 2–3",
    title: "Estratégia & linha editorial",
    description:
      "Montamos o plano de conteúdo: pilares, formatos, tom de voz e metas claras de onde você quer chegar em 90 dias.",
  },
  {
    phase: "Semana 3 em diante",
    title: "Produção de vídeo",
    description:
      "Gravamos com roteiro, direção e edição de padrão editorial — você entra na frente da câmera, a gente cuida do resto.",
  },
  {
    phase: "Contínuo",
    title: "Gestão, publicação & comunidade",
    description:
      "Calendário rodando, comunidade respondida e ajustes semanais com base no que os números mostram.",
  },
  {
    phase: "Dia 90",
    title: "Perfil trabalhando por você",
    description:
      "Mais alcance, mais autoridade e uma base de conteúdo consistente puxando gente pronta pra comprar.",
  },
] as const;

export function Method() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="metodo"
      ref={sectionRef}
      aria-label="Método Vicore"
      className="relative overflow-hidden bg-background px-5 py-[14vh] md:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mb-16 md:mb-20">
        <p className="eyebrow reveal-card mb-6" data-reveal="card">
          02 — Como funciona
        </p>
        <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight">
          <span className="block overflow-hidden">
            <span
              data-reveal="line"
              className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-foreground"
            >
              O método
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-reveal="line"
              className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-accent"
              style={{ animationDelay: "0.1s" }}
            >
              dos 90 dias
            </span>
          </span>
        </h2>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden="true"
          className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-foreground/25 sm:block"
        />
        <ol className="space-y-10 sm:space-y-14">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              data-reveal="card"
              className="reveal-card relative flex flex-col gap-4 sm:flex-row sm:gap-8"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-4 sm:block sm:shrink-0">
                <span
                  className="font-display relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-lg font-bold text-foreground"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow sm:hidden">{step.phase}</span>
              </div>
              <div className="sm:pt-1">
                <p className="eyebrow mb-2 hidden sm:block">{step.phase}</p>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground md:text-[15px]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
