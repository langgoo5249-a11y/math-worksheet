'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * HSKFlashcards — a fully client-side Mandarin vocabulary flashcard tool.
 *
 * Features:
 *  - HSK level selector (HSK 1 / HSK 2 / HSK 3) with button toggles.
 *  - A curated word bank for each level (character, pinyin, English, POS).
 *  - Flip-card: front shows the Chinese character; back shows pinyin + meaning.
 *  - Previous / Next navigation, keyboard support (← → arrows, Space/Enter flip).
 *  - Self-assessment: "I know this" / "Still learning" buttons.
 *  - Progress tracking: reviewed / total, plus known vs. learning counts.
 *  - Shuffle button (keeps per-card assessment, just reorders the deck).
 *  - Audio pronunciation via window.speechSynthesis (lang = 'zh-CN').
 *  - Chinese aesthetic: deep red (#8B0000), gold (#D4AF37), dark bg (#1a0808).
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface VocabWord {
  character: string;
  pinyin: string;
  english: string;
  pos: PartOfSpeech;
}

type HskLevel = 1 | 2 | 3;

type PartOfSpeech = 'pron' | 'num' | 'mw' | 'n' | 'adv' | 'v' | 'adj';

type Assessment = 'known' | 'learning';

interface LevelMeta {
  level: HskLevel;
  label: string;
  subtitle: string;
  words: VocabWord[];
}

/* ------------------------------------------------------------------ */
/* Part-of-speech display                                             */
/* ------------------------------------------------------------------ */

const POS_LABEL: Record<PartOfSpeech, string> = {
  pron: 'pronoun',
  num: 'number',
  mw: 'measure word',
  n: 'noun',
  adv: 'adverb',
  v: 'verb',
  adj: 'adjective',
};

const POS_SHORT: Record<PartOfSpeech, string> = {
  pron: 'pron',
  num: 'num',
  mw: 'mw',
  n: 'noun',
  adv: 'adv',
  v: 'verb',
  adj: 'adj',
};

/* ------------------------------------------------------------------ */
/* Vocabulary banks                                                  */
/* ------------------------------------------------------------------ */

const HSK1_WORDS: VocabWord[] = [
  { character: '我', pinyin: 'wǒ', english: 'I, me', pos: 'pron' },
  { character: '你', pinyin: 'nǐ', english: 'you', pos: 'pron' },
  { character: '他', pinyin: 'tā', english: 'he, him', pos: 'pron' },
  { character: '她', pinyin: 'tā', english: 'she, her', pos: 'pron' },
  { character: '我们', pinyin: 'wǒmen', english: 'we, us', pos: 'pron' },
  { character: '你们', pinyin: 'nǐmen', english: 'you (plural)', pos: 'pron' },
  { character: '他们', pinyin: 'tāmen', english: 'they, them', pos: 'pron' },
  { character: '这', pinyin: 'zhè', english: 'this', pos: 'pron' },
  { character: '那', pinyin: 'nà', english: 'that', pos: 'pron' },
  { character: '哪', pinyin: 'nǎ', english: 'which', pos: 'pron' },
  { character: '什么', pinyin: 'shénme', english: 'what', pos: 'pron' },
  { character: '谁', pinyin: 'shuí', english: 'who', pos: 'pron' },
  { character: '哪里', pinyin: 'nǎlǐ', english: 'where', pos: 'pron' },
  { character: '怎么', pinyin: 'zěnme', english: 'how', pos: 'pron' },
  { character: '为什么', pinyin: 'wèishénme', english: 'why', pos: 'adv' },
  { character: '一', pinyin: 'yī', english: 'one', pos: 'num' },
  { character: '二', pinyin: 'èr', english: 'two', pos: 'num' },
  { character: '三', pinyin: 'sān', english: 'three', pos: 'num' },
  { character: '四', pinyin: 'sì', english: 'four', pos: 'num' },
  { character: '五', pinyin: 'wǔ', english: 'five', pos: 'num' },
  { character: '六', pinyin: 'liù', english: 'six', pos: 'num' },
  { character: '七', pinyin: 'qī', english: 'seven', pos: 'num' },
  { character: '八', pinyin: 'bā', english: 'eight', pos: 'num' },
  { character: '九', pinyin: 'jiǔ', english: 'nine', pos: 'num' },
  { character: '十', pinyin: 'shí', english: 'ten', pos: 'num' },
  { character: '百', pinyin: 'bǎi', english: 'hundred', pos: 'num' },
  { character: '千', pinyin: 'qiān', english: 'thousand', pos: 'num' },
  { character: '万', pinyin: 'wàn', english: 'ten thousand', pos: 'num' },
  { character: '零', pinyin: 'líng', english: 'zero', pos: 'num' },
  { character: '两', pinyin: 'liǎng', english: 'two', pos: 'num' },
  { character: '个', pinyin: 'gè', english: 'piece (measure)', pos: 'mw' },
  { character: '人', pinyin: 'rén', english: 'person', pos: 'n' },
  { character: '家', pinyin: 'jiā', english: 'home, family', pos: 'n' },
  { character: '天', pinyin: 'tiān', english: 'day, sky', pos: 'n' },
  { character: '年', pinyin: 'nián', english: 'year', pos: 'n' },
  { character: '月', pinyin: 'yuè', english: 'month, moon', pos: 'n' },
  { character: '日', pinyin: 'rì', english: 'day, sun', pos: 'n' },
  { character: '时', pinyin: 'shí', english: 'hour, time', pos: 'n' },
  { character: '分', pinyin: 'fēn', english: 'minute', pos: 'n' },
  { character: '点', pinyin: 'diǎn', english: "o'clock", pos: 'n' },
  { character: '今天', pinyin: 'jīntiān', english: 'today', pos: 'n' },
  { character: '明天', pinyin: 'míngtiān', english: 'tomorrow', pos: 'n' },
  { character: '昨天', pinyin: 'zuótiān', english: 'yesterday', pos: 'n' },
  { character: '现在', pinyin: 'xiànzài', english: 'now', pos: 'n' },
  { character: '时候', pinyin: 'shíhou', english: 'time (when)', pos: 'n' },
];

const HSK2_WORDS: VocabWord[] = [
  { character: '别', pinyin: 'bié', english: "don't", pos: 'adv' },
  { character: '已经', pinyin: 'yǐjīng', english: 'already', pos: 'adv' },
  { character: '才', pinyin: 'cái', english: 'just, only', pos: 'adv' },
  { character: '先', pinyin: 'xiān', english: 'first', pos: 'adv' },
  { character: '突然', pinyin: 'tūrán', english: 'suddenly', pos: 'adv' },
  { character: '发现', pinyin: 'fāxiàn', english: 'to discover', pos: 'v' },
  { character: '告诉', pinyin: 'gàosu', english: 'to tell', pos: 'v' },
  { character: '觉得', pinyin: 'juéde', english: 'to feel, to think', pos: 'v' },
  { character: '开始', pinyin: 'kāishǐ', english: 'to begin', pos: 'v' },
  { character: '认为', pinyin: 'rènwéi', english: 'to think, to consider', pos: 'v' },
  { character: '帮', pinyin: 'bāng', english: 'to help', pos: 'v' },
  { character: '换', pinyin: 'huàn', english: 'to change, to swap', pos: 'v' },
  { character: '决定', pinyin: 'juédìng', english: 'to decide', pos: 'v' },
  { character: '结果', pinyin: 'jiéguǒ', english: 'result', pos: 'n' },
  { character: '原因', pinyin: 'yuányīn', english: 'reason', pos: 'n' },
  { character: '问题', pinyin: 'wèntí', english: 'question, problem', pos: 'n' },
  { character: '答案', pinyin: "dá'àn", english: 'answer', pos: 'n' },
  { character: '办法', pinyin: 'bànfǎ', english: 'method, way', pos: 'n' },
  { character: '钱包', pinyin: 'qiánbāo', english: 'wallet', pos: 'n' },
  { character: '药店', pinyin: 'yàodiàn', english: 'pharmacy', pos: 'n' },
];

const HSK3_WORDS: VocabWord[] = [
  { character: '关系', pinyin: 'guānxi', english: 'relationship', pos: 'n' },
  { character: '联系', pinyin: 'liánxì', english: 'to contact; contact', pos: 'v' },
  { character: '区别', pinyin: 'qūbié', english: 'difference', pos: 'n' },
  { character: '相同', pinyin: 'xiāngtóng', english: 'the same', pos: 'adj' },
  { character: '不同', pinyin: 'bùtóng', english: 'different', pos: 'adj' },
  { character: '简单', pinyin: 'jiǎndān', english: 'simple', pos: 'adj' },
  { character: '困难', pinyin: 'kùnnán', english: 'difficult; difficulty', pos: 'adj' },
  { character: '重要', pinyin: 'zhòngyào', english: 'important', pos: 'adj' },
  { character: '特别', pinyin: 'tèbié', english: 'special', pos: 'adj' },
  { character: '普通', pinyin: 'pǔtōng', english: 'ordinary', pos: 'adj' },
  { character: '正常', pinyin: 'zhèngcháng', english: 'normal', pos: 'adj' },
  { character: '奇怪', pinyin: 'qíguài', english: 'strange', pos: 'adj' },
  { character: '有趣', pinyin: 'yǒuqù', english: 'interesting', pos: 'adj' },
  { character: '无聊', pinyin: 'wúliáo', english: 'boring', pos: 'adj' },
  { character: '安全', pinyin: 'ānquán', english: 'safe; safety', pos: 'adj' },
  { character: '危险', pinyin: 'wēixiǎn', english: 'dangerous', pos: 'adj' },
  { character: '容易', pinyin: 'róngyì', english: 'easy', pos: 'adj' },
  { character: '美丽', pinyin: 'měilì', english: 'beautiful', pos: 'adj' },
  { character: '聪明', pinyin: 'cōngmíng', english: 'smart, clever', pos: 'adj' },
  { character: '勇敢', pinyin: 'yǒnggǎn', english: 'brave', pos: 'adj' },
];

const LEVELS: LevelMeta[] = [
  { level: 1, label: 'HSK 1', subtitle: 'Beginner', words: HSK1_WORDS },
  { level: 2, label: 'HSK 2', subtitle: 'Elementary', words: HSK2_WORDS },
  { level: 3, label: 'HSK 3', subtitle: 'Pre-Intermediate', words: HSK3_WORDS },
];

function getDeck(level: HskLevel): VocabWord[] {
  return LEVELS.find((l) => l.level === level)?.words ?? HSK1_WORDS;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                           */
/* ------------------------------------------------------------------ */

/** Fisher–Yates shuffle returning a new array. */
function shuffleArray<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Stable per-card key so assessment survives a shuffle within a level. */
function cardKey(level: HskLevel, word: VocabWord): string {
  return `${level}:${word.character}`;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function HSKFlashcards() {
  const [level, setLevel] = useState<HskLevel>(1);
  const [deck, setDeck] = useState<VocabWord[]>(() => getDeck(1));
  const [index, setIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<Record<string, Assessment>>({});

  const speakSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  const current = deck[index];

  const reviewedCount = useMemo(
    () => deck.filter((w) => assessment[cardKey(level, w)] !== undefined).length,
    [deck, assessment, level],
  );
  const knownCount = useMemo(
    () =>
      deck.filter((w) => assessment[cardKey(level, w)] === 'known').length,
    [deck, assessment, level],
  );
  const learningCount = reviewedCount - knownCount;
  const progressPct = deck.length
    ? Math.round((reviewedCount / deck.length) * 100)
    : 0;

  /* ---- actions ---- */

  const changeLevel = useCallback((lv: HskLevel) => {
    setLevel(lv);
    setDeck(getDeck(lv));
    setIndex(0);
    setFlipped(false);
    setAssessment({});
  }, []);

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  }, [deck.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i - 1 + deck.length) % deck.length);
  }, [deck.length]);

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const assess = useCallback(
    (result: Assessment) => {
      if (!current) return;
      setAssessment((prev) => ({
        ...prev,
        [cardKey(level, current)]: result,
      }));
      setFlipped(false);
      setIndex((i) => (i + 1) % deck.length);
    },
    [current, level, deck.length],
  );

  const handleShuffle = useCallback(() => {
    setDeck((d) => shuffleArray(d));
    setIndex(0);
    setFlipped(false);
  }, []);

  const handleReset = useCallback(() => {
    setDeck(getDeck(level));
    setIndex(0);
    setFlipped(false);
    setAssessment({});
  }, [level]);

  const handleSpeak = useCallback(() => {
    if (!speakSupported || !current) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(current.character);
    utter.lang = 'zh-CN';
    utter.rate = 0.85;
    utter.pitch = 1;
    synth.speak(utter);
  }, [speakSupported, current]);

  /* ---- keyboard shortcuts ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const interactive =
        tag === 'BUTTON' ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        tag === 'A';
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if ((e.key === ' ' || e.key === 'Enter') && !interactive) {
        e.preventDefault();
        flip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, flip]);

  /* ---- stop speech on unmount ---- */
  useEffect(() => {
    return () => {
      if (speakSupported) window.speechSynthesis.cancel();
    };
  }, [speakSupported]);

  if (!current) return null;

  const currentAssessment = assessment[cardKey(level, current)];
  const allReviewed = reviewedCount === deck.length;

  return (
    <div
      className="rounded-2xl border border-[#D4AF37]/40 p-5 sm:p-8"
      style={{
        background:
          'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      }}
    >
      <style>{`
        .hsk-card-inner { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
        .hsk-card-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .hsk-card-inner { transition: none !important; }
        }
      `}</style>

      {/* Header */}
      <span
        aria-hidden="true"
        className="block text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4"
      >
        词汇练习 · Interactive Flashcards
      </span>

      {/* Level selector */}
      <div className="mb-5">
        <span className="block text-xs font-medium text-[#F5F0E8]/60 mb-2">
          Select HSK level
        </span>
        <div role="group" aria-label="HSK level" className="flex flex-wrap gap-2">
          {LEVELS.map((l) => {
            const active = l.level === level;
            return (
              <button
                key={l.level}
                type="button"
                aria-pressed={active}
                onClick={() => changeLevel(l.level)}
                className={
                  'px-4 py-2 rounded-full border text-sm transition-colors ' +
                  (active
                    ? 'border-[#D4AF37] text-[#1a0808] font-semibold'
                    : 'border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10')
                }
                style={
                  active
                    ? {
                        background:
                          'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
                      }
                    : undefined
                }
              >
                <span className="font-bold">{l.label}</span>
                <span className="ml-2 opacity-70 text-xs">
                  {l.subtitle} · {l.words.length} cards
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-1.5">
          <span className="text-sm text-[#F5F0E8]/80">
            Progress:{' '}
            <span className="text-[#FFD700] font-semibold">
              {reviewedCount}
            </span>
            <span className="text-[#F5F0E8]/50"> / {deck.length} reviewed</span>
          </span>
          <span className="text-xs text-[#F5F0E8]/55">
            <span className="text-[#7CFC9B]">{knownCount} known</span>
            {' · '}
            <span className="text-[#FFB347]">{learningCount} learning</span>
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden bg-[#1a0808]/80 border border-[#D4AF37]/20"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Cards reviewed"
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background:
                'linear-gradient(90deg, #8B0000 0%, #C41E3A 50%, #D4AF37 100%)',
            }}
          />
        </div>
        {allReviewed && (
          <p className="mt-2 text-xs text-[#D4AF37]">
            You&apos;ve reviewed every card in this deck. Shuffle or switch
            levels to keep practicing.
          </p>
        )}
      </div>

      {/* Flashcard */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2 text-xs text-[#F5F0E8]/55">
          <span>
            Card{' '}
            <span className="text-[#FFD700] font-semibold">{index + 1}</span> of{' '}
            {deck.length}
          </span>
          <button
            type="button"
            onClick={handleSpeak}
            disabled={!speakSupported}
            title={
              speakSupported
                ? 'Hear the pronunciation'
                : 'Audio not supported in this browser'
            }
            className="px-3 py-1 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span aria-hidden="true">🔊</span> Listen
          </button>
        </div>

        {/* Flip card */}
        <div style={{ perspective: 1400 }} className="[perspective:1400px]">
          <button
            type="button"
            onClick={flip}
            aria-label={
              flipped ? 'Show Chinese character' : 'Show pinyin and meaning'
            }
            className="block w-full text-left"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <div
              className="hsk-card-inner relative h-72 sm:h-80 w-full transition-transform duration-500 cursor-pointer"
              style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
            >
              {/* Front: character */}
              <div
                className="hsk-card-face absolute inset-0 rounded-2xl border border-[#D4AF37]/40 flex flex-col items-center justify-center p-6 text-center"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 30%, rgba(139,0,0,0.55) 0%, rgba(26,8,8,0.95) 75%)',
                }}
              >
                <span
                  className="absolute top-3 left-4 text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]/70"
                  aria-hidden="true"
                >
                  字 Character
                </span>
                <span
                  className="absolute top-3 right-4 text-[11px] font-mono text-[#F5F0E8]/45"
                  aria-hidden="true"
                >
                  {POS_SHORT[current.pos]}
                </span>
                <span
                  className="font-serif text-[#F5F0E8] leading-none select-none"
                  style={{ fontSize: 'clamp(4rem, 18vw, 8rem)' }}
                >
                  {current.character}
                </span>
                <span
                  className="mt-5 text-xs text-[#F5F0E8]/45"
                  aria-hidden="true"
                >
                  Click card to flip
                </span>
                {currentAssessment && (
                  <span
                    className={
                      'absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-medium border ' +
                      (currentAssessment === 'known'
                        ? 'border-[#7CFC9B]/60 text-[#7CFC9B] bg-[#7CFC9B]/10'
                        : 'border-[#FFB347]/60 text-[#FFB347] bg-[#FFB347]/10')
                    }
                  >
                    {currentAssessment === 'known'
                      ? 'Marked: I know this'
                      : 'Marked: Still learning'}
                  </span>
                )}
              </div>

              {/* Back: pinyin + meaning */}
              <div
                className="hsk-card-face absolute inset-0 rounded-2xl border border-[#D4AF37]/40 flex flex-col items-center justify-center p-6 text-center"
                style={{
                  transform: 'rotateY(180deg)',
                  background:
                    'radial-gradient(ellipse at 50% 30%, rgba(139,0,0,0.35) 0%, rgba(26,8,8,0.95) 75%)',
                }}
              >
                <span
                  className="absolute top-3 left-4 text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]/70"
                  aria-hidden="true"
                >
                  义 Meaning
                </span>
                <span className="font-serif text-[#F5F0E8]/45 text-3xl mb-1">
                  {current.character}
                </span>
                <span
                  className="text-[#FFD700] font-serif tracking-wide"
                  style={{ fontSize: 'clamp(1.75rem, 6vw, 2.75rem)' }}
                >
                  {current.pinyin}
                </span>
                <span className="mt-3 text-base sm:text-lg text-[#F5F0E8]/90 max-w-xs">
                  {current.english}
                </span>
                <span className="mt-2 text-xs px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37]">
                  {POS_LABEL[current.pos]}
                </span>
                <span
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-[#F5F0E8]/45"
                  aria-hidden="true"
                >
                  Click card to flip back
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={goPrev}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-sm"
        >
          <span aria-hidden="true">←</span> Previous
        </button>
        <button
          type="button"
          onClick={handleShuffle}
          className="px-4 py-2 rounded-lg border border-[#D4AF37]/40 text-[#F5F0E8]/80 hover:bg-[#D4AF37]/10 transition-colors text-sm"
          title="Shuffle the deck (keeps your assessment)"
        >
          <span aria-hidden="true">🔀</span> Shuffle
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-lg border border-[#8B0000]/50 text-[#F5F0E8]/70 hover:bg-[#8B0000]/30 transition-colors text-sm"
          title="Reset this level's deck and progress"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={goNext}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-sm"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Self-assessment */}
      <div>
        <span className="block text-xs font-medium text-[#F5F0E8]/60 mb-2">
          How well do you know this word?
        </span>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => assess('learning')}
            className="px-4 py-2.5 rounded-lg font-semibold text-sm border border-[#FFB347]/60 text-[#FFB347] hover:bg-[#FFB347]/15 transition-colors"
          >
            Still learning
          </button>
          <button
            type="button"
            onClick={() => assess('known')}
            className="px-4 py-2.5 rounded-lg font-semibold text-sm text-[#1a0808]"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
            }}
          >
            I know this
          </button>
        </div>
        <p className="mt-2 text-[11px] text-[#F5F0E8]/40 leading-relaxed">
          Tip: use <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">←</kbd>{' '}
          <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">→</kbd>{' '}
          to navigate and{' '}
          <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">Space</kbd>{' '}
          to flip a card.
        </p>
      </div>
    </div>
  );
}
