import { AppLogo } from "./AppLogo";
import { Reveal } from "./Reveal";

export function TraySection() {
  return (
    <Reveal className="section tray-section" id="tray">
      <div className="section-head">
        <p className="eyebrow">菜单栏托盘</p>
        <h2>关窗也能看消耗 · 官方额度就在托盘里</h2>
        <p className="section-lead">
          码表常驻菜单栏。点一下就能看今日花费、各家官方已用百分比和重置时间，不用打开主窗口。
        </p>
      </div>

      <div className="tray-grid">
        <div className="tray-cards">
          <div className="tray-info" data-spot>
            <div className="tray-info-icon tone-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18" />
                <circle cx="7" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                <circle cx="9.2" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div className="tray-info-content">
              <h3>关窗后仍在菜单栏跑</h3>
              <p>主窗口关掉，托盘还在。今日花费和最紧的官方额度百分比一直挂在菜单栏。</p>
            </div>
          </div>

          <div className="tray-info" data-spot>
            <div className="tray-info-icon tone-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19V5" />
                <path d="M4 17h6.5a2 2 0 0 0 2-2V5" />
                <path d="M12.5 5H20v8a2 2 0 0 1-2 2h-5.5" />
              </svg>
            </div>
            <div className="tray-info-content">
              <h3>官方额度按窗口拆开</h3>
              <p>Cursor 总量 / Auto / API，Droid 的 5 小时、周、月窗，各自进度条和重置时间分开看。</p>
            </div>
          </div>

          <div className="tray-info" data-spot>
            <div className="tray-info-icon tone-purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l2.5 1.5" />
              </svg>
            </div>
            <div className="tray-info-content">
              <h3>重置时间一眼能对上</h3>
              <p>每条额度都带 Reset 时间。快到点了不用猜还要等多久，也不用打开官网翻账单。</p>
            </div>
          </div>

          <div className="tray-info" data-spot>
            <div className="tray-info-icon tone-orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v5" />
                <circle cx="12" cy="16.2" r="0.7" fill="currentColor" stroke="none" />
                <path d="M10.2 4.8 3.4 17.2A2 2 0 0 0 5.2 20h13.6a2 2 0 0 0 1.8-2.8L13.8 4.8a2 2 0 0 0-3.6 0Z" />
              </svg>
            </div>
            <div className="tray-info-content">
              <h3>登录失效立刻提醒</h3>
              <p>Copilot 这类凭证过期会直接写在托盘里，不用等主界面报错才发现拉不到额度。</p>
            </div>
          </div>
        </div>

        <div className="tray-showcase">
          <div className="showcase-glow" aria-hidden="true" />
          <div className="tray-showcase-bar" aria-hidden="true">
            <span className="tray-chip">
              <AppLogo size={14} />
              <b>$12.40</b>
              <em>20%</em>
            </span>
          </div>
          <figure className="tray-frame">
            <img
              src="/tray-preview.png"
              alt="码表菜单栏托盘 — 官方额度监控，展示 Cursor、Grok、Droid、Antigravity、Copilot 等用量与重置时间"
              width={710}
              height={1246}
              className="tray-image"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </Reveal>
  );
}
