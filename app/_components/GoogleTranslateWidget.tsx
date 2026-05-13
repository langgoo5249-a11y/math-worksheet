'use client';

import { useEffect, useState } from 'react';
import { type Locale } from '@/lib/i18n';

// Google Translate 语言代码映射
const LOCALE_TO_GT: Record<string, string> = {
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  zh: 'zh-CN',
};

interface GoogleTranslateWidgetProps {
  locale: Locale;
}

export default function GoogleTranslateWidget({ locale }: GoogleTranslateWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const targetLang = LOCALE_TO_GT[locale];

  useEffect(() => {
    if (locale === 'zh') return;
    if (typeof window === 'undefined') return;

    // 检查是否已加载
    if ((window as any).google?.translate) {
      setIsLoaded(true);
      return;
    }

    // 加载 Google Translate 脚本
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    // 定义初始化回调
    (window as any).googleTranslateElementInit = () => {
      try {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'zh-CN',
            includedLanguages: 'en,ja,ko,zh-CN',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setIsLoaded(true);
        
        // 自动触发翻译
        setTimeout(() => {
          const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (select) {
            select.value = targetLang;
            select.dispatchEvent(new Event('change'));
          }
        }, 500);
      } catch (e) {
        console.error('Google Translate init failed:', e);
      }
    };

    document.body.appendChild(script);

    return () => {
      // 清理
      delete (window as any).googleTranslateElementInit;
    };
  }, [locale, targetLang]);

  if (locale === 'zh') return null;

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        visibility: 'hidden'
      }}
    />
  );
}
