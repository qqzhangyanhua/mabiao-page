import { useEffect, useRef, useState } from "react";
import { PLATFORMS, RELEASES_URL, type PlatformId } from "../data";
import { useInView, usePrefersReducedMotion } from "../hooks";
import { DownloadPhysicsStage } from "./DownloadPhysics";
import { Reveal } from "./Reveal";

function detectPlatform(): PlatformId {
  if (typeof navigator === "undefined") return "mac-arm";
  const ua = navigator.userAgent;
  const platform = navigator.platform || "";
  if (/Win/i.test(ua) || /Win/i.test(platform)) return "win";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux";
  if (/Mac/i.test(ua) || /Mac/i.test(platform)) {
    if (/Intel/i.test(platform)) return "mac-intel";
    return "mac-arm";
  }
  return "mac-arm";
}

export function Download() {
  const [primaryId, setPrimaryId] = useState<PlatformId>("mac-arm");
  const [respawnTrigger, setRespawnTrigger] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, inView] = useInView<HTMLDivElement>(0.1);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setPrimaryId(detectPlatform());
  }, []);

  const primary = PLATFORMS.find((item) => item.id === primaryId) ?? PLATFORMS[0];
  const alts = PLATFORMS.filter((item) => item.id !== primary.id);

  const setStageRefs = (node: HTMLDivElement | null) => {
    stageRef.current = node;
    inViewRef.current = node;
  };

  const handleRespawn = () => {
    setRespawnTrigger((prev) => prev + 1);
  };

  return (
    <Reveal className="section download" id="download">
      <div className="download-stage" ref={setStageRefs} id="download-stage">
        <div className="download-stage-ambient" aria-hidden="true" />

        <div className="download-stage-copy">
          <p className="eyebrow download-stage-eyebrow" data-physics-collider>
            下载体验
          </p>
          <h2 data-physics-collider>免费下载</h2>
          <p className="download-stage-lead" data-physics-collider>
            扫描本机各 AI 编程 CLI 的会话数据，归一成「消耗记录」，完全本地优先。
          </p>

          <div className="download-stage-cta" data-physics-collider>
            <a className="btn download-stage-btn" href={RELEASES_URL} rel="noreferrer" target="_blank">
              <span className="btn-glow" aria-hidden="true" />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{primary.cta}</span>
            </a>
          </div>

          <nav className="download-stage-alts" aria-label="其他平台">
            {alts.map((item, i) => (
              <span key={item.id} className="download-alt">
                {i > 0 ? <span className="download-alts-sep" aria-hidden="true">·</span> : null}
                <a href={RELEASES_URL} rel="noreferrer" target="_blank">
                  {item.alt}
                </a>
              </span>
            ))}
          </nav>

          <p className="download-stage-tip">
            macOS 首次打开若提示无法验证，访达里右键打开，或执行{" "}
            <code>xattr -cr "/Applications/Mabiao.app"</code>。
          </p>

          <button
            type="button"
            className="download-stage-hint"
            onClick={handleRespawn}
            title="点击重新掉落球体"
          >
            <span className="replay-icon" aria-hidden="true">↻</span>
            <span>拖拽球体 · 碰撞物理交互 (点击重放)</span>
          </button>
        </div>

        <DownloadPhysicsStage
          stageRef={stageRef}
          inView={inView}
          reduced={reduced}
          respawnTrigger={respawnTrigger}
        />
      </div>
    </Reveal>
  );
}
