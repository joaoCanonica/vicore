import { useCallback, useState } from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import { MobileIntro } from "@/components/MobileIntro";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { Method } from "@/components/Method";
import { Work } from "@/components/Work";
import { InstagramStrip } from "@/components/InstagramStrip";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function App() {
  const [introReady, setIntroReady] = useState(false);
  const handleIntroReveal = useCallback(() => setIntroReady(true), []);

  return (
    <ThemeProvider>
      <div
        data-app-root
        className={`bg-background text-foreground${introReady ? " intro-ready" : ""}`}
      >
        <MobileIntro />
        <Preloader onReveal={handleIntroReveal} />
        <CustomCursor />
        <Header />
        <main id="conteudo">
          <Hero />
          <Manifesto />
          <Services />
          <Method />
          <Work />
          <InstagramStrip />
          <FinalCta />
        </main>
        <FloatingWhatsApp />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
