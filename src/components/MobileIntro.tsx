import { useEffect, useRef, useState } from "react";

/*
 * Intro exclusiva para mobile — o bumper real da marca (a logo "vicore"
 * extraída do próprio vídeo do CEO, com as cores invertidas para fundo
 * branco e escrita preta, igual ao Preloader do desktop) com um zoom-out
 * cinematográfico. Roda por cima de tudo (inclusive do Preloader, que
 * segue intocado) e se dissolve ao final, revelando o site já pronto.
 * No desktop este componente não renderiza nada.
 *
 * Blindada contra autoplay bloqueado (comum no Safari do iPhone — modo
 * de baixo consumo, ajuste de "Auto-Play" do navegador, etc.): se o
 * vídeo não começar a tocar de verdade em pouco tempo, a intro é
 * dispensada na hora em vez de deixar a tela parada e sem resposta.
 * Tocar em qualquer lugar da intro também pula ela na hora.
 */

const CLIP_DURATION_MS = 3900;
const FADE_OUT_DURATION_MS = 400;
const AUTOPLAY_GRACE_MS = 700;

export function MobileIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
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
    const video = videoRef.current;

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      setFading(true);
      window.setTimeout(() => setGone(true), FADE_OUT_DURATION_MS);
    };

    if (!video) {
      dismiss();
      return;
    }

    // Alguns navegadores (Safari em modo de baixo consumo, ajustes de
    // "nunca reproduzir automaticamente") rejeitam o play() silenciosamente.
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(dismiss);
    }

    // Se, mesmo sem rejeitar a Promise, o vídeo não estiver realmente
    // tocando pouco depois, não deixa a tela parada esperando por nada.
    const graceTimer = window.setTimeout(() => {
      if (video.paused || video.readyState < 2) dismiss();
    }, AUTOPLAY_GRACE_MS);

    const maxTimer = window.setTimeout(dismiss, CLIP_DURATION_MS);

    video.addEventListener("ended", dismiss);
    video.addEventListener("error", dismiss);
    video.addEventListener("stalled", dismiss);

    return () => {
      window.clearTimeout(graceTimer);
      window.clearTimeout(maxTimer);
      video.removeEventListener("ended", dismiss);
      video.removeEventListener("error", dismiss);
      video.removeEventListener("stalled", dismiss);
    };
  }, [visible]);

  if (!visible || gone) return null;

  const skip = () => {
    setFading(true);
    window.setTimeout(() => setGone(true), FADE_OUT_DURATION_MS);
  };

  return (
    <>
      {/* Trava o scroll enquanto a intro cobre a tela — o Preloader libera
          o scroll aos 2.35s, antes da intro terminar, então essa trava
          própria evita que o site role por baixo do overlay. */}
      <style>{"html{overflow:hidden}"}</style>
      <div
        role="button"
        tabIndex={-1}
        aria-label="Pular introdução"
        onClick={skip}
        className={`fixed inset-0 z-[300] overflow-hidden bg-white transition-opacity ease-out md:hidden ${
          fading ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${FADE_OUT_DURATION_MS}ms` }}
      >
        <video
          ref={videoRef}
          className="mobile-intro-video h-full w-full object-cover"
          src="/videos/mobile-intro.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
}
