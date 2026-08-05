import OriginalPage from "@/app/privacy/page";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/privacy/",
      languages: {
        "zh-CN": "https://www.skillxm.cn/privacy",
        en: "https://www.skillxm.cn/en/privacy",
        ja: "https://www.skillxm.cn/ja/privacy",
        ko: "https://www.skillxm.cn/ko/privacy",
        "x-default": "https://www.skillxm.cn/privacy",
      },
    },
  };
}

export default function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
