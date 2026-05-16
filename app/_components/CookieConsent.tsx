'use client';
import { useState, useEffect } from 'react';

/**
 * CookieConsent — Google Consent Mode v2 整合
 * 
 * 同意机制：
 * - "接受全部" → Consent Mode v2 grant + 触发追踪脚本
 * - "仅必要 Cookie" → Consent Mode v2 deny + 不触发追踪
 * 
 * Consent Mode v2:
 * - 默认所有存储为 denied（在 layout.tsx 中设置）
 * - 用户接受后更新为 granted
 * - GA4 和 AdSense 接收 consent update 信号
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'accepted') {
      // 恢复已接受的 consent 状态
      updateConsent('granted');
      window.dispatchEvent(new Event('cookie-consent-accepted'));
    }
  }, []);

  // 更新 Google Consent Mode v2 状态
  const updateConsent = (state: 'granted' | 'denied') => {
    try {
      window.gtag('consent', 'update', {
        'ad_storage': state,
        'ad_user_data': state,
        'ad_personalization': state,
        'analytics_storage': state,
        'functionality_storage': 'granted',
        'personalization_storage': state,
        'security_storage': 'granted',
      });
    } catch (e) {
      // gtag 可能还未加载，忽略
    }
  };

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    // Google Consent Mode v2: 更新为已授权
    updateConsent('granted');
    // 通知 layout.tsx 可以加载追踪脚本
    window.dispatchEvent(new Event('cookie-consent-accepted'));
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShow(false);
    // Google Consent Mode v2: 保持拒绝
    updateConsent('denied');
    // 不触发事件，追踪脚本不会加载
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-white p-4 z-50 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3 text-sm">
        <p className="flex-1 min-w-[200px]">
          本网站使用 Cookie 来提升您的体验并展示相关广告。继续浏览即表示您同意我们的{' '}
          <a href="/privacy/" className="text-blue-400 underline">隐私政策</a>。
          您可以选择接受全部 Cookie 或仅接受必要 Cookie。
        </p>
        <div className="flex gap-2">
          <button onClick={reject} className="border border-white/30 hover:bg-white/10 px-4 py-2 rounded text-white text-sm transition-colors">
            仅必要 Cookie
          </button>
          <button onClick={accept} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm transition-colors">
            接受全部
          </button>
        </div>
      </div>
    </div>
  );
}
