import OriginalPage from "@/app/search/page";
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
    title: t("searchTitle"),
    description: t("searchDesc"),
    alternates: {
      canonical: "https://www.example.com/search/",
      languages: {
        "zh-CN": "https://www.example.com/search",
        en: "https://www.example.com/en/search",
        ja: "https://www.example.com/ja/search",
        ko: "https://www.example.com/ko/search",
        "x-default": "https://www.example.com/search",
      },
    },
  };
}

export default function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
