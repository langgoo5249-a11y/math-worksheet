import OriginalPage from "@/app/textbook/page";
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
    title: t("textbookTitle"),
    description: t("textbookDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/textbook",
      languages: {
        "zh-CN": "https://www.skillxm.cn/textbook",
        en: "https://www.skillxm.cn/en/textbook",
        ja: "https://www.skillxm.cn/ja/textbook",
        ko: "https://www.skillxm.cn/ko/textbook",
        "x-default": "https://www.skillxm.cn/textbook",
      },
    },
  };
}

export default function TextbookIndex({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
