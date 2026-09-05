import { Heart, MessageCircle, Send, Play } from "lucide-react";

const TONES = {
  a: ["#2b2b2b", "#141414"],
  b: ["#232323", "#0a0a0a"],
  c: ["#333333", "#161616"],
} as const;

/**
 * Mockup de reels — reaproveitado no Hero e em Cases.
 * Fake UI de vídeo vertical: barra de progresso estilo stories,
 * legenda no rodapé e ações laterais. Tudo em preto e branco,
 * fiel à paleta da marca — sem fotos de banco nem cor decorativa.
 */
export function PhoneMock({
  caption,
  tag,
  tone = "a",
  className = "",
}: {
  caption: string;
  tag: string;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const [from, to] = TONES[tone];

  return (
    <div
      className={`relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] border border-white/12 ${className}`}
      style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)` }}
    >
      {/* textura + vinheta pra parecer frame de vídeo, não card plano */}
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,rgba(0,0,0,0.6)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.65),transparent_40%)]" />

      {/* barra de progresso estilo stories */}
      <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <span
              className="block h-full rounded-full bg-white"
              style={{ width: i === 0 ? "100%" : "0%" }}
            />
          </span>
        ))}
      </div>

      {/* tag flutuante */}
      <div className="absolute left-3 top-8 z-10 rounded-full bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
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
