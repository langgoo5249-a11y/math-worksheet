import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { GRADES, getGradeConfig } from '@/lib/gradeConfig';
import { articles as blogPosts } from '@/app/blog/data';

export function generateStaticParams() {
  return GRADES.map((g) => ({ grade: `grade-${g.grade}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
  const { grade: slug } = await params;
  const gradeNum = parseInt(slug.replace('grade-', ''), 10);
  const config = getGradeConfig(gradeNum);
  if (!config) return { title: '年级未找到' };

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.metaKeywords,
    alternates: {
      canonical: `https://www.skillxm.cn/grade/${slug}/`,
    },
  };
}

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: slug } = await params;
  const gradeNum = parseInt(slug.replace('grade-', ''), 10);
  const config = getGradeConfig(gradeNum);
  if (!config) notFound();

  // 筛选该年级相关的博客文章
  const relatedBlogs = blogPosts
    .filter((p) => config.blogCategories.some((c) => p.category === c))
    .slice(0, 6);

  return (
    <SectionLayout
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '年级专区', href: '/grade/grade-1' },
        { label: config.name },
      ]}
      icon="🎓"
      title={`${config.name}学习专区 · 完整学习方案`}
      description={config.description}
    >
      {/* 年级概览 */}
      <section className="mb-10 p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl">
        <p className="text-slate-200 leading-relaxed text-base sm:text-lg">
          {config.longDescription}
        </p>
        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">适合年龄：{config.ageRange}</span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">覆盖：{config.semester}</span>
        </div>
      </section>

      {/* 学科模块 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{config.name}学习内容</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.subjects.map((s) => (
            <div key={s.name} className="p-5 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">{s.icon}</span>
                {s.name}
              </h3>
              <ul className="space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 推荐工具 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{config.name}推荐学习工具</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.recommendTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
            >
              <span className="text-2xl shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{tool.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 核心知识点 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{config.name}核心知识点</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {config.knowledgePoints.map((kp) => (
            <div
              key={kp}
              className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200"
            >
              <span className="text-blue-400 mr-2">▸</span>
              {kp}
            </div>
          ))}
        </div>
      </section>

      {/* 相关博客 */}
      {relatedBlogs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            {config.name}家长必读
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
              >
                <div className="text-xs text-slate-400 mb-2">
                  {post.category} · {post.readTime} · {post.date}
                </div>
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </div>
                <div className="text-sm text-slate-400 mt-2 line-clamp-2">
                  {post.description}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/blog"
              className="inline-block text-blue-400 hover:text-blue-300 text-sm"
            >
              查看更多{config.name}学习建议 →
            </Link>
          </div>
        </section>
      )}

      {/* 其他年级导航 */}
      <section className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">其他年级</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {GRADES.map((g) => (
            <Link
              key={g.grade}
              href={`/grade/grade-${g.grade}`}
              className={`p-3 text-center rounded-lg border transition-all ${
                g.grade === config.grade
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/70 hover:border-blue-500/50'
              }`}
            >
              {g.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 隐藏结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: config.metaTitle,
            description: config.metaDescription,
            provider: { '@type': 'Organization', name: '练学宝' },
            educationalLevel: config.name,
            inLanguage: 'zh-CN',
          }),
        }}
      />
    </SectionLayout>
  );
}
