import { useEffect, useState } from "react";

/*
 * Intro exclusiva para mobile — o bumper real da marca (a logo "vicore"
 * animada em preto, extraída do próprio vídeo do CEO) com um zoom-out
 * cinematográfico. Roda por cima de tudo (inclusive do Preloader, que
 * segue intocado) e se dissolve ao final, revelando o site já pronto.
 * No desktop este componente não renderiza nada.
 */

const CLIP_DURATION_MS = 3900;
const FADE_OUT_DURATION_MS = 550;

export function MobileIntro() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile || reducedMotion) {
      setGone(true);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const fadeTimer = window.setTimeout(() => setFading(true), CLIP_DURATION_MS);
    const doneTimer = window.setTimeout(
      () => setGone(true),
      CLIP_DURATION_MS + FADE_OUT_DURATION_MS,
    );
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [visible]);

  if (!visible || gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[300] overflow-hidden bg-black transition-opacity ease-out md:hidden ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_OUT_DURATION_MS}ms` }}
    >
      <video
        className="mobile-intro-video h-full w-full object-cover"
        src="/videos/mobile-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
