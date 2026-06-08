// 共享的 SEO/GEO 工具函数
// 包括 Schema.org JSON-LD 结构化数据生成

const BASE_URL = 'https://www.skillxm.cn';
const SITE_NAME = '练学宝';
const SITE_AUTHOR = '练学宝团队';
const SITE_LOGO = 'https://www.skillxm.cn/favicon.svg';

// ========== FAQ 页面结构化数据 ==========
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

// ========== 面包屑结构化数据 ==========
export function generateBreadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  };
}

// ========== 课程/学习板块结构化数据（用于年级/教材/知识点）==========
export function generateCourseSchema(opts: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  educationalLevel?: string;
  teaches?: string[];
  hasCourseInstance?: { courseMode: string; location: string }[];
}) {
  return {
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@type': 'Organization',
      name: opts.provider || SITE_NAME,
      sameAs: BASE_URL,
    },
    educationalLevel: opts.educationalLevel,
    teaches: opts.teaches,
    hasCourseInstance: opts.hasCourseInstance || [
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        location: { '@type': 'Place', name: '在线学习' },
      },
    ],
    inLanguage: 'zh-CN',
    isAccessibleForFree: true,
  };
}

// ========== 文章结构化数据（用于博客/知识点专题）==========
export function generateArticleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image || `${BASE_URL}/og-image.jpg`,
    datePublished: opts.datePublished || '2026-01-01',
    dateModified: opts.dateModified || new Date().toISOString().slice(0, 10),
    author: {
      '@type': 'Organization',
      name: SITE_AUTHOR,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': opts.url,
    },
    keywords: opts.keywords?.join(','),
    inLanguage: 'zh-CN',
  };
}

// ========== 学习资源结构化数据（用于资源库）==========
export function generateLearningResourceSchema(opts: {
  name: string;
  description: string;
  url: string;
  educationalLevel: string;
  learningResourceType: string;
  teaches?: string[];
  keywords?: string[];
  inLanguage?: string;
  isAccessibleForFree?: boolean;
}) {
  return {
    '@type': 'LearningResource',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    educationalLevel: opts.educationalLevel,
    learningResourceType: opts.learningResourceType,
    teaches: opts.teaches,
    keywords: opts.keywords?.join(','),
    inLanguage: opts.inLanguage || 'zh-CN',
    isAccessibleForFree: opts.isAccessibleForFree !== false,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

// ========== ItemList 结构化数据（用于列表页）==========
export function generateItemListSchema(opts: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string; position?: number; description?: string }[];
}) {
  return {
    '@type': 'ItemList',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type:': 'ListItem',
      '@type': 'ListItem',
      position: item.position || i + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

// ========== 网页结构化数据（通用）==========
export function generateWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  inLanguage?: string;
  primaryImage?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': opts.url,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.inLanguage || 'zh-CN',
    keywords: opts.keywords?.join(','),
    primaryImageOfPage: opts.primaryImage || `${BASE_URL}/og-image.jpg`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
    datePublished: opts.datePublished || '2026-01-01',
    dateModified: opts.dateModified || new Date().toISOString().slice(0, 10),
    publisher: { '@id': `${BASE_URL}/#organization` },
    author: { '@id': `${BASE_URL}/#organization` },
  };
}

// ========== 组织信息（复用）==========
export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO,
      width: 512,
      height: 512,
    },
    description: '练学宝是免费小学教学工具平台，提供数学练习卷生成器、字帖生成器、口算速练、拼音注音、识字卡片、古诗词默写、单元测试卷等10+款工具，以及年级专区、教材同步、知识点专题、练习卷资源库、家长指导等内容板块。',
    foundingDate: '2025-12-01',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressRegion: '浙江',
      addressLocality: '绍兴',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'lang@skillxm.cn',
      contactType: 'customer support',
      availableLanguage: ['Chinese', 'English', 'Japanese', 'Korean'],
    },
    sameAs: [],
  };
}

// ========== 网站信息（复用）==========
export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: SITE_NAME,
    url: `${BASE_URL}/`,
    description: '免费小学教学工具与学习资源平台：数学练习卷、字帖生成器、口算速练、拼音注音、单元测试卷、年级学习专区、教材同步、知识点专题。',
    inLanguage: 'zh-CN',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ========== 通用 Meta 标签生成 ==========
export function generateOpenGraph(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
}) {
  return {
    title: opts.title,
    description: opts.description,
    url: opts.url,
    siteName: SITE_NAME,
    locale: 'zh_CN',
    type: opts.type || 'website',
    images: [
      {
        url: opts.image || `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: opts.title,
      },
    ],
  };
}

export function generateTwitterCard(opts: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: 'summary_large_image',
    title: opts.title,
    description: opts.description,
    images: [opts.image || `${BASE_URL}/og-image.jpg`],
  };
}

export function generateCanonical(path: string) {
  return `${BASE_URL}${path}`;
}

export function generateHreflangAlternates(path: string = '') {
  return {
    'zh-CN': `${BASE_URL}${path}`,
    'en': `${BASE_URL}/en${path}`,
    'ja': `${BASE_URL}/ja${path}`,
    'ko': `${BASE_URL}/ko${path}`,
    'x-default': `${BASE_URL}${path}`,
  };
}

export const SITE_INFO = {
  BASE_URL,
  SITE_NAME,
  SITE_AUTHOR,
  SITE_LOGO,
};
