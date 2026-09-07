import { useEffect, useRef } from "react";
import { VideoShowcase } from "./VideoShowcase";
import { WORKS } from "@/lib/works";

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
