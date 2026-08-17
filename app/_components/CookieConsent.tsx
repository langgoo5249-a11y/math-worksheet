'use client';
import { useState } from 'react';

/**
 * CookieConsent — 简化版：仅通知提示，不阻塞跟踪
 * 
 * 中国用户为主，无GDPR合规要求。analytics 和 ad storage 默认 granted。
 * 此横幅仅作为信息提示，用户点击"知道了"后关闭，不再出现。
 */
export default function CookieConsent() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !localStorage.getItem('cookie-consent');
    } catch {
      return false;
    }
  });

  const dismiss = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-white p-4 z-50 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3 text-sm">
        <p className="flex-1 min-w-[200px]">
          本网站使用 Cookie 来提升您的体验并展示相关广告。继续浏览即表示您同意我们的{' '}
          <a href="/privacy/" className="text-blue-400 underline">隐私政策</a>。
        </p>
        <button onClick={dismiss} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white text-sm transition-colors">
          知道了
        </button>
      </div>
    </div>
  );
}