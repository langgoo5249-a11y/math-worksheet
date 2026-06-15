// [locale] 路由的 404 页面
// 必须显式 noindex，避免被搜索引擎收录

export const dynamic = "force-static";

export const metadata = {
  // 404 页面绝对不能被索引
  // 使用 other 字段覆盖父级 layout 的 robots 标签
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  // 404 没有规范的 URL，禁用 canonical
  alternates: {
    canonical: undefined,
  },
  title: "页面未找到 - 练学宝",
  description: "您访问的页面不存在或已被移除。",
};

// 这个组件会在 [locale] 路径下作为 404 页面被渲染
export default function LocaleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">页面未找到</h1>
        <p className="text-gray-500 mb-8">
          您访问的页面不存在或已被移除。请检查网址是否正确，或返回首页浏览。
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
