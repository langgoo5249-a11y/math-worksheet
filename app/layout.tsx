import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { TOOLS, ACTIVE_TOOL_COUNT } from "@/lib/toolRegistry";
import CookieConsent from './_components/CookieConsent';
import GoogleAnalytics from './_components/GoogleAnalytics';
import FloatingLanguageSwitcher from './_components/FloatingLanguageSwitcher';
import MiniappModal from './_components/MiniappModal';
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


const notoSansSC = Noto_Sans_SC({
  // 不限制 subsets，next/font/google 默认下载完整字体包（含 CJK 中文字符）
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
  subsets: ['latin'],
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
  description: "练学宝是儿童中文学习网站，提供10+款免费小学中文学习与数学教学工具，包括数学练习卷生成器、字帖生成器、口算速练（支持AI智能出题和进度追踪）、拼音学习、识字卡片、古诗词默写、单元测试卷等。支持手机在线做题和PDF导出打印，无需注册即开即用。适合小学1-6年级学生日常中文学习与数学练习使用。",
  keywords: "练学宝,中文学习,小学中文学习,儿童中文学习网站,小学教学工具,数学练习卷生成器,字帖生成器,口算速练,拼音学习,识字卡片,古诗词默写,单元测试卷,免费试卷,小学教育资源,PDF打印,手机练习,在线做题,免费打印试卷,小学数学题,小学语文练习,英语字帖,数独游戏,AI口算出题,口算学习报告",
  openGraph: {
    title: "练学宝 - 儿童中文学习网站|免费小学教学工具|数学练习卷|字帖|口算",
    description: "练学宝是优质的儿童中文学习网站，提供拼音学习、识字卡片、古诗词默写、字帖生成器等中文学习工具，以及数学练习卷、口算速练等10+款免费小学教学工具，支持PDF导出打印，无需注册即开即用。",
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
    // hreflang 由 <link> 标签在 <head> 中硬编码（避免与 metadata API 重复）
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
        dateModified: "2026-06-21",
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
        dateModified: "2026-06-21",
        logo: {
          "@type": "ImageObject",
          url: "https://www.skillxm.cn/favicon.svg",
          width: 512,
          height: 512,
        },
        description: `练学宝是儿童中文学习网站，提供小学中文学习工具与数学教学工具。包括拼音学习、识字卡片、古诗词默写、字帖生成器等中文学习资源，以及数学练习卷、口算速练、数独游戏等${ACTIVE_TOOL_COUNT}款实用工具`,
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
          "https://github.com/jm6-lang/math-worksheet",
        ],
        foundingDate: "2025-12-01",
        contactPoint: {
          "@type": "ContactPoint",
          email: "lang@skillxm.cn",
          contactType: "customer support",
          availableLanguage: ["Chinese", "English", "Japanese", "Korean"],
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.skillxm.cn/#person-linyuan",
        name: "林远",
        description: "练学宝创始人，具备教育技术和全栈开发双重背景。两个孩子的父亲，持续关注小学教育技术领域，致力于为家长和老师提供免费优质的教育资源。",
        jobTitle: "教育内容作者",
        sameAs: [
          "https://github.com/jm6-lang",
          "https://www.skillxm.cn/about"
        ],
        alumniOf: {
          "@type": "Organization",
          "name": "练学宝"
        },
        knowsAbout: [
          "小学教育",
          "教育技术",
          "数学启蒙",
          "语文写字教学",
          "英语自然拼读"
        ],
        affiliation: {
          "@id": "https://www.skillxm.cn/#organization"
        },
        url: "https://www.skillxm.cn/about",
      },
      {
        "@type": "SpeakableSpecification",
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
        "@type": "ItemList",
        "name": "练学宝 - 全部工具",
        "description": "练学宝提供的所有免费小学教学工具",
        "dateModified": "2026-06-21",
        "numberOfItems": ACTIVE_TOOL_COUNT,
        "itemListElement": TOOLS.filter(t => t.active).map((tool, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": tool.name,
          "url": `https://www.skillxm.cn${tool.path}`
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "练学宝是免费的吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "是的，练学宝所有工具完全免费，无需注册即可使用。数学练习卷、字帖生成器、口算速练等工具均可免费生成并导出PDF打印。"
            }
          },
          {
            "@type": "Question",
            "name": "练学宝适合多大的孩子使用？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "练学宝主要面向小学1-6年级学生，涵盖数学计算、语文练字、拼音学习、识字卡片、古诗词默写等核心学科内容。同时提供幼小衔接和思维训练内容，适合5-12岁儿童。"
            }
          },
          {
            "@type": "Question",
            "name": "生成的练习卷可以打印吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "可以。所有工具生成的练习卷、字帖、口算题等均支持PDF导出和一键打印，方便家长和老师使用。"
            }
          },
          {
            "@type": "Question",
            "name": "需要下载APP吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "不需要。练学宝是纯网页工具，在手机和电脑浏览器中直接打开即可使用，无需下载安装任何APP。"
            }
          },
          {
            "@type": "Question",
            "name": "练学宝支持哪些教材版本？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "练学宝支持人教版、北师大版、苏教版、部编版等主流教材版本，覆盖1-6年级上下册共305个单元，各版本知识点同步练习。"
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
        {/* 关键资源预加载 - 优化 Core Web Vitals (LCP) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="https://www.skillxm.cn/og-image.jpg" fetchPriority="high" />
        {/* DNS 预解析 - 加速第三方服务 */}
        <link rel="dns-prefetch" href="https://hm.baidu.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <meta name="baidu-site-verification" content="codeva-nVZFsgvPZu" />

        <meta name="google-site-verification" content="6szVJUGCDvvDDcBkDLV0n6kD_KU1EyOWnO7MSw-5ERM" />
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

        {/* hreflang SEO + GEO 信号
            注意：/en/, /ja/, /ko/ 路由已被 _redirects 301 重定向到 /（中文版），
            不再作为独立语言版本对外提供，因此 hreflang 简化为只有 zh-CN 和 x-default */}
        <link rel="alternate" hrefLang="zh-CN" href="https://www.skillxm.cn/" />
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
        <link rel="dns-prefetch" href="https://zz.bdstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://lf1-cdn-tos.bytegoofy.com" />
        <link rel="preconnect" href="https://lf1-cdn-tos.bytegoofy.com" crossOrigin="anonymous" />

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

        {/* AdSense 广告代码 - 仅加载基础库，由 AdUnit 组件触发具体广告 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4710405779358793" crossOrigin="anonymous" />

        {/* 百度主动推送 - 延迟到页面加载后执行 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function(){
                var bp = document.createElement('script');
                var curProtocol = window.location.protocol.split(':')[0];
                if (curProtocol === 'https') {
                  bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                } else {
                  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                }
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(bp, s);
              });
            `,
          }}
        />

        {/* 头条搜索（字节跳动）主动推送 - 延迟到页面加载后执行 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function(){
                var el = document.createElement('script');
                el.src = 'https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?278b7bc276aa0b514ff5c4e28d63b1e083f58bd22a48d8e0e73447efb03530befd9a9dcb5ced4d7780eb6f3bbd089073c2a6d54440560d63862bbf4ec01bba3a';
                el.id = 'ttzz';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(el, s);
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale="zh">
          <CookieConsent />
          {children}
        </NextIntlClientProvider>

        {/* 微信小程序浮动二维码 */}
        <div className="fixed right-4 bottom-24 z-50 group" id="miniapp-float" style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}>
          <div className="relative">
            {/* 展开的二维码卡片 */}
            <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl p-4 w-52 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📱</span>
                  <span className="text-sm font-bold text-gray-800">微信小程序使用</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-2 mb-2">
                  <img src="/miniapp-qrcode.jpg" alt="微信小程序二维码" className="w-full h-auto rounded-lg" width="200" height="200" loading="lazy" />
                </div>
                <p className="text-xs text-gray-500 text-center">微信扫码 → 即刻使用</p>
              </div>
              {/* 小三角 */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
            </div>

            {/* 浮动按钮 */}
            <div className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-xl group/title">
              <span className="text-white text-xl">📱</span>
              <span className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/title:opacity-100 group-hover/title:visible transition-all duration-200 whitespace-nowrap shadow-lg">
                小程序使用
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </span>
            </div>
          </div>
        </div>

        {/* 语言切换器悬浮按钮 */}
        <FloatingLanguageSwitcher />

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

        {/* 微信小程序二维码弹窗 */}
        <MiniappModal />
      </body>
    </html>
  );
}