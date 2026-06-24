'use client';

import { useState } from 'react';

/**
 * 微信小程序页脚入口
 *
 * 点击后显示内联二维码弹窗，不依赖外部事件或 MiniappModal。
 * 与 FloatingMiniappButton 使用相同的弹窗设计。
 */
export default function MiniappFooterButton() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowQR(true)}
        className="hover:text-white transition-colors flex items-center gap-1"
        aria-label="打开微信小程序二维码"
      >
        <span>📱</span>
        <span>微信小程序</span>
      </button>

      {/* 二维码弹窗 */}
      {showQR && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="微信小程序推荐"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm overflow-hidden" style={{ animation: 'modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="关闭"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 pt-6 pb-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-white text-lg font-bold">微信扫码，即刻使用</h3>
              <p className="text-white/80 text-sm mt-1">打开微信扫一扫，使用小程序更便捷</p>
            </div>
            <div className="px-6 -mt-4">
              <div className="bg-white rounded-2xl shadow-lg p-3 border border-gray-100">
                <img
                  src="/miniapp-qrcode.jpg"
                  alt="微信小程序二维码"
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                />
              </div>
            </div>
            <div className="px-6 pt-4 pb-6 text-center">
              <p className="text-xs text-gray-400">无需下载，微信内即可使用全部功能</p>
              <button
                onClick={() => setShowQR(false)}
                className="mt-3 w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition-all active:scale-[0.98]"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}