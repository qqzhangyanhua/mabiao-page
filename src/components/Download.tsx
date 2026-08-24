import { useEffect, useState } from "react";
import { PLATFORMS, RELEASES_URL, type PlatformId } from "../data";
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

  useEffect(() => {
    setPrimaryId(detectPlatform());
  }, []);

  const primary = PLATFORMS.find((item) => item.id === primaryId) ?? PLATFORMS[0];
  const alts = PLATFORMS.filter((item) => item.id !== primary.id);

  return (
    <Reveal className="section download" id="download">
      <div className="section-head">
        <p className="eyebrow">下载体验</p>
        <h2>免费下载</h2>
      </div>
      <div className="download-cta">
        <a className="btn" href={RELEASES_URL} rel="noreferrer" target="_blank">
          <span className="btn-glow" aria-hidden="true" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{primary.cta}</span>
        </a>
        <nav className="download-alts" aria-label="其他平台">
          {alts.map((item, i) => (
            <span key={item.id} className="download-alt">
              {i > 0 ? <span className="download-alts-sep" aria-hidden="true">·</span> : null}
              <a href={RELEASES_URL} rel="noreferrer" target="_blank">
                {item.alt}
              </a>
            </span>
          ))}
        </nav>
        <p className="download-tip">
          macOS 首次打开若提示无法验证，访达里右键打开，或执行{" "}
          <code>xattr -cr "/Applications/Mabiao.app"</code>。
        </p>
      </div>
    </Reveal>
  );
}
