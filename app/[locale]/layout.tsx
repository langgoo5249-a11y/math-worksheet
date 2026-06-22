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
    robots: {
      // 多语言 wrapper 页面：避免与中文原页内容重复，统一指向中文版本
      index: false,
      follow: true,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://www.skillxm.cn/${safeLocale === defaultLocale ? "" : safeLocale}`,
      siteName: "练学宝",
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
      // 多语言 wrapper 页面本身设置为 noindex，这里使用自引用 canonical
      // 避免与中文原页的 hreflang 信号冲突
      canonical:
        safeLocale === defaultLocale
          ? 'https://www.skillxm.cn/'
          : `https://www.skillxm.cn/${safeLocale}/`,
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
    </NextIntlClientProvider>
  );
}