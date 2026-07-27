import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import MathWorksheetPage from '@/app/tools/math-worksheet/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.mathWorksheet' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.example.com/${locale === 'zh' ? '' : locale + '/'}tools/math-worksheet/`,
      languages: {
        'zh-CN': 'https://www.example.com/tools/math-worksheet/',
        'en': 'https://www.example.com/en/tools/math-worksheet/',
        'ja': 'https://www.example.com/ja/tools/math-worksheet/',
        'ko': 'https://www.example.com/ko/tools/math-worksheet/',
        'x-default': 'https://www.example.com/tools/math-worksheet/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedMathWorksheetPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <MathWorksheetPage locale={locale} />;
}
