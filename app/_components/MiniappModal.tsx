'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'miniapp_modal_dismissed';
const POPUP_DELAY = 1500; // 延迟1.5秒弹出
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24小时只弹一次

export default function MiniappModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 检查是否在24小时内已关闭过弹窗
    try {
      const lastDismissed = localStorage.getItem(STORAGE_KEY);
      if (lastDismissed) {
        const elapsed = Date.now() - Number(lastDismissed);
        if (elapsed < COOLDOWN_MS) return; // 24小时内已弹过，不再弹出
      }
    } catch {
      // localStorage 不可用时静默处理
    }

    // 延迟弹出，避免影响页面初始加载
    const timer = setTimeout(() => {
      setVisible(true);
    }, POPUP_DELAY);

    const handleOpen = () => setVisible(true);
    window.addEventListener('open-miniapp-modal', handleOpen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-miniapp-modal', handleOpen);
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="微信小程序推荐"
    >
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 弹窗主体 */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm overflow-hidden animate-modal-in">
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="关闭"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 顶部装饰 */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 pt-6 pb-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <span className="text-3xl">📱</span>
          </div>
          <h3 className="text-white text-lg font-bold">微信扫码，即刻使用</h3>
          <p className="text-white/80 text-sm mt-1">打开微信扫一扫，使用小程序更便捷</p>
        </div>

        {/* 二维码区域 */}
        <div className="px-6 -mt-4">
          <div className="bg-white rounded-2xl shadow-lg p-3 border border-gray-100">
            <img
              src="/miniapp-qrcode.jpg"
              alt="微信小程序二维码"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* 底部提示 */}
        <div className="px-6 pt-4 pb-6 text-center">
          <p className="text-xs text-gray-400">
            无需下载，微信内即可使用全部功能
          </p>
          <button
            onClick={handleClose}
            className="mt-3 w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition-all active:scale-[0.98]"
          >
            我知道了
          </button>
        </div>
      </div>

      {/* 弹窗入场动画 */}
      <style jsx global>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
