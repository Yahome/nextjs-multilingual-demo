# Meridian Partners：多语言企业网站演示（EN / RU / 中文 / العربية）

一个可静态导出的 Next.js 16 企业官网演示，面向中国大陆、俄罗斯和海湾国家（GCC）客户。共 6 个页面，4 种语言，阿拉伯语完整支持从右到左（RTL）。内容放在 JSON 里，通过一层内容接口读取，以后可以换成 Sanity 或 Strapi。

> 这是技术演示，不是真实客户项目。页面中的公司、人物和数据都是虚构的（页脚有说明）。

## 页面

| 页面 | 路径 | 主要内容 |
| --- | --- | --- |
| 首页 | `/{locale}/` | Hero（三地办公室路线图）、关键数据、服务、工作方法、市场、最新文章、CTA |
| 关于我们 | `/{locale}/about/` | 公司故事、原则、发展历程（时间线）、合伙人 |
| 服务 | `/{locale}/services/` | 6 项服务（含交付成果，可锚点跳转）、合作模式 |
| 市场与行业 | `/{locale}/markets/` | 中国大陆、俄罗斯及欧亚经济联盟、海湾国家；6 个行业 |
| 洞察 | `/{locale}/insights/` | 文章列表（最新一篇置顶），另有 4 篇文章详情页 `/{locale}/insights/{slug}/` |
| 联系我们 | `/{locale}/contact/` | 表单（前端校验）、邮箱、三地办公室与时区 |

`{locale}` 为 `en`、`ru`、`zh-cn`、`ar`。根路径 `/` 跳转到 `/en/`（不做 IP 判断），同时显示四种语言的链接。404 页面同时用四种语言显示。

## 技术栈与运行

- Next.js 16（App Router，`output: "export"`）+ React 19 + TypeScript（strict）+ Tailwind CSS v4
- 运行时没有第三方脚本、统计代码或外部 CDN 请求

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # 先检查四种语言内容是否同步，再构建到 out/
npm start              # 用 serve 预览 out/
npm run lint
npm run typecheck      # next typegen + tsc --noEmit
npm run check:content  # 只检查内容同步
```

把 `.env.example` 复制为 `.env.local`，设置 `NEXT_PUBLIC_SITE_URL`（canonical、hreflang、sitemap、Open Graph 都用这个域名）。

## 目录结构

```
content/{locale}.json        # 每种语言一份内容（结构完全相同）
scripts/check-content.mjs    # 内容同步检查（构建前自动运行）
public/og-image.png          # Open Graph 分享图 1200×630
public/fonts/                # 阿拉伯语字体（自托管）+ OFL 许可证
src/
  app/
    [locale]/                # 6 个页面 + insights/[slug]
    layout.tsx / page.tsx    # 根布局（透传）和根路径跳转
    not-found.tsx            # 四语 404
    sitemap.ts / robots.ts
    icon.svg / apple-icon.png / favicon.ico
    globals.css              # 设计 token、按语言区分的排版、动画
  components/
    layout/                  # Header、MainNav、MobileMenu、LanguageSwitcher、Footer、Logo
    sections/                # HomeHero、RouteMap、PageHero、各类卡片、CtaBanner
    contact/                 # ContactForm、Field
    ui/                      # Container、Section、按钮/链接、图标、面包屑、JsonLd
  lib/
    content/                 # 内容层：types、source（接口）、json-source、index
    i18n.ts / routes.ts      # 语言配置、路由与路径工具
    seo.ts                   # metadata、hreflang、Open Graph
    fonts.ts / format.ts / use-dismiss.ts
