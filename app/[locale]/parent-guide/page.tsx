import OriginalPage from "@/app/parent-guide/page";
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
    title: t("parentGuideTitle"),
    description: t("parentGuideDesc"),
    alternates: {
      canonical: "https://www.example.com/parent-guide/",
      languages: {
        "zh-CN": "https://www.example.com/parent-guide",
        en: "https://www.example.com/en/parent-guide",
        ja: "https://www.example.com/ja/parent-guide",
        ko: "https://www.example.com/ko/parent-guide",
        "x-default": "https://www.example.com/parent-guide",
      },
    },
  };
}

export default function ParentGuideIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
