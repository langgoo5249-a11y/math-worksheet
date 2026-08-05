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
      canonical: `https://www.skillxm.cn/grade/${grade}/`,
      languages: {
        "zh-CN": `https://www.skillxm.cn/grade/${grade}`,
        en: `https://www.skillxm.cn/en/grade/${grade}`,
        ja: `https://www.skillxm.cn/ja/grade/${grade}`,
        ko: `https://www.skillxm.cn/ko/grade/${grade}`,
        "x-default": `https://www.skillxm.cn/grade/${grade}`,
      },
    },
  };
}

export default async function GradePage({ params }: { params: Promise<{ locale: string; grade: string }> }) {
  const { locale, ...rest } = await params;
  return <OriginalPage params={Promise.resolve(rest as any)} />;
}
