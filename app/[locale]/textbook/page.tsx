import OriginalPage from "@/app/textbook/page";
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
    title: t("textbookTitle"),
    description: t("textbookDesc"),
    alternates: {
      canonical: "https://www.example.com/textbook/",
      languages: {
        "zh-CN": "https://www.example.com/textbook",
        en: "https://www.example.com/en/textbook",
        ja: "https://www.example.com/ja/textbook",
        ko: "https://www.example.com/ko/textbook",
        "x-default": "https://www.example.com/textbook",
      },
    },
  };
}

export default function TextbookIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
