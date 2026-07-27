import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import SudokuPage from '@/app/tools/sudoku/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.sudoku' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.example.com/${locale === 'zh' ? '' : locale + '/'}tools/sudoku/`,
      languages: {
        'zh-CN': 'https://www.example.com/tools/sudoku/',
        'en': 'https://www.example.com/en/tools/sudoku/',
        'ja': 'https://www.example.com/ja/tools/sudoku/',
        'ko': 'https://www.example.com/ko/tools/sudoku/',
        'x-default': 'https://www.example.com/tools/sudoku/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedSudokuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <SudokuPage locale={locale} />;
}
