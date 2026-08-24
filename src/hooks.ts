import { useEffect, useRef, useState, type RefObject } from "react";
import type { SlidingIndicator } from "./components/type";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function useInView<T extends HTMLElement>(
  threshold = 0.2,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}

export function useScrolled(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > offset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

export function usePointerTilt<T extends HTMLElement>(
  enabled: boolean,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const glow = el.querySelector<HTMLElement>(".mock-glow");
    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      el.style.transform = `perspective(1400px) rotateY(${(cx * 1.6).toFixed(3)}deg) rotateX(${(-cy * 1.6).toFixed(3)}deg)`;
      if (glow) {
        // Keep CSS hover scale(1.05) composable: only set --glow-shift, not transform
        glow.style.setProperty("--glow-shift-x", `${(cx * 6).toFixed(2)}px`);
        glow.style.setProperty("--glow-shift-y", `${(cy * 6).toFixed(2)}px`);
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      apply();
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        cx = tx;
        cy = ty;
        apply();
      }
    };

    const kick = () => {
      if (raf === 0) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      tx = Math.max(-1, Math.min(1, nx));
      ty = Math.max(-1, Math.min(1, ny));
      kick();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
      if (glow) {
        glow.style.removeProperty("--glow-shift-x");
        glow.style.removeProperty("--glow-shift-y");
      }
    };
  }, [enabled]);

  return ref;
}

export function useDocumentPointerSpot(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-spot]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${(event.clientX - rect.left).toFixed(1)}px`);
      card.style.setProperty("--spot-y", `${(event.clientY - rect.top).toFixed(1)}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, [enabled]);
}

export function useActiveSection(ids: readonly string[], offset = 96): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.scrollY < 72) {
        setActive(null);
        return;
      }
      const y = window.scrollY + offset;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, offset]);

  return active;
}

const HIDDEN_INDICATOR: SlidingIndicator = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  visible: false,
  animate: false,
};

export function useSlidingIndicator(
  containerRef: RefObject<HTMLElement | null>,
  activeSelector: string | null,
): SlidingIndicator {
  const [box, setBox] = useState<SlidingIndicator>(HIDDEN_INDICATOR);
  const seen = useRef(false);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || !activeSelector) {
      setBox((prev) => ({ ...prev, visible: false, animate: false }));
      return;
    }

    const measure = () => {
      const el = root.querySelector<HTMLElement>(activeSelector);
      if (!el) {
        setBox((prev) => ({ ...prev, visible: false, animate: false }));
        return;
      }
      const cr = root.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const animate = seen.current;
      seen.current = true;
      setBox({
        x: er.left - cr.left,
        y: er.top - cr.top,
        width: er.width,
        height: er.height,
        visible: true,
        animate,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, activeSelector]);

  return box;
}


export function useScrollFold<T extends HTMLElement>(
  enabled: boolean,
): [RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [fold, setFold] = useState(enabled ? 1 : 0);

  useEffect(() => {
    if (!enabled) {
      setFold(0);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const docTop = rect.top + window.scrollY;
      // First view is fully tilted (fold=1). Scroll distance un-tilts it.
      const travel = Math.min(vh * 0.95, Math.max(vh * 0.65, docTop - vh * 0.16));
      const progress = window.scrollY / travel;
      setFold(1 - Math.max(0, Math.min(1, progress)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return [ref, fold];
}

export function useCountUp(target: number, play: boolean, duration = 920): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target, duration]);

  return value;
}
