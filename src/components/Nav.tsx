import { useRef } from "react";
import { GITHUB_URL, RELEASES_URL } from "../data";
import { useActiveSection, usePrefersReducedMotion, useScrolled, useSlidingIndicator } from "../hooks";
import { AppLogo } from "./AppLogo";
import { GitHubMark } from "./Marks";

const NAV_SECTIONS = [
  { id: "features", label: "能力" },
  { id: "timeline", label: "时间线" },
  { id: "events", label: "事件流" },
  { id: "tray", label: "托盘" },
  { id: "sources", label: "来源" },
  { id: "privacy", label: "本地优先" },
  { id: "download", label: "下载" },
] as const;

const NAV_IDS = NAV_SECTIONS.map((item) => item.id);

export function Nav() {
  const scrolled = useScrolled(8);
  const reduced = usePrefersReducedMotion();
  const hashRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(NAV_IDS);
  const indicator = useSlidingIndicator(hashRef, active ? `a[href="#${active}"]` : null);

  return (
    <header className={scrolled ? "nav-wrap scrolled" : "nav-wrap"}>
      <a className="skip" href="#main">
        跳到正文
      </a>
      <nav className="nav" aria-label="主导航">
        <a className="brand" href="#top">
          <AppLogo size={26} />
          <span>码表</span>
        </a>
        <div className="nav-links">
          <div className="nav-hash" ref={hashRef}>
            <span
              className={indicator.visible ? "nav-indicator on" : "nav-indicator"}
              style={{
                width: indicator.width,
                height: indicator.height,
                transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
                transition: reduced || !indicator.animate ? "none" : undefined,
              }}
              aria-hidden="true"
            />
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a className="nav-gh" href={GITHUB_URL} rel="noreferrer" target="_blank">
            <GitHubMark />
            <span>GitHub</span>
          </a>
          <a className="btn btn-sm" href={RELEASES_URL} rel="noreferrer" target="_blank">
            下载
          </a>
        </div>
      </nav>
    </header>
  );
}
