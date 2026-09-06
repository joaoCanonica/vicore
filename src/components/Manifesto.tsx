import { useEffect, useRef } from "react";

const LINES = [
  "Postar por postar não vende.",
  "Vídeo bonito sem estratégia é só ruído.",
  "Sua marca precisa de posicionamento —",
  "não de sorte.",
  "A Vicore entra aí: estratégia, produção",
  "e consistência trabalhando juntas.",
  "É isso que transforma seguidor em cliente.",
] as const;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Manifesto — reveal progressivo controlado pelo scroll (scrub):
 * cada linha sai de opacidade baixa para branco total conforme a
 * seção atravessa a viewport.
 */
export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.4;
      const total = rect.height + (start - end);
      const progress = clamp((start - rect.top) / total, 0, 1);

      const n = LINES.length;
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const local = clamp(progress * (n + 0.75) - i, 0, 1);
        const eased = 1 - Math.pow(1 - local, 3);
        line.style.opacity = (0.14 + 0.86 * eased).toFixed(3);
        line.style.transform = `translateY(${((1 - eased) * 0.6).toFixed(3)}em)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Posicionamento Vicore"
      className="relative flex min-h-svh items-center bg-background px-5 py-[20vh] md:px-10"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow mb-12 md:mb-16">O problema com conteúdo sem direção</p>
        <p className="text-[clamp(1.4rem,3.4vw,2.75rem)] font-semibold leading-[1.35] tracking-tight text-foreground">
          {LINES.map((line, i) => (
            <span
              key={i}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              className="manifesto-line block"
              style={{ opacity: 0.14 }}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
