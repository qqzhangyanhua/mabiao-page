import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

export function TimelineSection() {
  return (
    <Reveal className="section timeline-section" id="timeline">
      <div className="section-head">
        <p className="eyebrow">工作时间线</p>
        <h2>记录你每天干了啥 · 还原 AI 协作全天轨迹</h2>
        <p className="section-lead">
          无论是白天密集的项目攻坚，还是夜间后台并发运行的会话，时间线按 24 小时精准回溯工作片段分布、执行时长与并发强度。
        </p>
      </div>


      <div className="gantt" aria-hidden="true">
        <div className="gantt-grid-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="gantt-head">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
        <div className="gantt-row">
          <i>Claude</i>
          <div className="gantt-track">
            <b className="tone-claude" style={{ "--x": "18%", "--w": "16%", "--d": "0.08s" } as CSSProperties} />
            <b className="tone-claude" style={{ "--x": "52%", "--w": "11%", "--d": "0.18s" } as CSSProperties} />
          </div>
        </div>
        <div className="gantt-row">
          <i>Codex</i>
          <div className="gantt-track">
            <b className="tone-codex" style={{ "--x": "28%", "--w": "10%", "--d": "0.16s" } as CSSProperties} />
            <b className="tone-codex" style={{ "--x": "78%", "--w": "12%", "--d": "0.26s" } as CSSProperties} />
          </div>
        </div>
        <div className="gantt-row">
          <i>Cursor</i>
          <div className="gantt-track">
            <b className="tone-cursor" style={{ "--x": "22%", "--w": "38%", "--d": "0.22s" } as CSSProperties} />
          </div>
        </div>
      </div>

      <div className="timeline-grid">
        <div className="timeline-cards">
          <div className="timeline-card" data-spot>
            <div className="timeline-icon tone-purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="timeline-content">
              <h3>累计 AI 执行时长 · 45h 31m</h3>
              <p>自动统计全天 AI 实际执行与思考耗时，量化多任务并行带来的算力杠杆。</p>
            </div>
          </div>

          <div className="timeline-card" data-spot>
            <div className="timeline-icon tone-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
            </div>
            <div className="timeline-content">
              <h3>并行强度 2.3x · 峰值并发 3</h3>
              <p>多 Agent、多 CLI 协同工作时自动计算并发倍率，产出强度一目了然。</p>
            </div>
          </div>

          <div className="timeline-card" data-spot>
            <div className="timeline-icon tone-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="16" y1="2" x2="16" y2="6" />
              </svg>
            </div>
            <div className="timeline-content">
              <h3>工作片段甘特图 · 24 小时分布</h3>
              <p>按 00:00 至 24:00 时间轴清晰排布每个任务块，直观展现不同时段的开发节奏。</p>
            </div>
          </div>

          <div className="timeline-card" data-spot>
            <div className="timeline-icon tone-green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className="timeline-content">
              <h3>精确到项目与模型穿透</h3>
              <p>悬浮任意片段即可查看所属项目、CLI 来源、模型版本、起止时间与单次 Token 消耗。</p>
            </div>
          </div>
        </div>

        <div className="timeline-showcase">
          <div className="showcase-glow" aria-hidden="true" />
          <figure className="timeline-mock">
            <div className="mock-window">
              <img
                src="/timeline-preview.png"
                alt="码表工作时间线界面 — 记录每日 AI 片段分布、累计执行时长与并行强度"
                className="mock-image"
                width={2146}
                height={1392}
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
        </div>
      </div>
    </Reveal>
  );
}
