// 每日一练配置 - 基于日期生成稳定的内容
export interface DailyExercise {
  date: string; // YYYY-MM-DD
  weekday: string;
  grade: number;
  subject: 'math' | 'chinese' | 'english';
  topic: string;
  questions: { q: string; a: string }[];
  estimatedTime: string;
  difficulty: '基础' | '进阶' | '拔高';
  tip: string;
}

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// 简单的种子化随机数生成器
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function dateToSeed(date: string): number {
  let seed = 0;
  for (let i = 0; i < date.length; i++) {
    seed = (seed * 31 + date.charCodeAt(i)) % 999999;
  }
  return seed;
}

// 题目模板 - 按年级和学科
const MATH_TEMPLATES: Record<number, () => { q: string; a: string }[]> = {
  1: () => {
    const rand = seededRandom(dateToSeed(new Date().toISOString().slice(0, 10)));
    const list: { q: string; a: string }[] = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(rand() * 10) + 1;
      const b = Math.floor(rand() * 10) + 1;
      const op = rand() > 0.5 ? '+' : '-';
      if (op === '-' && a < b) continue;
      list.push({ q: `${a} ${op} ${b} = ?`, a: op === '+' ? String(a + b) : String(a - b) });
    }
    return list;
  },
  2: () => {
    const rand = seededRandom(dateToSeed(new Date().toISOString().slice(0, 10)));
    const list: { q: string; a: string }[] = [];
    for (let i = 0; i < 10; i++) {
      const type = Math.floor(rand() * 3);
      if (type === 0) {
        const a = Math.floor(rand() * 9) + 1;
        const b = Math.floor(rand() * 9) + 1;
        list.push({ q: `${a} × ${b} = ?`, a: String(a * b) });
      } else if (type === 1) {
        const a = Math.floor(rand() * 50) + 10;
        const b = Math.floor(rand() * 30) + 10;
        list.push({ q: `${a} + ${b} = ?`, a: String(a + b) });
      } else {
        const a = Math.floor(rand() * 9) + 1;
        const b = Math.floor(rand() * 9) + 1;
        if (a * b % b === 0) {
          list.push({ q: `${a * b} ÷ ${b} = ?`, a: String(a) });
        }
      }
    }
    return list;
  },
  3: () => {
    const rand = seededRandom(dateToSeed(new Date().toISOString().slice(0, 10)));
    const list: { q: string; a: string }[] = [];
    for (let i = 0; i < 8; i++) {
      const a = Math.floor(rand() * 9000) + 1000;
      const b = Math.floor(rand() * 9000) + 1000;
      list.push({ q: `${a} + ${b} = ?`, a: String(a + b) });
    }
    return list;
  },
  4: () => {
    const rand = seededRandom(dateToSeed(new Date().toISOString().slice(0, 10)));
    const list: { q: string; a: string }[] = [];
    for (let i = 0; i < 8; i++) {
      const type = Math.floor(rand() * 2);
      if (type === 0) {
        const a = Math.floor(rand() * 900) + 100;
        const b = Math.floor(rand() * 90) + 10;
        list.push({ q: `${a} × ${b} = ?`, a: String(a * b) });
      } else {
        const a = (Math.floor(rand() * 90) + 10) * 12;
        const b = Math.floor(rand() * 9) + 2;
        list.push({ q: `${a} ÷ ${b} = ?`, a: String(a / b) });
      }
    }
    return list;
  },
  5: () => {
    const rand = seededRandom(dateToSeed(new Date().toISOString().slice(0, 10)));
    const list: { q: string; a: string }[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (Math.floor(rand() * 90) + 10) / 10;
      const b = (Math.floor(rand() * 90) + 10) / 10;
      list.push({ q: `${a.toFixed(1)} × ${b.toFixed(1)} = ?`, a: (a * b).toFixed(2) });
    }
    return list;
  },
  6: () => {
    const rand = seededRandom(dateToSeed(new Date().toISOString().slice(0, 10)));
    const list: { q: string; a: string }[] = [];
    for (let i = 0; i < 6; i++) {
      const r = (Math.floor(rand() * 50) + 10) / 10;
      list.push({ q: `半径${r.toFixed(1)}cm的圆，周长 = ? cm（π取3.14）`, a: (2 * 3.14 * r).toFixed(2) });
    }
    return list;
  },
};

const TOPICS: Record<number, Record<string, string>> = {
  1: { math: '10以内加减法', chinese: '声母认读', english: '26个字母' },
  2: { math: '乘法口诀', chinese: '看图写话', english: '基础单词' },
  3: { math: '万以内加减法', chinese: '阅读理解', english: '时态练习' },
  4: { math: '三位数乘除法', chinese: '作文500字', english: '阅读理解' },
  5: { math: '小数乘除法', chinese: '古诗默写', english: '英语小作文' },
  6: { math: '百分数应用题', chinese: '小升初作文', english: '小升初模拟' },
};

const TIPS: string[] = [
  '每天坚持15分钟，比周末突击2小时更有效。',
  '做完题后先自己检查，再对答案。',
  '错题要标记出来，整理到错题本。',
  '遇到不会的题，先跳过，做完会的再回来思考。',
  '做题时保持安静的环境，减少干扰。',
  '写完后伸个懒腰，休息一下眼睛。',
  '家长不要直接告诉答案，要引导思考。',
  '完成练习后给自己一个小奖励。',
];

export function getDailyExercise(grade: number, dateStr?: string): DailyExercise {
  const date = dateStr || new Date().toISOString().slice(0, 10);
  const d = new Date(date);
  const weekday = WEEKDAYS[d.getDay()];
  const subject: 'math' | 'chinese' | 'english' = 'math';
  const topic = TOPICS[grade]?.[subject] || '综合练习';
  const questions = MATH_TEMPLATES[grade] ? MATH_TEMPLATES[grade]() : [];
  const seed = dateToSeed(date + grade);
  const tip = TIPS[seed % TIPS.length];

  return {
    date,
    weekday,
    grade,
    subject,
    topic,
    questions,
    estimatedTime: '15分钟',
    difficulty: grade <= 2 ? '基础' : grade <= 4 ? '进阶' : '拔高',
    tip,
  };
}

export function getRecentDays(count: number, grade: number): DailyExercise[] {
  const result: DailyExercise[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    result.push(getDailyExercise(grade, d.toISOString().slice(0, 10)));
  }
  return result;
}
