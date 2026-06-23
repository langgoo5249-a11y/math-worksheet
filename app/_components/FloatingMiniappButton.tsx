'use client';

import { useEffect } from 'react';

export default function FloatingMiniappButton() {
  useEffect(() => {
    // 这个组件只是标记存在，不会触发弹窗
    // 用户点击后通过事件触发弹窗
  }, []);

  const handleClick = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event('open-miniapp-modal'));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 
        bg-gradient-to-r from-green-500 to-emerald-600 
        hover:from-green-600 hover:to-emerald-700 
        text-white px-4 py-3 rounded-full 
        shadow-xl shadow-green-500/30 
        hover:shadow-green-500/40 
        transition-all hover:scale-105 active:scale-95
        flex items-center gap-2 font-medium"
      aria-label="打开微信小程序二维码"
    >
      <span className="text-xl">📱</span>
      <span className="hidden sm:inline text-sm">微信扫码使用</span>
    </button>
  );
}
