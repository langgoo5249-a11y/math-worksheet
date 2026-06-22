'use client';

/**
 * 微信小程序页脚入口
 *
 * 不再使用自动弹窗或悬浮大按钮，改为页脚中的低调文字入口。
 * 点击后触发全局 open-miniapp-modal 事件，由 MiniappModal 组件展示二维码。
 */
export default function MiniappFooterButton() {
  const handleClick = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event('open-miniapp-modal'));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:text-white transition-colors flex items-center gap-1"
      aria-label="打开微信小程序二维码"
    >
      <span>📱</span>
      <span>微信小程序</span>
    </button>
  );
}
