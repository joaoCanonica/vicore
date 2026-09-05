/**
 * Marca Vicore — anel-gradiente (eco do perfil @_vicore) + wordmark.
 * `mark` sozinho é usado no preloader; `full` combina anel + texto no header.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vicore-ring" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF3D77" />
          <stop offset="0.5" stopColor="#FF7A3D" />
          <stop offset="1" stopColor="#FFC93D" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="27" stroke="url(#vicore-ring)" strokeWidth="6" />
      <circle cx="32" cy="32" r="9" fill="url(#vicore-ring)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
      <span className="font-display text-[17px] font-bold lowercase tracking-tight text-foreground md:text-lg">
        vicore
      </span>
    </span>
  );
}
