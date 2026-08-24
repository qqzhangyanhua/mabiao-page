import { type CSSProperties } from "react";
import { PRIVACY } from "../data";
import { Reveal } from "./Reveal";

const privacyIcons = [
  // 消耗记录不上云
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // 缓存留在本机
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>,
  // 凭证只读，不改正文
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>,
];

export function Privacy() {
  return (
    <Reveal className="privacy" id="privacy">
      <div className="section-head">
        <p className="eyebrow">本地优先 · 隐私安全</p>
        <h2>数据留在本机 · 拒绝任何黑盒上云</h2>
        <p className="section-lead">
          无需注册账号，不收集会话隐私。码表所有扫描分析与 Token 计算全部在本地完成。
        </p>
      </div>
      <ul>
        {PRIVACY.map((item, i) => (
          <li key={item.title} data-spot style={{ "--i": i } as CSSProperties}>
            <div className="privacy-icon-box" aria-hidden="true">
              {privacyIcons[i % privacyIcons.length]}
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
