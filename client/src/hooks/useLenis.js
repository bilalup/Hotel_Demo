import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis(externalRef) {
  const internalRef = useRef(null);
  const lenisRef = externalRef || internalRef;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lenisRef]);

  return lenisRef;
}
