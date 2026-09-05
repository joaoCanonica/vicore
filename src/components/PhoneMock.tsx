import { Heart, MessageCircle, Send, Play } from "lucide-react";

/**
 * Mockup de reels — reaproveitado no Hero e em Cases.
 * Fake UI de vídeo vertical: barra de progresso estilo stories,
 * legenda no rodapé e ações laterais. Tudo desenhado em CSS/SVG,
 * sem fotos de banco — evita o clichê de stock photo de "empresário sorrindo".
 */
export function PhoneMock({
  caption,
  tag,
  gradientFrom = "var(--grad-1)",
  gradientVia = "var(--grad-2)",
  gradientTo = "var(--grad-3)",
  className = "",
}: {
  caption: string;
  tag: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] border border-white/10 ${className}`}
      style={{
        background: `linear-gradient(155deg, ${gradientFrom} 0%, ${gradientVia} 52%, ${gradientTo} 100%)`,
      }}
    >
      {/* textura + vinheta pra parecer frame de vídeo, não card plano */}
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),transparent_38%)]" />

      {/* barra de progresso estilo stories */}
      <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
            <span
              className="block h-full rounded-full bg-white"
              style={{ width: i === 0 ? "100%" : "0%" }}
            />
          </span>
        ))}
      </div>

      {/* tag flutuante */}
      <div className="absolute left-3 top-8 z-10 rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
        {tag}
      </div>

      {/* play central discreto */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Play className="h-5 w-5 fill-white text-white" strokeWidth={0} />
        </span>
      </div>

      {/* ações laterais estilo reels */}
      <div className="absolute bottom-16 right-3 z-10 flex flex-col items-center gap-4 text-white">
        <span className="flex flex-col items-center gap-1">
          <Heart className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-[10px] font-semibold">2.4k</span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-[10px] font-semibold">318</span>
        </span>
        <Send className="h-5 w-5" strokeWidth={1.75} />
      </div>

      {/* legenda */}
      <p className="absolute inset-x-4 bottom-4 z-10 pr-8 text-[13px] font-medium leading-snug text-white">
        {caption}
      </p>
    </div>
  );
}
