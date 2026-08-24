import type { ReactElement } from "react";

export type SourceLogoId =
  | "claude"
  | "codex"
  | "cursor"
  | "grok"
  | "gemini"
  | "copilot"
  | "kimi"
  | "pi"
  | "opencode"
  | "dsh"
  | "factory"
  | "qwen"
  | "amp"
  | "antigravity"
  | "devin"
  | "unknown";

export type SourceLogoMark = {
  viewBox: string;
  body: ReactElement;
};

export type SourceLogoTone = {
  bg: string;
  fg: string;
};

export type SourceLogoProps = {
  name: string;
};

export type SlidingIndicator = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  animate: boolean;
};

export type AtmosphereProps = {
  reduced: boolean;
};
