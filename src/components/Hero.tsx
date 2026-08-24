import type { CSSProperties } from "react";
import { HERO_LEAD, ONE_LINER, RELEASES_URL, VERSION } from "../data";
import { AppLogo } from "./AppLogo";

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

      <div className="hero-title-block">
        <div className="hero-mark-wrap">
          <div className="hero-mark">
            <AppLogo size={36} glow />
          </div>
        </div>
        <p className="hero-title">
          <Letters text="码表" className="hero-title-track" step={0.08} start={0.05} />
        </p>
      </div>

      <h1 className="hero-value">{ONE_LINER}</h1>
      <p className="hero-lead">{HERO_LEAD}</p>

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
    </section>
  );
}
