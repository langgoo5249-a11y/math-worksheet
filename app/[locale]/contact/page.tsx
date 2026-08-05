import OriginalPage from "@/app/contact/page";
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
    title: t("contactTitle"),
    description: t("contactDesc"),
    alternates: {
      canonical: "https://www.skillxm.cn/contact/",
      languages: {
        "zh-CN": "https://www.skillxm.cn/contact",
        en: "https://www.skillxm.cn/en/contact",
        ja: "https://www.skillxm.cn/ja/contact",
        ko: "https://www.skillxm.cn/ko/contact",
        "x-default": "https://www.skillxm.cn/contact",
      },
    },
  };
}

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  return <OriginalPage />;
}
