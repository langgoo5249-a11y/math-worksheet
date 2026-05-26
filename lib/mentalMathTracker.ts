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
