'use client';

/**
 * ⚠️ 重要：此组件为网站核心功能，不可删除或修改触发逻辑
 * 微信小程序二维码浮动按钮 - 用户点击后触发全局弹窗
 * 位置：固定在右下角，语言切换器上方
 */

export default function FloatingMiniappButton() {
  const handleClick = () => {
    if (typeof window === 'undefined') return;
    // 触发自定义事件，由 MiniappModal 组件监听
    const event = new CustomEvent('open-miniapp-modal', { bubbles: true });
    document.dispatchEvent(event);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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
      aria-label="打开微信小程序二维码"
    >
      <span className="text-white text-2xl">📱</span>
      <span className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/miniapp:opacity-100 group-hover/miniapp:visible transition-all duration-200 whitespace-nowrap shadow-lg right-0">
        微信小程序
        <div className="absolute top-full right-6 w-2 h-2 bg-gray-800 rotate-45"></div>
      </span>
    </button>
  );
}
