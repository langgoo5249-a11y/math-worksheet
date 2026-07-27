import OriginalPage from "@/app/knowledge/page";
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
    title: t("knowledgeTitle"),
    description: t("knowledgeDesc"),
    alternates: {
      canonical: "https://www.example.com/knowledge/",
      languages: {
        "zh-CN": "https://www.example.com/knowledge",
        en: "https://www.example.com/en/knowledge",
        ja: "https://www.example.com/ja/knowledge",
        ko: "https://www.example.com/ko/knowledge",
        "x-default": "https://www.example.com/knowledge",
      },
    },
  };
}

export default function KnowledgeIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
