import { useEffect, useRef, useState, useCallback } from "react";

export function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const [node, setNode] = useState(null);
  const started = useRef(false);

  const ref = useCallback((el) => setNode(el), []);

  useEffect(() => {
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(target);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, target, duration]);

  const display = decimals ? value.toFixed(decimals) : Math.round(value);
  return [ref, display];
}
