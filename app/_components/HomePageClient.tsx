'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getHomeToolCards } from '@/lib/toolRegistry';
import { GRADES } from '@/lib/gradeConfig';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import { PARENT_GUIDE_TOPICS, TOPIC_COLORS } from '@/lib/parentGuideConfig';
import { getAllResources } from '@/lib/resourcesConfig';

// ============ 轮播图数据 ============
const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: '数学练习题',
    subtitle: '一键生成个性化练习题',
    description: '支持加减乘除、竖式计算、填空题等多种题型',
    icon: '🧮',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    link: '/tools/math-worksheet/',
  },
  {
    id: 2,
    title: '字帖生成器',
    subtitle: '练字从此不再枯燥',
    description: '田字格、米字格、方格多种模板，自定义内容',
    icon: '✍️',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    link: '/tools/calligraphy/',
  },
  {
    id: 3,
    title: '英语字帖',
    subtitle: '四线三格英语练习',
    description: '标准四线三格英文字母练习，支持PDF导出',
    icon: '🔤',
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    link: '/tools/english-calligraphy/',
  },
  {
    id: 4,
    title: '数独挑战',
    subtitle: '锻炼逻辑思维',
    description: '多难度级别，计时挑战，自动校验',
    icon: '🧩',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    link: '/tools/sudoku/',
  },
  {
    id: 5,
    title: '口算速练',
    subtitle: '计时挑战极限速度',
    description: '多难度级别，在线计时口算练习，即时反馈',
    icon: '⚡',
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    link: '/tools/mental-math/',
  },
  {
    id: 6,
    title: '识字卡片',
    subtitle: '轻松认识汉字',
    description: '自定义汉字卡片，支持拼音组词，可打印制作',
    icon: '🃏',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    link: '/tools/flashcards/',
  },
  {
    id: 7,
    title: '作文模板',
    subtitle: '写作不再困难',
    description: '看图写话、日记、书信等多种模板，辅助写作练习',
    icon: '📝',
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    link: '/tools/writing-template/',
  },
];

// ============ 公告数据 ============
const ANNOUNCEMENTS = [
  '🎉 口算速练全新上线！支持4个难度级别，在线计时挑战',
  '📚 新增教材同步专区！人教/北师/苏教/部编4个版本',
  '💡 新增知识点专题库！凑十法、乘法口诀等10个核心知识点',
  '📁 新增免费练习卷资源库！20+套高质量练习卷免费下载',
  '👨‍👩‍👧 新增家长指导中心！幼小衔接/小升初全攻略',
  '📅 新增每日一练！每天15分钟打卡养成好习惯',
  '🆕 识字卡片上线！自定义汉字卡片，支持拼音组词，可打印',
  '📝 作文模板生成器上线！看图写话、日记、书信等多种模板',
  '💡 小贴士：点击顶部菜单可快速访问各工具',
  '🔥 免费使用，无需注册，即开即用',
];

// ============ 内容板块入口（6大主板块） ============
const CONTENT_SECTIONS = [
  {
    icon: '🎓',
    title: '年级学习专区',
    subtitle: '1-6年级完整方案',
    description: '每个年级配套核心知识点、推荐工具、学习路径',
    href: '/grade/',
    gradient: 'from-blue-500 to-indigo-600',
    accent: 'blue',
    badge: '6个年级',
  },
  {
    icon: '📚',
    title: '教材同步练习',
    subtitle: '4版本同步配套',
    description: '人教版/北师大/苏教版/部编版，按教材单元组织',
    href: '/textbook/',
    gradient: 'from-purple-500 to-fuchsia-600',
    accent: 'purple',
    badge: '4版本×6年级',
  },
  {
    icon: '💡',
    title: '知识点专题',
    subtitle: '10个核心专题',
    description: '凑十法、破十法、乘法口诀、百分数、声母韵母等',
    href: '/knowledge/',
    gradient: 'from-amber-500 to-orange-600',
    accent: 'amber',
    badge: '10个专题',
  },
  {
    icon: '📁',
    title: '练习卷资源库',
    subtitle: '免费下载',
    description: '20+套高质量小学练习卷，按年级+学科+知识点分类',
    href: '/resources/',
    gradient: 'from-emerald-500 to-teal-600',
    accent: 'emerald',
    badge: '20+套资源',
  },
  {
    icon: '👨‍👩‍👧',
    title: '家长指导中心',
    subtitle: '6大主题',
    description: '幼小衔接、学习习惯、辅导作业、小升初全攻略',
    href: '/parent-guide/',
    gradient: 'from-rose-500 to-pink-600',
    accent: 'rose',
    badge: '6个主题',
  },
  {
    icon: '📅',
    title: '每日一练',
    subtitle: '每天15分钟',
    description: '按年级智能出题，每天一组练习题打卡',
    href: '/daily/',
    gradient: 'from-cyan-500 to-blue-600',
    accent: 'cyan',
    badge: '天天打卡',
  },
];

