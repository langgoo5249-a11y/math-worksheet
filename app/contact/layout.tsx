import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "联系我们 - 练学宝客服与反馈",
  description: "联系练学宝团队：如有问题、建议或合作意向，欢迎通过邮箱 lang@skillxm.cn 或在线表单联系我们。电话：0575-64972527，地址：浙江省绍兴市嵊州三江街道花园社区75号。",
  keywords: "联系练学宝,客服,反馈,合作,教育工具咨询",
  alternates: {
    canonical: 'https://www.skillxm.cn/contact/',
  },
  openGraph: {
    url: 'https://www.skillxm.cn/contact/',
    title: "联系我们 - 练学宝客服与反馈",
    description: "联系练学宝团队：如有问题、建议或合作意向，欢迎通过邮箱或在线表单联系我们。",
    type: "website",
    images: [{ url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "联系练学宝",
        "url": "https://www.skillxm.cn/contact/",
        "description": "联系练学宝团队的方式和渠道"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://www.skillxm.cn/" },
          { "@type": "ListItem", "position": 2, "name": "联系我们", "item": "https://www.skillxm.cn/contact/" }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="sr-only">
        <p>联系练学宝团队。邮箱：lang@skillxm.cn。电话：0575-64972527。地址：浙江省绍兴市嵊州三江街道花园社区75号。如有问题或建议，欢迎随时联系我们，我们会在24小时内回复。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具。</p>
      </div>
      {children}
    </>
  );
}
