'use client';
import { useState, useEffect } from 'react';

/**
 * CookieConsent — 真正控制追踪脚本加载
 * 
 * 同意机制：
 * - "接受全部" → localStorage 'accepted' → 触发自定义事件 'cookie-consent-accepted'
 * - "仅必要Cookie" → localStorage 'rejected' → 不触发追踪脚本
 * 
 * layout.tsx 中的百度统计和 AdSense 脚本会检查此状态，
 * 仅在 consent=accepted 时才加载。
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'accepted') {
      // 已接受，触发追踪脚本加载
      window.dispatchEvent(new Event('cookie-consent-accepted'));
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    // 通知 layout.tsx 可以加载追踪脚本
    window.dispatchEvent(new Event('cookie-consent-accepted'));
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShow(false);
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
