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
          aria-label="扫码关注公众号，免费使用小程序版练学宝"
        >
          {/* 遮罩层 */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          />

          {/* 弹窗外层：定位上下文，限高 */}
          <div className="relative w-full max-w-xs sm:max-w-sm max-h-[90dvh] floating-modal-in">
            {/* 关闭按钮：置于滚动容器之外，永远固定在右上角可点击 */}
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors shadow-sm"
              aria-label="关闭"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 弹窗主体：小屏超高时内部滚动，关闭按钮不受影响 */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-h-[90dvh] overflow-y-auto">
            {/* 顶部装饰 */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-5 pt-5 pb-7 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-white text-base font-bold">扫码关注公众号</h3>
              <p className="text-white/80 text-xs mt-1">免费使用小程序版练学宝</p>
            </div>

            {/* 二维码区域：固定小尺寸，不随弹窗宽度放大 */}
            <div className="px-5 -mt-4">
              <div className="bg-white rounded-2xl shadow-lg p-2.5 border border-gray-100 w-fit mx-auto">
                <img
                  src="/wechat-official-qrcode.jpg"
                  alt="练学宝微信公众号二维码"
                  width={144}
                  height={144}
                  className="w-36 h-36 sm:w-40 sm:h-40 rounded-lg"
                  loading="eager"
                />
              </div>
            </div>

            {/* 免费功能清单 */}
            <div className="px-5 pt-3">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2 py-1.5">
                  <span className="text-sm shrink-0">✏️</span>
                  <span className="text-xs font-medium text-gray-700">免费生成字帖</span>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2 py-1.5">
                  <span className="text-sm shrink-0">📄</span>
                  <span className="text-xs font-medium text-gray-700">免费生成试卷</span>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2 py-1.5">
                  <span className="text-sm shrink-0">🧮</span>
                  <span className="text-xs font-medium text-gray-700">免费生成口算题</span>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2 py-1.5">
                  <span className="text-sm shrink-0">📜</span>
                  <span className="text-xs font-medium text-gray-700">古诗等更多功能</span>
                </div>
              </div>
            </div>

            {/* 底部提示 */}
            <div className="px-5 pt-2.5 pb-5 text-center">
              <p className="text-xs text-gray-400">
                关注后即可在小程序免费使用，随时生成、随时打印
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="mt-2.5 w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition-all active:scale-[0.98]"
              >
                我知道了
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗入场动画（独立定义，不依赖其他组件） */}
      <style>{`
        @keyframes floating-modal-in {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .floating-modal-in {
          animation: floating-modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
