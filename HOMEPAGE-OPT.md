# 码表官网优化备忘

对着 [mabiao.dev](https://mabiao.dev/) 和本地 `src/` 改。目标不是加氛围，是让首屏看起来像产品站，不像功能清单。

源码：`/Users/zhangyanhua/AI/mabiao-page`

---

## 1. 先改什么

不够高级，主要不是缺动效，是**首屏东西太多**。

现在首屏叠在一起的：

- 顶部版本 banner
- Logo +「码表」+「MABIAO」三套品牌名
- 一段说明
- 下载 + GitHub 两个按钮
- 三条信任文案
- 四个功能胶囊（全局概览 / 时间线 / 事件流 / 托盘）
- 产品窗口
- 窗口上再叠 KPI（$12.40 / 20%）和菜单栏浮层

高级站的首屏通常只有两件：

1. 一句价值 + 一个下载
2. 一扇干净的产品窗

建议按这个顺序改，做完 1 再动 2：

| 优先级 | 改什么 | 改完长什么样 |
| --- | --- | --- |
| P0 | 首屏做减法 | 一句价值 + 下载 + 产品窗，去掉叠层 |
| P0 | 产品窗绑滚动 | 斜着入场，滚到正面停住 |
| P1 | 能力 8 条收成 4 条 | 其余留给后面专节 |
| P1 | 下载区收成平台按钮 | 不要四张营销卡 |
| 先别动 | Atmosphere / 鼠标光斑 / 胶片噪点 | 再加只会更花 |

---

## 2. 首屏布局

### 2.1 文案只留一句

**参考**

- [Cursor 首屏](https://mobbin.com/sites/sections/d5d45b77-5ade-432e-8093-994917105c34)：一句价值 + 一个 Download，窗很大
- [Cursor 结尾 CTA](https://mobbin.com/sites/sections/31066e29-9f55-4a93-9875-9a861c1f71a7)：再短，一句 + 一个按钮
- [Twenty 首屏](https://mobbin.com/sites/sections/abe261e4-d901-42f1-bea3-0a806e2d0669)：标题 + 两按钮 + 产品窗，窗后可以有氛围，窗上不加 KPI
- 实站：[cursor.com](https://cursor.com)、[devin.ai](https://devin.ai)、[twenty.com](https://twenty.com)

**现在**（`Hero.tsx`）

- banner + logo +「码表」+「MABIAO」+ lead + 双 CTA + 三条 trust

**改**

- 品牌名留一套，建议只留「码表」，`MABIAO` 放到 nav 或页脚
- 标题改成一句价值，不要再当品牌展示。现有 `ONE_LINER` 当标题偏长，可以压成一行，例如「本机 AI 用量，扫完就能看」
- CTA 主按钮一个：免费下载。GitHub 收成文字链或丢进 nav
- banner、三条 trust 都可下放到下载区或隐私节
- 不要在首屏再铺功能胶囊

**改这些文件**

- `src/components/Hero.tsx`
- `src/data.ts` 的 `ONE_LINER`

### 2.2 产品窗单独站着

**参考**

- [Cursor 产品窗](https://mobbin.com/sites/sections/d5d45b77-5ade-432e-8093-994917105c34)：一扇窗 + 一层景，没有数字浮层
- [Twenty 产品窗](https://mobbin.com/sites/sections/abe261e4-d901-42f1-bea3-0a806e2d0669)：主窗可以叠一个小窗，但叠的是界面，不是营销 KPI
- [Linear Insights 窗](https://mobbin.com/sites/sections/b8f0bfb5-9da2-45b1-978f-1251f7ec3a49)：窗本身就是画面，周围是空的（这站是深色，只借构图，不借配色）

**现在**（`ProductMock.tsx`）

- 四个 tab 胶囊
- 窗口上 KPI 计数（$12.40 / 2.1M / 68%）
- 托盘浮层 / 菜单栏预览
- 指针倾斜 `usePointerTilt`
- 滚动折平 `useScrollFold`（现在只有 `rotateX(fold * 9deg)` + 轻微缩放，幅度偏弱）

**改**

- 首屏只留一扇窗。tab 可以留，但做成窗里的切换，不要做成窗上方的功能胶囊条
- 拿掉 KPI overlay 和菜单栏浮层。托盘留给后面 `TraySection`
- 窗后可以留一层很淡的紫/雾，不要再加网格、胶片、鼠标光斑

**改这些文件**

- `src/components/ProductMock.tsx`
- `src/styles.css` 里 `.mock-kpis` / `.mock-frame` / tab 胶囊相关

---

## 3. 动效

Mobbin 是静帧。真动效要看实站。

### 3.1 只做这一刀：滚动绑产品窗

**看这个**

- 实站：[linear.app](https://linear.app) 首屏。窗一开始是斜的，滚多少，转多少，最后停在正面
- 静帧构图：[Linear Insights](https://mobbin.com/sites/sections/b8f0bfb5-9da2-45b1-978f-1251f7ec3a49)

**你已经有的**

`src/hooks.ts` 的 `useScrollFold`，`ProductMock.tsx` 里大约是：

```ts
transform: perspective(1600px) rotateX(${fold * 9}deg) scale(${1 - fold * 0.035})
```

问题：幅度太小，看起来像轻轻点头，不像「滚着转正」。

**改成什么样**

- 起始：`rotateX(18deg~28deg)`，略 `rotateZ(-4deg~-8deg)`，`scale(0.92~0.96)`
- 结束（滚过一屏左右）：`rotateX(0) rotateZ(0) scale(1)`，正面停住
- `fold` 跟 scroll 走，不要用 CSS transition 去补；transition 会和手滚打架
- `prefers-reduced-motion` 时直接正面，不要斜着

指针倾斜可以留，但幅度压过滚动，两套 3D 叠一起会抖。

### 3.2 已经够用、不用再加的

这些本地已经有，维持即可：

- `Hero.tsx` 字母 blur stagger（`.hero-char`）
- `ProductMock` 图交叉淡入 + 约 4.8s 轮播，hover / 手点暂停
- tab 底部进度条
- `TimelineSection` 甘特 `scaleX` 滑入
- `Reveal` 进场 fade-up
- `usePointerTilt` 鼠标微倾（Resend 那路，已经有）

实站对照，只作感觉，不必复刻：

- [cursor.com](https://cursor.com)：叠窗 + 景深，Mobbin 静帧见上面 Cursor 首屏
- [resend.com](https://resend.com)：鼠标跟 3D，对应你现有 tilt

### 3.3 不要做

- 再加 Atmosphere（鼠标光斑、网格、胶片）
- Rive / Emergent 那种 coverflow、一堆卡飞来飞去
- 首屏数字 ticker（KPI 计数是营销感，不是产品感）
- 背景视频、粒子、无限视差

---

## 4. 往下几屏

### 4.1 能力：8 条收成 4 条

**现在**：`src/data.ts` 的 `FEATURES` 有 8 条，`Features.tsx` 一次铺开。

建议首屏后只留 4 条，其余已经有专节就不要再在列表里讲一遍：

| 留下 | 为什么 |
| --- | --- |
| 工作时间线 | 后面有 `TimelineSection` |
| 完整事件流 | 后面有 `EventsSection` |
| 本机扫描，不上传 | 这是信任，后面 `Privacy` 再讲细 |
| 官方额度与本机估计分开 | 核心差异 |

拿掉或并进专节：菜单栏、按时日周月拆、Cursor 代码量、预算提醒。

### 4.2 下载区：按钮，不是卡片

**参考**

- [Notion 桌面下载](https://mobbin.com/sites/sections/c97a2ca3-d0c7-45c8-8965-524cdd6a6223)：一排平台按钮
- [Cursor Download](https://mobbin.com/sites/sections/0654a633-51c3-4e52-9aa4-d77ebac2b7fb)：按系统列文件，不像营销卡
- [Notion 桌面 CTA](https://mobbin.com/sites/sections/f5853197-f4be-4096-8711-06685d8e3faf)：一句 + 一个 Download for macOS

**现在**：四张下载卡（Apple Silicon / Intel / Linux / Windows），每张都在讲构建。

**改**：主按钮按当前系统一个（Download for macOS），下面一行小链：Intel / Windows / Linux。macOS 首次打开的 `xattr` 说明收到按钮下方一行小字。

**改这些文件**

- `src/components/Download.tsx`

### 4.3 时间线 / 事件流 / 托盘

这三节结构可以留。动效维持现有甘特滑入、Reveal 即可，不要再给每节加一套 3D。

托盘浮层从首屏挪到 `TraySection` 自己的窗里。

---

## 5. 对照改哪些文件

| 文件 | 做什么 |
| --- | --- |
| `src/components/Hero.tsx` | 砍到一句价值 + 一个主 CTA |
| `src/data.ts` | 改 `ONE_LINER`；`FEATURES` 留 4 条 |
| `src/components/ProductMock.tsx` | 去掉 KPI / 托盘浮层；加强滚动转正 |
| `src/hooks.ts` | 加大 `useScrollFold` 的起始倾角，结束归零 |
| `src/styles.css` | 收掉 `.mock-kpis`、首屏胶囊、多余氛围 |
| `src/components/Features.tsx` | 跟着 4 条走，不必改结构 |
| `src/components/Download.tsx` | 收成平台按钮 |
| `src/components/Atmosphere.tsx` | 不动，或只减不增 |

---

## 6. 参考清单

只列这次核对过的。Mobbin 是构图，动效看实站。

### 布局（浅色，跟码表一条路）

- [Cursor 首屏](https://mobbin.com/sites/sections/d5d45b77-5ade-432e-8093-994917105c34)
- [Cursor 结尾 CTA](https://mobbin.com/sites/sections/31066e29-9f55-4a93-9875-9a861c1f71a7)
- [Twenty 首屏](https://mobbin.com/sites/sections/abe261e4-d901-42f1-bea3-0a806e2d0669)
- [devin.ai](https://devin.ai)（Mobbin 这次没搜到对应帧，直接看实站）

### 下载

- [Notion 桌面下载](https://mobbin.com/sites/sections/c97a2ca3-d0c7-45c8-8965-524cdd6a6223)
- [Cursor Download](https://mobbin.com/sites/sections/0654a633-51c3-4e52-9aa4-d77ebac2b7fb)
- [Notion 桌面 CTA](https://mobbin.com/sites/sections/f5853197-f4be-4096-8711-06685d8e3faf)

### 动效（实站）

- [linear.app](https://linear.app) — 滚动转正，下一刀就抄这个
- [cursor.com](https://cursor.com) — 叠窗和景深
- [resend.com](https://resend.com) — 鼠标 3D，你已经有 tilt

### 只借构图、不借配色

- [Linear Insights 窗](https://mobbin.com/sites/sections/b8f0bfb5-9da2-45b1-978f-1251f7ec3a49)

码表继续走浅色。不要把官网改成 Linear 那种黑底。

---

## 7. 验收

首屏截一张，能对上这三句就对了：

1. 一眼能读完标题，手已经在下载上
2. 产品窗是画面主体，上面没有数字和胶囊
3. 往下滚，窗从斜转到正，停住，不再晃
