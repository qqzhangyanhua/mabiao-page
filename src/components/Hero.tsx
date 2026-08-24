import type { CSSProperties } from "react";
import { ONE_LINER, RELEASES_URL, VERSION } from "../data";

function Letters({ text, className, step = 0.05, start = 0.04 }: { text: string; className: string; step?: number; start?: number }) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="hero-char"
          style={{ "--d": `${start + i * step}s` } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <a className="hero-badge" href={RELEASES_URL} rel="noreferrer" target="_blank">
        <span className="hero-badge-dot" aria-hidden="true" />
        <span className="hero-badge-pill">v{VERSION}</span>
        <span>全新支持 Claude Code · Cursor · Codex · Grok 等 10+ 来源</span>
        <span className="hero-badge-arrow" aria-hidden="true">→</span>
      </a>

      <div className="hero-copy">
        <div className="hero-title-block">
          <p className="hero-wordmark">
            <Letters text="MABIAO" className="hero-wordmark-track" step={0.04} start={0.08} />
          </p>
          <h1 className="hero-title">
            <Letters text="码表" className="hero-title-track" step={0.08} start={0.16} />
          </h1>
        </div>
        <p className="hero-lead">{ONE_LINER}</p>
      </div>

      <div className="hero-cta">
        <div className="hero-actions">
          <a className="btn" href={RELEASES_URL} rel="noreferrer" target="_blank">
            <span className="btn-glow" aria-hidden="true" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>免费下载体验</span>
          </a>
        </div>

        <div className="hero-trust">
          <span className="hero-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            只读本地扫描
          </span>
          <span className="hero-trust-sep" aria-hidden="true">·</span>
          <span className="hero-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            零数据上云
          </span>
          <span className="hero-trust-sep" aria-hidden="true">·</span>
          <span className="hero-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            macOS / Win / Linux
          </span>
        </div>
      </div>
    </section>
  );
}
