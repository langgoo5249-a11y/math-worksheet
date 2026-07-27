import OriginalPage from "@/app/parent-guide/[id]/page";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { PARENT_GUIDE_TOPICS } from "@/lib/parentGuideConfig";

export const dynamic = "force-static";

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    for (const item of PARENT_GUIDE_TOPICS) {
      params.push({ locale, id: item.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("parentGuideDetailTitle"),
    description: t("parentGuideDetailDesc"),
    alternates: {
      canonical: `https://www.example.com/parent-guide/${id}/`,
      languages: {
        "zh-CN": `https://www.example.com/parent-guide/${id}`,
        en: `https://www.example.com/en/parent-guide/${id}`,
        ja: `https://www.example.com/ja/parent-guide/${id}`,
        ko: `https://www.example.com/ko/parent-guide/${id}`,
        "x-default": `https://www.example.com/parent-guide/${id}`,
      },
    },
  };
}

export default async function ParentGuideDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, ...rest } = await params;
  return <OriginalPage params={Promise.resolve(rest as any)} />;
}
