import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Depoimentos placeholder — nomes e nichos genéricos, prontos pra serem
 * substituídos pelos depoimentos reais dos clientes da Vicore.
 */
const TESTIMONIALS = [
  {
    quote:
      "Eu achava que não tinha tempo pra gravar. A Vicore organizou tudo — hoje gravo uma vez por mês e o conteúdo não para de sair.",
    name: "Camila R.",
    role: "Odontologia",
  },
  {
    quote:
      "Trocamos posts aleatórios por uma linha editorial de verdade. Em três meses o Instagram virou o principal canal de indicação.",
    name: "Marcelo T.",
    role: "Advocacia",
  },
  {
    quote:
      "O que mais mudou foi a confiança na frente da câmera. A equipe dirige, eu só apareço — e o resultado parece outra marca.",
    name: "Fernanda A.",
    role: "Diretoria executiva",
  },
  {
    quote:
      "Consistência é a palavra. Antes eu sumia semanas sem postar. Agora o calendário roda sozinho e a agenda lotou.",
    name: "Diego M.",
    role: "Estética & bem-estar",
  },
  {
    quote:
      "Cada visita vira quatro ou cinco vídeos prontos. O time de operações virou protagonista sem perder o profissionalismo.",
    name: "Renata S.",
    role: "Operações & indústria",
  },
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 5500);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      aria-label="Depoimentos"
      className="relative overflow-hidden bg-background px-5 py-[14vh] md:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow reveal-card mb-6" data-reveal="card">
            04 — Quem já vive isso
          </p>
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight">
            <span className="block overflow-hidden">
              <span
                data-reveal="line"
                className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-foreground"
              >
                Depoimentos
              </span>
            </span>
          </h2>
        </div>

        <div className="reveal-card flex gap-3" data-reveal="card" style={{ transitionDelay: "0.2s" }}>
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full text-foreground"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => emblaApi?.scrollNext()}
            className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full text-foreground"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
            >
              <figure className="card-edge flex h-full flex-col justify-between rounded-3xl p-7 md:p-8">
                <Quote
                  className="h-7 w-7 shrink-0 text-[var(--grad-2)]"
                  strokeWidth={1.5}
                  fill="currentColor"
                  fillOpacity={0.15}
                />
                <blockquote className="mt-6 flex-1 text-[14.5px] leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--grad-1)] via-[var(--grad-2)] to-[var(--grad-3)] text-[12px] font-bold text-background">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-foreground">
                      {t.name}
                    </span>
                    <span className="block text-[11.5px] text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            aria-label={`Ir para depoimento ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              selected === i ? "w-6 bg-foreground" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
