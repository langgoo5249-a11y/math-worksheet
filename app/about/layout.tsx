import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "关于我们 - 练学宝团队介绍与教育理念",
  description: "练学宝是一个免费的在线教育工具平台，由一群热爱教育的开发者和教育工作者共同打造。我们致力于为小学生和家长提供便捷、高效的教学工具，让每个孩子都能享受到优质的教育资源。",
  keywords: "关于练学宝,教育工具团队,教育理念,免费教学工具,小学教育平台",
  alternates: {
    canonical: 'https://www.example.com/about/',
  },
  openGraph: {
    url: 'https://www.example.com/about/',
    title: "关于我们 - 练学宝团队介绍与教育理念",
    description: "练学宝是一个免费的在线教育工具平台，由一群热爱教育的开发者和教育工作者共同打造。我们致力于为小学生和家长提供便捷、高效的教学工具。",
    type: "website",
    images: [{ url: "https://www.example.com/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "name": "关于练学宝",
        "url": "https://www.example.com/about/",
        "description": "练学宝团队介绍、教育理念和发展历程",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://www.example.com/#organization",
          "name": "练学宝",
          "url": "https://www.example.com/",
          "description": "免费在线教育工具平台，为小学生和家长提供数学练习卷、字帖、口算等教学工具",
          "foundingDate": "2024",
          "founder": {
            "@type": "Person",
            "name": "林远",
            "description": "练学宝创始人，全栈开发者，两个孩子的父亲",
            "url": "https://www.example.com/about/"
          },
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 10
          },
          "knowsAbout": ["小学教育", "数学教学", "语文教学", "教育科技", "在线工具开发"],
          "sameAs": []
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://www.example.com/" },
          { "@type": "ListItem", "position": 2, "name": "关于我们", "item": "https://www.example.com/about/" }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="sr-only">
        <p>练学宝是一个免费的在线教育工具平台，致力于为小学生和家长提供便捷、高效的教学工具。所有功能完全免费，无需注册，即开即用。团队由教育工作者和全栈开发者组成，拥有丰富的教育科技开发经验。</p>
        <p>访问 <a href="https://www.example.com">练学宝</a> 获取更多免费教学工具。</p>
      </div>
      {children}
    </>
  );
}
