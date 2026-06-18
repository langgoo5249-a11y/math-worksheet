'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ToolGuide from '@/components/ToolGuide';
import ToolNavBar from '@/components/ToolNavBar';
import { type Locale } from '@/lib/i18n';
import { toolGuides } from '@/lib/toolGuides';
import { 
  getHistory, saveRecord, getStats, getTodayRecords, 
  getAccuracyTrend, getWeakPoints, getAIRecommendation, clearHistory,
  generateParentReport, sendReportViaEmail, generateWeChatShareText,
  type PracticeRecord 
} from '@/lib/mentalMathTracker';

// 难度配置
const DIFFICULTY_CONFIG = {
  easy: {
    label: '简单',
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
    operations: ['+', '-'],
    maxNum: 20,
    timeLimit: 60,
    description: '20以内加减法',
  },
  medium: {
    label: '中等',
    icon: '🌿',
    color: 'from-blue-500 to-indigo-600',
    operations: ['+', '-', '×'],
    maxNum: 50,
    timeLimit: 90,
    description: '50以内加减乘',
  },
  hard: {
    label: '困难',
    icon: '🌳',
    color: 'from-orange-500 to-red-600',
    operations: ['+', '-', '×', '÷'],
    maxNum: 100,
    timeLimit: 120,
    description: '100以内四则',
  },
  expert: {
    label: '专家',
    icon: '🏆',
    color: 'from-purple-500 to-pink-600',
    operations: ['+', '-', '×', '÷'],
    maxNum: 200,
    timeLimit: 180,
    description: '200以内四则',
  },
};

type Difficulty = keyof typeof DIFFICULTY_CONFIG;

interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: string;
  answer: number;
  userAnswer: string;
  isCorrect: boolean | null;
  timeSpent: number;
}

// 生成题目
function generateQuestion(id: number, difficulty: Difficulty): Question {
  const config = DIFFICULTY_CONFIG[difficulty];
  const operation = config.operations[Math.floor(Math.random() * config.operations.length)];
  
  let num1: number, num2: number, answer: number;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * config.maxNum) + 1;
      num2 = Math.floor(Math.random() * config.maxNum) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * config.maxNum) + 1;
      num2 = Math.floor(Math.random() * num1) + 1; // 确保结果为正
      answer = num1 - num2;
      break;
    case '×':
      num1 = Math.floor(Math.random() * Math.sqrt(config.maxNum)) + 1;
      num2 = Math.floor(Math.random() * Math.sqrt(config.maxNum)) + 1;
      answer = num1 * num2;
      break;
    case '÷':
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * answer; // 确保整除
      break;
    default:
      num1 = 1;
      num2 = 1;
      answer = 2;
  }
  
  return {
    id,
    num1,
    num2,
    operation,
    answer,
    userAnswer: '',
    isCorrect: null,
    timeSpent: 0,
  };
}

// 生成题目列表
function generateQuestions(count: number, difficulty: Difficulty, focusOperations?: string[]): Question[] {
  if (focusOperations && focusOperations.length > 0) {
    // AI模式：重点生成薄弱运算类型的题目（70%薄弱题 + 30%混合题）
    return Array.from({ length: count }, (_, i) => {
      const useFocus = i < Math.floor(count * 0.7);
      const op = useFocus 
        ? focusOperations[Math.floor(Math.random() * focusOperations.length)]
        : DIFFICULTY_CONFIG[difficulty].operations[Math.floor(Math.random() * DIFFICULTY_CONFIG[difficulty].operations.length)];
      return generateQuestionWithOp(i + 1, difficulty, op);
    });
  }
  return Array.from({ length: count }, (_, i) => generateQuestion(i + 1, difficulty));
}

