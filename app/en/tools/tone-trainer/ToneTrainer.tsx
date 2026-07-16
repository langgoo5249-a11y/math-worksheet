'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * ToneTrainer — a fully client-side Mandarin tone training tool.
 *
 * Features:
 *  - A CSS/SVG pitch-contour diagram showing all four tones + neutral tone.
 *  - Interactive quiz: a character is shown; the user picks which tone it is.
 *  - 24 practice words with correct-tone answers and explanations.
 *  - Score tracking (correct / answered) with live accuracy.
 *  - Audio playback via window.speechSynthesis (lang = 'zh-CN').
 *  - "Next question" flow, answer reveal with full pinyin + meaning.
 *  - Shuffle + restart, plus keyboard support (1-4 / 0 keys, Enter for next).
 *  - Chinese aesthetic: deep red (#8B0000), gold (#D4AF37), dark bg (#1a0808).
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Tone = 1 | 2 | 3 | 4 | 0; // 0 = neutral

interface ToneQuestion {
  character: string;
  pinyin: string; // full pinyin WITH tone mark (or none for neutral)
  tone: Tone;
  meaning: string;
}

interface ToneInfo {
  num: Tone;
  name: string;
  nameZh: string;
  mark: string;
  contour: string;
  desc: string;
  color: string;
}

/* ------------------------------------------------------------------ */
/* Tone metadata                                                     */
/* ------------------------------------------------------------------ */

const TONE_INFO: Record<Tone, ToneInfo> = {
  1: {
    num: 1,
    name: 'First Tone',
    nameZh: '第一声',
    mark: 'ā',
    contour: 'High & flat',
    desc: 'A high, level pitch held steady — like a sustained musical note.',
    color: '#FFD700',
  },
  2: {
    num: 2,
    name: 'Second Tone',
    nameZh: '第二声',
    mark: 'á',
    contour: 'Rising',
    desc: 'Pitch rises from middle to high — like the questioning "huh?"',
    color: '#C41E3A',
  },
  3: {
    num: 3,
    name: 'Third Tone',
    nameZh: '第三声',
    mark: 'ǎ',
    contour: 'Falling then rising',
    desc: 'Pitch dips low then rises, forming a dip (∨).',
    color: '#E0644B',
  },
  4: {
    num: 4,
    name: 'Fourth Tone',
    nameZh: '第四声',
    mark: 'à',
    contour: 'Falling sharply',
    desc: 'A sharp fall from high to low — like a firm command.',
    color: '#D4AF37',
  },
  0: {
    num: 0,
    name: 'Neutral Tone',
    nameZh: '轻声',
    mark: 'a',
    contour: 'Light & short',
    desc: 'A short, unstressed syllable with no tone mark.',
    color: '#9FB4C7',
  },
};

const TONE_ORDER: Tone[] = [1, 2, 3, 4, 0];

/* ------------------------------------------------------------------ */
/* Pinyin tone-mark stripping                                        */
/* ------------------------------------------------------------------ */

const TONE_MARK_MAP: Record<string, string> = {
  ā: 'a', á: 'a', ǎ: 'a', à: 'a',
  ē: 'e', é: 'e', ě: 'e', è: 'e',
  ī: 'i', í: 'i', ǐ: 'i', ì: 'i',
  ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
  ū: 'u', ú: 'u', ǔ: 'u', ù: 'u',
  ǖ: 'ü', ǘ: 'ü', ǚ: 'ü', ǜ: 'ü',
};

/** Strip tone marks so we can show the base syllable without revealing the tone. */
function stripTones(py: string): string {
  let out = '';
  for (const ch of py) out += TONE_MARK_MAP[ch] ?? ch;
  return out;
}

/* ------------------------------------------------------------------ */
/* Practice words                                                    */
/* ------------------------------------------------------------------ */

const QUESTIONS: ToneQuestion[] = [
  { character: '妈', pinyin: 'mā', tone: 1, meaning: 'mother' },
  { character: '麻', pinyin: 'má', tone: 2, meaning: 'hemp' },
  { character: '马', pinyin: 'mǎ', tone: 3, meaning: 'horse' },
  { character: '骂', pinyin: 'mà', tone: 4, meaning: 'to scold' },
  { character: '吗', pinyin: 'ma', tone: 0, meaning: 'question particle' },
  { character: '他', pinyin: 'tā', tone: 1, meaning: 'he' },
  { character: '谁', pinyin: 'shuí', tone: 2, meaning: 'who' },
  { character: '好', pinyin: 'hǎo', tone: 3, meaning: 'good' },
  { character: '是', pinyin: 'shì', tone: 4, meaning: 'to be' },
  { character: '的', pinyin: 'de', tone: 0, meaning: 'possessive particle' },
  { character: '中', pinyin: 'zhōng', tone: 1, meaning: 'middle' },
  { character: '人', pinyin: 'rén', tone: 2, meaning: 'person' },
  { character: '我', pinyin: 'wǒ', tone: 3, meaning: 'I' },
  { character: '去', pinyin: 'qù', tone: 4, meaning: 'to go' },
  { character: '你', pinyin: 'nǐ', tone: 3, meaning: 'you' },
  { character: '天', pinyin: 'tiān', tone: 1, meaning: 'day' },
  { character: '来', pinyin: 'lái', tone: 2, meaning: 'to come' },
  { character: '大', pinyin: 'dà', tone: 4, meaning: 'big' },
  { character: '呢', pinyin: 'ne', tone: 0, meaning: 'particle' },
  { character: '吃', pinyin: 'chī', tone: 1, meaning: 'to eat' },
  { character: '学', pinyin: 'xué', tone: 2, meaning: 'to study' },
  { character: '买', pinyin: 'mǎi', tone: 3, meaning: 'to buy' },
  { character: '看', pinyin: 'kàn', tone: 4, meaning: 'to see' },
  { character: '了', pinyin: 'le', tone: 0, meaning: 'particle' },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                           */
/* ------------------------------------------------------------------ */

function shuffleArray<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildExplanation(q: ToneQuestion): string {
  const info = TONE_INFO[q.tone];
  return `${info.name} (${info.nameZh}) — ${info.desc} “${q.character}” (${q.pinyin}) means “${q.meaning}”.`;
}

/* ------------------------------------------------------------------ */
/* Pitch-contour diagram (CSS-styled SVG)                             */
/* ------------------------------------------------------------------ */

interface ToneDiagramProps {
  highlight?: Tone | null;
}

function ToneDiagram({ highlight }: ToneDiagramProps) {
  // Plot area: x 45..335, y 30..170 (High y=35, Mid y=100, Low y=165)
  const contours: { tone: Tone; d: string; dashed?: boolean }[] = [
    { tone: 1, d: 'M45,35 L335,35' },
    { tone: 2, d: 'M45,150 L335,45' },
    { tone: 3, d: 'M45,70 Q190,180 335,70' },
    { tone: 4, d: 'M45,50 L335,160' },
    { tone: 0, d: 'M150,150 L255,150', dashed: true },
  ];

  return (
    <div
      className="rounded-xl border border-[#D4AF37]/25 p-4 sm:p-5"
      style={{ background: 'rgba(26,8,8,0.6)' }}
    >
      <p className="text-center text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase mb-2">
        Pitch Contour Diagram
      </p>
      <svg
        viewBox="0 0 360 200"
        className="w-full h-auto"
        role="img"
        aria-label="Pitch contour diagram for the four Mandarin tones and the neutral tone"
      >
        {/* Gridlines */}
        <g stroke="#F5F0E8" strokeOpacity="0.12" strokeWidth="1">
          <line x1="45" y1="35" x2="335" y2="35" />
          <line x1="45" y1="100" x2="335" y2="100" />
          <line x1="45" y1="165" x2="335" y2="165" />
        </g>
        {/* Axes */}
        <line x1="45" y1="25" x2="45" y2="170" stroke="#F5F0E8" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="45" y1="170" x2="340" y2="170" stroke="#F5F0E8" strokeOpacity="0.35" strokeWidth="1.5" />
        {/* Y axis labels */}
        <text x="40" y="29" fill="#F5F0E8" fillOpacity="0.55" fontSize="9" textAnchor="end">High</text>
        <text x="40" y="104" fill="#F5F0E8" fillOpacity="0.55" fontSize="9" textAnchor="end">Mid</text>
        <text x="40" y="170" fill="#F5F0E8" fillOpacity="0.55" fontSize="9" textAnchor="end">Low</text>
        {/* X axis labels */}
        <text x="45" y="184" fill="#F5F0E8" fillOpacity="0.45" fontSize="9">start</text>
        <text x="335" y="184" fill="#F5F0E8" fillOpacity="0.45" fontSize="9" textAnchor="end">end</text>

        {/* Contours */}
        {contours.map(({ tone, d, dashed }) => {
          const info = TONE_INFO[tone];
          const active = highlight === tone;
          const dimmed = highlight !== undefined && highlight !== null && !active;
          return (
            <g key={tone} opacity={dimmed ? 0.25 : 1}>
              <path
                d={d}
                fill="none"
                stroke={info.color}
                strokeWidth={active ? 5 : 3}
                strokeLinecap="round"
                strokeDasharray={dashed ? '5 5' : undefined}
                style={{ transition: 'stroke-width 0.25s, opacity 0.25s' }}
              />
            </g>
          );
        })}

        {/* Tone number badges at line starts */}
        <g fontWeight="700" fontSize="11">
          <text x="30" y="39" fill={TONE_INFO[1].color}>1</text>
          <text x="30" y="54" fill={TONE_INFO[4].color}>4</text>
          <text x="30" y="74" fill={TONE_INFO[3].color}>3</text>
          <text x="30" y="154" fill={TONE_INFO[2].color}>2</text>
          <text x="263" y="146" fill={TONE_INFO[0].color} fontSize="10">0</text>
        </g>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3 text-[11px]">
        {TONE_ORDER.map((t) => {
          const info = TONE_INFO[t];
          return (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="inline-block w-4 h-0.5 rounded-full"
                style={{ background: info.color }}
              />
              <span style={{ color: info.color }}>
                {t === 0 ? 'Neutral' : `Tone ${t}`}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function ToneTrainer() {
  const [questions, setQuestions] = useState<ToneQuestion[]>(() =>
    shuffleArray(QUESTIONS),
  );
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<Tone | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const speakSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  const current = questions[index];
  const answered = selected !== null;
  const isCorrect = answered && selected === current.tone;
  const accuracy =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  /* ---- speech ---- */
  const speak = useCallback(
    (text: string) => {
      if (!speakSupported) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = 0.8;
      utter.pitch = 1;
      synth.speak(utter);
    },
    [speakSupported],
  );

  // Stop any ongoing speech when the component unmounts.
  useEffect(() => {
    return () => {
      if (speakSupported) window.speechSynthesis.cancel();
    };
  }, [speakSupported]);

  /* ---- answer ---- */
  const handleSelect = useCallback(
    (tone: Tone) => {
      if (answered || finished) return;
      setSelected(tone);
      setAnsweredCount((c) => c + 1);
      if (tone === current.tone) setCorrectCount((c) => c + 1);
      // Hear the correct pronunciation right after answering.
      speak(current.character);
    },
    [answered, finished, current, speak],
  );

  /* ---- next ---- */
  const handleNext = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [index, questions.length]);

  /* ---- restart ---- */
  const handleRestart = useCallback(() => {
    setQuestions(shuffleArray(QUESTIONS));
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setAnsweredCount(0);
    setFinished(false);
  }, []);

  /* ---- shuffle remaining (reshuffle the whole set, keep score) ---- */
  const handleShuffle = useCallback(() => {
    setQuestions((qs) => shuffleArray(qs));
    setIndex(0);
    setSelected(null);
  }, []);

  /* ---- keyboard: 1-4 / 0 to answer, Enter for next ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (finished) {
        if (e.key === 'Enter') handleRestart();
        return;
      }
      if (!answered) {
        let t: Tone | null = null;
        if (e.key === '1') t = 1;
        else if (e.key === '2') t = 2;
        else if (e.key === '3') t = 3;
        else if (e.key === '4') t = 4;
        else if (e.key === '0' || e.key === '`') t = 0;
        if (t !== null) {
          e.preventDefault();
          handleSelect(t);
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, finished, handleSelect, handleNext, handleRestart]);

  const highlight = answered ? current.tone : null;

  return (
    <div
      className="rounded-2xl border border-[#D4AF37]/40 p-5 sm:p-8"
      style={{
        background:
          'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      }}
    >
      <span
        aria-hidden="true"
        className="block text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4"
      >
        声调练习 · Interactive Tone Practice
      </span>

      {/* Diagram */}
      <div className="mb-5">
        <ToneDiagram highlight={highlight} />
      </div>

      {/* Score bar */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="text-sm text-[#F5F0E8]/80">
          Score:{' '}
          <span className="text-[#FFD700] font-semibold">{correctCount}</span>
          <span className="text-[#F5F0E8]/50"> / {answeredCount} answered</span>
        </div>
        <div className="text-xs text-[#F5F0E8]/60">
          Accuracy:{' '}
          <span
            className={
              accuracy >= 80
                ? 'text-[#7CFC9B] font-semibold'
                : accuracy >= 50
                  ? 'text-[#FFB347] font-semibold'
                  : answeredCount > 0
                    ? 'text-[#E0644B] font-semibold'
                    : 'text-[#F5F0E8]/50'
            }
          >
            {answeredCount > 0 ? `${accuracy}%` : '—'}
          </span>
          <span className="mx-2 text-[#F5F0E8]/30">·</span>
          Question{' '}
          <span className="text-[#FFD700] font-semibold">{Math.min(index + 1, questions.length)}</span>{' '}
          / {questions.length}
        </div>
      </div>

      {/* Question card or results */}
      {finished ? (
        <ResultsCard
          correct={correctCount}
          total={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        <>
          {/* Question */}
          <div
            className="mb-5 rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 text-center"
            style={{
              background:
                'radial-gradient(ellipse at 50% 25%, rgba(139,0,0,0.4) 0%, rgba(26,8,8,0.95) 75%)',
            }}
          >
            <span
              className="block text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]/70 mb-3"
              aria-hidden="true"
            >
              Which tone is this?
            </span>
            <span
              className="font-serif text-[#F5F0E8] leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 16vw, 7rem)' }}
            >
              {current.character}
            </span>
            <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
              <span className="text-[#F5F0E8]/55 text-sm">
                syllable:{' '}
                <span className="text-[#D4AF37] font-mono">
                  {stripTones(current.pinyin)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => speak(current.character)}
                disabled={!speakSupported}
                title={
                  speakSupported
                    ? 'Hear the pronunciation'
                    : 'Audio not supported in this browser'
                }
                className="px-3 py-1 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs"
              >
                <span aria-hidden="true">🔊</span> Listen
              </button>
            </div>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
            {TONE_ORDER.map((t) => {
              const info = TONE_INFO[t];
              const isAnswer = current.tone === t;
              const isSelected = selected === t;
              let cls =
                'border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10';
              if (answered) {
                if (isAnswer) {
                  cls =
                    'border-[#7CFC9B]/70 text-[#7CFC9B] bg-[#7CFC9B]/15';
                } else if (isSelected) {
                  cls = 'border-[#E0644B]/70 text-[#E0644B] bg-[#E0644B]/15';
                } else {
                  cls = 'border-[#D4AF37]/15 text-[#F5F0E8]/35';
                }
              }
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleSelect(t)}
                  disabled={answered}
                  aria-pressed={isSelected}
                  className={
                    'px-3 py-3 rounded-xl border text-sm transition-colors disabled:cursor-default ' +
                    cls
                  }
                >
                  <span className="block text-lg font-bold">
                    {t === 0 ? 'Neutral' : `Tone ${t}`}
                  </span>
                  <span className="block text-[10px] opacity-80 mt-0.5">
                    {info.mark} · {info.contour}
                  </span>
                  {answered && isAnswer && (
                    <span className="block text-[10px] mt-1 text-[#7CFC9B]">
                      ✓ correct
                    </span>
                  )}
                  {answered && isSelected && !isAnswer && (
                    <span className="block text-[10px] mt-1 text-[#E0644B]">
                      ✗ your pick
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Reveal / explanation */}
          {answered && (
            <div
              className="mb-4 rounded-xl border p-4"
              style={{
                borderColor: isCorrect ? 'rgba(124,252,155,0.4)' : 'rgba(224,100,75,0.4)',
                background: isCorrect
                  ? 'rgba(124,252,155,0.08)'
                  : 'rgba(224,100,75,0.08)',
              }}
            >
              <p
                className={
                  'font-semibold mb-1 ' +
                  (isCorrect ? 'text-[#7CFC9B]' : 'text-[#E0644B]')
                }
              >
                {isCorrect ? 'Correct!' : 'Not quite.'} The answer is{' '}
                {TONE_INFO[current.tone].name}{' '}
                <span className="text-[#D4AF37] font-mono">
                  ({current.pinyin})
                </span>{' '}
                — “{current.meaning}”.
              </p>
              <p className="text-sm text-[#F5F0E8]/75 leading-relaxed">
                {buildExplanation(current)}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleShuffle}
              className="px-4 py-2 rounded-lg border border-[#D4AF37]/40 text-[#F5F0E8]/80 hover:bg-[#D4AF37]/10 transition-colors text-sm"
              title="Shuffle the question order"
            >
              <span aria-hidden="true">🔀</span> Shuffle
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!answered}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-[#1a0808] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
              }}
            >
              {index < questions.length - 1 ? 'Next question' : 'See results'}{' '}
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="mt-2 text-[11px] text-[#F5F0E8]/40 leading-relaxed">
            Tip: press{' '}
            <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">1</kbd>–
            <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">4</kbd>{' '}
            or{' '}
            <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">0</kbd>{' '}
            (neutral) to answer, then{' '}
            <kbd className="px-1 rounded bg-[#1a0808] border border-[#D4AF37]/30 text-[#D4AF37]">Enter</kbd>{' '}
            for the next question.
          </p>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Results card                                                      */
/* ------------------------------------------------------------------ */

interface ResultsCardProps {
  correct: number;
  total: number;
  onRestart: () => void;
}

function ResultsCard({ correct, total, onRestart }: ResultsCardProps) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const message =
    pct >= 90
      ? 'Outstanding! Your tonal ear is sharp.'
      : pct >= 70
        ? 'Great work — keep sharpening those tones.'
        : pct >= 50
          ? 'Good start. Listen carefully and try again.'
          : 'Keep practicing — tones take time. Listen and repeat.';

  return (
    <div
      className="rounded-2xl border border-[#D4AF37]/40 p-8 text-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, rgba(139,0,0,0.45) 0%, rgba(26,8,8,0.95) 75%)',
      }}
    >
      <span
        className="block text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]/70 mb-2"
        aria-hidden="true"
      >
        Results
      </span>
      <p
        className="font-serif text-[#FFD700] leading-none mb-2"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)' }}
      >
        {correct}
        <span className="text-[#F5F0E8]/40 text-2xl"> / {total}</span>
      </p>
      <p className="text-[#F5F0E8]/80 mb-1">
        Accuracy:{' '}
        <span className="text-[#FFD700] font-semibold">{pct}%</span>
      </p>
      <p className="text-sm text-[#F5F0E8]/65 max-w-sm mx-auto mb-5">{message}</p>
      <button
        type="button"
        onClick={onRestart}
        className="px-6 py-2.5 rounded-full font-semibold text-sm text-[#1a0808]"
        style={{
          background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
        }}
      >
        Practice again
      </button>
    </div>
  );
}
