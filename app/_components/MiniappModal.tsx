'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'miniapp_modal_dismissed';
const POPUP_DELAY = 1500;
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24小时

/**
 * ⚠️ 核心功能：微信公众号弹窗
 *
 * 两个入口，节流规则不同 —— 这是本组件最容易改错的地方：
 *   ① 自动弹出：页面加载 1.5 秒后触发，24 小时内关闭过则不再自动弹（节流）。
 *   ② 主动打开：外部 dispatch `open-miniapp-modal` 事件（页脚「关注公众号」按钮）
 *      或右下角浮动按钮（自己内联弹窗，不走本组件）。
 *      ⚠️ 主动打开**不受 24 小时节流限制** —— 用户想再看一次二维码时必须能看到。
 *
 * 历史缺陷（2026-09-19 修复）：原实现在节流命中时直接 `return`，
 * 导致监听器根本没注册 → 用户关闭弹窗后 24 小时内点页脚「关注公众号」毫无反应。
 * 现在监听器无条件注册，节流只作用于「自动弹出」这一个定时器。
 *
 * 主题：扫码关注公众号，关注后免费使用小程序版练学宝。
 * 说明：公众号二维码（wechat-official-qrcode.jpg），先引导关注，再引导用小程序。
 */
export default function MiniappModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ① 主动触发入口（页脚「关注公众号」按钮）—— 无条件注册。
    //    这里绝不能因为"24 小时内已关闭过"就提前 return，否则监听器不存在，
    //    用户主动点击会毫无反应（历史缺陷，见文件头注释）。
    const handleOpen = () => setVisible(true);
    window.addEventListener('open-miniapp-modal', handleOpen);

    // ② 自动弹出 —— 才受 24 小时节流约束
    let timer: ReturnType<typeof setTimeout> | undefined;
    let inCooldown = false;
    try {
      const lastDismissed = localStorage.getItem(STORAGE_KEY);
      if (lastDismissed) {
        const elapsed = Date.now() - Number(lastDismissed);
        if (elapsed < COOLDOWN_MS) inCooldown = true;
      }
    } catch {}

    if (!inCooldown) {
      timer = setTimeout(() => setVisible(true), POPUP_DELAY);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('open-miniapp-modal', handleOpen);
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="扫码关注公众号，免费使用小程序版练学宝"
    >
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 弹窗外层：定位上下文，限高 */}
      <div className="relative w-full max-w-xs sm:max-w-sm max-h-[90dvh] animate-modal-in">
        {/* 关闭按钮：置于滚动容器之外，永远固定在右上角可点击 */}
        <button
          onClick={handleClose}
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
          <p className="text-white/80 text-xs mt-1">关注后免费用小程序版练学宝</p>
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
            onClick={handleClose}
            className="mt-2.5 w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition-all active:scale-[0.98]"
          >
            我知道了
          </button>
        </div>
        </div>
      </div>

      {/* 弹窗入场动画 */}
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in {
          animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}