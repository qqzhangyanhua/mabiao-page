import { type CSSProperties } from "react";
import { FEATURES } from "../data";
import { Reveal } from "./Reveal";
import { Mark } from "./Marks";

export function Features() {
  return (
    <Reveal className="section" id="features">
      <div className="section-head">
        <p className="eyebrow">能力</p>
        <h2>把用量当成仪表来读</h2>
      </div>
      <ul className="feature-list">
        {FEATURES.map((item, i) => (
          <li key={item.title} data-spot style={{ "--i": i } as CSSProperties}>
            <Mark name={item.mark} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
