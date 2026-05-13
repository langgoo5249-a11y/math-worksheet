import { getRequestConfig } from 'next-intl/server';
import { getSafeLocale } from './lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = getSafeLocale(locale);
  const messages = (await import(`@/messages/${safeLocale}.json`)).default;

  return {
    messages,
    locale: safeLocale,
    timeZone: 'Asia/Shanghai',
    now: new Date(),
  };
});
