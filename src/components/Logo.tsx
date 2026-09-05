/**
 * Marca Vicore — wordmark preto/branco fiel ao logotipo oficial.
 * `LogoMark` é o monograma usado no favicon e no preloader;
 * `Logo` é o wordmark completo usado no header e no footer.
 */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[28%] bg-foreground font-display font-bold lowercase text-background ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.56 }}
    >
      v
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-0.5 ${className}`}>
      <span className="font-display text-[19px] font-semibold lowercase tracking-tight text-foreground md:text-[21px]">
        vicore
      </span>
      <sup className="text-[8px] font-medium tracking-normal text-muted-foreground">
        TM
      </sup>
    </span>
  );
}
