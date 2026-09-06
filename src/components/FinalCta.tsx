import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { DIAGNOSTIC_FORM_URL, WHATSAPP_URL } from "@/lib/links";

export function FinalCta() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="contato"
      ref={sectionRef}
      aria-label="Contato Vicore"
      className="relative overflow-hidden bg-background px-5 py-[18vh] text-center md:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--color-foreground), transparent 70%)" }}
      />

      <p className="eyebrow reveal-card mb-10" data-reveal="card">
        O próximo passo
      </p>

      <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight">
        <span className="block overflow-hidden">
          <span
            data-reveal="line"
            className="block text-[clamp(2rem,6vw,5rem)] text-foreground"
          >
            Seu perfil pode
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-reveal="line"
            className="block text-[clamp(2rem,6vw,5rem)] text-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            vender por você
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-reveal="line"
            className="block text-[clamp(2rem,6vw,5rem)] text-accent"
            style={{ animationDelay: "0.2s" }}
          >
            em 90 dias.
          </span>
        </span>
      </h2>

      <p
        data-reveal="card"
        className="reveal-card mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
        style={{ transitionDelay: "0.25s" }}
      >
        Preencha o diagnóstico gratuito e descubra exatamente o que falta pro
        seu conteúdo virar posicionamento — e o posicionamento virar venda.
      </p>

      <div
        data-reveal="card"
        className="reveal-card mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        style={{ transitionDelay: "0.35s" }}
      >
        <a
          href={DIAGNOSTIC_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid group inline-flex w-full items-center justify-center gap-2 rounded-full px-10 py-5 text-[13px] font-semibold sm:w-auto"
        >
          Quero meu diagnóstico grátis
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost inline-flex w-full items-center justify-center gap-2 rounded-full px-10 py-5 text-[13px] font-semibold text-foreground sm:w-auto"
        >
          Falar no WhatsApp
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        </a>
      </div>
    </section>
  );
}
