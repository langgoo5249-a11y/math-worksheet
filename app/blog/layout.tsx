import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "知识分享 - 小学数学语文英语学习方法 | 练学宝",
  description: "小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。为家长和教师提供专业教育资讯与学习指导。",
  keywords: "知识分享,小学学习方法,数学学习,语文学习,英语学习,教育资讯,小学教育,学习技巧",
  alternates: {
    canonical: 'https://www.skillxm.cn/blog/',
    languages: {
      "zh-CN": "https://www.skillxm.cn/blog/",
      "x-default": "https://www.skillxm.cn/blog/",
    },
  },
  openGraph: {
    url: 'https://www.skillxm.cn/blog/',
    title: "知识分享 - 小学数学语文英语学习方法 | 练学宝",
    description: "小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。为家长和教师提供专业教育资讯与学习指导。",
    type: "website",
    images: [{ url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "知识分享 - 小学数学语文英语学习方法 | 练学宝",
    description: "小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。",
    images: ["https://www.skillxm.cn/og-image.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "练学宝知识分享",
    "description": "小学数学语文英语学习方法文章集锦",
    "url": "https://www.skillxm.cn/blog",
    "dateModified": "2026-08-07",
    "publisher": {
      "@id": "https://www.skillxm.cn/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="sr-only">
        <p>小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。练学宝博客致力于为小学生家长和老师提供专业的教育资讯和学习方法指导。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具。</p>
      </div>
      {children}
    </>
  );
}