```

## 设计

- **配色**：深海军蓝（`ink`）+ 黄铜色（`brass`）+ 暖白（`paper`），都定义在 `globals.css` 的 `@theme` 中。正文与背景的对比度都 ≥ 4.5:1。
- **字体**：标题用 Source Serif 4，正文用 Inter，阿拉伯语用 IBM Plex Sans Arabic，中文用系统字体（PingFang SC / 微软雅黑）。
- **按语言调整排版**：不复制组件，只在 `html[lang]` 上重新定义 CSS 变量：
  - 中文和阿拉伯语的标题改用无衬线字体，并加大行高；
  - 阿拉伯语去掉字间距，因为 letter-spacing 会破坏阿拉伯字母的连写。
- **动效**：Hero 次要元素入场；滚动时内容轻微上移（CSS `animation-timeline: view()`，零 JS；只做位移，不改透明度，保证任何时刻对比度都达标）；卡片悬停上浮；箭头沿阅读方向移动；地图航线流动。`prefers-reduced-motion: reduce` 时全部关闭。
- **响应式**：桌面导航和移动端菜单分开实现（移动端是下拉面板，支持 Esc 关闭）。已验证 360px 和 390px 宽度下没有横向滚动。

## 阿拉伯语 RTL

- `<html lang="ar" dir="rtl">`，所有组件只有一套代码。
- 横向布局只用逻辑属性：`ms/me`、`ps/pe`、`inset-s/inset-e`、`border-s`、`text-start/end`、`rounded-s/e`。不用 `left/right`、`ml/mr`、`pl/pr`。
- 只有表示方向的图标（箭头、面包屑和菜单的 chevron）在 RTL 下镜像（`rtl:-scale-x-100`）；卡车、地球、对勾等物体图标不镜像。
- 悬停时箭头的位移方向也跟随阅读方向（`rtl:group-hover:-translate-x-1`）。
- 首页地图**故意不镜像**，因为地理方位是固定的。城市标签居中，不受文字方向影响。
- 表单：邮箱输入框保持 `dir="ltr"`，但在 RTL 页面中靠右对齐；下拉箭头在逻辑上的结束端；错误提示和复选框都自动镜像。
- 语言名称用 `lang` + `dir="auto"` 隔离；品牌名用 `<bdi>` 包裹，防止标点乱序。

## 内容层与 Headless CMS

页面和组件**只**依赖 `src/lib/content/types.ts` 中的类型和 `ContentSource` 接口，不直接读取 JSON：

```ts
// src/lib/content/source.ts
export interface ContentSource {
  getSite(locale): Promise<SiteSettings>;              // 全站设置（单例）
  getPage(locale, page): Promise<Pages[K]>;            // 6 个页面（单例）
  getServices(locale): Promise<Service[]>;             // 集合
  getMarkets(locale): Promise<Market[]>;
  getIndustries(locale): Promise<Industry[]>;
  getInsights(locale): Promise<InsightSummary[]>;      // 列表，不含正文
  getInsight(locale, slug): Promise<Insight | null>;
}

