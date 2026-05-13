import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import PoemMemoPage from '@/app/tools/poem-memo/page';

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
  const t = await getTranslations({ locale, namespace: 'tools.poemMemo' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/poem-memo/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/poem-memo/',
        'en': 'https://www.skillxm.cn/en/tools/poem-memo/',
        'ja': 'https://www.skillxm.cn/ja/tools/poem-memo/',
        'ko': 'https://www.skillxm.cn/ko/tools/poem-memo/',
        'x-default': 'https://www.skillxm.cn/tools/poem-memo/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedPoemMemoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PoemMemoPage />;
}
