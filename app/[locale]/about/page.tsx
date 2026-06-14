import OriginalPage from "@/app/about/page";
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
    title: t("aboutTitle"),
    description: t("aboutDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/about",
      languages: {
        "zh-CN": "https://www.skillxm.cn/about",
        en: "https://www.skillxm.cn/en/about",
        ja: "https://www.skillxm.cn/ja/about",
        ko: "https://www.skillxm.cn/ko/about",
        "x-default": "https://www.skillxm.cn/about",
      },
    },
  };
}

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
