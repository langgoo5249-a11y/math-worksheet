import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import PinyinPage from '@/app/tools/pinyin/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.pinyin' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/pinyin/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/pinyin/',
        'en': 'https://www.skillxm.cn/en/tools/pinyin/',
        'ja': 'https://www.skillxm.cn/ja/tools/pinyin/',
        'ko': 'https://www.skillxm.cn/ko/tools/pinyin/',
        'x-default': 'https://www.skillxm.cn/tools/pinyin/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedPinyinPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PinyinPage locale={locale} />;
}
