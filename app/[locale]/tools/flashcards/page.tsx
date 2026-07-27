import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import FlashcardsPage from '@/app/tools/flashcards/ToolPage';

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tools.flashcards' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.example.com/${locale === 'zh' ? '' : locale + '/'}tools/flashcards/`,
      languages: {
        'zh-CN': 'https://www.example.com/tools/flashcards/',
        'en': 'https://www.example.com/en/tools/flashcards/',
        'ja': 'https://www.example.com/ja/tools/flashcards/',
        'ko': 'https://www.example.com/ko/tools/flashcards/',
        'x-default': 'https://www.example.com/tools/flashcards/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedFlashcardsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <FlashcardsPage locale={locale} />;
}
