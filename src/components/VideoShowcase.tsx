import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Vídeo real da Vicore — sem UI falsa por cima (o próprio vídeo já
 * traz legenda e identificação queimadas). Controles mínimos de
 * play/som no canto, estilo player premium.
 *
 * `autoManage` liga o autoplay/pause ao IntersectionObserver — para
 * quando o card sai da tela, essencial numa galeria com vários vídeos
 * ao mesmo tempo (evita 10 vídeos baixando/tocando juntos).
 */
export function VideoShowcase({
  src,
  poster,
  className = "",
  autoManage = false,
  hoverControls = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  autoManage?: boolean;
  hoverControls?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(!autoManage);

  useEffect(() => {
    if (!autoManage) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setPlaying(true);
          } else {
            video.pause();
            setPlaying(false);
          }
        });
      },
      { threshold: 0.55 },
    );

    io.observe(container);
    return () => io.disconnect();
  }, [autoManage]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] border border-border bg-card",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={!autoManage}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="h-full w-full cursor-pointer object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      <div
        className={cn(
          "absolute bottom-3 right-3 z-10 flex gap-2 transition-opacity duration-300",
          hoverControls && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
        )}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" strokeWidth={0} fill="currentColor" />
          ) : (
            <Play className="h-3.5 w-3.5 translate-x-[1px]" strokeWidth={0} fill="currentColor" />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar vídeo"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <Volume2 className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>
    </div>
  );
}
