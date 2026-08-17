import OriginalPage from '@/app/privacy/page';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Privacy' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Page() {
  return <OriginalPage />;
}