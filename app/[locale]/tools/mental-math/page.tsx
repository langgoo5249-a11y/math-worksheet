import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import MentalMathPage from '@/app/tools/mental-math/page';

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
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/mental-math/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/mental-math/',
        'en': 'https://www.skillxm.cn/en/tools/mental-math/',
        'ja': 'https://www.skillxm.cn/ja/tools/mental-math/',
        'ko': 'https://www.skillxm.cn/ko/tools/mental-math/',
        'x-default': 'https://www.skillxm.cn/tools/mental-math/',
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
  return <MentalMathPage />;
}
