import { useEffect, useState } from "react";

/*
 * Preloader Vicore — tela de abertura.
 * Sempre em branco com o wordmark preto, como a marca abre de verdade —
 * independente do tema (claro/escuro) que o visitante tenha escolhido
 * em visitas anteriores. Timeline (~2.4s):
 *   0.00s  tela branca já visível (primeiro paint)
 *   0.10s  wordmark entra em fade + scale
 *   1.65s  tela começa a se dissolver (0.7s de fade-out)
 *   2.35s  sai do DOM, scroll liberado, onReveal() dispara
 */

const FADE_OUT_START_MS = 1650;
const FADE_OUT_DURATION_MS = 700;

export function Preloader({ onReveal }: { onReveal: () => void }) {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), FADE_OUT_START_MS);
    const doneTimer = window.setTimeout(() => {
      setGone(true);
      onReveal();
    }, FADE_OUT_START_MS + FADE_OUT_DURATION_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onReveal]);

  if (gone) return null;

  return (
    <>
      <style>{"html{overflow:hidden}"}</style>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity ease-out ${
          fading ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${FADE_OUT_DURATION_MS}ms`, backgroundColor: "#ffffff" }}
      >
        <span
          className="preloader-mark select-none font-display text-[15vw] font-extrabold lowercase leading-none tracking-[-0.02em] sm:text-[6.5rem]"
          style={{ color: "#0a0a0a" }}
        >
          vicore
          <sup className="ml-1 uppercase text-[0.28em] font-bold tracking-normal">TM</sup>
        </span>
      </div>
    </>
  );
}
