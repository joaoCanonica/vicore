import { useEffect, useRef } from "react";
import {
  Compass,
  Clapperboard,
  UserRound,
  CalendarClock,
  PenLine,
  LineChart,
} from "lucide-react";

const SERVICES = [
  {
    icon: Compass,
    name: "Estratégia de conteúdo",
    description:
      "Diagnóstico do seu momento, do seu público e do que realmente te posiciona antes de gravar qualquer coisa.",
  },
  {
    icon: Clapperboard,
    name: "Produção de vídeo",
    description:
      "Filmagem e edição com padrão editorial — do roteiro ao corte final, prontos pra performar no feed.",
  },
  {
    icon: UserRound,
    name: "Personal branding",
    description:
      "Posicionamos quem lidera o negócio como autoridade — a marca de vídeo mais forte que qualquer anúncio.",
  },
  {
    icon: CalendarClock,
    name: "Gestão de redes",
    description:
      "Calendário editorial, publicação e comunidade cuidados semana a semana, sem depender da sua agenda.",
  },
  {
    icon: PenLine,
    name: "Copywriting & roteiro",
    description:
      "Legendas, roteiros e CTAs escritos pra gerar comentário, salvar e, principalmente, vender.",
  },
  {
    icon: LineChart,
    name: "Growth & analytics",
    description:
      "Métricas lidas de verdade — testamos formatos, ganchos e horários até o que funciona virar rotina.",
  },
] as const;

/**
 * Serviços — faixa horizontal com scroll por arraste (mouse) e scroll
 * nativo (touch/trackpad). Reveal staggered ao entrar na viewport.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(pointer: coarse)").matches) return;

    let down = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) track.classList.add("is-dragging");
      track.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      down = false;
      track.classList.remove("is-dragging");
    };

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      aria-label="Serviços Vicore"
      className="relative overflow-hidden bg-background py-[12vh]"
    >
      <div className="flex items-end justify-between px-5 md:px-10">
        <div>
          <p className="eyebrow mb-6">01 — O que fazemos</p>
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight">
            <span className="block overflow-hidden">
              <span
                data-reveal="line"
                className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-foreground"
              >
                Tudo que sua marca
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal="line"
                className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-accent"
                style={{ animationDelay: "0.1s" }}
              >
                precisa pra vender
              </span>
            </span>
          </h2>
        </div>
        <p className="eyebrow hidden pb-2 text-right md:block">
          Arraste
          <br />
          para explorar
        </p>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex cursor-grab select-none gap-5 overflow-x-auto px-5 pb-4 md:mt-16 md:px-10 [&.is-dragging]:cursor-grabbing"
      >
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <article
              key={service.name}
              data-reveal="card"
              className="card-edge reveal-card w-[78vw] shrink-0 rounded-3xl p-7 sm:w-[46vw] md:w-[30vw] md:p-8 lg:w-[23vw]"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground">
                  <Icon className="h-5 w-5 text-background" strokeWidth={1.75} />
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display mt-8 text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
                {service.name}
              </h3>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          );
        })}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}