// ============ 功能介绍卡片 ============
const FEATURE_CARDS = [
  {
    icon: '⚡',
    title: '即开即用',
    desc: '无需注册、无需登录，打开浏览器即可使用，所有功能完全免费',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: '🖨️',
    title: 'PDF 导出打印',
    desc: '一键将练习卷导出为 PDF，支持 A4 纸直接打印，学校家庭两相宜',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: '📐',
    title: '多种练习模板',
    desc: '田字格、米字格、方格、横线格、空白纸，满足不同年级和使用场景',
    color: 'from-emerald-500 to-teal-500',
  },
];

// ============ 颜色映射 ============
const ACCENT_COLORS: Record<string, { bg: string; text: string; border: string; ring: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30', ring: 'ring-blue-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30', ring: 'ring-purple-500/30' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30', ring: 'ring-amber-500/30' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', ring: 'ring-emerald-500/30' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/30', ring: 'ring-rose-500/30' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-300', border: 'border-cyan-500/30', ring: 'ring-cyan-500/30' },
};

export default function HomePageClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 自动轮播
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  // 计算精选数据
  const featuredResources = getAllResources().slice(0, 6);
  const featuredKnowledge = KNOWLEDGE_POINTS.slice(0, 6);
  const featuredParents = PARENT_GUIDE_TOPICS.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* ===== 轮播大图区域 ===== */}
      <section className="pt-0">
        <div
          className="relative h-[420px] sm:h-[500px] md:h-[600px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {CAROUSEL_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={item.link}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">+</div>
                <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delay">−</div>
                <div className="absolute bottom-32 left-1/4 text-7xl opacity-20 animate-float">×</div>
                <div className="absolute bottom-20 right-1/3 text-5xl opacity-20 animate-float-delay">÷</div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                  <svg viewBox="0 0 400 600" className="w-full h-full">
                    {[...Array(8)].map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 75 + 50} x2="400" y2={i * 75 + 50} stroke="white" strokeWidth="1" />
                    ))}
                    {[...Array(5)].map((_, i) => (
                      <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" stroke="white" strokeWidth="1" />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <div className="perspective-1000 mb-4 sm:mb-6">
                  <h2
                    className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tight"
                    style={{
                      textShadow: '0 4px 0 rgba(0,0,0,0.2), 0 8px 0 rgba(0,0,0,0.1), 0 12px 20px rgba(0,0,0,0.3)',
                      transform: 'translateZ(50px)',
                    }}
                  >
                    {item.title}
                  </h2>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-3 sm:mb-4 drop-shadow-lg">
                  {item.subtitle}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-6 max-w-xl drop-shadow">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-6 sm:mb-8 border border-white/30">
                  <span className="text-white font-bold text-sm sm:text-lg">🎁 所有资源免费生成，免费下载打印</span>
                </div>
                <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-8 animate-bounce-slow drop-shadow-2xl">
                  {item.icon}
                </div>
                <button className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-xl hover:scale-105 transition-transform">
                  立即使用 →
                </button>
              </div>
            </a>
          ))}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {CAROUSEL_ITEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`跳转到第 ${index + 1} 张幻灯片`}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToSlide((currentSlide - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)}
            aria-label="上一张"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl backdrop-blur-sm transition-colors z-20"
          >
            ‹
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % CAROUSEL_ITEMS.length)}
            aria-label="下一张"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl backdrop-blur-sm transition-colors z-20"
          >
            ›
          </button>
        </div>
      </section>

      {/* ===== 公告滚动条 ===== */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-3 overflow-hidden border-y border-white/10">
        <div className="flex whitespace-nowrap marquee-container">
          <div className="flex gap-12 marquee-content">
            {ANNOUNCEMENTS.map((text, i) => (
              <span key={i} className="text-white font-medium px-4 text-sm sm:text-base">
                {text}
              </span>
            ))}
          </div>
          <div className="flex gap-12 marquee-content" aria-hidden="true">
            {ANNOUNCEMENTS.map((text, i) => (
              <span key={`dup-${i}`} className="text-white font-medium px-4 text-sm sm:text-base">
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】6大内容板块入口 ===== */}
      <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-blue-900/5 to-slate-900/0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-xs sm:text-sm text-blue-300 mb-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              内容板块 · 探索学习新方式
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
              开启孩子的
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> 学习新世界</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              按年级、教材、知识点三个维度系统化组织，覆盖学习全链路
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {CONTENT_SECTIONS.map((section, i) => {
              const colors = ACCENT_COLORS[section.accent];
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className={`group relative ${colors.bg} hover:bg-opacity-20 border ${colors.border} hover:border-opacity-60 rounded-2xl sm:rounded-3xl p-4 sm:p-7 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* 背景光晕 */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br ${section.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}>
                        {section.icon}
                      </div>
                      <span className={`hidden sm:inline-block px-2 py-0.5 ${colors.bg} ${colors.text} text-xs rounded-full border ${colors.border}`}>
                        {section.badge}
                      </span>
                    </div>
                    <h3 className={`text-base sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:${colors.text} transition-colors`}>
                      {section.title}
                    </h3>
                    <p className={`text-xs sm:text-sm ${colors.text} font-medium mb-2 sm:mb-3`}>
                      {section.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {section.description}
                    </p>
                    <div className={`mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm ${colors.text} font-medium group-hover:gap-2.5 transition-all`}>
                      立即进入
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】年级学习专区 ===== */}
      <section className="py-12 sm:py-16 px-4 bg-slate-800/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="text-xs sm:text-sm text-blue-300 font-medium mb-2">📐 按年级精准学习</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                年级学习专区
              </h2>
              <p className="text-slate-400 text-sm mt-2 hidden sm:block">每个年级都有完整的核心知识点、推荐工具、学习路径</p>
            </div>
            <Link href="/grade/" className="hidden sm:flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200 font-medium shrink-0">
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {GRADES.map((g) => (
              <Link
                key={g.grade}
                href={`/grade/grade-${g.grade}/`}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-blue-500/60 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-base sm:text-lg font-black text-blue-300 group-hover:scale-110 transition-transform">
                  {g.grade}
                </div>
                <div className="mt-8 sm:mt-10">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">{g.name}</h3>
                  <p className="text-xs text-slate-400 mb-2 sm:mb-3">{g.ageRange}</p>
                  <p className="text-xs text-blue-300 line-clamp-2 leading-relaxed">{g.description}</p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-blue-300 transition-colors">
                  <span>{g.subjects.length}个学科</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full" />
                  <span>{g.knowledgePoints.length}个要点</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】教材同步专区 ===== */}
      <section className="py-12 sm:py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="text-xs sm:text-sm text-purple-300 font-medium mb-2">📖 跟学校教材同步</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                教材同步练习
              </h2>
              <p className="text-slate-400 text-sm mt-2 hidden sm:block">人教/北师/苏教/部编 4个版本，与学校进度完全同步</p>
            </div>
            <Link href="/textbook/" className="hidden sm:flex items-center gap-1.5 text-sm text-purple-300 hover:text-purple-200 font-medium shrink-0">
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEXTBOOKS.map((tb) => (
              <div
                key={tb.id}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 hover:border-purple-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
                    📚
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white">{tb.name}</h3>
                    <p className="text-xs text-slate-400 truncate">{tb.publisher}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{tb.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tb.scope.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-purple-500/15 text-purple-300 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {tb.grades.slice(0, 6).map((g) => (
                    <Link
                      key={g.grade}
                      href={`/textbook/${tb.id}/grade-${g.grade}/`}
                      className="px-2 py-1.5 bg-slate-800/60 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 rounded-lg text-center text-xs text-slate-300 hover:text-purple-200 transition-colors"
                    >
                      {g.grade}年级
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】知识点专题 ===== */}
      <section className="py-12 sm:py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="text-xs sm:text-sm text-amber-300 font-medium mb-2">🎯 核心知识点深度讲解</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                知识点专题
              </h2>
              <p className="text-slate-400 text-sm mt-2 hidden sm:block">10个小学核心知识点，每个都配详解、例题、配套工具</p>
            </div>
            <Link href="/knowledge/" className="hidden sm:flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200 font-medium shrink-0">
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {featuredKnowledge.map((kp) => {
              const subjectColors = {
                math: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30', icon: '🧮' },
                chinese: { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/30', icon: '📖' },
                english: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', icon: '🔤' },
              }[kp.subject] || { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30', icon: '💡' };

              return (
                <Link
                  key={kp.slug}
                  href={`/knowledge/${kp.slug}/`}
                  className={`group relative ${subjectColors.bg} border ${subjectColors.border} hover:border-opacity-60 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/60 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0">
                      {kp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className={`text-base sm:text-lg font-bold text-white group-hover:${subjectColors.text} transition-colors`}>
                          {kp.name}
                        </h3>
                        <span className={`px-1.5 py-0.5 ${subjectColors.bg} ${subjectColors.text} text-[10px] sm:text-xs rounded`}>
                          {kp.grades.join('/')}年级
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{kp.shortDesc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 工具导航分类 ===== */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-xs sm:text-sm text-cyan-300 font-medium mb-2">⚡ 即开即用的学习工具</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              学习工具箱
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">10+ 款实用工具，覆盖数学、语文、英语三大主科</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {getHomeToolCards().map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                className={`group relative bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-1 ${
                  tool.disabled ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                onClick={tool.disabled ? (e) => e.preventDefault() : undefined}
              >
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                  {tool.name}
                  {tool.disabled && <span className="ml-1.5 text-xs text-gray-400">(开发中)</span>}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">{tool.desc}</p>
                {!tool.disabled && (
                  <div className="absolute bottom-3 right-3 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all text-lg">
                    →
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】资源库精选 ===== */}
      <section className="py-12 sm:py-16 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="text-xs sm:text-sm text-emerald-300 font-medium mb-2">📁 高质量练习卷</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                免费练习卷资源库
              </h2>
              <p className="text-slate-400 text-sm mt-2 hidden sm:block">20+ 套精心整理的练习卷，覆盖语数英全学科</p>
            </div>
            <Link href="/resources/" className="hidden sm:flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-medium shrink-0">
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {featuredResources.map((r) => (
              <Link
                key={r.id}
                href={`/resources/${r.id}/`}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 hover:border-emerald-500/50 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                    {r.grade === 1 ? '一年级' : r.grade === 2 ? '二年级' : r.grade === 3 ? '三年级' : r.grade === 4 ? '四年级' : r.grade === 5 ? '五年级' : '六年级'}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    r.difficulty === '基础' ? 'bg-emerald-500/20 text-emerald-300' :
                    r.difficulty === '进阶' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-rose-500/20 text-rose-300'
                  }`}>
                    {r.difficulty}
                  </span>
                  <span className="ml-auto text-[10px] sm:text-xs text-slate-500">
                    {r.subject === 'math' ? '🧮数学' : r.subject === 'chinese' ? '📖语文' : '🔤英语'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{r.description}</p>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500">
                  <span>📄 {r.pageCount}页</span>
                  <span>✏️ {r.questionCount}题</span>
                  <span>⏱ {r.estimatedTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】家长指导 ===== */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="text-xs sm:text-sm text-rose-300 font-medium mb-2">👨‍👩‍👧 家长的专属指南</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                家长指导中心
              </h2>
              <p className="text-slate-400 text-sm mt-2 hidden sm:block">从幼小衔接到小升初，6大主题全攻略</p>
            </div>
            <Link href="/parent-guide/" className="hidden sm:flex items-center gap-1.5 text-sm text-rose-300 hover:text-rose-200 font-medium shrink-0">
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredParents.map((t) => {
              const c = TOPIC_COLORS[t.color];
              return (
                <Link
                  key={t.id}
                  href={`/parent-guide/${t.id}/`}
                  className={`group relative ${c.bg} border ${c.border} hover:border-opacity-60 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-1`}
                >
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">{t.icon}</div>
                  <h3 className={`text-base sm:text-lg font-bold text-white mb-1.5 group-hover:${c.text} transition-colors`}>
                    {t.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 mb-2">适用年龄：{t.ageRange}</p>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{t.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 【NEW】每日一练入口 ===== */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-indigo-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-6 sm:p-10 text-center">
            <div className="text-5xl sm:text-6xl mb-4">📅</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
              每日一练 · 15分钟打卡
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
              每天为孩子智能生成一组练习题，支持1-6年级数学口算。
              每天15分钟，养成受益终身的学习习惯。
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <Link
                  key={g}
                  href={`/daily?grade=${g}`}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 hover:border-cyan-500/50 rounded-full text-xs sm:text-sm text-cyan-200 hover:text-cyan-100 font-medium transition-colors"
                >
                  {g === 1 ? '一年级' : g === 2 ? '二年级' : g === 3 ? '三年级' : g === 4 ? '四年级' : g === 5 ? '五年级' : '六年级'}
                </Link>
              ))}
            </div>
            <Link
              href="/daily/"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-base sm:text-lg rounded-full shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all"
            >
              立即开始今日打卡
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 功能介绍卡片 ===== */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-8 sm:mb-12 tracking-tight">
            ✨ 为什么选择我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {FEATURE_CARDS.map((card, i) => (
              <div
                key={i}
                className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-5 sm:p-7 hover:border-white/20 transition-all hover:-translate-y-1 group"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-5 shadow-lg`}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 引导区域 ===== */}
      <section className="py-12 sm:py-16 px-4 bg-slate-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-4 sm:mb-6 tracking-tight">
            想了解更多？
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            了解练学宝的完整功能，或探索所有学习工具，找到最适合孩子的学习方式
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about/"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold text-base sm:text-lg rounded-full shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all"
            >
              关于练学宝
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/tools/"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base sm:text-lg rounded-full hover:scale-105 transition-all"
            >
              探索所有工具
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 底部引导 ===== */}
      <section className="py-10 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="text-4xl sm:text-5xl mb-3">🚀</div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">开始今天的学习之旅</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6">60万+家长和孩子的共同选择 · 完全免费 · 无需注册</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Link href="/grade/" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm sm:text-base font-medium rounded-full transition-colors">
                🎓 年级专区
              </Link>
              <Link href="/knowledge/" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-sm sm:text-base font-medium rounded-full transition-colors">
                💡 知识点专题
              </Link>
              <Link href="/resources/" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm sm:text-base font-medium rounded-full transition-colors">
                📁 资源库
              </Link>
              <Link href="/parent-guide/" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-rose-500 hover:bg-rose-400 text-white text-sm sm:text-base font-medium rounded-full transition-colors">
                👨‍👩‍👧 家长指导
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 自定义动画样式 ===== */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
