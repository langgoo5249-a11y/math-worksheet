// 国际化配置 - next-intl 插件需要默认导出
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, isValidLocale } from './lib/i18n';

export {
  locales,
  defaultLocale,
  type Locale,
} from './lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ?? defaultLocale;
  if (!isValidLocale(safeLocale)) notFound();
  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  };
});
