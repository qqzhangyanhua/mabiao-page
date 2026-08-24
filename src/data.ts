export const VERSION = "0.1.1";

export const GITHUB_URL = "https://github.com/qqzhangyanhua/mabiao";
export const RELEASES_URL = "https://github.com/qqzhangyanhua/mabiao/releases";

export const ONE_LINER = "本机 AI 用量，扫完就能看";

export const HERO_LEAD = "只读扫描本机各 AI 编程 CLI 的会话，归一成消耗记录。";

export type FeatureItem = {
  title: string;
  body: string;
  mark: "timeline" | "events" | "scan" | "split";
};

export const FEATURES: FeatureItem[] = [
  {
    mark: "timeline",
    title: "工作时间线，记录每天干了啥",
    body: "按日期回溯 AI 片段分布。累计执行时长、对话轮次、峰值并发与并行强度，精确还原每个项目的开发轨迹。",
  },
  {
    mark: "events",
    title: "完整事件流，看清模型每一步",
    body: "深入对话记录，按时间顺序还原每一步动作：用户提问、思考规划 (agent_thought)、工具执行与回答，支持 Markdown / JSON 导出。",
  },
  {
    mark: "scan",
    title: "本机扫描，不上传",
    body: "默认只读扫本机会话目录。消耗记录不离开这台机器，缓存是本地 sqlite。",
  },
  {
    mark: "split",
    title: "官方额度与本机估计分开",
    body: "Claude / Codex / Cursor / Grok 的官方已用 % 与重置时间，和 5 小时窗、7 天滚动分开看。",
  },
];

export type SourceChip = {
  name: string;
  note?: string;
};

export const SOURCE_GROUPS: { label: string; items: SourceChip[] }[] = [
  {
    label: "会话来源",
    items: [
      { name: "Codex" },
      { name: "Claude Code" },
      { name: "pi" },
      { name: "dsh" },
      { name: "OpenCode" },
      { name: "Kimi" },
      { name: "Gemini" },
      { name: "Grok" },
      { name: "Factory / droid" },
      { name: "Copilot" },
    ],
  },
  {
    label: "Cursor",
    items: [{ name: "Cursor" }, { name: "cursor-agent" }],
  },
  {
    label: "较弱",
    items: [
      { name: "Qwen", note: "本地无 token" },
      { name: "Amp", note: "仅云端" },
    ],
  },
];

export const PRIVACY: { title: string; body: string }[] = [
  {
    title: "消耗记录不上云",
    body: "默认只读扫描本机会话目录，归一后的用量不上传。",
  },
  {
    title: "缓存留在本机",
    body: "聚合结果写在本地 sqlite。设置里可备份、恢复、重建。",
  },
  {
    title: "凭证只读，不改正文",
    body: "Cursor 账号用量与部分官方额度使用你已有的本机凭证。不改写会话正文。",
  },
];

export type PlatformId = "mac-arm" | "mac-intel" | "linux" | "win";

export type PlatformCard = {
  id: PlatformId;
  name: string;
  artifact: string;
  hint: string;
  cta: string;
  alt: string;
};

export const PLATFORMS: PlatformCard[] = [
  {
    id: "mac-arm",
    name: "macOS Apple Silicon",
    artifact: ".dmg · aarch64-apple-darwin",
    hint: "M 系列",
    cta: "Download for macOS",
    alt: "Apple Silicon",
  },
  {
    id: "mac-intel",
    name: "macOS Intel",
    artifact: ".dmg · x86_64-apple-darwin",
    hint: "Intel",
    cta: "下载 macOS Intel 版",
    alt: "Intel",
  },
  {
    id: "linux",
    name: "Linux x64",
    artifact: ".deb 或 AppImage",
    hint: "x86_64",
    cta: "下载 Linux 版",
    alt: "Linux",
  },
  {
    id: "win",
    name: "Windows x64",
    artifact: "NSIS .exe",
    hint: "x64",
    cta: "下载 Windows 版",
    alt: "Windows",
  },
];
