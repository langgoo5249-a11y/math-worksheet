import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import UnitTestPage from '@/app/tools/unit-test/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.unitTest' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.example.com/${locale === 'zh' ? '' : locale + '/'}tools/unit-test/`,
      languages: {
        'zh-CN': 'https://www.example.com/tools/unit-test/',
        'en': 'https://www.example.com/en/tools/unit-test/',
        'ja': 'https://www.example.com/ja/tools/unit-test/',
        'ko': 'https://www.example.com/ko/tools/unit-test/',
        'x-default': 'https://www.example.com/tools/unit-test/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedUnitTestPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <UnitTestPage locale={locale} />;
}
