import { type CSSProperties } from "react";
import { SOURCE_GROUPS } from "../data";
import { Reveal } from "./Reveal";
import { SourceLogo } from "./SourceLogos";

export function Sources() {
  return (
    <Reveal className="section" id="sources">
      <div className="section-head">
        <p className="eyebrow">来源</p>
        <h2>本机有会话目录的，扫进来</h2>
        <p className="section-lead">
          归一成同一套消耗记录。Qwen 本地没有 token，Amp 只有云端，不强行充数。
        </p>
      </div>
      <div className="source-groups">
        {SOURCE_GROUPS.map((group) => (
          <div key={group.label} className="source-group">
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item, i) => (
                <li
                  key={item.name}
                  data-spot
                  data-brand={item.name.toLowerCase().split(/[\s/]/)[0]}
                  style={{ "--i": i } as CSSProperties}
                >
                  <SourceLogo name={item.name} />
                  <span>{item.name}</span>
                  {item.note ? <small>{item.note}</small> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
