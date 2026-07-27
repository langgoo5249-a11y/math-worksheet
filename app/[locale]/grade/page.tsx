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
      canonical: "https://www.example.com/grade/",
      languages: {
        "zh-CN": "https://www.example.com/grade",
        en: "https://www.example.com/en/grade",
        ja: "https://www.example.com/ja/grade",
        ko: "https://www.example.com/ko/grade",
        "x-default": "https://www.example.com/grade",
      },
    },
  };
}

export default function GradeIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
