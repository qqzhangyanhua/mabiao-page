import { useState, type CSSProperties } from "react";
import { AppLogo } from "./AppLogo";
import { SourceLogo } from "./SourceLogos";

export type QuotaMetric = {
  label: string;
  percent: number;
  reset: string;
};

export type TrayServiceId = "cursor" | "grok" | "droid" | "antigravity" | "copilot" | "devin";

export type TrayService = {
  id: TrayServiceId;
  name: string;
  source: string;
  statusTag?: string;
  statusTime?: string;
  metrics: QuotaMetric[];
  summary?: string;
  error?: string;
  defaultOpen: boolean;
};

const SERVICES: TrayService[] = [
  {
    id: "cursor",
    name: "Cursor",
    source: "cursor",
    statusTag: "官方",
    statusTime: "刚刚",
    defaultOpen: true,
    metrics: [
      { label: "总量", percent: 20, reset: "09-16 21:47" },
      { label: "Auto", percent: 18, reset: "09-16 21:47" },
      { label: "API", percent: 32, reset: "09-16 21:47" },
    ],
  },
  {
    id: "grok",
    name: "Grok",
    source: "grok",
    statusTag: "官方",
    statusTime: "刚刚",
    defaultOpen: true,
    metrics: [{ label: "周额度", percent: 0, reset: "08-30 21:42" }],
  },
  {
    id: "droid",
    name: "Droid",
    source: "droid",
    statusTag: "官方",
    statusTime: "刚刚",
    defaultOpen: true,
    metrics: [
      { label: "标准 周", percent: 37, reset: "08-28 12:34" },
      { label: "标准 月", percent: 15, reset: "09-19 12:38" },
      { label: "Core 周", percent: 40, reset: "08-27 20:05" },
      { label: "Core 月", percent: 15, reset: "09-19 20:05" },
    ],
  },
  {
    id: "antigravity",
    name: "Antigravity",
    source: "antigravity",
    summary: "2% · 4 窗",
    defaultOpen: false,
    metrics: [
      { label: "窗 1", percent: 3, reset: "08-24 08:12" },
      { label: "窗 2", percent: 1, reset: "08-24 11:40" },
      { label: "窗 3", percent: 2, reset: "08-24 14:05" },
      { label: "窗 4", percent: 2, reset: "08-24 18:22" },
    ],
  },
  {
    id: "copilot",
    name: "Copilot",
    source: "copilot",
    statusTag: "暂无",
    defaultOpen: true,
    metrics: [],
    error: "Copilot 登录已失效，请在编辑器里重新登录",
  },
  {
    id: "devin",
    name: "Devin",
    source: "devin",
    summary: "0% · 2 窗",
    defaultOpen: false,
    metrics: [
      { label: "窗 1", percent: 0, reset: "08-24 08:00" },
      { label: "窗 2", percent: 0, reset: "08-24 12:00" },
    ],
  },
];

const INITIAL_OPEN = new Set(
  SERVICES.filter((service) => service.defaultOpen).map((service) => service.id),
);

function DragHandle() {
  return (
    <span className="tray-handle" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="tray-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6.5L8 10.5L12 6.5" />
      </svg>
    );
  }
  return (
    <svg className="tray-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 4L10.5 8L6.5 12" />
    </svg>
  );
}

export function TrayPopover() {
  const [openIds, setOpenIds] = useState<Set<TrayServiceId>>(INITIAL_OPEN);

  const toggle = (id: TrayServiceId) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="tray-popover">
      <header className="tray-head">
        <div className="tray-head-main">
          <h3>官方额度</h3>
          <p>拖动排序 · 点标题折叠</p>
        </div>
        <svg className="tray-head-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6.5L8 10.5L12 6.5" />
        </svg>
      </header>
      <div className="tray-list">
        {SERVICES.map((service) => {
          const open = openIds.has(service.id);
          return (
            <article key={service.id} className="tray-card">
              <button type="button" className="tray-card-head" onClick={() => toggle(service.id)}>
                <DragHandle />
                <span className="tray-mark">
                  <SourceLogo name={service.source} />
                </span>
                <span className="tray-card-title">{service.name}</span>
                <div className="tray-card-meta">
                  {service.statusTag ? (
                    <span className={`tray-tag ${service.statusTag === "官方" ? "tag-official" : "tag-muted"}`}>
                      {service.statusTag}
                    </span>
                  ) : null}
                  {service.statusTime ? <span className="tray-time">{service.statusTime}</span> : null}
                  {!open && service.summary ? <span className="tray-summary">{service.summary}</span> : null}
                  <ChevronIcon open={open} />
                </div>
              </button>
              {open ? (
                <div className="tray-card-body">
                  {service.metrics.map((metric) => (
                    <div key={metric.label} className="tray-metric">
                      <div className="tray-metric-row">
                        <span className="tray-metric-label">{metric.label}</span>
                        <b className="tray-metric-value">{metric.percent}%</b>
                      </div>
                      <div className="tray-meter" aria-hidden="true">
                        <span
                          className="tray-meter-fill"
                          style={{ "--p": `${metric.percent}%` } as CSSProperties}
                        />
                      </div>
                      <div className="tray-metric-reset">
                        <small>重置 {metric.reset}</small>
                      </div>
                    </div>
                  ))}
                  {service.error ? <p className="tray-error">{service.error}</p> : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function TrayScene() {
  return (
    <div className="tray-scene">
      <div className="tray-menubar">
        <span className="tray-apple" aria-hidden="true" />
        <span>码表</span>
        <span className="tray-menubar-spacer" />
        <span className="tray-chip">
          <AppLogo size={14} />
          <b>$12.40</b>
          <em>20%</em>
        </span>
        <span className="tray-clock">12:08</span>
      </div>
      <div className="tray-desktop">
        <img
          src="/tray-preview.png"
          alt="码表菜单栏托盘"
          className="tray-image"
          width={710}
          height={1246}
        />
      </div>
    </div>
  );
}