// src/lib/content/index.ts —— 只需要改这一行
export const content: ContentSource = jsonSource;
```

页面中的用法是 `await content.getPage(locale, "about")`。

### 换成 Sanity 的步骤

1. 在 Sanity 中按 `types.ts` 建模：`siteSettings`、`homePage` 等单例，`service`、`market`、`industry`、`insight` 为文档类型。推荐用 `@sanity/document-internationalization`（每种语言一份文档），语言代码用 `en / ru / zh-cn / ar`。
2. 新建 `src/lib/content/sanity-source.ts`，实现 `ContentSource`，在里面用 GROQ 把数据整理成同样的结构：

   ```ts
   import { createClient } from "@sanity/client";
   import type { ContentSource } from "./source";

   const client = createClient({ projectId: process.env.SANITY_PROJECT_ID!, dataset: "production", apiVersion: "2025-01-01", useCdn: false });

   export const sanitySource: ContentSource = {
     getSite: (locale) => client.fetch(`*[_type == "siteSettings" && language == $locale][0]`, { locale }),
     getInsights: (locale) => client.fetch(
       `*[_type == "insight" && language == $locale] | order(date desc){ "slug": slug.current, date, category, author, readingMinutes, title, excerpt }`,
       { locale },
     ),
     // … 其余方法同理；富文本（Portable Text）在这里转换成 { heading, paragraphs[] }
   };
   ```
3. 把 `index.ts` 改为 `export const content: ContentSource = sanitySource;`。

### 换成 Strapi 的步骤

1. 开启 Strapi 的 i18n 插件，添加 `ru`、`zh-CN`、`ar` 语言。注意 Strapi 用的是 `zh-CN`，需要在 source 里做一次映射。
2. 实现 `strapi-source.ts`，例如：
   ```ts
   const res = await fetch(`${process.env.STRAPI_URL}/api/insights?locale=${toStrapi(locale)}&sort=date:desc`, { headers: { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` } });
   ```
   再把返回的 `data[]` 映射成 `InsightSummary[]`。

### 要点

- **静态导出意味着内容在构建时拉取**：访客从不直接访问 CMS。CMS 发布内容后，通过 webhook 触发重新构建和部署（Vercel Deploy Hook、GitHub Actions 等）。所以即使 CMS 服务器在海外，中国大陆访客的访问速度也不受影响。
- **CMS 中的图片**：如果以后加图片，建议构建时下载到本地或走国内 CDN 回源，不要让中国大陆用户直接请求 `cdn.sanity.io` 等海外域名。
- **跨语言的 `slug` 和 `id` 必须一致**，否则 hreflang 无法对应。`check-content.mjs` 会检查 JSON 中的这些字段；换成 CMS 后，建议在 CMS 端加相同的校验。
- 图标属于展示层，按内容的 `id` 在代码里映射，不存进 CMS。

## 多语言内容同步

- TypeScript 检查每份 JSON 是否符合 `LocaleContent` 类型，缺少字段会导致构建失败。
- `scripts/check-content.mjs` 在 `npm run build` 前自动运行，检查四种语言的键名、类型、数组长度是否完全一致，有没有空字符串，以及 `id / slug / date / officeId` 等字段是否相同。

## SEO

- 每个页面（包括文章页）都有独立的 `title`、`description`、canonical，以及 4 种语言的 hreflang 互链和 `x-default`。
- `sitemap.xml`：6 个页面 + 4 篇文章，每种语言一条（共 40 个 URL），每条都带 `xhtml:link` 的 hreflang；`robots.txt` 指向 sitemap。
- Open Graph 和 Twitter 卡片：`og:locale` 加上 `og:locale:alternate`，分享图为 1200×630；文章页额外输出 `article:published_time`、`author` 和 `section`。
- JSON-LD：首页输出 `Organization`，文章页输出 `Article`。
- 修复了原版本的一个 bug：页面标题曾经重复出现品牌名，例如 `Contact — Meridian Partners · Meridian Partners`。

## 性能与字体

- 拉丁字体（Inter、Source Serif 4）通过 `next/font` 在**构建时**下载并自托管，访客不会请求 `fonts.googleapis.com`。所有页面只预加载拉丁子集，西里尔字母子集按需加载。
- 阿拉伯语字体放在 `public/fonts/`，URL 固定，**只在 `/ar/` 页面**预加载（`ReactDOM.preload`），其他语言的页面完全不下载。这项改动把阿语页面的布局偏移（CLS）从 0.218 降到了 0。
- 中文使用系统字体，避免加载数 MB 的中文网络字体。
- 客户端组件只有 4 个（导航高亮、移动菜单、语言切换、联系表单），合计约 8KB（gzip），其余都是服务端组件。
- Hero 主标题和导语不做淡入动画，保证它们在首次绘制时就能被算作 LCP 元素。页头没有使用 `backdrop-filter`。

## 无障碍

- 有“跳到主要内容”链接；`header`、`nav`（都带 `aria-label`）、`main`、`footer`、`article` 和面包屑的语义结构完整；标题层级没有跳级。
- 当前页面带 `aria-current`；移动菜单和语言切换都有 `aria-expanded` / `aria-controls`，按 Esc 关闭后焦点回到按钮。
- 所有交互元素都有清晰的 `:focus-visible` 焦点框，深色背景上会自动切换成黄铜色。
- 联系表单：
  - 每个字段都有 `<label>`；
  - 错误信息用页面语言显示，并通过 `aria-describedby` 关联到字段，同时设置 `aria-invalid`；
  - 提交失败时焦点移到第一个错误字段，提交成功后焦点移到成功提示的标题。
- 系统开启“减少动态效果”时，所有动画关闭。

## 验证结果（本机）

- `npm run build`、`npm run lint`、`npm run typecheck` 均无错误和警告。
- axe-core（WCAG 2.1 AA + best-practice）：28 个页面（4 种语言 × 7 个页面），0 个问题。分别在“减少动态效果”和正常动画两种设置下各测了一次。
- 交互测试：移动菜单、语言切换（保留当前路径）、表单校验和焦点管理，都已通过；360px 和 390px 宽度下没有横向滚动。
- Lighthouse（10 个页面，覆盖 4 种语言和全部页面类型）：
  - **无障碍、最佳实践、SEO：所有被测页面都是 100 分。**
  - **性能：没有在所有页面上稳定达到 95 分。** 这台测试机只有 2 个 CPU 核心，负载在 4 以上，CPU 基准分在 290–830 之间波动，Lighthouse 也给出了“CPU 比预期慢”的警告。同一页面重复测试，分数相差可达 10 分以上。
    - 桌面端：94–99 分。
    - 移动端（按 Lighthouse 文档建议把 CPU 降速校准为 2 倍）：76–95 分，CLS 为 0–0.03。
    - 移动端（默认 4 倍 CPU 降速）：英文首页 81 分，阿语首页 64 分。
  - 剩下的主要差距是 LCP（模拟慢速 4G 下约 2.8–3.7 秒），主要来自 Next.js/React 框架约 130KB（gzip）的 JS。
  - **正式上线后，请部署到 CDN 后用 PageSpeed Insights 复测**，那里的测试硬件更稳定。

## 上线前建议

- 联系表单目前只在浏览器内模拟提交。可以接入后端 API，或使用国内可访问的表单服务。注意遵守 PIPL、152-ФЗ 等个人信息保护法规。
- 如果服务器放在中国大陆，需要办理 ICP 备案，并在中文页脚显示备案号。
- 把 `NEXT_PUBLIC_SITE_URL` 设为正式域名，并在 Yandex Webmaster、百度搜索资源平台提交 sitemap。
