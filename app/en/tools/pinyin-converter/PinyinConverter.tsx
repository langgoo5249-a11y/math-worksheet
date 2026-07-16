'use client';

import { useMemo, useState } from 'react';

/**
 * PinyinConverter — a lightweight client-side tool that converts Chinese
 * text into pinyin with tone marks. It ships with a built-in dictionary of
 * 100+ of the most common Chinese characters so it works fully offline and
 * needs no external API.
 *
 * Note: the dictionary maps a single character to its most common pinyin
 * reading. Real Chinese is highly context-sensitive (polyphonic characters),
 * so for ambiguous characters we simply use the most frequent pronunciation.
 */

// A curated dictionary of 100+ high-frequency Chinese characters → pinyin
// (with tone marks). Covers greetings, pronouns, numbers, verbs, nouns and
// particles that appear in everyday beginner texts.
const PINYIN_DICT: Record<string, string> = {
  // Pronouns & people
  我: 'wǒ', 你: 'nǐ', 您: 'nín', 他: 'tā', 她: 'tā', 它: 'tā',
  们: 'men', 人: 'rén', 谁: 'shuí', 自: 'zì', 己: 'jǐ',
  // Greetings & particles
  好: 'hǎo', 吗: 'ma', 呢: 'ne', 啊: 'a', 的: 'de', 得: 'de', 地: 'de',
  // Verbs
  是: 'shì', 有: 'yǒu', 在: 'zài', 来: 'lái', 去: 'qù', 看: 'kàn',
  听: 'tīng', 说: 'shuō', 读: 'dú', 写: 'xiě', 学: 'xué', 做: 'zuò',
  吃: 'chī', 喝: 'hē', 买: 'mǎi', 卖: 'mài', 想: 'xiǎng', 会: 'huì',
  能: 'néng', 要: 'yào', 爱: 'ài', 知: 'zhī', 道: 'dào', 给: 'gěi',
  // Common adverbs / modifiers
  不: 'bù', 没: 'méi', 都: 'dōu', 也: 'yě', 很: 'hěn', 太: 'tài',
  真: 'zhēn', 更: 'gèng', 最: 'zuì', 还: 'hái', 就: 'jiù', 才: 'cái',
  可: 'kě', 以: 'yǐ', 再: 'zài', 又: 'yòu', 只: 'zhǐ', 已: 'yǐ',
  // Nouns — people & family
  家: 'jiā', 爸: 'bà', 妈: 'mā', 哥: 'gē', 弟: 'dì', 姐: 'jiě', 妹: 'mèi',
  儿: 'ér', 子: 'zǐ', 男: 'nán', 女: 'nǚ', 师: 'shī', 生: 'shēng',
  朋: 'péng', 友: 'yǒu', 老: 'lǎo', 先: 'xiān',
  // Nouns — places & objects
  中: 'zhōng', 国: 'guó', 文: 'wén', 字: 'zì', 词: 'cí', 句: 'jù',
  书: 'shū', 本: 'běn', 课: 'kè', 天: 'tiān', 年: 'nián', 月: 'yuè',
  日: 'rì', 时: 'shí', 分: 'fēn', 点: 'diǎn', 钱: 'qián', 车: 'chē',
  房: 'fáng', 门: 'mén', 水: 'shuǐ', 火: 'huǒ', 山: 'shān', 河: 'hé',
  花: 'huā', 草: 'cǎo', 树: 'shù', 马: 'mǎ', 牛: 'niú', 羊: 'yáng',
  鱼: 'yú', 鸟: 'niǎo', 狗: 'gǒu', 猫: 'māo', 心: 'xīn', 手: 'shǒu',
  口: 'kǒu', 目: 'mù', 头: 'tóu', 脸: 'liǎn', 脚: 'jiǎo',
  // Directions & positions
  上: 'shàng', 下: 'xià', 左: 'zuǒ', 右: 'yòu', 前: 'qián', 后: 'hòu',
  里: 'lǐ', 外: 'wài', 东: 'dōng', 西: 'xī', 南: 'nán', 北: 'běi',
  // Size & quantity
  大: 'dà', 小: 'xiǎo', 多: 'duō', 少: 'shǎo', 高: 'gāo', 低: 'dī',
  长: 'cháng', 短: 'duǎn', 个: 'gè', 些: 'xiē',
  // Demonstratives & question words
  这: 'zhè', 那: 'nà', 哪: 'nǎ', 什: 'shén', 么: 'me', 怎: 'zěn',
  样: 'yàng', 为: 'wèi',
  // Numbers
  一: 'yī', 二: 'èr', 三: 'sān', 四: 'sì', 五: 'wǔ', 六: 'liù',
  七: 'qī', 八: 'bā', 九: 'jiǔ', 十: 'shí', 百: 'bǎi', 千: 'qiān',
  万: 'wàn', 零: 'líng', 两: 'liǎng',
  // Time & misc
  今: 'jīn', 明: 'míng', 昨: 'zuó', 早: 'zǎo', 晚: 'wǎn', 白: 'bái',
  黑: 'hēi', 红: 'hóng', 黄: 'huáng', 蓝: 'lán', 绿: 'lǜ',
  风: 'fēng', 雨: 'yǔ', 雪: 'xuě', 云: 'yún', 阳: 'yáng',
  // Common verbs continued
  打: 'dǎ', 叫: 'jiào', 问: 'wèn', 答: 'dá', 唱: 'chàng', 跳: 'tiào',
  跑: 'pǎo', 走: 'zǒu', 坐: 'zuò', 立: 'lì', 住: 'zhù', 睡: 'shuì',
  // Language & learning
  汉: 'hàn', 语: 'yǔ', 英: 'yīng', 法: 'fǎ', 话: 'huà', 音: 'yīn',
  声: 'shēng', 调: 'diào', 笔: 'bǐ', 画: 'huà', 部: 'bù', 首: 'shǒu',
};

