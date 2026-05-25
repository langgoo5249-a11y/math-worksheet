import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { TOOLS, generateSchemaApps, generateSchemaBreadcrumbs, ACTIVE_TOOL_COUNT } from "@/lib/toolRegistry";
import CookieConsent from './_components/CookieConsent';
import GoogleAnalytics from './_components/GoogleAnalytics';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


const notoSansSC = Noto_Sans_SC({
  // 不限制 subsets，next/font/google 默认下载完整字体包（含 CJK 中文字符）
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: true,
});

// 根布局保持静态预渲染，canonical 由各页面 layout 分别定义
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "练学宝 - 免费小学教学工具/数学练习卷/字帖/口算生成器等",
  description: "练学宝提供10+款免费小学教学工具，包括数学练习卷生成器、字帖生成器、口算速练、拼音学习、识字卡片、古诗词默写、单元测试卷等，支持PDF导出打印，无需注册即开即用。适合小学1-6年级学生日常练习与教师课堂教学使用。",
  keywords: "练学宝,练学宝,小学教学工具,数学练习卷生成器,字帖生成器,口算速练,拼音学习,识字卡片,古诗词默写,单元测试卷,免费试卷,小学教育资源,PDF打印",
  openGraph: {
    title: "练学宝 - 免费小学教学工具/数学练习卷/字帖/口算生成器等",
    description: "练学宝提供10+款免费小学教学工具，包括数学练习卷生成器、字帖生成器、口算速练、拼音学习、识字卡片、古诗词默写、单元测试卷等，支持PDF导出打印，无需注册即开即用。适合小学1-6年级学生日常练习与教师课堂教学使用。",
    type: "website",
    url: "https://www.skillxm.cn",
    siteName: "练学宝",
    locale: "zh_CN",
    images: [
      {
        url: "https://www.skillxm.cn/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "练学宝 - 免费在线教育工具",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "练学宝 - 免费小学数学练习卷生成器/字帖/作文模板",
    description: "免费在线教育工具，支持小学1-6年级数学练习卷、字帖、拼音卡片、数独、作文模板等，PDF导出即印即用，无需注册完全免费。",
    images: ["https://www.skillxm.cn/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.skillxm.cn/",
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      'en': 'https://www.skillxm.cn/en/',
      'ja': 'https://www.skillxm.cn/ja/',
      'ko': 'https://www.skillxm.cn/ko/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48 256x256", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 获取默认中文消息
  const messages = await getMessages({ locale: 'zh' });
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.skillxm.cn/#website",
        name: "练学宝",
        url: "https://www.skillxm.cn/",
        description: "免费在线教育工具集合，包括数学练习卷生成器、字帖生成器、英语字帖、数独游戏、口算速练、识字卡片、作文模板、拼音注音，支持PDF导出打印",
        inLanguage: "zh-CN",
        dateModified: "2026-05-09",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.skillxm.cn/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        publisher: {
          "@id": "https://www.skillxm.cn/#organization"
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.skillxm.cn/#organization",
        name: "练学宝",
        url: "https://www.skillxm.cn",
        dateModified: "2026-05-09",
        logo: {
          "@type": "ImageObject",
          url: "https://www.skillxm.cn/favicon.svg",
          width: 512,
          height: 512,
        },
        description: `免费在线教育工具集合，为小学生和家长提供数学练习卷、字帖、数独等${ACTIVE_TOOL_COUNT}款实用工具`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "CN",
          addressRegion: "浙江",
          addressLocality: "绍兴",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 30.0,
          longitude: 120.5833,
        },
        areaServed: {
          "@type": "Country",
          name: "CN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "lang@skillxm.cn",
          contactType: "customer support",
          availableLanguage: "Chinese",
        },
      },
      ...generateSchemaApps(),
      ...generateSchemaBreadcrumbs(),
      {
        "@type": "WebPage",
        "@id": "https://www.skillxm.cn/#webpage",
        "url": "https://www.skillxm.cn",
        "name": "练学宝 - 免费小学教学工具",
        "description": "练学宝提供10+款免费小学教学工具，包括数学练习卷生成器、字帖生成器、口算速练、拼音学习、识字卡片、古诗词默写、单元测试卷等，支持PDF导出打印，无需注册即开即用。",
        "isPartOf": { "@id": "https://www.skillxm.cn/#website" },
        "about": { "@id": "https://www.skillxm.cn/#organization" }
      },
      {
        "@type": "ItemList",
        "name": "练学宝 - 全部工具",
        "description": "练学宝提供的所有免费小学教学工具",
        "dateModified": "2026-05-09",
        "numberOfItems": ACTIVE_TOOL_COUNT,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "古诗词默写", "url": "https://www.skillxm.cn/tools/poem-memo" },
          { "@type": "ListItem", "position": 2, "name": "单元测试卷", "url": "https://www.skillxm.cn/tools/unit-test" },
          { "@type": "ListItem", "position": 3, "name": "数学练习卷", "url": "https://www.skillxm.cn/tools/math-worksheet" },
          { "@type": "ListItem", "position": 4, "name": "字帖生成器", "url": "https://www.skillxm.cn/tools/calligraphy" },
          { "@type": "ListItem", "position": 5, "name": "英语字帖", "url": "https://www.skillxm.cn/tools/english-calligraphy" },
          { "@type": "ListItem", "position": 6, "name": "数独游戏", "url": "https://www.skillxm.cn/tools/sudoku" },
          { "@type": "ListItem", "position": 7, "name": "拼音注音", "url": "https://www.skillxm.cn/tools/pinyin" },
          { "@type": "ListItem", "position": 8, "name": "口算速练", "url": "https://www.skillxm.cn/tools/mental-math" },
          { "@type": "ListItem", "position": 9, "name": "识字卡片", "url": "https://www.skillxm.cn/tools/flashcards" },
          { "@type": "ListItem", "position": 10, "name": "作文模板", "url": "https://www.skillxm.cn/tools/writing-template" }
        ]
      },
      {
        "@type": "HowTo",
        "name": "如何使用数学练习卷生成器",
        "description": "使用练学宝的数学练习卷生成器，只需5步即可生成可打印的数学练习卷",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "选择题型和年级",
            "text": "在工具页面选择需要的题型（加法、减法、乘法、除法等）和对应的年级（1-6年级）"
          },
          {
            "@type": "HowToStep",
            "name": "设置题目数量和数字范围",
            "text": "设定每次生成的题目数量（10/20/50/100道）和数字范围（10以内到10000以内）"
          },
          {
            "@type": "HowToStep",
            "name": "选择模板样式",
            "text": "从田字格、方格纸、横线格、空白纸4种模板中选择适合的打印样式"
          },
          {
            "@type": "HowToStep",
            "name": "点击生成",
            "text": "点击「立即出题」按钮，系统会随机生成不重复的数学练习卷"
          },
          {
            "@type": "HowToStep",
            "name": "预览并导出PDF",
            "text": "预览生成的练习卷，确认无误后点击「下载PDF」或「直接打印」按钮"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "练学宝是免费的吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "是的，练学宝所有功能完全免费使用，无需注册账号，不收取任何费用。我们承诺永久免费，让每个孩子都能享受到优质的教育工具。"
            }
          },
          {
            "@type": "Question",
            "name": "生成的练习卷和字帖可以打印吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "可以。所有工具都支持一键导出PDF文件，您可以直接打印使用。PDF文件格式规范，打印效果清晰，适合A4纸打印。"
            }
          },
          {
            "@type": "Question",
            "name": "支持哪些年级？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "主要面向小学1-6年级学生，部分工具（如数独游戏、作文模板）也适合初中生和成年人使用。数学练习卷支持按年级选择题型和难度。"
            }
          },
          {
            "@type": "Question",
            "name": "需要注册账号吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "不需要。所有工具打开即用，无需注册、登录或提供任何个人信息。您的数据完全在浏览器本地处理，不会上传到服务器。"
            }
          },
          {
            "@type": "Question",
            "name": "题目会重复吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "不会。每次生成的练习卷都是随机出题，同一配置下每次结果都不同，避免机械重复，真正达到练习效果。"
            }
          },
          {
            "@type": "Question",
            "name": "手机上能用吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "可以。网站采用响应式设计，手机、平板、电脑都能正常使用。不过在手机上生成PDF后，建议发送到电脑或连接打印机进行打印。"
            }
          },
          {
            "@type": "Question",
            "name": "如何打印生成的练习卷？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "生成练习卷后，点击「下载PDF」按钮将文件保存到本地，然后用A4纸打印即可。也可以直接点击「直接打印」按钮，调用浏览器打印功能进行打印。建议打印时选择「无边距」和「实际大小」以获得最佳效果。"
            }
          },
          {
            "@type": "Question",
            "name": "生成的试卷可以商用吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "练学宝生成的练习卷和字帖仅供个人学习、家庭教育和课堂教学使用，不可用于商业用途。如需商用授权，请联系我们的客服团队获取许可。"
            }
          },
          {
            "@type": "Question",
            "name": "数据安全吗？孩子信息会泄露吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "完全安全。练学宝所有功能在浏览器本地运行，不会收集、存储或上传任何用户数据。不需要输入姓名、电话等个人信息。我们使用百度统计了解匿名访问趋势，使用 Google AdSense 展示广告，用户可通过Cookie横幅选择关闭追踪，充分保护隐私安全。"
            }
          }
        ]
      },
    ],
  };

  return (
    <html lang="zh-CN" className={notoSansSC.className}>
      <head>
        <meta name="baidu-site-verification" content="codeva-nVZFsgvPZu" />

        {/* Google Search Console 站点验证 */}
        {/* 请在 https://search.google.com/search-console 添加站点后获取验证码 */}
        {/* 替换下方 content 值为你的 GSC 验证码 */}
        {/* <meta name="google-site-verification" content="YOUR_GSC_VERIFICATION_CODE" /> */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <meta name="msapplication-TileImage" content="/favicons/favicon-32x32.png" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="theme-color" content="#1e40af" />

        {/* hreflang SEO + GEO 信号 */}
        <link rel="alternate" hrefLang="zh-CN" href="https://www.skillxm.cn/" />
        <link rel="alternate" hrefLang="en" href="https://www.skillxm.cn/en/" />
        <link rel="alternate" hrefLang="ja" href="https://www.skillxm.cn/ja/" />
        <link rel="alternate" hrefLang="ko" href="https://www.skillxm.cn/ko/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.skillxm.cn/" />

        {/* 动态设置 html lang 属性（根据 URL 路径） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var m = location.pathname.match(/^\\/(en|ja|ko)(\\/|$)/);
                if (m) {
                  var langMap = { en: 'en', ja: 'ja', ko: 'ko' };
                  document.documentElement.lang = langMap[m[1]] || 'zh-CN';
                }
              })();
            `,
          }}
        />

        {/* dns-prefetch 第三方资源 */}
        <link rel="dns-prefetch" href="https://hm.baidu.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://zz.bdstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Google Consent Mode v2 - 默认拒绝 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Consent Mode v2: 默认所有存储为 denied
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500,
              });

              gtag('js', new Date());
              gtag('config', 'G-GGPDNKW46W', {
                send_page_view: true
              });
            `,
          }}
        />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GGPDNKW46W" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        {/* Google AdSense — 仅在用户同意Cookie后加载 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function loadAdSense() {
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4710405779358793';
                  s.crossOrigin = 'anonymous';
                  document.head.appendChild(s);
                }
                var consent = localStorage.getItem('cookie-consent');
                if (consent === 'accepted') {
                  loadAdSense();
                } else {
                  window.addEventListener('cookie-consent-accepted', function() {
                    loadAdSense();
                  }, { once: true });
                }
              })();
            `,
          }}
        />

        {/* 百度主动推送 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var bp = document.createElement('script');
                var curProtocol = window.location.protocol.split(':')[0];
                if (curProtocol === 'https') {
                  bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                } else {
                  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                }
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(bp, s);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages} locale="zh">
          <CookieConsent />
          {children}
        </NextIntlClientProvider>
        {/* 百度统计 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?b1c5ccce83f4e80c4c12dea6bd544723";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
        {/* Google Analytics 4 — 仅在用户同意Cookie后加载 */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
