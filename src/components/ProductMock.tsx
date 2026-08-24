import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, usePointerTilt, usePrefersReducedMotion, useScrollFold, useSlidingIndicator } from "../hooks";
import { AppLogo } from "./AppLogo";

type TabKey = "overview" | "timeline" | "events";

const TABS: TabKey[] = ["overview", "timeline", "events"];

const tabImages: Record<TabKey, { src: string; alt: string; width: number; height: number }> = {
  overview: {
    src: "/app-preview.png",
    alt: "码表应用界面预览 — 全局 Token 使用概览、日均用量、费用估算与官方额度监控",
    width: 2132,
    height: 1382,
  },
  timeline: {
    src: "/timeline-preview.png",
    alt: "码表工作时间线界面 — 记录每日 AI 片段分布、累计执行时长与并行强度",
    width: 2146,
    height: 1392,
  },
  events: {
    src: "/events-preview.png",
    alt: "码表完整事件流界面 — 深入对话记录，按序展示用户提问、思考规划 (agent_thought) 与工具执行",
    width: 2160,
    height: 1392,
  },
};

const tabLabels: Record<TabKey, string> = {
  overview: "概览",
  timeline: "时间线",
  events: "事件流",
};

export function ProductMock() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduced = usePrefersReducedMotion();
  const [stageRef, inView] = useInView<HTMLDivElement>(0.15);
  const tiltRef = usePointerTilt<HTMLDivElement>(!reduced);
  const [foldRef, fold] = useScrollFold<HTMLDivElement>(!reduced);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabPill = useSlidingIndicator(tabsRef, `button[data-tab="${activeTab}"]`);

  const setRefs = (node: HTMLDivElement | null) => {
    stageRef.current = node;
    tiltRef.current = node;
  };

  useEffect(() => {
    if (reduced || paused || !inView) return;
    const id = window.setInterval(() => {
      setActiveTab((current) => TABS[(TABS.indexOf(current) + 1) % TABS.length]);
      setCycle((n) => n + 1);
    }, 5200);
    return () => window.clearInterval(id);
  }, [reduced, paused, inView, activeTab]);

  const selectTab = (key: TabKey) => {
    setActiveTab(key);
    setPaused(true);
    setCycle((n) => n + 1);
  };

  const foldStyle = reduced
    ? undefined
    : ({
        transform: `perspective(1600px) rotateX(${(fold * 22).toFixed(2)}deg) rotateZ(${(-fold * 6).toFixed(2)}deg) scale(${(1 - fold * 0.06).toFixed(3)})`,
      } as CSSProperties);

  return (
    <div
      className={inView ? "mock-stage mock-ready" : "mock-stage"}
      ref={setRefs}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mock-glow" aria-hidden="true" />
      <div className="mock-frame" ref={foldRef} style={foldStyle}>
        <div className="mock-float">
          <figure className="mock">
            <div className="mock-titlebar" aria-hidden="true">
              <div className="mock-traffic-lights">
                <span className="tl-btn tl-close" />
                <span className="tl-btn tl-min" />
                <span className="tl-btn tl-max" />
              </div>
              <div className="mock-titlebar-title">
                <AppLogo size={14} className="mock-titlebar-logo" />
                <span>码表 Mabiao — 本地 AI 算力与消耗看板</span>
              </div>
              <div className="mock-titlebar-status">
                <span className="mock-status-dot" />
                <span>本地 SQLite 只读</span>
              </div>
            </div>

            <div className="mock-window">
              <div className="mock-stack">
                <img
                  className="mock-sizer"
                  src={tabImages.overview.src}
                  alt=""
                  width={tabImages.overview.width}
                  height={tabImages.overview.height}
                  aria-hidden="true"
                />
                {TABS.map((key) => {
                  const image = tabImages[key];
                  return (
                    <img
                      key={key}
                      src={image.src}
                      alt={key === activeTab ? image.alt : ""}
                      className={key === activeTab ? "mock-image is-on" : "mock-image"}
                      width={image.width}
                      height={image.height}
                      loading={key === "overview" ? "eager" : "lazy"}
                      decoding="async"
                    />
                  );
                })}
              </div>
            </div>
          </figure>
        </div>
      </div>

      <div className="mock-tabs-wrap">
        <div className="mock-tabs" role="tablist" aria-label="界面预览切换" ref={tabsRef}>
          <span
            className={tabPill.visible ? "mock-tab-pill on" : "mock-tab-pill"}
            style={{
              width: tabPill.width,
              height: tabPill.height,
              transform: `translate3d(${tabPill.x}px, ${tabPill.y}px, 0)`,
              transition: reduced || !tabPill.animate ? "none" : undefined,
            }}
            aria-hidden="true"
          />
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              data-tab={key}
              aria-selected={activeTab === key}
              className={`mock-tab-btn ${activeTab === key ? "active" : ""}`}
              onClick={() => selectTab(key)}
            >
              {tabLabels[key]}
            </button>
          ))}
          {!reduced && inView && !paused ? <span key={cycle} className="mock-tab-progress" aria-hidden="true" /> : null}
        </div>
      </div>
    </div>
  );
}
