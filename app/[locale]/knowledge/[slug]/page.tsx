import OriginalPage from "@/app/knowledge/[slug]/page";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { KNOWLEDGE_POINTS } from "@/lib/knowledgeConfig";

export const dynamic = "force-static";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const item of KNOWLEDGE_POINTS) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("knowledgeDetailTitle"),
    description: t("knowledgeDetailDesc"),
    alternates: {
      canonical: `https://www.skillxm.cn/knowledge/${slug}/`,
      languages: {
        "zh-CN": `https://www.skillxm.cn/knowledge/${slug}`,
        en: `https://www.skillxm.cn/en/knowledge/${slug}`,
        ja: `https://www.skillxm.cn/ja/knowledge/${slug}`,
        ko: `https://www.skillxm.cn/ko/knowledge/${slug}`,
        "x-default": `https://www.skillxm.cn/knowledge/${slug}`,
      },
    },
  };
}

export default async function KnowledgePointPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, ...rest } = await params;
  return <OriginalPage params={Promise.resolve(rest as any)} />;
}
