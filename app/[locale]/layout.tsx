import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import CookieConsent from "../_components/CookieConsent";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://www.skillxm.cn/${safeLocale === defaultLocale ? "" : safeLocale}`,
      siteName: "教材工具箱",
      locale: safeLocale === "zh" ? "zh_CN" : safeLocale,
      images: [
        {
          url: "https://www.skillxm.cn/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://www.skillxm.cn/og-image.jpg"],
    },
    alternates: {
      canonical: `https://www.skillxm.cn/${safeLocale === defaultLocale ? "" : safeLocale + "/"}`,
      languages: {
        "zh-CN": "https://www.skillxm.cn/",
        "en": "https://www.skillxm.cn/en/",
        "ja": "https://www.skillxm.cn/ja/",
        "ko": "https://www.skillxm.cn/ko/",
        "x-default": "https://www.skillxm.cn/",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const messages = await getMessages({ locale: safeLocale });

  return (
    <NextIntlClientProvider messages={messages} locale={safeLocale}>
      <CookieConsent />
      {children}

      {/* 微信小程序浮动二维码 */}
      <div className="fixed right-4 bottom-24 z-50 group" id="miniapp-float">
        <div className="relative">
          {/* 展开的二维码卡片 */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-52 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📱</span>
                <span className="text-sm font-bold text-gray-800">微信小程序使用</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-2 mb-2">
                <img src="/miniapp-qrcode.jpg" alt="微信小程序二维码" className="w-full h-auto rounded-lg" />
              </div>
              <p className="text-xs text-gray-500 text-center">微信扫码 → 即刻使用</p>
            </div>
            {/* 小三角 */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
          </div>

          {/* 浮动按钮 */}
          <div className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-xl">
            <span className="text-white text-xl">📱</span>
          </div>
        </div>
      </div>

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
    </NextIntlClientProvider>
  );
}
