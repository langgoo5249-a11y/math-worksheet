import { type Metadata } from 'next';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// 非中文版本的博客内容未翻译，使用 noindex 避免被 Google 判定为低质量内容
// 这是 AdSense 合规的关键修复
export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const isNonZh = locale !== 'zh';

  if (isNonZh) {
    return {
      robots: { index: false, follow: true },
    };
  }

  return {};
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
