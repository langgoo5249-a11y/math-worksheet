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
