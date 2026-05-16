'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// GA4 Measurement ID - 从环境变量读取
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Google Analytics 4 组件
// 通过 Consent Mode v2 管理用户同意状态
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 页面浏览追踪 - Consent Mode v2 已内置处理
  useEffect(() => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    try {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    } catch(e) {}
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Google Analytics 4 Script - Consent Mode v2 已在 layout.tsx 中启用 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}

// 手动发送 GA4 事件的辅助函数
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch(e) {}
}

// 声明全局 gtag 类型
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
