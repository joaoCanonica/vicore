import { Instagram, ArrowUpRight, Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/links";
import { WORKS } from "@/lib/works";

function Tile({ poster }: { poster: string }) {
  return (
    <a
      href="#trabalhos"
      aria-label="Ver esse trabalho na íntegra"
      className="group relative aspect-square w-[26vw] shrink-0 overflow-hidden rounded-2xl border border-border sm:w-[16vw] md:w-[13vw] lg:w-[10vw]"
    >
      <img
        src={poster}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-500 group-hover:bg-black/35">
        <Play
          className="h-5 w-5 fill-white/90 text-white/90 transition-transform duration-500 group-hover:scale-110"
          strokeWidth={0}
        />
      </div>
    </a>
  );
}

export function InstagramStrip() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const tiles = [...WORKS, ...WORKS];

  return (
    <section
      ref={sectionRef}
      aria-label="Instagram Vicore"
      className="relative overflow-hidden bg-background py-[10vh]"
    >
      <div className="mb-10 flex flex-col items-center gap-4 px-5 text-center md:mb-14">
        <span
          data-reveal="card"
          className="reveal-card flex h-12 w-12 items-center justify-center rounded-full bg-foreground"
        >
          <Instagram className="h-5 w-5 text-background" strokeWidth={2} />
        </span>
        <h2
          data-reveal="card"
          className="reveal-card font-display max-w-lg text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-foreground"
          style={{ transitionDelay: "0.1s" }}
        >
          Veja o padrão de conteúdo de perto
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal="card"
          className="reveal-card group inline-flex items-center gap-2 text-[13px] font-semibold text-foreground"
          style={{ transitionDelay: "0.2s" }}
        >
          Seguir {INSTAGRAM_HANDLE}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
      </div>

      <div className="no-scrollbar overflow-hidden">
        <div className="marquee-track flex w-max gap-4 px-5">
          {tiles.map((work, i) => (
            <Tile key={`${work.src}-${i}`} poster={work.poster} />
          ))}
        </div>
      </div>
    </section>
  );
}
