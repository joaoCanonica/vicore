import { useEffect, useRef } from "react";

/**
 * Reveal on scroll: elementos com [data-reveal="line"] ganham .reveal-line
 * (máscara de linha), elementos com [data-reveal="card"] ganham .is-visible
 * (fade + subida). Um único IntersectionObserver por seção.
 */
export function useScrollReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add(el.dataset["reveal"] === "line" ? "reveal-line" : "is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
