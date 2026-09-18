import { useEffect, useRef, type ReactNode } from "react";
import Matter from "matter-js";
import { SOURCE_LOGO_MARKS } from "./sourceMarks";
import type { SourceLogoId } from "./type";

export type PhysicsModel = {
  id: string;
  label: string;
  bg: string;
  fg: string;
  mark: string;
  logoId?: SourceLogoId;
};

export const PHYSICS_MODELS: PhysicsModel[] = [
  { id: "openai", label: "OpenAI", bg: "#10a37f", fg: "#ffffff", mark: "OA", logoId: "codex" },
  { id: "claude", label: "Claude", bg: "#d97757", fg: "#ffffff", mark: "C", logoId: "claude" },
  { id: "cursor", label: "Cursor", bg: "#18181b", fg: "#ffffff", mark: "Cur", logoId: "cursor" },
  { id: "gemini", label: "Gemini", bg: "#4b8bfd", fg: "#ffffff", mark: "G", logoId: "gemini" },
  { id: "deepseek", label: "DeepSeek", bg: "#4d6bfe", fg: "#ffffff", mark: "DS", logoId: "dsh" },
  { id: "qwen", label: "Qwen", bg: "#615ced", fg: "#ffffff", mark: "Q", logoId: "qwen" },
  { id: "grok", label: "Grok", bg: "#111111", fg: "#ffffff", mark: "X", logoId: "grok" },
  { id: "kimi", label: "Kimi", bg: "#1a1a1a", fg: "#ffffff", mark: "K", logoId: "kimi" },
  { id: "copilot", label: "Copilot", bg: "#24292f", fg: "#ffffff", mark: "CP", logoId: "copilot" },
  { id: "mistral", label: "Mistral", bg: "#fa520f", fg: "#ffffff", mark: "M" },
  { id: "ollama", label: "Ollama", bg: "#ececec", fg: "#111111", mark: "Ol" },
  { id: "minimax", label: "MiniMax", bg: "#ed1c24", fg: "#ffffff", mark: "MM" },
  { id: "doubao", label: "Doubao", bg: "#2b5cff", fg: "#ffffff", mark: "豆" },
];

const RADIUS = 28;

type DownloadPhysicsStageProps = {
  stageRef: React.RefObject<HTMLDivElement | null>;
  inView: boolean;
  reduced: boolean;
  respawnTrigger?: number;
};

