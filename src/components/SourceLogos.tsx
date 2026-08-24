import { type ReactNode } from "react";
import { SOURCE_LOGO_MARKS, SOURCE_LOGO_TONES } from "./sourceMarks";
import type { SourceLogoId, SourceLogoProps } from "./type";

const ALIAS: Record<string, SourceLogoId> = {
  "claude code": "claude",
  claude: "claude",
  openai: "codex",
  "cursor-agent": "cursor",
  "factory / droid": "factory",
  droid: "factory",
  antigravity: "antigravity",
  devin: "devin",
};

function isLogoId(value: string): value is SourceLogoId {
  return Object.hasOwn(SOURCE_LOGO_MARKS, value);
}

function resolveLogoId(name: string): SourceLogoId {
  const key = name.toLowerCase();
  if (Object.hasOwn(ALIAS, key)) return ALIAS[key];
  if (isLogoId(key)) return key;
  return "unknown";
}

export function SourceLogo({ name }: SourceLogoProps): ReactNode {
  const id = resolveLogoId(name);
  const mark = SOURCE_LOGO_MARKS[id];
  const tone = SOURCE_LOGO_TONES[id];
  return (
    <span className="source-logo" style={{ background: tone.bg, color: tone.fg }} aria-hidden="true">
      <svg viewBox={mark.viewBox} fill="currentColor" preserveAspectRatio="xMidYMid meet" focusable="false">
        {mark.body}
      </svg>
    </span>
  );
}
