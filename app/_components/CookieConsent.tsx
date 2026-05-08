'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShow(false);
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
