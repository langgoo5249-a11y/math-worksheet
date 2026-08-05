// 口算进度追踪 - 使用 localStorage 存储练习记录

export interface PracticeRecord {
  id: string;
  date: string;           // ISO 日期字符串
  difficulty: string;     // easy/medium/hard/expert
  questionCount: number;  // 题目数量
  correctCount: number;   // 答对数
  wrongCount: number;     // 答错数
  accuracy: number;       // 正确率
  elapsedTime: number;    // 用时（秒）
  bestStreak: number;     // 最高连击
  wrongQuestions: {       // 错题列表
    num1: number;
    num2: number;
    operation: string;
    correctAnswer: number;
    userAnswer: string;
  }[];
}

export interface WeakPoint {
  operation: string;      // 运算类型
  totalAttempts: number;  // 总尝试次数
  wrongCount: number;     // 错误次数
  errorRate: number;      // 错误率
}

const STORAGE_KEY = 'lxh_mental_math_history';
const MAX_RECORDS = 100; // 最多保存100条记录

// 获取所有历史记录
export function getHistory(): PracticeRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// 保存一条记录
export function saveRecord(record: PracticeRecord): void {
  const history = getHistory();
  history.unshift(record); // 最新的在前面
  // 限制最大记录数
  if (history.length > MAX_RECORDS) {
    history.splice(MAX_RECORDS);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// 获取今日练习记录
export function getTodayRecords(): PracticeRecord[] {
  const today = new Date().toISOString().split('T')[0];
  return getHistory().filter(r => r.date.startsWith(today));
}

// 获取本周练习记录
export function getWeekRecords(): PracticeRecord[] {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return getHistory().filter(r => new Date(r.date) >= weekAgo);
}

// 获取累计统计
export function getStats(): {
  totalPractice: number;
  totalQuestions: number;
  totalCorrect: number;
  totalAccuracy: number;
  totalMinutes: number;
  currentStreak: number; // 连续练习天数
  bestAccuracy: number;
} {
  const history = getHistory();
  if (history.length === 0) {
    return { totalPractice: 0, totalQuestions: 0, totalCorrect: 0, totalAccuracy: 0, totalMinutes: 0, currentStreak: 0, bestAccuracy: 0 };
  }

  const totalPractice = history.length;
  const totalQuestions = history.reduce((sum, r) => sum + r.questionCount, 0);
  const totalCorrect = history.reduce((sum, r) => sum + r.correctCount, 0);
  const totalAccuracy = Math.round((totalCorrect / totalQuestions) * 100);
  const totalMinutes = Math.round(history.reduce((sum, r) => sum + r.elapsedTime, 0) / 60);
  const bestAccuracy = Math.max(...history.map(r => r.accuracy));

  // 计算连续练习天数
  const practiceDates = [...new Set(history.map(r => r.date.split('T')[0]))].sort().reverse();
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    if (practiceDates.includes(dateStr)) {
      currentStreak++;
    } else if (i === 0) {
      // 今天还没练习，不算断连
      continue;
    } else {
      break;
    }
  }

  return { totalPractice, totalQuestions, totalCorrect, totalAccuracy, totalMinutes, currentStreak, bestAccuracy };
}

// 分析薄弱点
export function getWeakPoints(): WeakPoint[] {
  const history = getHistory();
  const operationMap: Record<string, { total: number; wrong: number }> = {};

  history.forEach(record => {
    record.wrongQuestions.forEach(q => {
      if (!operationMap[q.operation]) {
        operationMap[q.operation] = { total: 0, wrong: 0 };
      }
      operationMap[q.operation].wrong++;
    });
    // 总题数（从正确数和错误数推算）
    const opTypes = getOperationsByDifficulty(record.difficulty);
    const avgPerOp = Math.floor(record.questionCount / opTypes.length);
    opTypes.forEach(op => {
      if (!operationMap[op]) {
        operationMap[op] = { total: 0, wrong: 0 };
      }
      operationMap[op].total += avgPerOp;
    });
  });

  return Object.entries(operationMap)
    .map(([operation, data]) => ({
      operation,
      totalAttempts: data.total,
      wrongCount: data.wrong,
      errorRate: data.total > 0 ? Math.round((data.wrong / data.total) * 100) : 0,
    }))
    .filter(wp => wp.totalAttempts > 0)
    .sort((a, b) => b.errorRate - a.errorRate);
}

// 获取最近N天的正确率趋势
export function getAccuracyTrend(days: number = 7): { date: string; accuracy: number; count: number }[] {
  const history = getHistory();
  const result: { date: string; accuracy: number; count: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayRecords = history.filter(r => r.date.startsWith(dateStr));
    
    if (dayRecords.length > 0) {
      const totalCorrect = dayRecords.reduce((sum, r) => sum + r.correctCount, 0);
      const totalQuestions = dayRecords.reduce((sum, r) => sum + r.questionCount, 0);
      result.push({
        date: dateStr.slice(5), // MM-DD
        accuracy: Math.round((totalCorrect / totalQuestions) * 100),
        count: dayRecords.length,
      });
    } else {
      result.push({ date: dateStr.slice(5), accuracy: 0, count: 0 });
    }
  }

  return result;
}

// 根据薄弱点推荐练习难度和运算类型
export function getAIRecommendation(): {
  recommendedDifficulty: string;
  focusOperations: string[];
  reason: string;
} {
  const weakPoints = getWeakPoints();
  const history = getHistory();

  // 如果没有历史记录，推荐简单模式
  if (history.length === 0) {
    return {
      recommendedDifficulty: 'easy',
      focusOperations: ['+', '-'],
      reason: '还没有练习记录，建议从简单加减法开始',
    };
  }

  // 找出错误率最高的运算类型
  const highErrorOps = weakPoints.filter(wp => wp.errorRate > 30);
  
  // 根据历史平均正确率推荐难度
  const stats = getStats();
  let recommendedDifficulty: string;
  
  if (stats.totalAccuracy >= 90 && history.length >= 5) {
    // 正确率很高，建议提升难度
    const lastRecord = history[0];
    const difficultyOrder = ['easy', 'medium', 'hard', 'expert'];
    const currentIndex = difficultyOrder.indexOf(lastRecord.difficulty);
    recommendedDifficulty = difficultyOrder[Math.min(currentIndex + 1, 3)];
  } else if (stats.totalAccuracy < 60) {
    recommendedDifficulty = 'easy';
  } else {
    // 保持当前难度
    recommendedDifficulty = history[0]?.difficulty || 'medium';
  }

  // 推荐重点练习的运算类型
  let focusOperations: string[] = [];
  let reason: string;

  if (highErrorOps.length > 0) {
    focusOperations = highErrorOps.slice(0, 2).map(wp => wp.operation);
    const opNames: Record<string, string> = { '+': '加法', '-': '减法', '×': '乘法', '÷': '除法' };
    reason = `检测到${focusOperations.map(op => opNames[op] || op).join('和')}正确率较低，建议重点练习`;
  } else {
    reason = '整体表现不错，继续保持！';
  }

  return { recommendedDifficulty, focusOperations, reason };
}

// 清除所有历史记录
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 根据难度获取运算类型
function getOperationsByDifficulty(difficulty: string): string[] {
  switch (difficulty) {
    case 'easy': return ['+', '-'];
    case 'medium': return ['+', '-', '×'];
    case 'hard': return ['+', '-', '×', '÷'];
    case 'expert': return ['+', '-', '×', '÷'];
    default: return ['+', '-'];
  }
}

// 生成家长学习报告文本
export function generateParentReport(): {
  subject: string;
  text: string;
  html: string;
} {
  const stats = getStats();
  const weekRecords = getWeekRecords();
  const weakPoints = getWeakPoints();
  const trend = getAccuracyTrend(7);
  
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  
  // 本周统计
  const weekPractice = weekRecords.length;
  const weekQuestions = weekRecords.reduce((sum, r) => sum + r.questionCount, 0);
  const weekCorrect = weekRecords.reduce((sum, r) => sum + r.correctCount, 0);
  const weekAccuracy = weekQuestions > 0 ? Math.round((weekCorrect / weekQuestions) * 100) : 0;
  const weekMinutes = Math.round(weekRecords.reduce((sum, r) => sum + r.elapsedTime, 0) / 60);
  
  // 薄弱点分析
  const opNames: Record<string, string> = { '+': '加法', '-': '减法', '×': '乘法', '÷': '除法' };
  const weakStr = weakPoints
    .filter(wp => wp.errorRate > 15)
    .map(wp => `${opNames[wp.operation] || wp.operation}（错误率${wp.errorRate}%）`)
    .join('、') || '暂无明显薄弱点';
  
  // 改进建议
  let suggestion = '';
  if (weekAccuracy >= 90) {
    suggestion = '孩子本周口算表现优秀，建议适当提升难度，挑战更高等级的练习。';
  } else if (weekAccuracy >= 70) {
    suggestion = '孩子本周口算表现良好，建议针对薄弱运算类型进行专项练习。';
  } else if (weekAccuracy >= 50) {
    suggestion = '孩子本周口算正确率偏低，建议从基础难度开始，每天坚持10分钟练习。';
  } else if (weekPractice > 0) {
    suggestion = '孩子本周口算需要加强练习，建议每天至少完成一轮口算训练，重点练习薄弱运算类型。';
  } else {
    suggestion = '本周暂无练习记录，建议每天花5-10分钟进行口算练习。';
  }
  
  // 每日明细
  const dailyDetail = trend
    .filter(d => d.count > 0)
    .map(d => `  ${d.date}：练习${d.count}次，正确率${d.accuracy}%`)
    .join('\n');
  
  const subject = `📊 练学宝口算学习报告 - ${dateStr}`;
  
  const text = `练学宝 · 口算学习报告
报告日期：${dateStr}

【本周概览】
练习次数：${weekPractice} 次
做题总数：${weekQuestions} 题
答对题数：${weekCorrect} 题
平均正确率：${weekAccuracy}%
练习时长：${weekMinutes} 分钟

【累计统计】
总练习次数：${stats.totalPractice} 次
总做题数：${stats.totalQuestions} 题
累计正确率：${stats.totalAccuracy}%
最高正确率：${stats.bestAccuracy}%
连续打卡：${stats.currentStreak} 天

【薄弱点分析】
${weakStr}

【每日明细】
${dailyDetail || '  本周暂无练习记录'}

【改进建议】
${suggestion}

— 练学宝 www.skillxm.cn
让每个孩子爱上口算 ✨`;

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5}
.card{background:#fff;border-radius:16px;padding:24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}
h1{font-size:20px;color:#1a1a2e;margin:0 0 4px}
.subtitle{color:#666;font-size:13px;margin-bottom:20px}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.stat-item{text-align:center;padding:12px 8px;background:#f8f9fa;border-radius:12px}
.stat-value{font-size:24px;font-weight:800;color:#1a1a2e}
.stat-label{font-size:11px;color:#888;margin-top:4px}
.section-title{font-size:15px;font-weight:700;color:#1a1a2e;margin:16px 0 8px;display:flex;align-items:center;gap:6px}
.weak-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#fff5f5;border-radius:8px;margin-bottom:6px}
.weak-name{font-size:13px;color:#333}
.weak-rate{font-size:13px;font-weight:700;color:#e74c3c}
.daily-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#555}
.suggestion{background:#f0f7ff;border-radius:12px;padding:14px;font-size:13px;color:#2c5282;line-height:1.6}
.footer{text-align:center;padding:16px;font-size:12px;color:#aaa}
.bar{height:6px;background:#eee;border-radius:3px;overflow:hidden;margin-top:4px}
.bar-fill{height:100%;border-radius:3px}
</style></head><body>
<div class="card">
<h1>📊 口算学习报告</h1>
<div class="subtitle">练学宝 · ${dateStr}</div>
<div class="stats-grid">
<div class="stat-item"><div class="stat-value">${weekPractice}</div><div class="stat-label">本周练习</div></div>
<div class="stat-item"><div class="stat-value">${weekAccuracy}%</div><div class="stat-label">正确率</div></div>
<div class="stat-item"><div class="stat-value">${weekMinutes}</div><div class="stat-label">练习分钟</div></div>
<div class="stat-item"><div class="stat-value">${stats.totalPractice}</div><div class="stat-label">累计练习</div></div>
<div class="stat-item"><div class="stat-value">${stats.bestAccuracy}%</div><div class="stat-label">最高正确率</div></div>
<div class="stat-item"><div class="stat-value">${stats.currentStreak}🔥</div><div class="stat-label">连续打卡</div></div>
</div></div>
<div class="card">
<div class="section-title">🔍 薄弱点分析</div>
${weakPoints.filter(wp => wp.errorRate > 0).map(wp => `<div class="weak-item"><span class="weak-name">${opNames[wp.operation] || wp.operation}</span><span class="weak-rate">错误率 ${wp.errorRate}%</span></div><div class="bar"><div class="bar-fill" style="width:${Math.min(wp.errorRate * 2, 100)}%;background:${wp.errorRate > 30 ? '#e74c3c' : wp.errorRate > 15 ? '#f39c12' : '#27ae60'}"></div></div>`).join('\n')}
</div>
<div class="card">
<div class="section-title">📈 每日明细</div>
${trend.filter(d => d.count > 0).map(d => `<div class="daily-row"><span>${d.date}</span><span>练习${d.count}次 · 正确率${d.accuracy}%</span></div>`).join('\n') || '<div style="color:#aaa;font-size:13px;text-align:center;padding:12px">本周暂无练习记录</div>'}
</div>
<div class="card">
<div class="section-title">💡 改进建议</div>
<div class="suggestion">${suggestion}</div>
</div>
<div class="footer">练学宝 www.skillxm.cn · 让每个孩子爱上口算 ✨</div>
</body></html>`;

  return { subject, text, html };
}

// 发送邮件给家长（使用 mailto 协议，无需后端）
export function sendReportViaEmail(email: string): void {
  const report = generateParentReport();
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(report.subject)}&body=${encodeURIComponent(report.text)}`;
  window.open(mailtoUrl, '_blank');
}

// 生成微信分享文本
export function generateWeChatShareText(): string {
  const stats = getStats();
  const weekRecords = getWeekRecords();
  const weekAccuracy = weekRecords.length > 0 
    ? Math.round((weekRecords.reduce((sum, r) => sum + r.correctCount, 0) / weekRecords.reduce((sum, r) => sum + r.questionCount, 0)) * 100) 
    : 0;
  
  return `📊 练学宝口算学习报告\n本周练习${weekRecords.length}次，正确率${weekAccuracy}%\n累计练习${stats.totalPractice}次，连续打卡${stats.currentStreak}天🔥\n\n快来练学宝一起练口算吧！\n👉 www.skillxm.cn/tools/mental-math/`;
}
