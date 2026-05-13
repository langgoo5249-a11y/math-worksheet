import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import FlashcardsPage from '@/app/tools/flashcards/page';

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
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/flashcards/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/flashcards/',
        'en': 'https://www.skillxm.cn/en/tools/flashcards/',
        'ja': 'https://www.skillxm.cn/ja/tools/flashcards/',
        'ko': 'https://www.skillxm.cn/ko/tools/flashcards/',
        'x-default': 'https://www.skillxm.cn/tools/flashcards/',
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
