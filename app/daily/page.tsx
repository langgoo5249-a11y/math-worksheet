import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { getDailyExercise } from '@/lib/dailyExercise';

export const metadata: Metadata = {
  title: '每日一练 - 小学数学口算每日打卡 | 练学宝',
  description: '练学宝每日一练：每天为孩子生成15分钟数学口算练习，按年级智能出题，包含答案解析与学习建议。坚持每日打卡，让学习成为习惯。',
  keywords: ['每日一练', '口算打卡', '小学口算', '每日数学练习', '数学打卡', '口算练习'],
  alternates: {
    canonical: 'https://www.skillxm.cn/daily',
  },
};

export default function DailyIndex({ searchParams }: { searchParams: Promise<{ grade?: string }> }) {
  return <DailyIndexContent searchParams={searchParams} />;
}

async function DailyIndexContent({ searchParams }: { searchParams: Promise<{ grade?: string }> }) {
  const params = await searchParams;
  const grade = params.grade ? parseInt(params.grade) : 3;
  const today = getDailyExercise(grade);

  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '每日一练' }]}
      icon="📅"
      title="每日一练"
      description={`今天${today.weekday}，为${grade === 1 ? '一年级' : grade === 2 ? '二年级' : grade === 3 ? '三年级' : grade === 4 ? '四年级' : grade === 5 ? '五年级' : '六年级'}同学准备了${today.questions.length}道${today.topic}练习题，预计${today.estimatedTime}完成。`}
    >
      {/* 年级选择 */}
      <section className="mb-6 p-4 bg-slate-800/50 border border-white/10 rounded-2xl">
        <h2 className="text-base font-bold text-white mb-3">选择年级</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((g) => (
            <Link
              key={g}
              href={`/daily?grade=${g}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                g === grade
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
              }`}
            >
              {g === 1 ? '一年级' : g === 2 ? '二年级' : g === 3 ? '三年级' : g === 4 ? '四年级' : g === 5 ? '五年级' : '六年级'}
            </Link>
          ))}
        </div>
      </section>

      {/* 今日练习信息 */}
      <section className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-sm text-slate-400">{today.date} {today.weekday}</div>
            <h2 className="text-2xl font-bold text-white">今日{today.topic}打卡</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">难度：{today.difficulty}</span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">⏱ {today.estimatedTime}</span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">📝 {today.questions.length}题</span>
          </div>
        </div>
      </section>

      {/* 题目区 */}
      <section className="mb-6 p-6 bg-slate-800/50 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">📝 今日题目</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {today.questions.map((q, i) => (
            <div key={i} className="p-4 bg-slate-900/60 border border-white/5 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-blue-500/20 text-blue-300 text-sm font-bold rounded-full">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-white font-mono text-lg">{q.q}</div>
                  <details className="mt-2">
                    <summary className="text-xs text-slate-400 cursor-pointer hover:text-blue-400">显示答案</summary>
                    <div className="mt-1 text-sm text-emerald-400 font-bold">答案：{q.a}</div>
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 今日小贴士 */}
      <section className="mb-6 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
        <h2 className="text-lg font-bold text-yellow-300 mb-2">💡 今日学习小贴士</h2>
        <p className="text-slate-200 text-sm leading-relaxed">{today.tip}</p>
      </section>

      {/* 配套工具 */}
      <section className="mb-6 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-4">🛠️ 配套练习工具</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/tools/mental-math" className="block p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm text-white">口算速练</div>
            <div className="text-xs text-slate-400 mt-1">计时挑战</div>
          </Link>
          <Link href="/tools/math-worksheet" className="block p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-1">🧮</div>
            <div className="text-sm text-white">数学练习卷</div>
            <div className="text-xs text-slate-400 mt-1">PDF打印</div>
          </Link>
          <Link href={`/grade/grade-${grade}`} className="block p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-1">🎓</div>
            <div className="text-sm text-white">年级专区</div>
            <div className="text-xs text-slate-400 mt-1">系统学习</div>
          </Link>
          <Link href="/resources" className="block p-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-1">📁</div>
            <div className="text-sm text-white">资源库</div>
            <div className="text-xs text-slate-400 mt-1">下载打印</div>
          </Link>
        </div>
      </section>

      {/* 订阅说明 */}
      <section className="p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-2">🔔 每日打卡提醒</h2>
        <p className="text-sm text-slate-300 mb-3">
          每天打开本页或访问 <code className="px-1.5 py-0.5 bg-slate-800 text-blue-300 rounded">/daily?grade={grade}</code> 即可看到当天的练习题。
        </p>
        <p className="text-xs text-slate-400">
          建议家长把这个页面<strong>收藏到浏览器书签</strong>，每天晚饭后陪孩子一起做15分钟打卡，养成每日学习习惯。
        </p>
      </section>
    </SectionLayout>
  );
}
