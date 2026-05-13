import { getRequestConfig } from 'next-intl/server';

export const locales = ['zh', 'en', 'ja', 'ko'] as const;
export const defaultLocale = 'zh' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale || defaultLocale;
  const messages = (await import(`./messages/${safeLocale}.json`)).default;
  return {
    messages,
    locale: safeLocale,
    timeZone: 'Asia/Shanghai',
    now: new Date(),
  };
});