// 指定运算类型生成题目
function generateQuestionWithOp(id: number, difficulty: Difficulty, operation: string): Question {
  const config = DIFFICULTY_CONFIG[difficulty];
  let num1: number, num2: number, answer: number;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * config.maxNum) + 1;
      num2 = Math.floor(Math.random() * config.maxNum) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * config.maxNum) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      break;
    case '×':
      num1 = Math.floor(Math.random() * Math.sqrt(config.maxNum)) + 1;
      num2 = Math.floor(Math.random() * Math.sqrt(config.maxNum)) + 1;
      answer = num1 * num2;
      break;
    case '÷':
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * answer;
      break;
    default:
      num1 = 1; num2 = 1; answer = 2;
  }
  
  return { id, num1, num2, operation, answer, userAnswer: '', isCorrect: null, timeSpent: 0 };
}

export default function MentalMathPage({ locale }: { locale?: Locale } = {}) {
  // 游戏状态
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [questionCount, setQuestionCount] = useState(20);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  
  // 计时
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // 统计
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  
  // UI 状态
  const [showHistory, setShowHistory] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 进度追踪状态
  const [activeTab, setActiveTab] = useState<'practice' | 'progress' | 'ai'>('practice');
  const [stats, setStats] = useState({ totalPractice: 0, totalQuestions: 0, totalCorrect: 0, totalAccuracy: 0, totalMinutes: 0, currentStreak: 0, bestAccuracy: 0 });
  const [todayCount, setTodayCount] = useState(0);
  const [accuracyTrend, setAccuracyTrend] = useState<{ date: string; accuracy: number; count: number }[]>([]);
  const [weakPoints, setWeakPoints] = useState<{ operation: string; totalAttempts: number; wrongCount: number; errorRate: number }[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState({ recommendedDifficulty: 'easy', focusOperations: ['+', '-'], reason: '' });
  const [aiMode, setAiMode] = useState(false); // AI智能出题模式
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [parentEmail, setParentEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // 当前题目
  const currentQuestion = questions[currentIndex];
  
  // 刷新进度数据
  const refreshProgressData = useCallback(() => {
    setStats(getStats());
    setTodayCount(getTodayRecords().length);
    setAccuracyTrend(getAccuracyTrend(7));
    setWeakPoints(getWeakPoints());
    setAiRecommendation(getAIRecommendation());
  }, []);
  
  // 初始化加载进度数据
  useEffect(() => {
    refreshProgressData();
  }, [refreshProgressData]);
  
  // 开始游戏
  const startGame = useCallback(() => {
    const focusOps = aiMode ? aiRecommendation.focusOperations : undefined;
    const newQuestions = generateQuestions(questionCount, difficulty, focusOps);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setUserInput('');
    setGameState('playing');
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(DIFFICULTY_CONFIG[difficulty].timeLimit);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
    setShowHistory(false);
    
    // 聚焦输入框
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [difficulty, questionCount]);
  
  // 计时器
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsedTime(elapsed);
        setTimeLeft(prev => {
          if (prev <= 1) {
            // 时间到，结束游戏
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [gameState]);
  
  // 提交答案
  const submitAnswer = useCallback(() => {
    if (!currentQuestion || userInput.trim() === '') return;
    
    const answer = parseInt(userInput, 10);
    const isCorrect = answer === currentQuestion.answer;
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    
    // 更新题目状态
    setQuestions(prev => prev.map((q, i) => 
      i === currentIndex 
        ? { ...q, userAnswer: userInput, isCorrect, timeSpent }
        : q
    ));
    
    // 更新统计
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(best => Math.max(best, newStreak));
        return newStreak;
      });
    } else {
      setWrongCount(prev => prev + 1);
      setStreak(0);
    }
    
    // 下一题或结束
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setGameState('finished');
    }
  }, [currentQuestion, currentIndex, userInput, questions.length]);
  
  // 游戏结束时保存记录
  useEffect(() => {
    if (gameState === 'finished' && questions.length > 0) {
      const answeredQuestions = questions.filter(q => q.isCorrect !== null);
      if (answeredQuestions.length > 0) {
        const record: PracticeRecord = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          difficulty,
          questionCount: questions.length,
          correctCount,
          wrongCount,
          accuracy,
          elapsedTime,
          bestStreak,
          wrongQuestions: questions
            .filter(q => q.isCorrect === false)
            .map(q => ({
              num1: q.num1,
              num2: q.num2,
              operation: q.operation,
              correctAnswer: q.answer,
              userAnswer: q.userAnswer,
            })),
        };
        saveRecord(record);
        refreshProgressData();
      }
    }
  }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // 键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAnswer();
    }
  }, [submitAnswer]);
  
  // 数字键盘点击
  const handleNumPad = (value: string) => {
    if (value === 'C') {
      setUserInput('');
    } else if (value === '←') {
      setUserInput(prev => prev.slice(0, -1));
    } else if (value === 'OK') {
      submitAnswer();
    } else {
      setUserInput(prev => prev + value);
    }
  };
  
  // 计算统计
  const accuracy = questions.length > 0 
    ? Math.round((correctCount / (correctCount + wrongCount)) * 100) || 0 
    : 0;
  const avgTime = correctCount + wrongCount > 0 
    ? Math.round(elapsedTime / (correctCount + wrongCount)) 
    : 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* ===== 顶部导航 ===== */}
      <ToolNavBar currentPath="/tools/mental-math" title="口算速练" locale={locale} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* ===== Tab 切换 ===== */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'practice' ? 'bg-blue-500 text-white' : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              ⚡ 开始练习
            </button>
            <button
              onClick={() => { setActiveTab('progress'); refreshProgressData(); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'progress' ? 'bg-blue-500 text-white' : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              📊 学习报告
              {todayCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full">{todayCount}</span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('ai'); refreshProgressData(); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'ai' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              🤖 AI智能出题
            </button>
          </div>
          
          {/* ===== 开始界面 ===== */}
          {activeTab === 'practice' && gameState === 'idle' && (
            <div className="space-y-8">
              {/* 标题 */}
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h1 className="text-4xl font-black text-white mb-2">口算速练</h1>
                <p className="text-gray-400">在线计时答题，锻炼口算速度</p>
              </div>
              
              {/* 难度选择 */}
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">选择难度</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => {
                    const config = DIFFICULTY_CONFIG[d];
                    return (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          difficulty === d
                            ? `border-transparent bg-gradient-to-br ${config.color} text-white`
                            : 'border-white/20 bg-slate-700/50 text-gray-300 hover:border-white/40'
                        }`}
                      >
                        <div className="text-3xl mb-2">{config.icon}</div>
                        <div className="font-bold">{config.label}</div>
                        <div className="text-xs opacity-80 mt-1">{config.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* 题目数量 */}
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">题目数量</h2>
                <div className="flex flex-wrap gap-3">
                  {[10, 20, 30, 50].map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`px-6 py-3 rounded-xl font-bold transition-all ${
                        questionCount === count
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {count} 题
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 开始按钮 */}
              <div className="text-center">
                <button
                  onClick={startGame}
                  className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:scale-105 transition-transform"
                >
                  开始挑战 🚀
                </button>
              </div>
              
              {/* 规则说明 */}
              <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4 text-sm text-gray-400">
                <h3 className="font-bold text-white mb-2">📖 游戏规则</h3>
                <ul className="space-y-1 list-disc list-inside">
                  <li>在规定时间内完成所有题目</li>
                  <li>输入答案后按 Enter 或点击 OK 提交</li>
                  <li>连续答对可获得连击奖励</li>
                  <li>时间结束或答完所有题目后显示成绩</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* ===== 游戏界面 ===== */}
          {activeTab === 'practice' && gameState === 'playing' && currentQuestion && (
            <div className="space-y-6">
              {/* 进度条 */}
              <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">进度</span>
                  <span className="text-white font-bold">{currentIndex + 1} / {questions.length}</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* 计时和统计 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">剩余时间</div>
                  <div className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    {timeLeft}s
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">正确</div>
                  <div className="text-3xl font-black text-green-400">{correctCount}</div>
                </div>
                <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">连击</div>
                  <div className="text-3xl font-black text-yellow-400">{streak}🔥</div>
                </div>
              </div>
              
              {/* 题目卡片 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/20 rounded-3xl p-8 md:p-12 text-center">
                <div className="text-6xl md:text-8xl font-black text-white mb-8">
                  {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
                </div>
                
                {/* 输入框 */}
                <div className="max-w-xs mx-auto">
                  <input
                    ref={inputRef}
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full text-center text-4xl font-bold bg-slate-900 border-2 border-white/30 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="?"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* 数字键盘 */}
              {showKeyboard && (
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4">
                  <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                    {['7', '8', '9', 'C', '4', '5', '6', '←', '1', '2', '3', 'OK', '0', '-', '-', '-'].map((key, i) => {
                      if (key === '-') return <div key={i} />;
                      return (
                        <button
                          key={i}
                          onClick={() => handleNumPad(key)}
                          aria-label={key === '←' ? '退格' : key === 'C' ? '清除' : key === 'OK' ? '确认' : key}
                          className={`py-4 rounded-xl font-bold text-xl transition-all ${
                            key === 'OK'
                              ? 'bg-green-500 hover:bg-green-600 text-white col-span-1'
                              : key === 'C'
                              ? 'bg-red-500/80 hover:bg-red-500 text-white'
                              : key === '←'
                              ? 'bg-orange-500/80 hover:bg-orange-500 text-white'
                              : 'bg-slate-700 hover:bg-slate-600 text-white'
                          }`}
                        >
                          {key === '←' ? '⌫' : key}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* 键盘开关 */}
              <div className="text-center">
                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  {showKeyboard ? '隐藏键盘 ⌨' : '显示键盘 ⌨'}
                </button>
              </div>
            </div>
          )}
          
          {/* ===== 结束界面 ===== */}
          {activeTab === 'practice' && gameState === 'finished' && (
            <div className="space-y-8">
              {/* 成绩卡片 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/20 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">
                  {accuracy >= 90 ? '🏆' : accuracy >= 70 ? '🥈' : accuracy >= 50 ? '🥉' : '💪'}
                </div>
                <h2 className="text-3xl font-black text-white mb-2">挑战完成！</h2>
                <p className="text-gray-400 mb-6">
                  {accuracy >= 90 ? '太棒了！你是口算高手！' : accuracy >= 70 ? '不错！继续加油！' : '多多练习，你会越来越好的！'}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">正确率</div>
                    <div className="text-3xl font-black text-green-400">{accuracy}%</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">答对</div>
                    <div className="text-3xl font-black text-white">{correctCount}/{questions.length}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">用时</div>
                    <div className="text-3xl font-black text-blue-400">{elapsedTime}s</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">最高连击</div>
                    <div className="text-3xl font-black text-yellow-400">{bestStreak}🔥</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
                  >
                    再来一局 🔄
                  </button>
                  <button
                    onClick={() => setGameState('idle')}
                    className="px-8 py-3 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600"
                  >
                    返回设置 ⚙️
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-8 py-3 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600"
                  >
                    {showHistory ? '隐藏详情' : '查看详情'} 📋
                  </button>
                </div>
              </div>
              
              {/* 答题详情 */}
              {showHistory && (
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">答题详情</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {questions.map((q, i) => (
                      <div
                        key={q.id}
                        className={`p-3 rounded-xl text-center ${
                          q.isCorrect === true
                            ? 'bg-green-500/20 border border-green-500/30'
                            : q.isCorrect === false
                            ? 'bg-red-500/20 border border-red-500/30'
                            : 'bg-slate-700/50 border border-white/10'
                        }`}
                      >
                        <div className="text-sm text-gray-300 mb-1">
                          {q.num1} {q.operation} {q.num2} =
                        </div>
                        <div className={`font-bold ${q.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {q.userAnswer || '-'}
                          {q.isCorrect === false && (
                            <span className="text-gray-400 ml-2">({q.answer})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 错题回顾 */}
              {questions.filter(q => q.isCorrect === false).length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">❌ 错题回顾</h3>
                  <div className="space-y-2">
                    {questions.filter(q => q.isCorrect === false).map((q) => (
                      <div key={q.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                        <span className="text-white">
                          {q.num1} {q.operation} {q.num2} = ?
                        </span>
                        <div>
                          <span className="text-red-400 mr-4">你的答案: {q.userAnswer}</span>
                          <span className="text-green-400">正确答案: {q.answer}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* ===== 学习报告 ===== */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              {/* 累计统计 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/20 rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                  📊 学习报告
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">累计练习</div>
                    <div className="text-3xl font-black text-blue-400">{stats.totalPractice}</div>
                    <div className="text-xs text-gray-500">次</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">累计做题</div>
                    <div className="text-3xl font-black text-green-400">{stats.totalQuestions}</div>
                    <div className="text-xs text-gray-500">题</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">平均正确率</div>
                    <div className="text-3xl font-black text-purple-400">{stats.totalAccuracy}%</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">练习时长</div>
                    <div className="text-3xl font-black text-yellow-400">{stats.totalMinutes}</div>
                    <div className="text-xs text-gray-500">分钟</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">最高正确率</div>
                    <div className="text-3xl font-black text-emerald-400">{stats.bestAccuracy}%</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">连续打卡</div>
                    <div className="text-3xl font-black text-orange-400">{stats.currentStreak}</div>
                    <div className="text-xs text-gray-500">天 🔥</div>
                  </div>
                </div>
                
                {stats.totalPractice === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-3">📝</div>
                    <p>还没有练习记录，快去做几道题吧！</p>
                  </div>
                )}
              </div>
              
              {/* 7天正确率趋势 */}
              {stats.totalPractice > 0 && (
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📈 近7天正确率趋势</h3>
                  <div className="flex items-end gap-2 h-32">
                    {accuracyTrend.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-400">{day.accuracy > 0 ? `${day.accuracy}%` : '-'}</span>
                        <div 
                          className="w-full rounded-t-lg transition-all"
                          style={{ 
                            height: day.accuracy > 0 ? `${Math.max(day.accuracy, 5)}%` : '4px',
                            background: day.accuracy >= 80 ? 'linear-gradient(to top, #22c55e, #4ade80)' 
                              : day.accuracy >= 60 ? 'linear-gradient(to top, #f59e0b, #fbbf24)' 
                              : day.accuracy > 0 ? 'linear-gradient(to top, #ef4444, #f87171)' 
                              : '#334155',
                          }}
                        />
                        <span className="text-xs text-gray-500">{day.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 薄弱点分析 */}
              {weakPoints.length > 0 && (
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🔍 薄弱点分析</h3>
                  <div className="space-y-3">
                    {weakPoints.map((wp) => (
                      <div key={wp.operation} className="flex items-center gap-4">
                        <span className="text-2xl w-8 text-center">{wp.operation === '+' ? '➕' : wp.operation === '-' ? '➖' : wp.operation === '×' ? '✖️' : '➗'}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">
                              {wp.operation === '+' ? '加法' : wp.operation === '-' ? '减法' : wp.operation === '×' ? '乘法' : '除法'}
                            </span>
                            <span className={wp.errorRate > 30 ? 'text-red-400' : wp.errorRate > 15 ? 'text-yellow-400' : 'text-green-400'}>
                              错误率 {wp.errorRate}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                wp.errorRate > 30 ? 'bg-red-500' : wp.errorRate > 15 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(wp.errorRate * 2, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 发送给家长 */}
              {stats.totalPractice > 0 && (
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">👨‍👩‍👧 发送给家长</h3>
                  <p className="text-gray-400 text-sm mb-4">将本周学习报告发送到家长邮箱，包含练习统计、薄弱点分析和改进建议</p>
                  
                  {!showEmailInput ? (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setShowEmailInput(true)}
                        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm"
                      >
                        📧 发送邮件报告
                      </button>
                      <button
                        onClick={() => {
                          const text = generateWeChatShareText();
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(text);
                            alert('报告已复制到剪贴板，可以粘贴发送给家长！');
                          }
                        }}
                        className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm"
                      >
                        📋 复制报告文本
                      </button>
                    </div>
                  ) : !emailSent ? (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="请输入家长邮箱地址"
                        className="flex-1 px-4 py-2.5 bg-slate-900 border border-white/20 rounded-xl text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (parentEmail && parentEmail.includes('@')) {
                            sendReportViaEmail(parentEmail);
                            setEmailSent(true);
                          }
                        }}
                        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm whitespace-nowrap"
                      >
                        📤 发送
                      </button>
                      <button
                        onClick={() => { setShowEmailInput(false); setParentEmail(''); }}
                        className="px-4 py-2.5 bg-slate-700 text-gray-300 rounded-xl text-sm hover:bg-slate-600"
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-green-400">
                      <span>✅ 邮件客户端已打开，请在邮件客户端中确认发送</span>
                      <button
                        onClick={() => { setShowEmailInput(false); setParentEmail(''); setEmailSent(false); }}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        发送另一个
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* 清除数据 */}
              {stats.totalPractice > 0 && (
                <div className="text-center">
                  {!showClearConfirm ? (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="text-gray-500 hover:text-red-400 text-sm transition-colors"
                    >
                      🗑️ 清除练习记录
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">
                      <span className="text-red-400 text-sm">确定清除所有记录？</span>
                      <button onClick={() => { clearHistory(); refreshProgressData(); setShowClearConfirm(false); }} className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">确定</button>
                      <button onClick={() => setShowClearConfirm(false)} className="px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-500">取消</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* ===== AI智能出题 ===== */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                  🤖 AI智能出题
                </h2>
                <p className="text-gray-400 mb-6">根据你的练习数据，AI自动分析薄弱点并生成针对性练习题</p>
                
                {/* AI分析结果 */}
                <div className="bg-slate-900/50 rounded-2xl p-5 mb-6">
                  <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    AI分析结果
                  </h3>
                  <p className="text-gray-300 mb-4">{aiRecommendation.reason}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-3">
                      <div className="text-gray-400 text-xs mb-1">推荐难度</div>
                      <div className="text-lg font-bold text-white">
                        {DIFFICULTY_CONFIG[aiRecommendation.recommendedDifficulty as Difficulty]?.icon} 
                        {DIFFICULTY_CONFIG[aiRecommendation.recommendedDifficulty as Difficulty]?.label}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3">
                      <div className="text-gray-400 text-xs mb-1">重点练习</div>
                      <div className="text-lg font-bold text-white">
                        {aiRecommendation.focusOperations.map(op => 
                          op === '+' ? '加法' : op === '-' ? '减法' : op === '×' ? '乘法' : '除法'
                        ).join('、') || '全部'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* AI出题模式说明 */}
                <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4 text-sm text-gray-400 mb-6">
                  <h3 className="font-bold text-white mb-2">💡 AI出题原理</h3>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>分析历史练习数据，找出错误率最高的运算类型</li>
                    <li>70%的题目针对薄弱点，30%混合练习保持全面性</li>
                    <li>根据整体正确率自动调整推荐难度</li>
                    <li>每次练习后自动更新分析结果</li>
                  </ul>
                </div>
                
                {/* 开始AI练习 */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setDifficulty(aiRecommendation.recommendedDifficulty as Difficulty);
                      setAiMode(true);
                      setActiveTab('practice');
                      setGameState('idle');
                    }}
                    className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:scale-105 transition-transform"
                  >
                    开始AI推荐练习 🚀
                  </button>
                  <p className="text-gray-500 text-sm mt-3">
                    难度：{DIFFICULTY_CONFIG[aiRecommendation.recommendedDifficulty as Difficulty]?.label} · 
                    重点：{aiRecommendation.focusOperations.map(op => 
                      op === '+' ? '加法' : op === '-' ? '减法' : op === '×' ? '乘法' : '除法'
                    ).join('、') || '全部'}
                  </p>
                </div>
              </div>
              
              {stats.totalPractice === 0 && (
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">🤔</div>
                  <p className="text-gray-400">AI需要至少1次练习数据才能分析薄弱点</p>
                  <button 
                    onClick={() => setActiveTab('practice')}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    去做几道题
                  </button>
                </div>
              )}
            </div>
          )}
          
        </div>
      </main>
      
      {/* ===== 页脚 ===== */}
      <footer className="border-t border-white/10 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>⚡ 口算速练 - 锻炼口算速度，提升计算能力</p>
        </div>
      </footer>

      {/* ===== 内容三件套 ===== */}
      <div className="print:hidden max-w-4xl mx-auto px-4 pb-8 space-y-8">

        {/* 使用指南 */}
        <section className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📖</span> 使用指南
          </h2>
          <div className="text-gray-400 leading-relaxed space-y-3 text-sm md:text-base">
            <p>
              口算速练是一款数学口算计时训练工具，提供入门（10以内加减法）、基础（20以内加减法）、进阶（100以内加减法）、挑战（100以内四则混合运算）四个难度等级。选择适合的难度后开始计时挑战，系统会随机生成口算题目，学生需要快速心算并输入答案。每轮练习结束后会显示正确率、用时和错题列表，方便针对性复习。研究表明，每天坚持5-10分钟的口算训练，可以有效提升计算速度和数感，建议从适合孩子当前水平的难度开始，逐步提升。
            </p>
          </div>
        </section>

        {/* 适用场景 */}
        <section className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🎯</span> 适用场景
          </h2>
          <ul className="space-y-3 text-gray-400 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5 shrink-0">●</span>
              <span><strong className="text-gray-300">每日口算打卡：</strong>每天5分钟，养成口算习惯</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5 shrink-0">●</span>
              <span><strong className="text-gray-300">课前热身：</strong>上课前做一轮口算，激活数学思维</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5 shrink-0">●</span>
              <span><strong className="text-gray-300">计算能力检测：</strong>定期测试，追踪孩子的口算速度进步</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5 shrink-0">●</span>
              <span><strong className="text-gray-300">期末冲刺：</strong>选择对应年级的难度等级进行强化训练</span>
            </li>
          </ul>
        </section>

        {/* 常见问题FAQ */}
        <section className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>❓</span> 常见问题
          </h2>
          <div className="space-y-2">
            <details className="group border border-white/10 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-300 hover:text-white list-none font-medium">
                <span>各年级口算速度标准是多少？</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">一年级20以内加减法要求每分钟8-10题，二年级100以内加减法要求每分钟6-8题，三年级表内乘除法要求每分钟10-12题，四年级以上混合运算要求每分钟4-6题。</div>
            </details>
            <details className="group border border-white/10 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-300 hover:text-white list-none font-medium">
                <span>错题回顾功能怎么用？</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">每轮练习结束后，系统会记录所有做错的题目。点击"错题回顾"可以查看错题列表和正确答案，建议针对错题进行二次练习。</div>
            </details>
          </div>
        </section>

        {/* 相关工具推荐 */}
        <section className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🔗</span> 相关工具推荐
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/tools/math-worksheet" className="block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl p-4 transition-all group">
              <div className="text-2xl mb-2">🧮</div>
              <div className="font-bold text-gray-200 text-sm group-hover:text-white transition-colors">数学练习卷生成器</div>
              <div className="text-xs text-gray-500 mt-1">PDF打印练习卷</div>
            </a>
            <a href="/tools/sudoku" className="block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl p-4 transition-all group">
              <div className="text-2xl mb-2">🧩</div>
              <div className="font-bold text-gray-200 text-sm group-hover:text-white transition-colors">数独游戏</div>
              <div className="text-xs text-gray-500 mt-1">逻辑思维训练</div>
            </a>
            <a href="/blog/shushi-jisuan-jiaoxue" className="block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl p-4 transition-all group">
              <div className="text-2xl mb-2">📐</div>
              <div className="font-bold text-gray-200 text-sm group-hover:text-white transition-colors">竖式计算教学</div>
              <div className="text-xs text-gray-500 mt-1">竖式计算全攻略</div>
            </a>
          </div>
        </section>
      </div>

      {/* 使用指南 */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ToolGuide {...toolGuides['mental-math']} />
      </div>

      </div>
  );
}
