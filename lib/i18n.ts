// 支持的语言列表
export const locales = ['zh', 'en', 'ja', 'ko'] as const;

// 默认语言
export const defaultLocale = 'zh' as const;

// 语言类型
export type Locale = (typeof locales)[number];

// 语言显示名称
export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
};

// 语言对应的 HTML lang 属性
export const localeHtmlLangs: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
};

// 验证语言是否有效
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// 获取安全的语言（无效时返回默认语言）
export function getSafeLocale(locale: string | undefined): Locale {
  if (!locale) return defaultLocale;
  return isValidLocale(locale) ? locale : defaultLocale;
}
