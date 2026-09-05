import { useCallback, useState } from "react";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { Method } from "@/components/Method";
import { Cases } from "@/components/Cases";
import { Testimonials } from "@/components/Testimonials";
import { InstagramStrip } from "@/components/InstagramStrip";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function App() {
  const [introReady, setIntroReady] = useState(false);
  const handleIntroReveal = useCallback(() => setIntroReady(true), []);

  return (
    <main className={`bg-background text-foreground${introReady ? " intro-ready" : ""}`}>
      <Preloader onReveal={handleIntroReveal} />
      <CustomCursor />
      <Header />
      <Hero />
      <Manifesto />
      <Services />
      <Method />
      <Cases />
      <Testimonials />
      <InstagramStrip />
      <FinalCta />
      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}
