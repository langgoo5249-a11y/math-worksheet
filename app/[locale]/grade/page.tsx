import OriginalPage from "@/app/grade/page";
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
    title: t("gradeTitle"),
    description: t("gradeDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/grade",
      languages: {
        "zh-CN": "https://www.skillxm.cn/grade",
        en: "https://www.skillxm.cn/en/grade",
        ja: "https://www.skillxm.cn/ja/grade",
        ko: "https://www.skillxm.cn/ko/grade",
        "x-default": "https://www.skillxm.cn/grade",
      },
    },
  };
}

export default function GradeIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
