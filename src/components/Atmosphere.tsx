import { useEffect, useRef } from "react";
import "./atmosphere.css";
import type { AtmosphereProps } from "./type";

export function Atmosphere({ reduced }: AtmosphereProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let cx = 0.5;
    let cy = 0.12;
    let tx = 0.5;
    let ty = 0.12;

    const apply = () => {
      el.style.setProperty("--ax", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--ay", `${(cy * 100).toFixed(2)}%`);
    };

    const tick = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
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
      tx = event.clientX / window.innerWidth;
      ty = event.clientY / window.innerHeight;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div className={reduced ? "atmosphere is-static" : "atmosphere"} ref={ref} aria-hidden="true">
      <div className="atmosphere-glow" />
      <div className="atmosphere-well" />
      <div className="atmosphere-grid" />
      <div className="atmosphere-film" />
    </div>
  );
}
