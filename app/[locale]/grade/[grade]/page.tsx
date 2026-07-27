import OriginalPage from "@/app/grade/[grade]/page";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { GRADES } from "@/lib/gradeConfig";

export const dynamic = "force-static";

export function generateStaticParams() {
  const params: { locale: string; grade: string }[] = [];
  for (const locale of locales) {
    for (const item of GRADES) {
      params.push({ locale, grade: `grade-${item.grade}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; grade: string }> }): Promise<Metadata> {
  const { locale, grade } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("gradeDetailTitle"),
    description: t("gradeDetailDesc"),
    alternates: {
      canonical: `https://www.example.com/grade/${grade}/`,
      languages: {
        "zh-CN": `https://www.example.com/grade/${grade}`,
        en: `https://www.example.com/en/grade/${grade}`,
        ja: `https://www.example.com/ja/grade/${grade}`,
        ko: `https://www.example.com/ko/grade/${grade}`,
        "x-default": `https://www.example.com/grade/${grade}`,
      },
    },
  };
}

export default async function GradePage({ params }: { params: Promise<{ locale: string; grade: string }> }) {
  const { locale, ...rest } = await params;
  return <OriginalPage params={Promise.resolve(rest as any)} />;
}
