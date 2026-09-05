import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/*
 * Preloader Vicore — tela de abertura.
 * Timeline (~2.6s):
 *   0.00s  tela preta já visível (primeiro paint)
 *   0.10s  anel entra em fade + scale
 *   1.85s  tela começa a se dissolver (0.75s de fade-out)
 *   2.60s  sai do DOM, scroll liberado, onReveal() dispara
 */

const FADE_OUT_START_MS = 1850;
const FADE_OUT_DURATION_MS = 750;

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
        className={`fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity ease-out ${
          fading ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${FADE_OUT_DURATION_MS}ms` }}
      >
        <LogoMark size={56} className="preloader-mark select-none" />
      </div>
    </>
  );
}