const SAMPLE_TEXTS: { label: string; text: string }[] = [
  { label: 'Greeting', text: '你好，我是中国人。' },
  { label: 'Numbers', text: '一二三四五六七八九十' },
  { label: 'Sentence', text: '我今天学习中文，很高兴认识你。' },
  { label: 'Question', text: '你是哪国人？你叫什么名字？' },
];

// A reverse lookup set (token is pinyin) used by the spacing logic below.
const PINYIN_DICT_REV = new Set(Object.values(PINYIN_DICT));

/**
 * Convert a string of Chinese (and other) characters into pinyin.
 * Each recognised Han character is replaced by its pinyin (with tone
 * marks); unrecognised characters (punctuation, Latin letters, spaces,
 * unknown characters) are kept verbatim. Pinyin syllables are separated
 * by spaces.
 */
function convertToPinyin(input: string): string {
  if (!input) return '';
  // Each recognised Han character becomes its pinyin; everything else
  // (punctuation, Latin letters, spaces, unknown characters) is kept as-is.
  const tokens: string[] = [];
  for (const ch of input) {
    tokens.push(PINYIN_DICT[ch] ?? ch);
  }
  // Pad every pinyin syllable with spaces so adjacent syllables don't run
  // together, then collapse the resulting whitespace and trim the ends.
  return tokens
    .map((t) => (PINYIN_DICT_REV.has(t) ? ` ${t} ` : t))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function PinyinConverter() {
  const [input, setInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const output = useMemo(() => convertToPinyin(input), [input]);

  const charCount = useMemo(() => {
    let count = 0;
    for (const ch of input) {
      if (PINYIN_DICT[ch]) count += 1;
    }
    return count;
  }, [input]);

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers / non-secure contexts.
      const textarea = document.createElement('textarea');
      textarea.value = output;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* ignore */
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <div
      className="rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8"
      style={{
        background:
          'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      }}
    >
      {/* Corner ornaments */}
      <span aria-hidden="true" className="block text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
        拼音转换 · Live Tool
      </span>

      <label
        htmlFor="pinyin-input"
        className="block text-sm font-medium text-[#F5F0E8]/80 mb-2"
      >
        Paste or type Chinese text below
      </label>
      <textarea
        id="pinyin-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="例如：你好，世界"
        rows={4}
        className="w-full rounded-xl bg-[#1a0808]/80 border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 px-4 py-3 text-lg text-[#F5F0E8] placeholder-[#F5F0E8]/30 transition resize-y font-serif"
        dir="ltr"
      />

      {/* Sample chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-[#F5F0E8]/50 self-center mr-1">Try:</span>
        {SAMPLE_TEXTS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setInput(s.text)}
            className="px-2.5 py-1 text-xs rounded-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-colors"
          >
            {s.label}
          </button>
        ))}
        {input && (
          <button
            type="button"
            onClick={() => setInput('')}
            className="px-2.5 py-1 text-xs rounded-full border border-[#8B0000]/50 text-[#F5F0E8]/70 hover:bg-[#8B0000]/30 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Output */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="pinyin-output"
            className="block text-sm font-medium text-[#F5F0E8]/80"
          >
            Pinyin with tone marks
          </label>
          {charCount > 0 && (
            <span className="text-xs text-[#F5F0E8]/50">
              {charCount} character{charCount === 1 ? '' : 's'} converted
            </span>
          )}
        </div>
        <div
          id="pinyin-output"
          className="relative w-full min-h-[6rem] rounded-xl bg-[#1a0808]/80 border border-[#D4AF37]/30 px-4 py-3"
        >
          {output ? (
            <p className="text-lg text-[#FFD700] leading-relaxed font-serif break-words">
              {output}
            </p>
          ) : (
            <p className="text-[#F5F0E8]/30 italic">
              Your pinyin output will appear here…
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium text-[#1a0808] disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
              boxShadow: '0 4px 14px rgba(212,175,55,0.35)',
            }}
          >
            <span aria-hidden="true">📋</span>
            {copied ? 'Copied!' : 'Copy pinyin'}
          </button>
          <p className="text-xs text-[#F5F0E8]/50 max-w-md">
            Tip: the converter uses a built-in dictionary of 100+ common
            characters. Unrecognised characters and punctuation pass through
            unchanged.
          </p>
        </div>
      </div>
    </div>
  );
}
