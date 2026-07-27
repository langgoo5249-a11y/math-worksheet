import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import CalligraphyPage from '@/app/tools/calligraphy/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.calligraphy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.example.com/${locale === 'zh' ? '' : locale + '/'}tools/calligraphy/`,
      languages: {
        'zh-CN': 'https://www.example.com/tools/calligraphy/',
        'en': 'https://www.example.com/en/tools/calligraphy/',
        'ja': 'https://www.example.com/ja/tools/calligraphy/',
        'ko': 'https://www.example.com/ko/tools/calligraphy/',
        'x-default': 'https://www.example.com/tools/calligraphy/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedCalligraphyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CalligraphyPage locale={locale} />;
}
