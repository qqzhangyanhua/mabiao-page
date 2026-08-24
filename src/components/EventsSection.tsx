import { Reveal } from "./Reveal";

export function EventsSection() {
  return (
    <Reveal className="section events-section" id="events">
      <div className="section-head">
        <p className="eyebrow">完整事件流</p>
        <h2>看清大模型每一步在干什么 · 拒绝黑盒执行</h2>
        <p className="section-lead">
          深入每一段会话记录，按毫秒级时序完整还原 AI 的思考链路、工具执行与交互细节，支持一键导出 Markdown / JSON。
        </p>
      </div>

      <div className="events-grid">
        <div className="events-showcase">
          <div className="showcase-glow" aria-hidden="true" />
          <figure className="events-mock">
            <div className="mock-window">
              <img
                src="/events-preview.png"
                alt="码表完整事件流界面 — 深入对话记录，按序展示用户提问、思考规划 (agent_thought) 与工具执行"
                className="mock-image"
                width={2160}
                height={1392}
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
        </div>

        <div className="events-cards">
          <div className="events-card" data-spot>
            <div className="events-icon tone-purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <path d="M9 21h6" />
              </svg>
            </div>
            <div className="events-content">
              <h3>思考规划全穿透 · agent_thought</h3>
              <p>完整展示大模型的内部思维链、计划拆解与推理逻辑，彻底看懂 AI 为什么这样写代码。</p>
            </div>
          </div>

          <div className="events-card" data-spot>
            <div className="events-icon tone-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="events-content">
              <h3>工具调用与钩子追踪 · hook_execution</h3>
              <p>精确记录大模型调用的每一次 Tool 执行与 Hook 事件，支持展开查看原始 JSON 报文。</p>
            </div>
          </div>

          <div className="events-card" data-spot>
            <div className="events-icon tone-orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div className="events-content">
              <h3>一键导出 · Markdown / JSON</h3>
              <p>无论是复盘 Prompt 还是存档关键产出，随时将上千条事件流导出为整洁的文档或结构化数据。</p>
            </div>
          </div>

          <div className="events-card" data-spot>
            <div className="events-icon tone-green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="events-content">
              <h3>会话与用量明细联动</h3>
              <p>在事件流与用量明细间无缝切换，单次提问消耗了多少 Token、命中多少缓存精准可见。</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
