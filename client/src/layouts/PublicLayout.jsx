import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useLenis } from "../hooks/useLenis";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppButton } from "../components/layout/WhatsAppButton";
import { ScrollProgressBar } from "../components/layout/ScrollProgressBar";
import { ScrollToTop } from "../components/layout/ScrollToTop";

export function PublicLayout() {
  const lenisRef = useRef(null);
  useLenis(lenisRef);

  return (
    <div className="min-h-screen bg-warm-white">
      <ScrollToTop lenisRef={lenisRef} />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
