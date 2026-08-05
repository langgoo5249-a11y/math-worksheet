import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import WritingTemplatePage from '@/app/tools/writing-template/ToolPage';

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
  const t = await getTranslations({ locale, namespace: 'tools.writingTemplate' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}tools/writing-template/`,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/tools/writing-template/',
        'en': 'https://www.skillxm.cn/en/tools/writing-template/',
        'ja': 'https://www.skillxm.cn/ja/tools/writing-template/',
        'ko': 'https://www.skillxm.cn/ko/tools/writing-template/',
        'x-default': 'https://www.skillxm.cn/tools/writing-template/',
      },
    },
  };
}

// 页面组件
export default async function LocalizedWritingTemplatePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <WritingTemplatePage locale={locale} />;
}
