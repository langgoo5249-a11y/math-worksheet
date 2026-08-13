'use client';

import { useState } from 'react';

/**
 * ⚠️ 重要：此组件为网站核心功能，不可删除或修改触发逻辑
 * 微信公众号二维码浮动按钮 - 用户点击后显示二维码弹窗
 * 位置：固定在右下角，语言切换器上方
 */

export default function FloatingMiniappButton() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {/* 浮动按钮 */}
      <button
        type="button"
        onClick={() => setShowQR(true)}
        className="fixed right-4 bottom-20 z-50
          w-14 h-14
          bg-gradient-to-r from-green-500 to-emerald-600
          hover:from-green-600 hover:to-emerald-700
          rounded-full shadow-lg shadow-green-500/30
          hover:shadow-xl hover:scale-110
          flex items-center justify-center
          transition-all duration-200
          cursor-pointer
          group/miniapp"
        aria-label="打开微信公众号二维码"
      >
        <span className="text-white text-2xl">📱</span>
        <span className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/miniapp:opacity-100 group-hover/miniapp:visible transition-all duration-200 whitespace-nowrap shadow-lg right-0">
          关注公众号
          <div className="absolute top-full right-6 w-2 h-2 bg-gray-800 rotate-45"></div>
        </span>
      </button>

      {/* 二维码弹窗 - 直接内联，不依赖全局事件 */}
      {showQR && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="微信公众号关注"
        >
          {/* 遮罩层 */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          />

          {/* 弹窗主体 */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm overflow-hidden" style={{ animation: 'modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowQR(false)}
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
              <h3 className="text-white text-lg font-bold">微信扫码，关注公众号</h3>
              <p className="text-white/80 text-sm mt-1">打开微信扫一扫，关注练学宝公众号</p>
            </div>

            {/* 二维码区域 */}
            <div className="px-6 -mt-4">
              <div className="bg-white rounded-2xl shadow-lg p-3 border border-gray-100">
                <img
                  src="/wechat-official-qrcode.jpg"
                  alt="练学宝微信公众号二维码"
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                />
              </div>
            </div>

            {/* 底部提示 */}
            <div className="px-6 pt-4 pb-6 text-center">
              <p className="text-xs text-gray-400">
                第一时间获取最新教育资源、活动通知和独家内容
              </p>
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
