import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import EnglishCalligraphyPage from '@/app/tools/english-calligraphy/page';

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
  const t = await getTranslations({ locale, namespace: 'tools.englishCalligraphy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/english-calligraphy/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/english-calligraphy/',
        'en': 'https://www.skillxm.cn/en/tools/english-calligraphy/',
        'ja': 'https://www.skillxm.cn/ja/tools/english-calligraphy/',
        'ko': 'https://www.skillxm.cn/ko/tools/english-calligraphy/',
        'x-default': 'https://www.skillxm.cn/tools/english-calligraphy/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedEnglishCalligraphyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <EnglishCalligraphyPage locale={locale} />;
}
