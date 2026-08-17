import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 语言前缀策略：
  // 'always' - 总是显示语言前缀（如 /zh/, /en/）
  // 'as-needed' - 只有非默认语言才显示前缀
  localePrefix: 'as-needed',
});

export const config = {
  // 匹配所有路径，但排除静态文件、API路由等
  matcher: [
    // 匹配根路径
    '/',
    // 匹配语言路径
    '/(zh|en|ja|ko)/:path*',
    // 排除静态文件和API
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
