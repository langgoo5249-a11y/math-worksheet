import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import SudokuPage from '@/app/tools/sudoku/page';

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
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/sudoku/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/sudoku/',
        'en': 'https://www.skillxm.cn/en/tools/sudoku/',
        'ja': 'https://www.skillxm.cn/ja/tools/sudoku/',
        'ko': 'https://www.skillxm.cn/ko/tools/sudoku/',
        'x-default': 'https://www.skillxm.cn/tools/sudoku/',
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
  return <SudokuPage />;
}
