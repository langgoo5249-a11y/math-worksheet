import OriginalPage from "@/app/resources/[id]/page";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { getAllResources } from "@/lib/resourcesConfig";

export const dynamic = "force-static";

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    for (const item of getAllResources()) {
      params.push({ locale, id: item.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("resourcesDetailTitle"),
    description: t("resourcesDetailDesc"),
    alternates: {
      canonical: `https://www.example.com/resources/${id}/`,
      languages: {
        "zh-CN": `https://www.example.com/resources/${id}`,
        en: `https://www.example.com/en/resources/${id}`,
        ja: `https://www.example.com/ja/resources/${id}`,
        ko: `https://www.example.com/ko/resources/${id}`,
        "x-default": `https://www.example.com/resources/${id}`,
      },
    },
  };
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, ...rest } = await params;
  return <OriginalPage params={Promise.resolve(rest as any)} />;
}
