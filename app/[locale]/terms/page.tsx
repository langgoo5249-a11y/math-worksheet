import OriginalPage from "@/app/terms/page";
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
    title: t("termsTitle"),
    description: t("termsDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/terms/",
      languages: {
        "zh-CN": "https://www.skillxm.cn/terms",
        en: "https://www.skillxm.cn/en/terms",
        ja: "https://www.skillxm.cn/ja/terms",
        ko: "https://www.skillxm.cn/ko/terms",
        "x-default": "https://www.skillxm.cn/terms",
      },
    },
  };
}

export default function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
