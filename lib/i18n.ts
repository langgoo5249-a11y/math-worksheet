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

/**
 * 从 URL 路径中解析 locale（用于客户端组件）
 * 在 output: 'export' 静态导出模式下，useParams() 不可靠，
 * 需要从 window.location.pathname 中解析 locale。
 * 
 * 用法：
 *   const locale = useClientLocale();
 *   // /en/blog/ -> 'en'
 *   // /ja/tools/math-worksheet/ -> 'ja'
 *   // /blog/ -> 'zh' (默认)
 */
export function parseLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(en|ja|ko)(\/|$)/);
  if (match && match[1]) {
    return match[1] as Locale;
  }
  return defaultLocale;
}

/**
 * 生成带 locale 前缀的链接
 * @param path 路径，如 '/blog', '/tools/math-worksheet'
 * @param locale 语言代码
 * @returns 带前缀的路径，如 '/en/blog', '/tools/math-worksheet'（中文无前缀）
 */
export function localePath(path: string, locale: string): string {
  // 确保 path 以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const safeLocale = getSafeLocale(locale);
  if (safeLocale === 'zh') {
    return normalizedPath;
  }
  return `/${safeLocale}${normalizedPath}`;
}
