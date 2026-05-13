import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import CalligraphyPage from '@/app/tools/calligraphy/page';

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
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/calligraphy/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/calligraphy/',
        'en': 'https://www.skillxm.cn/en/tools/calligraphy/',
        'ja': 'https://www.skillxm.cn/ja/tools/calligraphy/',
        'ko': 'https://www.skillxm.cn/ko/tools/calligraphy/',
        'x-default': 'https://www.skillxm.cn/tools/calligraphy/',
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
  return <CalligraphyPage />;
}
