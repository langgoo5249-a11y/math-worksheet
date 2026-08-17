import OriginalPage from "@/app/daily/page";
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
    title: t("dailyTitle"),
    description: t("dailyDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/daily/",
      languages: {
        "zh-CN": "https://www.skillxm.cn/daily",
        en: "https://www.skillxm.cn/en/daily",
        ja: "https://www.skillxm.cn/ja/daily",
        ko: "https://www.skillxm.cn/ko/daily",
        "x-default": "https://www.skillxm.cn/daily",
      },
    },
  };
}

export default function DailyIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage searchParams={Promise.resolve({})} />;
}
