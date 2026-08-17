# 练学宝 LianXueBao — Free Online Elementary Education Tools | 免费小学在线学习工具

> **Entity**: 练学宝 (LianXueBao) is a free online elementary education platform serving K-6 students, parents, and teachers in China. **SkillXM** is the platform's English-language brand, providing Chinese language learning tools for international learners. Both run on the same codebase at [www.skillxm.cn](https://www.skillxm.cn).

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://www.skillxm.cn)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## What Is 练学宝 (LianXueBao)?

**练学宝** is a **free online elementary education tool platform** (免费在线小学教育工具平台) designed for Chinese K-6 students, parents, and teachers. All tools run entirely in the browser — no registration, no app download, no fees. The platform generates printable PDF worksheets for math practice, Chinese calligraphy, English writing, poem memorization, unit tests, and more.

### What Is SkillXM?

**SkillXM** ([www.skillxm.cn/en/](https://www.skillxm.cn/en/)) is the English-language brand of 练学宝, offering **free Chinese language learning tools** for international learners. It includes pinyin conversion, stroke order animation, HSK flashcards, tone training, picture-based learning, and more — designed for English speakers starting their Chinese learning journey.

### Key Features

| Feature | Description |
|---------|------------|
| **10 Free Tools (中文版)** | Math worksheet generator, calligraphy sheet maker, mental math trainer, sudoku, flashcards, poem memorization, unit test generator, pinyin practice, English calligraphy, writing templates |
| **8 Free Tools (English)** | Pinyin converter, stroke order animator, tone trainer, pinyin chart, HSK flashcards, picture learning, radical explorer, reading reader |
| **110+ Blog Articles** | Expert-written educational articles on math learning, Chinese calligraphy, English learning, study methods, parenting guides — all with editorial review |
| **Grade-Specific Content** | Tools and resources tailored for grades 1-6, covering all major textbook editions (人教版 PEP, 北师大 BSD, 苏教 SUP, 部编 BUBIAN) |
| **No Registration Required** | All tools are free and instant — no sign-up, no app download, no paywall |
| **PDF Export** | All worksheets support one-click PDF download for printing |
| **Mobile Friendly** | Responsive design works on phones, tablets, and desktops |
| **SEO/GEO Optimized** | Schema.org JSON-LD structured data, llms.txt, sitemap with hreflang, optimized for Google AI Overviews and AI search engines |

---

## Architecture

```
练学宝 / SkillXM
├── Chinese Edition (zh-CN)    → https://www.skillxm.cn/
│   ├── 10 interactive tools   → /tools/*
│   ├── 110+ blog articles     → /blog/*
│   ├── Grade-specific pages   → /grade/*
│   ├── Knowledge hub          → /knowledge/*
│   ├── Textbook resources     → /textbook/*
│   └── Parent guides          → /parent-guide/*
│
├── English Edition (en)       → https://www.skillxm.cn/en/
│   ├── 8 Chinese learning tools → /en/tools/*
│   ├── 7 blog articles          → /en/blog/*
│   └── Category pages           → /en/blog/category/*
│
└── Shared Infrastructure
    ├── Next.js 16 App Router (SSG via `output: "export"`)
    ├── Cloudflare Pages (CDN + Functions)
    ├── Schema.org JSON-LD (Organization, WebSite, SoftwareApplication, Article, FAQ, Breadcrumb, Speakable)
    └── GitHub Actions CI/CD
```

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | Static site generation (App Router, `output: "export"`) |
| **React 19** | UI components |
| **TypeScript 5.9** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Cloudflare Pages** | Hosting, CDN, edge functions |
| **jsPDF + html2canvas** | Client-side PDF generation |
| **Schema.org JSON-LD** | Structured data for AI search engines |
| **next-intl** | Internationalization (zh/en) |

---

## SEO & GEO Strategy

This project implements a comprehensive **GEO (Generative Engine Optimization)** strategy to ensure AI search engines (Google AI Overviews, ChatGPT, Perplexity, 豆包) can understand and surface the platform's content:

### Structured Data (Schema.org)

- **Organization** with `@id` entity references — defines 练学宝 as a knowledge entity
- **Person** schema for author (陈老师) — E-E-A-T authoritativeness signal
- **WebSite** with `SpeakableSpecification` — voice search optimization
- **SoftwareApplication** for each tool — enables AI to surface tools in search results
- **Article** with `mentions` DefinedTerm — each article maps to knowledge concepts
- **FAQPage** — question-answer pairs for AI feature snippets
- **BreadcrumbList** — navigation hierarchy for crawlers
- **CollectionPage** — blog listing and category pages as structured collections
- **ItemList** — tool listings on homepage as structured item lists

### AI Crawler Optimization

- **`/llms.txt`** — structured markdown index for AI crawlers (90+ lines)
- **`/llms-en.txt`** — English version for international AI crawlers
- **`/robots.txt`** — optimized crawler rules with sitemap reference
- **`/sitemap.xml`** — dynamic sitemap with hreflang annotations

### Internal Link Network (Topic Mesh)

Every page is interconnected through a knowledge graph of internal links:
- Tool pages ↔ Blog articles (keyword-matched cross-links)
- Blog articles ↔ Grade pages
- Grade pages ↔ Knowledge points
- Knowledge points ↔ Blog articles
- All category pages have crawlable `<a href>` links (not JavaScript `<button>`)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Development

```bash
# Clone the repository
git clone https://github.com/langgoo5249-a11y/math-worksheet.git
cd math-worksheet

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000
```

### Build

```bash
# Production build (static export)
npm run build

# Output is in /out directory
# Ready for deployment to Cloudflare Pages or any static host
```

### Deployment

The project deploys to **Cloudflare Pages** via GitHub Actions:

1. Push to `main` or `master` branch
2. GitHub Actions builds the project (`npm run build`)
3. Cloudflare Pages action deploys the `/out` directory to production

**Live URLs:**
- Chinese: [https://www.skillxm.cn](https://www.skillxm.cn)
- English: [https://www.skillxm.cn/en/](https://www.skillxm.cn/en/)

---

## Project Structure

```
math-worksheet/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Chinese homepage
│   ├── layout.tsx            # Root layout (JSON-LD, metadata)
│   ├── sitemap.ts            # Dynamic sitemap generation
│   ├── blog/                 # Chinese blog (110+ articles)
│   │   ├── data.ts           # Article data source
│   │   ├── [slug]/page.tsx   # Article detail page
│   │   └── category/         # Category pages
│   ├── en/                   # English edition (SkillXM)
│   │   ├── page.tsx          # English homepage
│   │   ├── blog/             # English blog (7 articles)
│   │   └── tools/            # English tools (8 tools)
│   ├── tools/                # Chinese tools (10 tools)
│   ├── grade/                # Grade-specific pages (1-6)
│   ├── knowledge/            # Knowledge point hub
│   ├── textbook/             # Textbook resources
│   ├── parent-guide/         # Parent guides
│   ├── editorial-policy/     # Editorial policy page
│   └── _components/          # Shared components
├── lib/                      # Shared utilities
│   ├── toolRegistry.ts       # Unified tool registry
│   ├── seoUtils.ts           # SEO utilities (JSON-LD generators)
│   └── i18n.ts               # Internationalization
├── public/                   # Static assets
│   ├── llms.txt              # AI crawler index
│   ├── llms-en.txt           # English AI crawler index
│   ├── robots.txt            # Crawler rules
│   ├── _redirects            # Cloudflare redirects
│   ├── _headers              # Cloudflare headers
│   └── rss.xml               # RSS feed
├── scripts/                  # Build scripts
│   ├── postbuild.cjs         # Post-build cleanup & validation
│   ├── generate-rss.cjs      # RSS feed generation
│   └── push-to-baidu.cjs     # Baidu URL submission
├── functions/                # Cloudflare Pages Functions
├── .github/workflows/        # CI/CD workflows
│   └── deploy.yml            # Deploy to Cloudflare Pages
└── package.json
```

---

## Tools Catalog

### Chinese Edition (练学宝) — 10 Tools

| # | Tool | Path | Description | Grades |
|---|------|------|-------------|--------|
| 1 | 数学练习卷生成器 | `/tools/math-worksheet/` | Math worksheet generator with addition, subtraction, multiplication, division, fractions, equations | 1-6 |
| 2 | 字帖生成器 | `/tools/calligraphy/` | Chinese calligraphy sheet maker with 田字格/米字格 templates | 1-6 |
| 3 | 口算速练 | `/tools/mental-math/` | Mental math speed trainer with 4 difficulty levels | 1-6 |
| 4 | 数独游戏 | `/tools/sudoku/` | Sudoku puzzle game with multiple difficulty levels | 1-6 |
| 5 | 识字卡片 | `/tools/flashcards/` | Chinese character flashcard generator with pinyin and word groups | 1-3 |
| 6 | 作文模板 | `/tools/writing-template/` | Writing template generator for Chinese composition | 1-6 |
| 7 | 古诗词默写 | `/tools/poem-memo/` | Classical Chinese poem memorization tool (240+ poems) | 1-6 |
| 8 | 单元测试卷 | `/tools/unit-test/` | Unit test generator covering Math, Chinese, English, Science (305 units) | 1-6 |
| 9 | 英语字帖 | `/tools/english-calligraphy/` | English handwriting practice sheet generator | 3-6 |
| 10 | 拼音注音 | `/tools/pinyin/` | Pinyin practice sheet generator with 四线三格 format | 1-2 |

### English Edition (SkillXM) — 8 Tools

| # | Tool | Path | Description |
|---|------|------|-------------|
| 1 | Pinyin Converter | `/en/tools/pinyin-converter/` | Convert Chinese characters to pinyin with tone marks |
| 2 | Stroke Order | `/en/tools/stroke-order/` | Animated Chinese character stroke order diagrams |
| 3 | Tone Trainer | `/en/tools/tone-trainer/` | Interactive Chinese tone listening and speaking practice |
| 4 | Pinyin Chart | `/en/tools/pinyin-chart/` | Complete pinyin syllable chart with audio |
| 5 | HSK Flashcards | `/en/tools/hsk-flashcards/` | HSK 1-6 vocabulary flashcards with spaced repetition |
| 6 | Picture Learning | `/en/tools/picture-learning/` | Visual Chinese vocabulary learning with images |
| 7 | Radical Explorer | `/en/tools/radical-explorer/` | Interactive Chinese character radical browser |
| 8 | Reading Reader | `/en/tools/reading-reader/` | Graded Chinese reading practice with pinyin annotations |

---

## Knowledge Graph Architecture

The platform is built as an **interconnected knowledge graph** where every entity is machine-readable:

```
Organization (练学宝)
├── Person (陈老师) — author, editor
├── WebSite (https://www.skillxm.cn)
│   ├── WebPage (homepage)
│   ├── CollectionPage (blog listing)
│   │   ├── Article × 110+ (blog posts)
│   │   │   └── DefinedTerm (knowledge concepts)
│   │   └── CollectionPage (category pages)
│   ├── SoftwareApplication × 10 (tools)
│   ├── WebPage (grade pages 1-6)
│   ├── WebPage (knowledge points)
│   ├── WebPage (textbook resources)
│   └── WebPage (parent guides)
├── FAQPage (question-answer pairs)
└── SpeakableSpecification (voice search)
```

---

## External Links & Resources

- **Official Website (中文)**: [https://www.skillxm.cn](https://www.skillxm.cn)
- **Official Website (English)**: [https://www.skillxm.cn/en/](https://www.skillxm.cn/en/)
- **Blog (中文)**: [https://www.skillxm.cn/blog/](https://www.skillxm.cn/blog/)
- **Blog (English)**: [https://www.skillxm.cn/en/blog/](https://www.skillxm.cn/en/blog/)
- **Editorial Policy**: [https://www.skillxm.cn/editorial-policy/](https://www.skillxm.cn/editorial-policy/)
- **About Us**: [https://www.skillxm.cn/about/](https://www.skillxm.cn/about/)
- **Contact**: [https://www.skillxm.cn/contact/](https://www.skillxm.cn/contact/)

---

## Keywords

`小学教育工具` `免费在线学习` `数学练习卷生成器` `字帖生成器` `口算速练` `数独游戏` `识字卡片` `古诗词默写` `单元测试卷` `拼音学习` `英语字帖` `作文模板` `小学生学习工具` `在线教育平台` `免费试卷下载` `Chinese learning tools` `pinyin converter` `HSK flashcards` `stroke order` `Chinese character practice` `learn Chinese online` `free education tools` `elementary math worksheets` `calligraphy practice` `Next.js static site` `Cloudflare Pages`

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

*Built with ❤️ for students, parents, and teachers. Making quality education tools free and accessible to everyone.*