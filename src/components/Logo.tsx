/**
 * Marca Vicore — wordmark fiel ao logotipo oficial (extraído em alta
 * resolução do próprio vídeo da marca): geométrico, peso bem pesado,
 * tracking justo, "TM" sobrescrito. A cor segue o tema (preto no claro,
 * branco no escuro), exatamente como as duas versões reais da marca.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-start ${className}`}>
      <span className="font-display text-[22px] font-extrabold lowercase leading-none tracking-[-0.02em] text-foreground md:text-[25px]">
        vicore
      </span>
      <sup className="ml-[1px] mt-[1px] text-[9px] font-bold leading-none tracking-normal text-foreground md:text-[10px]">
        TM
      </sup>
    </span>
  );
}
