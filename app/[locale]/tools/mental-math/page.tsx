import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import MentalMathPage from '@/app/tools/mental-math/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.mentalMath' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.example.com/${locale === 'zh' ? '' : locale + '/'}tools/mental-math/`,
      languages: {
        'zh-CN': 'https://www.example.com/tools/mental-math/',
        'en': 'https://www.example.com/en/tools/mental-math/',
        'ja': 'https://www.example.com/ja/tools/mental-math/',
        'ko': 'https://www.example.com/ko/tools/mental-math/',
        'x-default': 'https://www.example.com/tools/mental-math/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedMentalMathPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <MentalMathPage locale={locale} />;
}
