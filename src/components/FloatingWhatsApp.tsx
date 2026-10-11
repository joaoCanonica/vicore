import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/links";

export function FloatingWhatsApp() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Siga a Vicore no Instagram"
      className="whatsapp-fab fade-up fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110 md:bottom-8 md:right-8"
      style={{ animationDelay: "1.3s" }}
    >
      <Instagram className="h-6 w-6" strokeWidth={1.75} />
    </a>
  );
}
