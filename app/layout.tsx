import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import CookieConsent from './_components/CookieConsent';
import ConsentAwareScripts from './_components/ConsentAwareScripts';
import GoogleAnalytics from './_components/GoogleAnalytics';
import FloatingLanguageSwitcher from './_components/FloatingLanguageSwitcher';
import FloatingMiniappButton from './_components/FloatingMiniappButton';
import MiniappModal from './_components/MiniappModal';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
  subsets: ['latin'],
  fallback: ['system-ui', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
  adjustFontFallback: false,
});

// 根布局保持静态预渲染，canonical 由各页面 layout 分别定义
export const dynamic = "force-static";

// 移动端 viewport 配置
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e40af",
};

export const metadata: Metadata = {
  title: "练学宝 - 免费小学教学工具/中文学习/数学练习卷/字帖/口算",
  description: "练学宝是儿童中文学习网站，提供10+款免费小学教学工具，包括数学练习卷、字帖、口算速练、拼音、识字卡片、古诗词默写等，支持手机在线做题与PDF打印，无需注册即开即用。",
  keywords: "练学宝,小学教学工具,数学练习卷生成器,字帖生成器,口算速练,拼音学习,识字卡片,古诗词默写,单元测试卷,免费试卷",
  openGraph: {
    title: "练学宝 - 儿童中文学习网站|免费小学教学工具|数学练习卷|字帖|口算",
    description: "练学宝是优质的儿童中文学习网站，提供拼音学习、识字卡片、古诗词默写、字帖生成器等中文学习工具，以及数学练习卷、口算速练等10+款免费小学教学工具，支持PDF导出打印，无需注册即开即用。",
    type: "website",
    url: "https://www.example.com",
    siteName: "练学宝",
    locale: "zh_CN",
    images: [
      {
        url: "https://www.example.com/og-image.jpg",
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
    images: ["https://www.example.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.example.com/",
    languages: {
      "zh-CN": "https://www.example.com/",
      "en": "https://www.example.com/en/",
      "x-default": "https://www.example.com/",
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
  // 2026-07-09: 移除 ai-content-declaration 元标签
  // Google 2026年7月 Core Update 明确打击 AI 内容农场，
  // ai-content-declaration 标签在此背景下成为负面排名信号。
  // 本站内容均由人工审校，AI 仅辅助生成初稿。
  other: {
    'datePublished': '2025-12-01',
    'dateModified': '2026-07-10',
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
        "@id": "https://www.example.com/#website",
        name: "练学宝",
        url: "https://www.example.com/",
        description: "免费在线教育工具集合，包括数学练习卷生成器、字帖生成器、英语字帖、数独游戏、口算速练、识字卡片、作文模板、拼音注音，支持PDF导出打印",
        inLanguage: "zh-CN",
        dateModified: "2026-07-18",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.example.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        publisher: {
          "@id": "https://www.example.com/#organization"
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.example.com/#organization",
        name: "练学宝",
        url: "https://www.example.com/",
        dateModified: "2026-07-03",
        logo: {
          "@type": "ImageObject",
          url: "https://www.example.com/favicon.svg",
          width: 512,
          height: 512,
        },
        description: `练学宝是儿童中文学习网站，提供小学中文学习工具与数学教学工具。包括拼音学习、识字卡片、古诗词默写、字帖生成器等中文学习资源，以及数学练习卷、口算速练、数独游戏等10+款实用工具`,
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
        sameAs: [
          "https://github.com/langgoo5249-a11y/math-worksheet",
          "https://www.example.com/",
          "https://xhslink.com/m/8u3VNbmKr0F",
          "https://author.baidu.com/home?from=bjh_article&app_id=1810332299795975",
        ],
        foundingDate: "2025-12-01",
        knowsAbout: [
          "小学教育",
          "在线教育工具",
          "数学练习卷",
          "字帖生成",
          "口算练习",
          "拼音学习",
          "识字卡片",
          "古诗词默写",
          "中文学习",
          "教育技术",
          "英语书写",
          "数独游戏",
          "单元测试",
          "作文写作",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "lang@example.com",
          contactType: "customer support",
          availableLanguage: ["Chinese", "English", "Japanese", "Korean"],
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.example.com/#person-chenlaoshi",
        name: "陈老师",
        description: "练学宝创始人，具备教育技术和全栈开发双重背景。两个孩子的父亲，持续关注小学教育技术领域，致力于为家长和老师提供免费优质的教育资源。",
        jobTitle: "教育内容作者",
        sameAs: [
          "https://github.com/langgoo5249-a11y",
          "https://www.example.com/about/",
          "https://www.xiaohongshu.com/user/profile/6723c8e3000000001c02b1a8",
        ],
        knowsAbout: [
          "小学教育",
          "教育技术",
          "数学启蒙",
          "语文写字教学",
          "英语自然拼读"
        ],
        affiliation: {
          "@id": "https://www.example.com/#organization"
        },
        url: "https://www.example.com/about/",
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "全栈开发工程师",
            "description": "具备前端、后端及云基础设施全栈开发能力，负责练学宝平台技术架构设计",
            "credentialCategory": "professional certification"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "教育内容创作者",
            "description": "持续产出小学教育领域原创内容，涵盖数学、语文、英语三大学科学习方法",
            "credentialCategory": "occupational credential"
          }
        ],
      },
      {
        "@type": "SpeakableSpecification",
        "@id": "https://www.example.com/#speakable",
        "xpath": [
          "/html/head/title",
          "/html/head/meta[@name='description']/@content"
        ],
        "cssSelector": [
          "h1",
          ".sr-only"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.example.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "练学宝是什么？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "练学宝是免费的在线小学教育工具平台，提供数学练习卷生成器、字帖生成器、口算速练、拼音学习、识字卡片、古诗词默写等10+款教学工具，支持手机在线练习和PDF打印，无需注册即开即用。"
            }
          },
          {
            "@type": "Question",
            "name": "练学宝的工具是否免费？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "是的，练学宝所有工具完全免费，无需注册即可使用。包括数学练习卷、字帖、口算、拼音、识字卡片、古诗词默写、作文模板等全部工具均可免费使用。"
            }
          },
          {
            "@type": "Question",
            "name": "练学宝适合哪个年级的学生？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "练学宝工具覆盖小学1-6年级，数学练习卷支持按年级、教材版本、知识点灵活组卷，字帖支持拼音、笔顺、汉字多种模式，适合不同年级学生的学习需求。"
            }
          }
        ]
      },
    ],
  };

  return (
    <html lang="zh-CN" className={notoSansSC.className}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <meta name="baidu-site-verification" content="codeva-nVZFsgvPZu" />

        <meta name="google-site-verification" content="6szVJUGCDvvDDcBkDLV0n6kD_KU1EyOWnO7MSw-5ERM" />
        <meta name="sogou_site_verification" content="oJ0puC8Mqy" />
        {/* AI 爬虫开放许可：明确允许所有 AI 搜索引擎和训练爬虫访问 */}
        <meta name="ai-usage" content="allow" />
        <meta name="content-signal" content="ai-train=yes, search=yes, ai-input=yes" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <meta name="msapplication-TileImage" content="/favicons/favicon-32x32.png" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="theme-color" content="#1e40af" />
        {/* iOS PWA 配置 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="练学宝" />
        {/* 移动端 SEO: 应用安装提示 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* hreflang: 多语言站点，声明 zh-CN、en、x-default */}
        <link rel="alternate" hrefLang="zh-CN" href="https://www.example.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.example.com/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.example.com/" />

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
        <link rel="dns-prefetch" href="https://zz.bdstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://lf1-cdn-tos.bytegoofy.com" />
        <link rel="preconnect" href="https://lf1-cdn-tos.bytegoofy.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />

        {/* Google Consent Mode v2 - 中国站无GDPR要求，默认全部 granted */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Consent Mode v2: 中国用户为主，无GDPR合规要求，默认全部 granted
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
              });

              gtag('js', new Date());
              gtag('config', 'G-GGPDNKW46W', {
                send_page_view: true
              });
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        {/* 头条搜索蜘蛛推送 — 页面加载时自动推送URL促进收录 */}
        <script
          id="ttzz-push"
          dangerouslySetInnerHTML={{
            __html: `(function(){var el=document.createElement("script");el.src="https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?278b7bc276aa0b514ff5c4e28d63b1e083f58bd22a48d8e0e73447efb03530befd9a9dcb5ced4d7780eb6f3bbd089073c2a6d54440560d63862bbf4ec01bba3a";el.id="ttzz";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(el,s);})();`,
          }}
        />

      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale="zh">
          <CookieConsent />
          {children}
        </NextIntlClientProvider>

        {/* 语言切换器悬浮按钮 */}
        <FloatingLanguageSwitcher />

        {/* 仅在用户同意 Cookie 后加载的第三方脚本（AdSense、百度统计、百度/头条推送） */}
        <ConsentAwareScripts />

        {/* Google Analytics 4 — 通过 Consent Mode v2 管理 */}
        <GoogleAnalytics />

        {/* ⚠️ 微信小程序入口 - 核心功能不可删除 */}
        <FloatingMiniappButton />

        {/* ⚠️ 微信小程序自动弹窗 - 24小时弹出一次，核心功能不可删除 */}
        <MiniappModal />
      </body>
    </html>
  );
}