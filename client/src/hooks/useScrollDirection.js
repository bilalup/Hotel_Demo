import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState("up");
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setDirection(y > lastY.current && y > 100 ? "down" : "up");
      lastY.current = y;
      ticking.current = false;
    }
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isScrolled, direction };
}
