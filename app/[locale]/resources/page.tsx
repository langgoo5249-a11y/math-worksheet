import OriginalPage from "@/app/resources/page";
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
    title: t("resourcesTitle"),
    description: t("resourcesDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/resources/",
      languages: {
        "zh-CN": "https://www.skillxm.cn/resources",
        en: "https://www.skillxm.cn/en/resources",
        ja: "https://www.skillxm.cn/ja/resources",
        ko: "https://www.skillxm.cn/ko/resources",
        "x-default": "https://www.skillxm.cn/resources",
      },
    },
  };
}

export default function ResourcesIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
