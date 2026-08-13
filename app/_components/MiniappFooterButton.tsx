'use client';

/**
 * 微信公众号页脚入口
 *
 * 点击后触发 open-miniapp-modal 事件，由 MiniappModal 组件展示二维码。
 * MiniappModal 负责24小时自动弹窗，也负责响应点击事件。
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
      aria-label="打开微信公众号二维码"
    >
      <span>📱</span>
      <span>关注公众号</span>
    </button>
  );
}