export function DownloadPhysicsStage({
  stageRef,
  inView,
  reduced,
  respawnTrigger = 0,
}: DownloadPhysicsStageProps): ReactNode {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const ballElsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const stage = stageRef.current;
    if (!layer || !stage) return;

    const ballEls = ballElsRef.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (ballEls.length === 0) return;

    // Prefers reduced motion fallback: neatly align static balls at the bottom
    if (reduced) {
      const place = () => {
        const width = layer.clientWidth;
        const height = layer.clientHeight;
        const n = ballEls.length;
        const gap = Math.min(56, Math.max(44, 224 / Math.max(n - 1, 1)));
        const start = (width - gap * (n - 1)) / 2;
        const y = height - RADIUS - 20;
        ballEls.forEach((el, i) => {
          el.style.transform = `translate3d(${start + i * gap - RADIUS}px, ${y - RADIUS}px, 0)`;
        });
      };
      place();
      window.addEventListener("resize", place);
      return () => window.removeEventListener("resize", place);
    }

    // Only activate simulation once inView
    if (!inView) return;

    const { Engine, World, Bodies, Body, Constraint, Events, Runner } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 1.05 } });
    engine.world.gravity.scale = 0.001;

    let W = Math.max(layer.clientWidth, 1);
    let H = Math.max(layer.clientHeight, 1);

    const wallOpts = {
      isStatic: true,
      friction: 0.55,
      frictionStatic: 0.7,
      restitution: 0.3,
      label: "wall",
    };

    const floor = Bodies.rectangle(W / 2, H + 60, 8000, 120, wallOpts);
    const left = Bodies.rectangle(-60, H / 2, 120, 8000, wallOpts);
    const right = Bodies.rectangle(W + 60, H / 2, 120, 8000, wallOpts);
    const ceiling = Bodies.rectangle(W / 2, -600, 8000, 120, wallOpts);
    World.add(engine.world, [floor, left, right, ceiling]);

    function rectsOf(el: HTMLElement): DOMRect[] {
      const text = (el.textContent ?? "").trim();
      if (el.childElementCount === 0 && text.length > 0) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = Array.from(range.getClientRects()).filter((r) => r.width >= 2 && r.height >= 2);
        range.detach();
        if (rects.length) return rects;
      }
      const box = el.getBoundingClientRect();
      return box.width < 2 || box.height < 2 ? [] : [box];
    }

    function toLocal(rect: DOMRect, origin: DOMRect) {
      return {
        x: rect.left - origin.left + rect.width / 2,
        y: rect.top - origin.top + rect.height / 2,
        w: rect.width,
        h: rect.height,
      };
    }

    function makeCollider(x: number, y: number, w: number, h: number, label: string) {
      const chamfer = Math.max(0, Math.min(10, h / 2 - 1, w / 2 - 1));
      return Bodies.rectangle(x, y, w, h, {
        friction: 0.9,
        frictionStatic: 0.98,
        restitution: 0.22,
        chamfer: chamfer > 0 ? { radius: chamfer } : undefined,
        label,
      });
    }

    let staticColliders: Matter.Body[] = [];
    let pinned: {
      el: HTMLElement;
      body: Matter.Body;
      pin: Matter.Constraint;
      restX: number;
      restY: number;
    }[] = [];

    function clearColliders() {
      if (staticColliders.length) {
        World.remove(engine.world, staticColliders);
        staticColliders = [];
      }
      for (const item of pinned) {
        World.remove(engine.world, item.pin);
        World.remove(engine.world, item.body);
        item.el.style.transform = "";
      }
      pinned = [];
    }

    function rebuildColliders() {
      clearColliders();
      if (!layer || !stage) return;
      const origin = layer.getBoundingClientRect();
      const statics: Matter.Body[] = [];
      let idx = 0;

      stage.querySelectorAll("[data-physics-collider]").forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const isTextOnly = node.childElementCount === 0 && (node.textContent ?? "").trim().length > 0;
        if (isTextOnly) return;
        for (const rect of rectsOf(node)) {
          const { x, y, w, h } = toLocal(rect, origin);
          const body = makeCollider(x, y, w, h, `static-collider-${idx++}`);
          Body.setStatic(body, true);
          statics.push(body);
        }
      });
      staticColliders = statics;
      if (statics.length) World.add(engine.world, statics);

      const origin2 = layer.getBoundingClientRect();
      const pins: typeof pinned = [];
      let p = 0;

      stage.querySelectorAll("[data-physics-collider]").forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const isTextOnly = node.childElementCount === 0 && (node.textContent ?? "").trim().length > 0;
        if (!isTextOnly) return;

        node.style.transform = "";
        node.style.transformOrigin = "center center";
        node.style.willChange = "transform";
        node.style.transition = "none";
        const boxes = rectsOf(node);
        if (!boxes.length) return;

        const parts = boxes.map((rect, i) => {
          const { x, y, w, h } = toLocal(rect, origin2);
          return makeCollider(x, y, w, h, `text-part-${p}-${i}`);
        });

        const body =
          parts.length === 1
            ? parts[0]
            : Body.create({
                parts,
                friction: 0.9,
                frictionStatic: 0.98,
                restitution: 0.22,
                label: `text-collider-${p}`,
              });

        Body.setDensity(body, 0.022);
        Body.setInertia(body, Math.max(body.inertia * 0.55, 1600));
        body.friction = 0.9;
        body.frictionStatic = 0.98;
        body.restitution = 0.12;
        body.frictionAir = 0.08;
        body.slop = 0.05;

        const pin = Constraint.create({
          pointA: { x: body.position.x, y: body.position.y },
          bodyB: body,
          pointB: { x: 0, y: 0 },
          stiffness: 0.42,
          damping: 0.5,
          length: 0,
        });

        pins.push({ el: node, body, pin, restX: body.position.x, restY: body.position.y });
        p += 1;
      });

      pinned = pins;
      for (const item of pins) World.add(engine.world, [item.body, item.pin]);
    }

    rebuildColliders();
    const rafId = requestAnimationFrame(rebuildColliders);

    // Spawn balls
    const spawnX = W / 2;
    const spread = Math.min(220, 0.4 * W);
    const balls = PHYSICS_MODELS.map((model, i) => {
      const x = spawnX + (Math.random() - 0.5) * spread;
      const y = -70 - 42 * i - 28 * Math.random();
      const body = Bodies.circle(x, y, RADIUS, {
        restitution: 0.55,
        friction: 0.45,
        frictionStatic: 0.6,
        frictionAir: 0.014,
        density: 0.0022,
        label: model.id,
      });
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.8, y: 0.4 * Math.random() });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      return body;
    });

    World.add(engine.world, balls);
    const ballSet = new Set(balls);

    function localPoint(clientX: number, clientY: number) {
      const box = layer!.getBoundingClientRect();
      return { x: clientX - box.left, y: clientY - box.top };
    }

    let drag: {
      constraint: Matter.Constraint;
      body: Matter.Body;
      lastX: number;
      lastY: number;
      lastT: number;
      vx: number;
      vy: number;
    } | null = null;

    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const pt = localPoint(e.clientX, e.clientY);
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.vx = ((pt.x - drag.lastX) / dt) * 16.67;
      drag.vy = ((pt.y - drag.lastY) / dt) * 16.67;
      drag.lastX = pt.x;
      drag.lastY = pt.y;
      drag.lastT = now;
      drag.constraint.pointA = pt;
    };

    const cleanups: (() => void)[] = [];

    ballEls.forEach((el, i) => {
      const onDown = (e: PointerEvent) => {
        const body = balls[i];
        if (!el || !body) return;
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        el.style.cursor = "grabbing";
        if (drag) {
          World.remove(engine.world, drag.constraint);
          drag = null;
        }
        const pt = localPoint(e.clientX, e.clientY);
        Body.setAngularVelocity(body, 0);
        const constraint = Constraint.create({
          pointA: pt,
          bodyB: body,
          pointB: { x: pt.x - body.position.x, y: pt.y - body.position.y },
          stiffness: 0.18,
          damping: 0.12,
          length: 0,
        });
        World.add(engine.world, constraint);
        drag = {
          constraint,
          body,
          lastX: pt.x,
          lastY: pt.y,
          lastT: performance.now(),
          vx: 0,
          vy: 0,
        };
      };

      const onUp = () => {
        el.style.cursor = "grab";
        if (!drag) return;
        World.remove(engine.world, drag.constraint);
        Body.setVelocity(drag.body, {
          x: Math.max(-28, Math.min(28, 0.85 * drag.vx)),
          y: Math.max(-28, Math.min(28, 0.85 * drag.vy)),
        });
        drag = null;
      };

      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);

      cleanups.push(() => {
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
      });
    });

    const onCollisionStart = (evt: Matter.IEventCollision<Matter.Engine>) => {
      for (const pair of evt.pairs) {
        const pinnedHit = pinned.find(
          (p) =>
            p.body === pair.bodyA ||
            p.body === pair.bodyB ||
            p.body.parts.includes(pair.bodyA) ||
            p.body.parts.includes(pair.bodyB),
        );
        const ball = ballSet.has(pair.bodyA)
          ? pair.bodyA
          : ballSet.has(pair.bodyB)
            ? pair.bodyB
            : null;
        if (!pinnedHit || !ball) continue;
        const support = pair.collision.supports[0];
        const offsetX = (support?.x ?? ball.position.x) - pinnedHit.body.position.x;
        const speed = Math.hypot(ball.velocity.x, ball.velocity.y);
        if (speed < 0.4) continue;
        const spin =
          Math.min(0.035, 0.004 * speed) * (offsetX >= 0 ? 1 : -1) * Math.sign(ball.velocity.y || 1);
        Body.setAngularVelocity(pinnedHit.body, pinnedHit.body.angularVelocity + spin);
        const force = Math.min(0.02, 0.0015 * speed);
        Body.applyForce(pinnedHit.body, pinnedHit.body.position, {
          x: ball.velocity.x * force * 0.001,
          y: Math.min(ball.velocity.y, 8) * force * 0.001,
        });
      }
    };

    const onBeforeUpdate = () => {
      const g = engine.gravity ?? engine.world.gravity;
      const gy = g.y * (g.scale ?? 0.001);
      for (const item of pinned) {
        Body.applyForce(item.body, item.body.position, { x: 0, y: -item.body.mass * gy });
        const nextSpin = 0.93 * item.body.angularVelocity - 0.22 * item.body.angle;
        Body.setAngularVelocity(item.body, nextSpin);
        if (Math.abs(item.body.angle) > 0.1) {
          Body.setAngle(item.body, 0.1 * Math.sign(item.body.angle));
          Body.setAngularVelocity(item.body, 0.35 * item.body.angularVelocity);
        }
        const dx = item.body.position.x - item.restX;
        const dy = item.body.position.y - item.restY;
        const dist = Math.hypot(dx, dy);
        if (dist > 5) {
          const t = 5 / dist;
          Body.setPosition(item.body, { x: item.restX + dx * t, y: item.restY + dy * t });
          Body.setVelocity(item.body, { x: item.body.velocity.x * 0.5, y: item.body.velocity.y * 0.5 });
        }
      }
    };

    const sync = () => {
      for (let i = 0; i < balls.length; i++) {
        const body = balls[i];
        const el = ballEls[i];
        if (!body || !el) continue;
        const { x, y } = body.position;
        el.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0) rotate(${body.angle}rad)`;
      }
      for (const item of pinned) {
        const dx = item.body.position.x - item.restX;
        const dy = item.body.position.y - item.restY;
        item.el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${item.body.angle}rad)`;
      }
    };

    Events.on(engine, "collisionStart", onCollisionStart);
    Events.on(engine, "beforeUpdate", onBeforeUpdate);
    Events.on(engine, "afterUpdate", sync);

    const runner = Runner.create();
    Runner.run(runner, engine);
    sync();

    const ro = new ResizeObserver(() => {
      if (!layer) return;
      W = Math.max(layer.clientWidth, 1);
      H = Math.max(layer.clientHeight, 1);
      Body.setPosition(floor, { x: W / 2, y: H + 60 });
      Body.setPosition(left, { x: -60, y: H / 2 });
      Body.setPosition(right, { x: W + 60, y: H / 2 });
      Body.setPosition(ceiling, { x: W / 2, y: -600 });
      rebuildColliders();
      for (const body of balls) {
        const x = Math.min(Math.max(body.position.x, 32), W - RADIUS - 4);
        const y = Math.min(Math.max(body.position.y, 32), H - RADIUS - 4);
        if (x !== body.position.x || y !== body.position.y) Body.setPosition(body, { x, y });
      }
    });
    ro.observe(layer);
    ro.observe(stage);

    return () => {
      cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
      ro.disconnect();
      if (drag) {
        World.remove(engine.world, drag.constraint);
      }
      Events.off(engine, "collisionStart", onCollisionStart);
      Events.off(engine, "beforeUpdate", onBeforeUpdate);
      Events.off(engine, "afterUpdate", sync);
      Runner.stop(runner);
      clearColliders();
      World.remove(engine.world, balls);
      World.remove(engine.world, [floor, left, right, ceiling]);
      Engine.clear(engine);
    };
  }, [stageRef, inView, reduced, respawnTrigger]);

  return (
    <div className="download-physics-layer" ref={layerRef} aria-hidden="true">
      {PHYSICS_MODELS.map((model, i) => (
        <div
          key={model.id}
          ref={(node) => {
            ballElsRef.current[i] = node;
          }}
          className="download-ball"
          title={model.label}
          data-model={model.id}
        >
          <span className="download-ball-badge" style={{ background: model.bg, color: model.fg }}>
            {model.logoId && SOURCE_LOGO_MARKS[model.logoId] ? (
              <svg
                viewBox={SOURCE_LOGO_MARKS[model.logoId].viewBox}
                fill="currentColor"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                {SOURCE_LOGO_MARKS[model.logoId].body}
              </svg>
            ) : (
              model.mark
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
