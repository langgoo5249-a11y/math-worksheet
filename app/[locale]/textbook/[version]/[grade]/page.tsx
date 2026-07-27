import OriginalPage from "@/app/textbook/[version]/[grade]/page";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { TEXTBOOKS } from "@/lib/textbookConfig";

export const dynamic = "force-static";

export function generateStaticParams() {
  const params: { locale: string; version: string; grade: string }[] = [];
  for (const locale of locales) {
    for (const item of TEXTBOOKS) {
      for (const sub of item.grades) {
        params.push({ locale, version: item.id, grade: `grade-${sub.grade}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; version: string; grade: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("textbookDetailTitle"),
    description: t("textbookDetailDesc"),
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

export default async function TextbookGradePage({ params }: { params: Promise<{ locale: string; version: string; grade: string }> }) {
  const { locale, ...rest } = await params;
  return <OriginalPage params={Promise.resolve(rest as any)} />;
}
