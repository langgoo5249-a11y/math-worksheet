import OriginalPage from "@/app/changelog/page";
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
    title: t("changelogTitle"),
    description: t("changelogDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/changelog",
      languages: {
        "zh-CN": "https://www.skillxm.cn/changelog",
        en: "https://www.skillxm.cn/en/changelog",
        ja: "https://www.skillxm.cn/ja/changelog",
        ko: "https://www.skillxm.cn/ko/changelog",
        "x-default": "https://www.skillxm.cn/changelog",
      },
    },
  };
}

export default function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
