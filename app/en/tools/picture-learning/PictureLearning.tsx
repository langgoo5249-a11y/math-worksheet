'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * PictureLearning — a fully client-side "Learn Chinese with Pictures" tool.
 *
 * Features:
 *  - Three difficulty levels: Easy (everyday nouns), Hard (actions & concepts),
 *    Hell (four-character idioms / chengyu).
 *  - Card shows a large emoji "picture"; the user guesses the Chinese word,
 *    then clicks to reveal characters + pinyin + English meaning.
 *  - For Hell level idioms, both the literal AND the metaphorical meaning
 *    are shown.
 *  - Navigation: Previous / Next / Random, plus Shuffle and Reset.
 *  - Per-level progress tracking (reviewed / known / didn't-know).
 *  - Audio pronunciation via window.speechSynthesis (lang = 'zh-CN').
 *  - Score tracking with "I knew it" / "Didn't know" buttons.
 *  - Chinese aesthetic: deep red (#8B0000), gold (#D4AF37), dark bg (#1a0808).
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface VocabItem {
  /** Emoji or emoji cluster used as the visual "picture". */
  emoji: string;
  /** Chinese characters (single char, word, or four-character idiom). */
  chinese: string;
  /** Pinyin with tone marks. */
  pinyin: string;
  /** English meaning (metaphorical meaning for idioms). */
  english: string;
  /** Category label, e.g. "Animals", "Actions". */
  category: string;
  /** Literal meaning — only set for Hell level idioms. */
  literal?: string;
}

type Difficulty = 'easy' | 'hard' | 'hell';

type Assessment = 'known' | 'unknown';

interface LevelMeta {
  difficulty: Difficulty;
  label: string;
  labelZh: string;
  subtitle: string;
  description: string;
  /** Tailwind gradient classes for the active selector button. */
  gradient: string;
  /** Accent hex used for borders / headings inside the level. */
  accent: string;
  items: VocabItem[];
}

/* ------------------------------------------------------------------ */
/* Vocabulary banks                                                   */
/* ------------------------------------------------------------------ */

const EASY_ITEMS: VocabItem[] = [
  // Animals
  { emoji: '🐱', chinese: '猫', pinyin: 'māo', english: 'cat', category: 'Animals' },
  { emoji: '🐶', chinese: '狗', pinyin: 'gǒu', english: 'dog', category: 'Animals' },
  { emoji: '🐰', chinese: '兔', pinyin: 'tù', english: 'rabbit', category: 'Animals' },
  { emoji: '🐭', chinese: '鼠', pinyin: 'shǔ', english: 'mouse', category: 'Animals' },
  { emoji: '🐯', chinese: '虎', pinyin: 'hǔ', english: 'tiger', category: 'Animals' },
  { emoji: '🐉', chinese: '龙', pinyin: 'lóng', english: 'dragon', category: 'Animals' },
  { emoji: '🐴', chinese: '马', pinyin: 'mǎ', english: 'horse', category: 'Animals' },
  { emoji: '🐑', chinese: '羊', pinyin: 'yáng', english: 'sheep', category: 'Animals' },
  { emoji: '🐵', chinese: '猴', pinyin: 'hóu', english: 'monkey', category: 'Animals' },
  { emoji: '🐔', chinese: '鸡', pinyin: 'jī', english: 'chicken', category: 'Animals' },
  { emoji: '🐍', chinese: '蛇', pinyin: 'shé', english: 'snake', category: 'Animals' },
  { emoji: '🐟', chinese: '鱼', pinyin: 'yú', english: 'fish', category: 'Animals' },
  { emoji: '🦅', chinese: '鹰', pinyin: 'yīng', english: 'eagle', category: 'Animals' },
  { emoji: '🦌', chinese: '鹿', pinyin: 'lù', english: 'deer', category: 'Animals' },
  { emoji: '🐘', chinese: '象', pinyin: 'xiàng', english: 'elephant', category: 'Animals' },
  // Food
  { emoji: '🍎', chinese: '苹果', pinyin: 'píngguǒ', english: 'apple', category: 'Food' },
  { emoji: '🍌', chinese: '香蕉', pinyin: 'xiāngjiāo', english: 'banana', category: 'Food' },
  { emoji: '🍇', chinese: '葡萄', pinyin: 'pútao', english: 'grape', category: 'Food' },
  { emoji: '🍉', chinese: '西瓜', pinyin: 'xīguā', english: 'watermelon', category: 'Food' },
  { emoji: '🍚', chinese: '米饭', pinyin: 'mǐfàn', english: 'rice', category: 'Food' },
  { emoji: '🍜', chinese: '面条', pinyin: 'miàntiáo', english: 'noodles', category: 'Food' },
  { emoji: '🥟', chinese: '饺子', pinyin: 'jiǎozi', english: 'dumplings', category: 'Food' },
  { emoji: '🍵', chinese: '茶', pinyin: 'chá', english: 'tea', category: 'Food' },
  { emoji: '☕', chinese: '咖啡', pinyin: 'kāfēi', english: 'coffee', category: 'Food' },
  { emoji: '🍞', chinese: '面包', pinyin: 'miànbāo', english: 'bread', category: 'Food' },
  // Nature
  { emoji: '☀️', chinese: '太阳', pinyin: 'tàiyáng', english: 'sun', category: 'Nature' },
  { emoji: '🌙', chinese: '月亮', pinyin: 'yuèliàng', english: 'moon', category: 'Nature' },
  { emoji: '⭐', chinese: '星星', pinyin: 'xīngxīng', english: 'star', category: 'Nature' },
  { emoji: '🌧️', chinese: '雨', pinyin: 'yǔ', english: 'rain', category: 'Nature' },
  { emoji: '❄️', chinese: '雪', pinyin: 'xuě', english: 'snow', category: 'Nature' },
  { emoji: '🌳', chinese: '树', pinyin: 'shù', english: 'tree', category: 'Nature' },
  { emoji: '🌹', chinese: '花', pinyin: 'huā', english: 'flower', category: 'Nature' },
  { emoji: '🔥', chinese: '火', pinyin: 'huǒ', english: 'fire', category: 'Nature' },
  { emoji: '💧', chinese: '水', pinyin: 'shuǐ', english: 'water', category: 'Nature' },
  { emoji: '🏔️', chinese: '山', pinyin: 'shān', english: 'mountain', category: 'Nature' },
  // Everyday objects
  { emoji: '🚗', chinese: '车', pinyin: 'chē', english: 'car', category: 'Objects' },
  { emoji: '⏰', chinese: '钟', pinyin: 'zhōng', english: 'clock', category: 'Objects' },
  { emoji: '✏️', chinese: '笔', pinyin: 'bǐ', english: 'pen', category: 'Objects' },
  { emoji: '📚', chinese: '书', pinyin: 'shū', english: 'book', category: 'Objects' },
  { emoji: '🚪', chinese: '门', pinyin: 'mén', english: 'door', category: 'Objects' },
];

const HARD_ITEMS: VocabItem[] = [
  // Actions
  { emoji: '🏃', chinese: '跑', pinyin: 'pǎo', english: 'to run', category: 'Actions' },
  { emoji: '🚶', chinese: '走', pinyin: 'zǒu', english: 'to walk', category: 'Actions' },
  { emoji: '🛌', chinese: '睡', pinyin: 'shuì', english: 'to sleep', category: 'Actions' },
  { emoji: '🍽️', chinese: '吃', pinyin: 'chī', english: 'to eat', category: 'Actions' },
  { emoji: '🥤', chinese: '喝', pinyin: 'hē', english: 'to drink', category: 'Actions' },
  { emoji: '📖', chinese: '读', pinyin: 'dú', english: 'to read', category: 'Actions' },
  { emoji: '✍️', chinese: '写', pinyin: 'xiě', english: 'to write', category: 'Actions' },
  { emoji: '🗣️', chinese: '说', pinyin: 'shuō', english: 'to speak', category: 'Actions' },
  { emoji: '👂', chinese: '听', pinyin: 'tīng', english: 'to listen', category: 'Actions' },
  { emoji: '👀', chinese: '看', pinyin: 'kàn', english: 'to see, to look', category: 'Actions' },
  { emoji: '🧠', chinese: '想', pinyin: 'xiǎng', english: 'to think', category: 'Actions' },
  { emoji: '🤣', chinese: '笑', pinyin: 'xiào', english: 'to laugh', category: 'Actions' },
  { emoji: '😢', chinese: '哭', pinyin: 'kū', english: 'to cry', category: 'Actions' },
  { emoji: '💪', chinese: '练', pinyin: 'liàn', english: 'to practice', category: 'Actions' },
  { emoji: '🎵', chinese: '唱', pinyin: 'chàng', english: 'to sing', category: 'Actions' },
  // Concepts
  { emoji: '❤️', chinese: '爱', pinyin: 'ài', english: 'love', category: 'Concepts' },
  { emoji: '😡', chinese: '怒', pinyin: 'nù', english: 'anger', category: 'Concepts' },
  { emoji: '😨', chinese: '怕', pinyin: 'pà', english: 'fear', category: 'Concepts' },
  { emoji: '🎉', chinese: '喜', pinyin: 'xǐ', english: 'joy', category: 'Concepts' },
  { emoji: '😴', chinese: '累', pinyin: 'lèi', english: 'tired', category: 'Concepts' },
  { emoji: '💡', chinese: '智', pinyin: 'zhì', english: 'wisdom', category: 'Concepts' },
  { emoji: '🕰️', chinese: '时', pinyin: 'shí', english: 'time', category: 'Concepts' },
  { emoji: '🌍', chinese: '界', pinyin: 'jiè', english: 'world, boundary', category: 'Concepts' },
  { emoji: '🏠', chinese: '家', pinyin: 'jiā', english: 'home, family', category: 'Concepts' },
  { emoji: '💰', chinese: '钱', pinyin: 'qián', english: 'money', category: 'Concepts' },
  { emoji: '🎓', chinese: '学', pinyin: 'xué', english: 'to study, learning', category: 'Concepts' },
  { emoji: '🏥', chinese: '医', pinyin: 'yī', english: 'medical, doctor', category: 'Concepts' },
  { emoji: '⚖️', chinese: '法', pinyin: 'fǎ', english: 'law, method', category: 'Concepts' },
  { emoji: '🔬', chinese: '科', pinyin: 'kē', english: 'science', category: 'Concepts' },
  { emoji: '🎨', chinese: '艺', pinyin: 'yì', english: 'art', category: 'Concepts' },
];

const HELL_ITEMS: VocabItem[] = [
  {
    emoji: '🐍🦶', chinese: '画蛇添足', pinyin: 'huà shé tiān zú',
    literal: 'Draw legs on a snake',
    english: 'Ruin something by adding unnecessary details', category: 'Idiom',
  },
  {
    emoji: '🌳🐰', chinese: '守株待兔', pinyin: 'shǒu zhū dài tù',
    literal: 'Wait by a stump for a hare',
    english: 'Rely on luck instead of real effort', category: 'Idiom',
  },
  {
    emoji: '🏹🐍', chinese: '杯弓蛇影', pinyin: 'bēi gōng shé yǐng',
    literal: 'See a snake in a cup\'s reflection',
    english: 'Be paranoid over imaginary fears', category: 'Idiom',
  },
  {
    emoji: '🐮🎸', chinese: '对牛弹琴', pinyin: 'duì niú tán qín',
    literal: 'Play the lute to a cow',
    english: 'Waste effort on the wrong audience', category: 'Idiom',
  },
  {
    emoji: '🦊🐯', chinese: '狐假虎威', pinyin: 'hú jiǎ hǔ wēi',
    literal: 'A fox borrows a tiger\'s menace',
    english: 'Bully others by borrowing someone else\'s power', category: 'Idiom',
  },
  {
    emoji: '🐸🕳️', chinese: '井底之蛙', pinyin: 'jǐng dǐ zhī wā',
    literal: 'A frog at the bottom of a well',
    english: 'Have a narrow-minded worldview', category: 'Idiom',
  },
  {
    emoji: '⛵🗡️', chinese: '刻舟求剑', pinyin: 'kè zhōu qiú jiàn',
    literal: 'Mark the boat to find the sword',
    english: 'Stubbornly cling to outdated methods', category: 'Idiom',
  },
  {
    emoji: '⛰️⛏️', chinese: '愚公移山', pinyin: 'yú gōng yí shān',
    literal: 'The foolish old man moves mountains',
    english: 'Achieve the impossible through perseverance', category: 'Idiom',
  },
  {
    emoji: '🍳⛵', chinese: '破釜沉舟', pinyin: 'pò fǔ chén zhōu',
    literal: 'Break the cauldrons and sink the boats',
    english: 'Burn one\'s bridges; commit with no retreat', category: 'Idiom',
  },
  {
    emoji: '😣', chinese: '卧薪尝胆', pinyin: 'wò xīn cháng dǎn',
    literal: 'Sleep on brushwood and taste gall',
    english: 'Endure hardship to prepare for a comeback', category: 'Idiom',
  },
  {
    emoji: '🪵', chinese: '入木三分', pinyin: 'rù mù sān fēn',
    literal: 'Enter the wood three-tenths of an inch',
    english: 'Show profound, piercing insight', category: 'Idiom',
  },
  {
    emoji: '🐉👁️', chinese: '画龙点睛', pinyin: 'huà lóng diǎn jīng',
    literal: 'Dot the eyes of the painted dragon',
    english: 'Add the finishing touch that brings it to life', category: 'Idiom',
  },
  {
    emoji: '🏹🦅', chinese: '一箭双雕', pinyin: 'yī jiàn shuāng diāo',
    literal: 'Two eagles with one arrow',
    english: 'Kill two birds with one stone', category: 'Idiom',
  },
  {
    emoji: '🎯', chinese: '百发百中', pinyin: 'bǎi fā bǎi zhòng',
    literal: 'A hundred shots, a hundred hits',
    english: 'Infallible; never miss', category: 'Idiom',
  },
  {
    emoji: '🛑', chinese: '半途而废', pinyin: 'bàn tú ér fèi',
    literal: 'Give up halfway',
    english: 'Quit before finishing', category: 'Idiom',
  },
  {
    emoji: '🛡️⚔️', chinese: '自相矛盾', pinyin: 'zì xiāng máo dùn',
    literal: 'Spear and shield against each other',
    english: 'Self-contradictory', category: 'Idiom',
  },
  {
    emoji: '👂🔔', chinese: '掩耳盗铃', pinyin: 'yǎn ěr dào líng',
    literal: 'Cover one\'s ears while stealing a bell',
    english: 'Self-deception', category: 'Idiom',
  },
  {
    emoji: '🐑🔧', chinese: '亡羊补牢', pinyin: 'wáng yáng bǔ láo',
    literal: 'Mend the pen after sheep are lost',
    english: 'Better late than never', category: 'Idiom',
  },
  {
    emoji: '🌱⬆️', chinese: '拔苗助长', pinyin: 'bá miáo zhù zhǎng',
    literal: 'Pull up seedlings to help them grow',
    english: 'Spoil things by rushing; haste makes waste', category: 'Idiom',
  },
  {
    emoji: '🐉😨', chinese: '叶公好龙', pinyin: 'yè gōng hào lóng',
    literal: 'Lord Ye\'s love of dragons',
    english: 'Professed love that is actually fake', category: 'Idiom',
  },
];

const LEVELS: Record<Difficulty, LevelMeta> = {
  easy: {
    difficulty: 'easy',
    label: 'Easy',
    labelZh: '简单',
    subtitle: 'Everyday Nouns',
    description: '40 simple everyday words — animals, food, nature and objects.',
    gradient: 'from-emerald-600 to-green-800',
    accent: '#34D399',
    items: EASY_ITEMS,
  },
  hard: {
    difficulty: 'hard',
    label: 'Hard',
    labelZh: '困难',
    subtitle: 'Actions & Concepts',
    description: '30 abstract verbs and ideas — actions, feelings and fields.',
    gradient: 'from-amber-600 to-orange-800',
    accent: '#FBBF24',
    items: HARD_ITEMS,
  },
  hell: {
    difficulty: 'hell',
    label: 'Hell',
    labelZh: '地狱',
    subtitle: 'Chengyu Idioms',
    description: '20 four-character idioms with literal and figurative meaning.',
    gradient: 'from-red-700 to-rose-950',
    accent: '#F87171',
    items: HELL_ITEMS,
  },
};

const LEVEL_ORDER: Difficulty[] = ['easy', 'hard', 'hell'];

function getDeck(d: Difficulty): VocabItem[] {
  return LEVELS[d].items;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
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

/** Stable per-card key so an assessment survives a shuffle within a level. */
function cardKey(d: Difficulty, item: VocabItem): string {
  return `${d}:${item.chinese}`;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function PictureLearning() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [deck, setDeck] = useState<VocabItem[]>(() => getDeck('easy'));
  const [index, setIndex] = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<Record<string, Assessment>>({});

  const speakSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  const current = deck[index];
  const meta = LEVELS[difficulty];

  const reviewedCount = useMemo(
    () => deck.filter((w) => assessment[cardKey(difficulty, w)] !== undefined).length,
    [deck, assessment, difficulty],
  );
  const knownCount = useMemo(
    () => deck.filter((w) => assessment[cardKey(difficulty, w)] === 'known').length,
    [deck, assessment, difficulty],
  );
  const unknownCount = reviewedCount - knownCount;
  const progressPct = deck.length
    ? Math.round((reviewedCount / deck.length) * 100)
    : 0;

  /* ---- actions ---- */

  const changeDifficulty = useCallback((d: Difficulty) => {
    setDifficulty(d);
    setDeck(getDeck(d));
    setIndex(0);
    setRevealed(false);
  }, []);

  const goNext = useCallback(() => {
    setRevealed(false);
    setIndex((i) => (i + 1) % deck.length);
  }, [deck.length]);

  const goPrev = useCallback(() => {
    setRevealed(false);
    setIndex((i) => (i - 1 + deck.length) % deck.length);
  }, [deck.length]);

  const goRandom = useCallback(() => {
    setRevealed(false);
    if (deck.length <= 1) return;
    let r = index;
    while (r === index) r = Math.floor(Math.random() * deck.length);
    setIndex(r);
  }, [deck.length, index]);

  const reveal = useCallback(() => setRevealed((v) => !v), []);

  const assess = useCallback(
    (result: Assessment) => {
      if (!current) return;
      setAssessment((prev) => ({
        ...prev,
        [cardKey(difficulty, current)]: result,
      }));
      setRevealed(false);
      setIndex((i) => (i + 1) % deck.length);
    },
    [current, difficulty, deck.length],
  );

  const handleShuffle = useCallback(() => {
    setDeck((d) => shuffleArray(d));
    setIndex(0);
    setRevealed(false);
  }, []);

  const handleReset = useCallback(() => {
    setDeck(getDeck(difficulty));
    setIndex(0);
    setRevealed(false);
    setAssessment({});
  }, [difficulty]);

  const handleSpeak = useCallback(() => {
    if (!speakSupported || !current) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(current.chinese);
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
        reveal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, reveal]);

  /* ---- stop speech on unmount ---- */
  useEffect(() => {
    return () => {
      if (speakSupported) window.speechSynthesis.cancel();
    };
  }, [speakSupported]);

  if (!current) return null;

  const currentAssessment = assessment[cardKey(difficulty, current)];
  const allReviewed = reviewedCount === deck.length;
  const isIdiom = difficulty === 'hell';

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
        .pl-reveal-enter { animation: plFadeUp 0.35s ease-out both; }
        @keyframes plFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pl-reveal-enter { animation: none !important; }
        }
      `}</style>

      {/* Header */}
      <span
        aria-hidden="true"
        className="block text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4"
      >
        看图识字 · Picture Vocabulary
      </span>

      {/* Difficulty selector */}
      <div className="mb-5">
        <span className="block text-xs font-medium text-[#F5F0E8]/60 mb-2">
          Choose difficulty
        </span>
        <div
          role="group"
          aria-label="Difficulty level"
          className="flex flex-wrap gap-2"
        >
          {LEVEL_ORDER.map((d) => {
            const lv = LEVELS[d];
            const active = d === difficulty;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={active}
                onClick={() => changeDifficulty(d)}
                className={
                  'px-4 py-2 rounded-full border text-sm transition-colors ' +
                  (active
                    ? 'border-transparent text-[#1a0808] font-semibold'
                    : 'border-[#D4AF37]/40 text-[#F5F0E8]/80 hover:bg-[#D4AF37]/10')
                }
                style={
                  active
                    ? { background: `linear-gradient(180deg, ${lv.accent} 0%, #D4AF37 120%)` }
                    : undefined
                }
              >
                <span className="font-bold">{lv.label}</span>
                <span className="ml-2 opacity-80 text-xs">
                  {lv.labelZh} · {lv.items.length} cards
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-[#F5F0E8]/55 leading-relaxed">
          {meta.description}
        </p>
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
            <span className="text-[#FFB347]">{unknownCount} learning</span>
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
              background: `linear-gradient(90deg, ${meta.accent} 0%, #C41E3A 60%, #D4AF37 100%)`,
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

      {/* Card */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2 text-xs text-[#F5F0E8]/55">
          <span>
            <span
              className="inline-block px-2 py-0.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] mr-2"
              style={{ borderColor: `${meta.accent}66`, color: meta.accent }}
            >
              {current.category}
            </span>
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

        {/* Picture card */}
        <button
          type="button"
          onClick={reveal}
          aria-label={
            revealed ? 'Hide the answer' : 'Reveal the Chinese word'
          }
          className="block w-full text-left rounded-2xl border border-[#D4AF37]/40 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, rgba(139,0,0,0.55) 0%, rgba(26,8,8,0.95) 75%)',
          }}
        >
          <div className="relative px-6 pt-8 pb-7 text-center min-h-[20rem] flex flex-col items-center justify-center">
            {/* category tag top-left */}
            <span
              className="absolute top-3 left-4 text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]/70"
              aria-hidden="true"
            >
              {isIdiom ? '成语 Idiom' : '图 Picture'}
            </span>

            {/* The emoji "picture" */}
            <span
              className="select-none leading-none"
              style={{
                fontSize: isIdiom
                  ? 'clamp(3.5rem, 14vw, 6rem)'
                  : 'clamp(4.5rem, 20vw, 8.5rem)',
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.5))',
              }}
              aria-hidden="true"
            >
              {current.emoji}
            </span>

            {/* Reveal / answer area */}
            {!revealed ? (
              <div className="mt-6">
                <p className="text-[#F5F0E8]/80 text-sm sm:text-base mb-2">
                  What is this in Chinese?
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37]">
                  <span aria-hidden="true">👆</span> Tap card to reveal
                </span>
              </div>
            ) : (
              <div className="pl-reveal-enter mt-5 w-full">
                <span
                  className="font-serif text-[#F5F0E8] leading-tight select-none block"
                  style={{ fontSize: isIdiom ? 'clamp(2rem, 9vw, 3.5rem)' : 'clamp(3rem, 12vw, 5rem)' }}
                >
                  {current.chinese}
                </span>
                <span
                  className="block mt-2 font-serif tracking-wide"
                  style={{ color: meta.accent, fontSize: 'clamp(1.1rem, 4vw, 1.6rem)' }}
                >
                  {current.pinyin}
                </span>

                {isIdiom && current.literal ? (
                  <div className="mt-4 max-w-md mx-auto space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70">
                      Literal meaning
                    </p>
                    <p className="text-sm text-[#F5F0E8]/85 italic">
                      &ldquo;{current.literal}&rdquo;
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70 pt-1">
                      Figurative meaning
                    </p>
                    <p className="text-base text-[#F5F0E8]">{current.english}</p>
                  </div>
                ) : (
                  <p className="mt-3 text-base sm:text-lg text-[#F5F0E8]/90">
                    {current.english}
                  </p>
                )}
              </div>
            )}

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
                  ? 'Marked: I knew it'
                  : "Marked: Didn't know"}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={goPrev}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-sm"
        >
          <span aria-hidden="true">←</span> Prev
        </button>
        <button
          type="button"
          onClick={goRandom}
          className="px-4 py-2 rounded-lg border border-[#D4AF37]/40 text-[#F5F0E8]/80 hover:bg-[#D4AF37]/10 transition-colors text-sm"
          title="Jump to a random card"
        >
          <span aria-hidden="true">🎲</span> Random
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

      {/* Self-assessment scoring */}
      <div>
        <span className="block text-xs font-medium text-[#F5F0E8]/60 mb-2">
          Did you know this word before revealing?
        </span>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => assess('unknown')}
            className="px-4 py-2.5 rounded-lg font-semibold text-sm border border-[#FFB347]/60 text-[#FFB347] hover:bg-[#FFB347]/15 transition-colors"
          >
            Didn&apos;t know
          </button>
          <button
            type="button"
            onClick={() => assess('known')}
            className="px-4 py-2.5 rounded-lg font-semibold text-sm text-[#1a0808]"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
            }}
          >
            I knew it
          </button>
        </div>
        <p className="mt-2 text-[11px] text-[#F5F0E8]/40 leading-relaxed">
          Tip: use{' '}
          <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">←</kbd>{' '}
          <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">→</kbd>{' '}
          to navigate and{' '}
          <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">Space</kbd>{' '}
          to reveal a card.
        </p>
      </div>
    </div>
  );
}
