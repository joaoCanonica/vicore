import { Instagram, ArrowUpRight, Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/links";

const TILE_TONES = [
  ["#2b2b2b", "#0a0a0a"],
  ["#1f1f1f", "#000000"],
  ["#333333", "#111111"],
  ["#262626", "#0a0a0a"],
  ["#2f2f2f", "#0d0d0d"],
  ["#1a1a1a", "#050505"],
  ["#303030", "#0a0a0a"],
  ["#242424", "#000000"],
] as const;

function Tile({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="relative aspect-square w-[26vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-[16vw] md:w-[13vw] lg:w-[10vw]"
      style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
    >
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <Play className="h-5 w-5 fill-white/90 text-white/90" strokeWidth={0} />
      </div>
    </div>
  );
}

export function InstagramStrip() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const tiles = [...TILE_TONES, ...TILE_TONES];

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
          {tiles.map(([from, to], i) => (
            <Tile key={i} from={from} to={to} />
          ))}
        </div>
      </div>
    </section>
  );
}
