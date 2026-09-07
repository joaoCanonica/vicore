import { useEffect, useRef } from "react";
import { VideoShowcase } from "./VideoShowcase";

/**
 * Trabalhos reais da Vicore — sem recorte por nicho: o mesmo processo
 * de estratégia, roteiro e edição vale pra qualquer tipo de negócio.
 * Lista pensada pra crescer — é só acrescentar um item aqui.
 */
const WORKS = [
  { src: "/videos/work/transservice.mp4", poster: "/videos/work/transservice-poster.jpg" },
  { src: "/videos/work/backstage-moda.mp4", poster: "/videos/work/backstage-moda-poster.jpg" },
  { src: "/videos/work/burger.mp4", poster: "/videos/work/burger-poster.jpg" },
  { src: "/videos/work/grwm-academia.mp4", poster: "/videos/work/grwm-academia-poster.jpg" },
  { src: "/videos/work/posicionamento.mp4", poster: "/videos/work/posicionamento-poster.jpg" },
  { src: "/videos/work/nail-designer.mp4", poster: "/videos/work/nail-designer-poster.jpg" },
  { src: "/videos/work/dra-selfie.mp4", poster: "/videos/work/dra-selfie-poster.jpg" },
  { src: "/videos/work/polowear.mp4", poster: "/videos/work/polowear-poster.jpg" },
  { src: "/videos/work/resultado.mp4", poster: "/videos/work/resultado-poster.jpg" },
  { src: "/videos/work/conteudo-custa.mp4", poster: "/videos/work/conteudo-custa-poster.jpg" },
] as const;

export function Work() {
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
      { threshold: 0.15 },
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
      id="trabalhos"
      ref={sectionRef}
      aria-label="Trabalhos Vicore"
      className="relative overflow-hidden bg-background py-[14vh]"
    >
      <div className="mb-14 px-5 md:mb-16 md:px-10">
        <p className="eyebrow mb-6" data-reveal="card">
          03 — Prova real
        </p>
        <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight">
          <span className="block overflow-hidden">
            <span
              data-reveal="line"
              className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-foreground"
            >
              Funciona pra
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-reveal="line"
              className="block text-[clamp(2.2rem,6.5vw,4.5rem)] text-accent"
              style={{ animationDelay: "0.1s" }}
            >
              qualquer negócio
            </span>
          </span>
        </h2>
        <p
          data-reveal="card"
          className="reveal-card mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
          style={{ transitionDelay: "0.2s" }}
        >
          Não importa o segmento — o processo é sempre o mesmo:
          estratégia, roteiro e edição que fazem o conteúdo vender.
          Alguns vídeos que já colocamos no ar:
        </p>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex cursor-grab select-none gap-5 overflow-x-auto px-5 pb-4 md:px-10 [&.is-dragging]:cursor-grabbing"
      >
        {WORKS.map((work, i) => (
          <article
            key={work.src}
            data-reveal="card"
            className="reveal-card w-[62vw] shrink-0 sm:w-[38vw] md:w-[26vw] lg:w-[19vw]"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <VideoShowcase
              src={work.src}
              poster={work.poster}
              autoManage
              hoverControls
              className="shadow-[0_24px_70px_-32px_rgba(0,0,0,0.4)]"
            />
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}
