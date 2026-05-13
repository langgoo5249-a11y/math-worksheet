'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// GA4 Measurement ID - 从环境变量读取
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Google Analytics 4 组件
// 支持：
// - 页面浏览追踪（自动）
// - 事件追踪（手动）
// - Cookie 同意后才加载（GDPR 合规）
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 页面浏览追踪
  useEffect(() => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
    
    // 检查用户是否同意 Cookie（GDPR 合规）
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (cookieConsent !== 'accepted') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // 使用 gtag 发送 pageview
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Google Analytics 4 Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // 检查 Cookie 同意状态后才初始化
            try {
              var consent = localStorage.getItem('cookie-consent');
              if (consent === 'accepted') {
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: false
                });
              }
            } catch(e) {}
          `,
        }}
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
  
  const cookieConsent = localStorage.getItem('cookie-consent');
  if (cookieConsent !== 'accepted') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// 声明全局 gtag 类型
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
