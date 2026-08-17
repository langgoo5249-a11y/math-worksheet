'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Tone = 1 | 2 | 3 | 4 | 0;

interface InitialGroup {
  name: string;
  nameZh: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface PinyinSyllable {
  initial: string;
  final: string;
  /** Pinyin spelling with tone 1 mark. */
  pinyin: string;
  group: string;
}

/* ------------------------------------------------------------------ */
/* Initial groups & color coding                                      */
/* ------------------------------------------------------------------ */

const INITIAL_GROUPS: Record<string, InitialGroup> = {
  bilabial: {
    name: 'Bilabial',
    nameZh: '双唇音',
    description: 'Both lips together (b, p, m)',
    color: '#4A90D9',
    bgColor: 'rgba(74,144,217,0.15)',
    borderColor: 'rgba(74,144,217,0.5)',
  },
  labiodental: {
    name: 'Labiodental',
    nameZh: '唇齿音',
    description: 'Lower lip + upper teeth (f)',
    color: '#5BA0CF',
    bgColor: 'rgba(91,160,207,0.15)',
    borderColor: 'rgba(91,160,207,0.5)',
  },
  alveolar: {
    name: 'Alveolar',
    nameZh: '舌尖中音',
    description: 'Tongue tip on alveolar ridge (d, t, n, l)',
    color: '#5CB85C',
    bgColor: 'rgba(92,184,92,0.15)',
    borderColor: 'rgba(92,184,92,0.5)',
  },
  velar: {
    name: 'Velar',
    nameZh: '舌根音',
    description: 'Back of tongue on soft palate (g, k, h)',
    color: '#F0AD4E',
    bgColor: 'rgba(240,173,78,0.15)',
    borderColor: 'rgba(240,173,78,0.5)',
  },
  palatal: {
    name: 'Palatal',
    nameZh: '舌面音',
    description: 'Tongue body on hard palate (j, q, x)',
    color: '#9B59B6',
    bgColor: 'rgba(155,89,182,0.15)',
    borderColor: 'rgba(155,89,182,0.5)',
  },
  retroflex: {
    name: 'Retroflex',
    nameZh: '翘舌音',
    description: 'Tongue tip curled back (zh, ch, sh, r)',
    color: '#D9534F',
    bgColor: 'rgba(217,83,79,0.15)',
    borderColor: 'rgba(217,83,79,0.5)',
  },
  dentalSibilant: {
    name: 'Dental Sibilant',
    nameZh: '平舌音',
    description: 'Tongue tip behind teeth (z, c, s)',
    color: '#C9A243',
    bgColor: 'rgba(201,162,67,0.15)',
    borderColor: 'rgba(201,162,67,0.5)',
  },
  approximant: {
    name: 'Approximant',
    nameZh: '半元音',
    description: 'Glide sounds (y, w)',
    color: '#20B2AA',
    bgColor: 'rgba(32,178,170,0.15)',
    borderColor: 'rgba(32,178,170,0.5)',
  },
};

const INITIAL_GROUP_MAP: Record<string, string> = {
  b: 'bilabial', p: 'bilabial', m: 'bilabial',
  f: 'labiodental',
  d: 'alveolar', t: 'alveolar', n: 'alveolar', l: 'alveolar',
  g: 'velar', k: 'velar', h: 'velar',
  j: 'palatal', q: 'palatal', x: 'palatal',
  zh: 'retroflex', ch: 'retroflex', sh: 'retroflex', r: 'retroflex',
  z: 'dentalSibilant', c: 'dentalSibilant', s: 'dentalSibilant',
  y: 'approximant', w: 'approximant',
};

/* ------------------------------------------------------------------ */
/* Pinyin tone conversion helpers                                     */
/* ------------------------------------------------------------------ */

const TONE_MAP: Record<string, Record<Tone, string>> = {
  a: { 1: 'ā', 2: 'á', 3: 'ǎ', 4: 'à', 0: 'a' },
  o: { 1: 'ō', 2: 'ó', 3: 'ǒ', 4: 'ò', 0: 'o' },
  e: { 1: 'ē', 2: 'é', 3: 'ě', 4: 'è', 0: 'e' },
  i: { 1: 'ī', 2: 'í', 3: 'ǐ', 4: 'ì', 0: 'i' },
  u: { 1: 'ū', 2: 'ú', 3: 'ǔ', 4: 'ù', 0: 'u' },
  ü: { 1: 'ǖ', 2: 'ǘ', 3: 'ǚ', 4: 'ǜ', 0: 'ü' },
};

function changeTone(pinyin: string, tone: Tone): string {
  // Find the vowel with tone mark and replace it
  const toneMarkVowels = 'āōēīūǖáóéíúǘǎǒěǐǔǚàòèìùǜ';
  let result = pinyin;
  for (const ch of pinyin) {
    if (toneMarkVowels.includes(ch)) {
      // Find the base vowel
      const base = Object.keys(TONE_MAP).find(
        (k) => TONE_MAP[k][1] === ch || TONE_MAP[k][2] === ch ||
               TONE_MAP[k][3] === ch || TONE_MAP[k][4] === ch
      );
      if (base) {
        result = result.replace(ch, TONE_MAP[base][tone]);
      }
      break;
    }
  }
  return result;
}

/* ------------------------------------------------------------------ */
/* Valid pinyin combinations (23 initials × 24 finals)                */
/* ------------------------------------------------------------------ */

const VALID_SYLLABLES: PinyinSyllable[] = [
  // b
  { initial: 'b', final: 'a', pinyin: 'bā', group: 'bilabial' },
  { initial: 'b', final: 'o', pinyin: 'bō', group: 'bilabial' },
  { initial: 'b', final: 'i', pinyin: 'bī', group: 'bilabial' },
  { initial: 'b', final: 'u', pinyin: 'bū', group: 'bilabial' },
  { initial: 'b', final: 'ai', pinyin: 'bāi', group: 'bilabial' },
  { initial: 'b', final: 'ei', pinyin: 'bēi', group: 'bilabial' },
  { initial: 'b', final: 'ao', pinyin: 'bāo', group: 'bilabial' },
  { initial: 'b', final: 'ie', pinyin: 'biē', group: 'bilabial' },
  { initial: 'b', final: 'an', pinyin: 'bān', group: 'bilabial' },
  { initial: 'b', final: 'en', pinyin: 'bēn', group: 'bilabial' },
  { initial: 'b', final: 'in', pinyin: 'bīn', group: 'bilabial' },
  { initial: 'b', final: 'ang', pinyin: 'bāng', group: 'bilabial' },
  { initial: 'b', final: 'eng', pinyin: 'bēng', group: 'bilabial' },
  { initial: 'b', final: 'ing', pinyin: 'bīng', group: 'bilabial' },
  // p
  { initial: 'p', final: 'a', pinyin: 'pā', group: 'bilabial' },
  { initial: 'p', final: 'o', pinyin: 'pō', group: 'bilabial' },
  { initial: 'p', final: 'i', pinyin: 'pī', group: 'bilabial' },
  { initial: 'p', final: 'u', pinyin: 'pū', group: 'bilabial' },
  { initial: 'p', final: 'ai', pinyin: 'pāi', group: 'bilabial' },
  { initial: 'p', final: 'ei', pinyin: 'pēi', group: 'bilabial' },
  { initial: 'p', final: 'ao', pinyin: 'pāo', group: 'bilabial' },
  { initial: 'p', final: 'ou', pinyin: 'pōu', group: 'bilabial' },
  { initial: 'p', final: 'ie', pinyin: 'piē', group: 'bilabial' },
  { initial: 'p', final: 'an', pinyin: 'pān', group: 'bilabial' },
  { initial: 'p', final: 'en', pinyin: 'pēn', group: 'bilabial' },
  { initial: 'p', final: 'in', pinyin: 'pīn', group: 'bilabial' },
  { initial: 'p', final: 'ang', pinyin: 'pāng', group: 'bilabial' },
  { initial: 'p', final: 'eng', pinyin: 'pēng', group: 'bilabial' },
  { initial: 'p', final: 'ing', pinyin: 'pīng', group: 'bilabial' },
  // m
  { initial: 'm', final: 'a', pinyin: 'mā', group: 'bilabial' },
  { initial: 'm', final: 'o', pinyin: 'mō', group: 'bilabial' },
  { initial: 'm', final: 'e', pinyin: 'mē', group: 'bilabial' },
  { initial: 'm', final: 'i', pinyin: 'mī', group: 'bilabial' },
  { initial: 'm', final: 'u', pinyin: 'mū', group: 'bilabial' },
  { initial: 'm', final: 'ai', pinyin: 'māi', group: 'bilabial' },
  { initial: 'm', final: 'ei', pinyin: 'mēi', group: 'bilabial' },
  { initial: 'm', final: 'ao', pinyin: 'māo', group: 'bilabial' },
  { initial: 'm', final: 'ou', pinyin: 'mōu', group: 'bilabial' },
  { initial: 'm', final: 'iu', pinyin: 'miū', group: 'bilabial' },
  { initial: 'm', final: 'ie', pinyin: 'miē', group: 'bilabial' },
  { initial: 'm', final: 'an', pinyin: 'mān', group: 'bilabial' },
  { initial: 'm', final: 'en', pinyin: 'mēn', group: 'bilabial' },
  { initial: 'm', final: 'in', pinyin: 'mīn', group: 'bilabial' },
  { initial: 'm', final: 'ang', pinyin: 'māng', group: 'bilabial' },
  { initial: 'm', final: 'eng', pinyin: 'mēng', group: 'bilabial' },
  { initial: 'm', final: 'ing', pinyin: 'mīng', group: 'bilabial' },
  // f
  { initial: 'f', final: 'a', pinyin: 'fā', group: 'labiodental' },
  { initial: 'f', final: 'o', pinyin: 'fō', group: 'labiodental' },
  { initial: 'f', final: 'u', pinyin: 'fū', group: 'labiodental' },
  { initial: 'f', final: 'ei', pinyin: 'fēi', group: 'labiodental' },
  { initial: 'f', final: 'ou', pinyin: 'fōu', group: 'labiodental' },
  { initial: 'f', final: 'an', pinyin: 'fān', group: 'labiodental' },
  { initial: 'f', final: 'en', pinyin: 'fēn', group: 'labiodental' },
  { initial: 'f', final: 'ang', pinyin: 'fāng', group: 'labiodental' },
  { initial: 'f', final: 'eng', pinyin: 'fēng', group: 'labiodental' },
  // d
  { initial: 'd', final: 'a', pinyin: 'dā', group: 'alveolar' },
  { initial: 'd', final: 'e', pinyin: 'dē', group: 'alveolar' },
  { initial: 'd', final: 'i', pinyin: 'dī', group: 'alveolar' },
  { initial: 'd', final: 'u', pinyin: 'dū', group: 'alveolar' },
  { initial: 'd', final: 'ai', pinyin: 'dāi', group: 'alveolar' },
  { initial: 'd', final: 'ei', pinyin: 'dēi', group: 'alveolar' },
  { initial: 'd', final: 'ao', pinyin: 'dāo', group: 'alveolar' },
  { initial: 'd', final: 'ou', pinyin: 'dōu', group: 'alveolar' },
  { initial: 'd', final: 'iu', pinyin: 'diū', group: 'alveolar' },
  { initial: 'd', final: 'ie', pinyin: 'diē', group: 'alveolar' },
  { initial: 'd', final: 'an', pinyin: 'dān', group: 'alveolar' },
  { initial: 'd', final: 'en', pinyin: 'dēn', group: 'alveolar' },
  { initial: 'd', final: 'in', pinyin: 'dīn', group: 'alveolar' },
  { initial: 'd', final: 'ang', pinyin: 'dāng', group: 'alveolar' },
  { initial: 'd', final: 'eng', pinyin: 'dēng', group: 'alveolar' },
  { initial: 'd', final: 'ing', pinyin: 'dīng', group: 'alveolar' },
  { initial: 'd', final: 'ui', pinyin: 'duī', group: 'alveolar' },
  { initial: 'd', final: 'un', pinyin: 'dūn', group: 'alveolar' },
  { initial: 'd', final: 'ong', pinyin: 'dōng', group: 'alveolar' },
  // t
  { initial: 't', final: 'a', pinyin: 'tā', group: 'alveolar' },
  { initial: 't', final: 'e', pinyin: 'tē', group: 'alveolar' },
  { initial: 't', final: 'i', pinyin: 'tī', group: 'alveolar' },
  { initial: 't', final: 'u', pinyin: 'tū', group: 'alveolar' },
  { initial: 't', final: 'ai', pinyin: 'tāi', group: 'alveolar' },
  { initial: 't', final: 'ao', pinyin: 'tāo', group: 'alveolar' },
  { initial: 't', final: 'ou', pinyin: 'tōu', group: 'alveolar' },
  { initial: 't', final: 'ie', pinyin: 'tiē', group: 'alveolar' },
  { initial: 't', final: 'an', pinyin: 'tān', group: 'alveolar' },
  { initial: 't', final: 'ang', pinyin: 'tāng', group: 'alveolar' },
  { initial: 't', final: 'eng', pinyin: 'tēng', group: 'alveolar' },
  { initial: 't', final: 'ing', pinyin: 'tīng', group: 'alveolar' },
  { initial: 't', final: 'ui', pinyin: 'tuī', group: 'alveolar' },
  { initial: 't', final: 'un', pinyin: 'tūn', group: 'alveolar' },
  { initial: 't', final: 'ong', pinyin: 'tōng', group: 'alveolar' },
  // n
  { initial: 'n', final: 'a', pinyin: 'nā', group: 'alveolar' },
  { initial: 'n', final: 'e', pinyin: 'nē', group: 'alveolar' },
  { initial: 'n', final: 'i', pinyin: 'nī', group: 'alveolar' },
  { initial: 'n', final: 'u', pinyin: 'nū', group: 'alveolar' },
  { initial: 'n', final: 'ü', pinyin: 'nǖ', group: 'alveolar' },
  { initial: 'n', final: 'ai', pinyin: 'nāi', group: 'alveolar' },
  { initial: 'n', final: 'ei', pinyin: 'nēi', group: 'alveolar' },
  { initial: 'n', final: 'ao', pinyin: 'nāo', group: 'alveolar' },
  { initial: 'n', final: 'ou', pinyin: 'nōu', group: 'alveolar' },
  { initial: 'n', final: 'iu', pinyin: 'niū', group: 'alveolar' },
  { initial: 'n', final: 'ie', pinyin: 'niē', group: 'alveolar' },
  { initial: 'n', final: 'üe', pinyin: 'nüē', group: 'alveolar' },
  { initial: 'n', final: 'an', pinyin: 'nān', group: 'alveolar' },
  { initial: 'n', final: 'en', pinyin: 'nēn', group: 'alveolar' },
  { initial: 'n', final: 'in', pinyin: 'nīn', group: 'alveolar' },
  { initial: 'n', final: 'un', pinyin: 'nūn', group: 'alveolar' },
  { initial: 'n', final: 'ang', pinyin: 'nāng', group: 'alveolar' },
  { initial: 'n', final: 'eng', pinyin: 'nēng', group: 'alveolar' },
  { initial: 'n', final: 'ing', pinyin: 'nīng', group: 'alveolar' },
  { initial: 'n', final: 'ong', pinyin: 'nōng', group: 'alveolar' },
  // l
  { initial: 'l', final: 'a', pinyin: 'lā', group: 'alveolar' },
  { initial: 'l', final: 'e', pinyin: 'lē', group: 'alveolar' },
  { initial: 'l', final: 'i', pinyin: 'lī', group: 'alveolar' },
  { initial: 'l', final: 'u', pinyin: 'lū', group: 'alveolar' },
  { initial: 'l', final: 'ü', pinyin: 'lǖ', group: 'alveolar' },
  { initial: 'l', final: 'ai', pinyin: 'lāi', group: 'alveolar' },
  { initial: 'l', final: 'ei', pinyin: 'lēi', group: 'alveolar' },
  { initial: 'l', final: 'ao', pinyin: 'lāo', group: 'alveolar' },
  { initial: 'l', final: 'ou', pinyin: 'lōu', group: 'alveolar' },
  { initial: 'l', final: 'iu', pinyin: 'liū', group: 'alveolar' },
  { initial: 'l', final: 'ie', pinyin: 'liē', group: 'alveolar' },
  { initial: 'l', final: 'üe', pinyin: 'lüē', group: 'alveolar' },
  { initial: 'l', final: 'an', pinyin: 'lān', group: 'alveolar' },
  { initial: 'l', final: 'en', pinyin: 'lēn', group: 'alveolar' },
  { initial: 'l', final: 'in', pinyin: 'līn', group: 'alveolar' },
  { initial: 'l', final: 'un', pinyin: 'lūn', group: 'alveolar' },
  { initial: 'l', final: 'ang', pinyin: 'lāng', group: 'alveolar' },
  { initial: 'l', final: 'eng', pinyin: 'lēng', group: 'alveolar' },
  { initial: 'l', final: 'ing', pinyin: 'līng', group: 'alveolar' },
  { initial: 'l', final: 'ong', pinyin: 'lōng', group: 'alveolar' },
  // g
  { initial: 'g', final: 'a', pinyin: 'gā', group: 'velar' },
  { initial: 'g', final: 'e', pinyin: 'gē', group: 'velar' },
  { initial: 'g', final: 'u', pinyin: 'gū', group: 'velar' },
  { initial: 'g', final: 'ai', pinyin: 'gāi', group: 'velar' },
  { initial: 'g', final: 'ei', pinyin: 'gēi', group: 'velar' },
  { initial: 'g', final: 'ao', pinyin: 'gāo', group: 'velar' },
  { initial: 'g', final: 'ou', pinyin: 'gōu', group: 'velar' },
  { initial: 'g', final: 'an', pinyin: 'gān', group: 'velar' },
  { initial: 'g', final: 'en', pinyin: 'gēn', group: 'velar' },
  { initial: 'g', final: 'ang', pinyin: 'gāng', group: 'velar' },
  { initial: 'g', final: 'eng', pinyin: 'gēng', group: 'velar' },
  { initial: 'g', final: 'ui', pinyin: 'guī', group: 'velar' },
  { initial: 'g', final: 'un', pinyin: 'gūn', group: 'velar' },
  { initial: 'g', final: 'ong', pinyin: 'gōng', group: 'velar' },
  // k
  { initial: 'k', final: 'a', pinyin: 'kā', group: 'velar' },
  { initial: 'k', final: 'e', pinyin: 'kē', group: 'velar' },
  { initial: 'k', final: 'u', pinyin: 'kū', group: 'velar' },
  { initial: 'k', final: 'ai', pinyin: 'kāi', group: 'velar' },
  { initial: 'k', final: 'ei', pinyin: 'kēi', group: 'velar' },
  { initial: 'k', final: 'ao', pinyin: 'kāo', group: 'velar' },
  { initial: 'k', final: 'ou', pinyin: 'kōu', group: 'velar' },
  { initial: 'k', final: 'an', pinyin: 'kān', group: 'velar' },
  { initial: 'k', final: 'en', pinyin: 'kēn', group: 'velar' },
  { initial: 'k', final: 'ang', pinyin: 'kāng', group: 'velar' },
  { initial: 'k', final: 'eng', pinyin: 'kēng', group: 'velar' },
  { initial: 'k', final: 'ui', pinyin: 'kuī', group: 'velar' },
  { initial: 'k', final: 'un', pinyin: 'kūn', group: 'velar' },
  { initial: 'k', final: 'ong', pinyin: 'kōng', group: 'velar' },
  // h
  { initial: 'h', final: 'a', pinyin: 'hā', group: 'velar' },
  { initial: 'h', final: 'e', pinyin: 'hē', group: 'velar' },
  { initial: 'h', final: 'u', pinyin: 'hū', group: 'velar' },
  { initial: 'h', final: 'ai', pinyin: 'hāi', group: 'velar' },
  { initial: 'h', final: 'ei', pinyin: 'hēi', group: 'velar' },
  { initial: 'h', final: 'ao', pinyin: 'hāo', group: 'velar' },
  { initial: 'h', final: 'ou', pinyin: 'hōu', group: 'velar' },
  { initial: 'h', final: 'an', pinyin: 'hān', group: 'velar' },
  { initial: 'h', final: 'en', pinyin: 'hēn', group: 'velar' },
  { initial: 'h', final: 'ang', pinyin: 'hāng', group: 'velar' },
  { initial: 'h', final: 'eng', pinyin: 'hēng', group: 'velar' },
  { initial: 'h', final: 'ui', pinyin: 'huī', group: 'velar' },
  { initial: 'h', final: 'un', pinyin: 'hūn', group: 'velar' },
  { initial: 'h', final: 'ong', pinyin: 'hōng', group: 'velar' },
  // j
  { initial: 'j', final: 'i', pinyin: 'jī', group: 'palatal' },
  { initial: 'j', final: 'ü', pinyin: 'jǖ', group: 'palatal' },
  { initial: 'j', final: 'ie', pinyin: 'jiē', group: 'palatal' },
  { initial: 'j', final: 'üe', pinyin: 'juē', group: 'palatal' },
  { initial: 'j', final: 'iu', pinyin: 'jiū', group: 'palatal' },
  { initial: 'j', final: 'in', pinyin: 'jīn', group: 'palatal' },
  { initial: 'j', final: 'ün', pinyin: 'jūn', group: 'palatal' },
  { initial: 'j', final: 'an', pinyin: 'jiān', group: 'palatal' },
  { initial: 'j', final: 'ang', pinyin: 'jiāng', group: 'palatal' },
  { initial: 'j', final: 'ing', pinyin: 'jīng', group: 'palatal' },
  { initial: 'j', final: 'ong', pinyin: 'jiōng', group: 'palatal' },
  { initial: 'j', final: 'ao', pinyin: 'jiāo', group: 'palatal' },
  // q
  { initial: 'q', final: 'i', pinyin: 'qī', group: 'palatal' },
  { initial: 'q', final: 'ü', pinyin: 'qǖ', group: 'palatal' },
  { initial: 'q', final: 'ie', pinyin: 'qiē', group: 'palatal' },
  { initial: 'q', final: 'üe', pinyin: 'quē', group: 'palatal' },
  { initial: 'q', final: 'iu', pinyin: 'qiū', group: 'palatal' },
  { initial: 'q', final: 'in', pinyin: 'qīn', group: 'palatal' },
  { initial: 'q', final: 'ün', pinyin: 'qūn', group: 'palatal' },
  { initial: 'q', final: 'an', pinyin: 'qiān', group: 'palatal' },
  { initial: 'q', final: 'ang', pinyin: 'qiāng', group: 'palatal' },
  { initial: 'q', final: 'ing', pinyin: 'qīng', group: 'palatal' },
  { initial: 'q', final: 'ong', pinyin: 'qiōng', group: 'palatal' },
  { initial: 'q', final: 'ao', pinyin: 'qiāo', group: 'palatal' },
  // x
  { initial: 'x', final: 'i', pinyin: 'xī', group: 'palatal' },
  { initial: 'x', final: 'ü', pinyin: 'xǖ', group: 'palatal' },
  { initial: 'x', final: 'ie', pinyin: 'xiē', group: 'palatal' },
  { initial: 'x', final: 'üe', pinyin: 'xuē', group: 'palatal' },
  { initial: 'x', final: 'iu', pinyin: 'xiū', group: 'palatal' },
  { initial: 'x', final: 'in', pinyin: 'xīn', group: 'palatal' },
  { initial: 'x', final: 'ün', pinyin: 'xūn', group: 'palatal' },
  { initial: 'x', final: 'an', pinyin: 'xiān', group: 'palatal' },
  { initial: 'x', final: 'ang', pinyin: 'xiāng', group: 'palatal' },
  { initial: 'x', final: 'ing', pinyin: 'xīng', group: 'palatal' },
  { initial: 'x', final: 'ong', pinyin: 'xiōng', group: 'palatal' },
  { initial: 'x', final: 'ao', pinyin: 'xiāo', group: 'palatal' },
  // zh
  { initial: 'zh', final: 'a', pinyin: 'zhā', group: 'retroflex' },
  { initial: 'zh', final: 'e', pinyin: 'zhē', group: 'retroflex' },
  { initial: 'zh', final: 'i', pinyin: 'zhī', group: 'retroflex' },
  { initial: 'zh', final: 'u', pinyin: 'zhū', group: 'retroflex' },
  { initial: 'zh', final: 'ai', pinyin: 'zhāi', group: 'retroflex' },
  { initial: 'zh', final: 'ei', pinyin: 'zhēi', group: 'retroflex' },
  { initial: 'zh', final: 'ao', pinyin: 'zhāo', group: 'retroflex' },
  { initial: 'zh', final: 'ou', pinyin: 'zhōu', group: 'retroflex' },
  { initial: 'zh', final: 'an', pinyin: 'zhān', group: 'retroflex' },
  { initial: 'zh', final: 'en', pinyin: 'zhēn', group: 'retroflex' },
  { initial: 'zh', final: 'ang', pinyin: 'zhāng', group: 'retroflex' },
  { initial: 'zh', final: 'eng', pinyin: 'zhēng', group: 'retroflex' },
  { initial: 'zh', final: 'ui', pinyin: 'zhuī', group: 'retroflex' },
  { initial: 'zh', final: 'un', pinyin: 'zhūn', group: 'retroflex' },
  { initial: 'zh', final: 'ong', pinyin: 'zhōng', group: 'retroflex' },
  // ch
  { initial: 'ch', final: 'a', pinyin: 'chā', group: 'retroflex' },
  { initial: 'ch', final: 'e', pinyin: 'chē', group: 'retroflex' },
  { initial: 'ch', final: 'i', pinyin: 'chī', group: 'retroflex' },
  { initial: 'ch', final: 'u', pinyin: 'chū', group: 'retroflex' },
  { initial: 'ch', final: 'ai', pinyin: 'chāi', group: 'retroflex' },
  { initial: 'ch', final: 'ao', pinyin: 'chāo', group: 'retroflex' },
  { initial: 'ch', final: 'ou', pinyin: 'chōu', group: 'retroflex' },
  { initial: 'ch', final: 'an', pinyin: 'chān', group: 'retroflex' },
  { initial: 'ch', final: 'en', pinyin: 'chēn', group: 'retroflex' },
  { initial: 'ch', final: 'ang', pinyin: 'chāng', group: 'retroflex' },
  { initial: 'ch', final: 'eng', pinyin: 'chēng', group: 'retroflex' },
  { initial: 'ch', final: 'ui', pinyin: 'chuī', group: 'retroflex' },
  { initial: 'ch', final: 'un', pinyin: 'chūn', group: 'retroflex' },
  { initial: 'ch', final: 'ong', pinyin: 'chōng', group: 'retroflex' },
  // sh
  { initial: 'sh', final: 'a', pinyin: 'shā', group: 'retroflex' },
  { initial: 'sh', final: 'e', pinyin: 'shē', group: 'retroflex' },
  { initial: 'sh', final: 'i', pinyin: 'shī', group: 'retroflex' },
  { initial: 'sh', final: 'u', pinyin: 'shū', group: 'retroflex' },
  { initial: 'sh', final: 'ai', pinyin: 'shāi', group: 'retroflex' },
  { initial: 'sh', final: 'ei', pinyin: 'shēi', group: 'retroflex' },
  { initial: 'sh', final: 'ao', pinyin: 'shāo', group: 'retroflex' },
  { initial: 'sh', final: 'ou', pinyin: 'shōu', group: 'retroflex' },
  { initial: 'sh', final: 'an', pinyin: 'shān', group: 'retroflex' },
  { initial: 'sh', final: 'en', pinyin: 'shēn', group: 'retroflex' },
  { initial: 'sh', final: 'ang', pinyin: 'shāng', group: 'retroflex' },
  { initial: 'sh', final: 'eng', pinyin: 'shēng', group: 'retroflex' },
  { initial: 'sh', final: 'ui', pinyin: 'shuī', group: 'retroflex' },
  { initial: 'sh', final: 'un', pinyin: 'shūn', group: 'retroflex' },
  // r
  { initial: 'r', final: 'e', pinyin: 'rē', group: 'retroflex' },
  { initial: 'r', final: 'i', pinyin: 'rī', group: 'retroflex' },
  { initial: 'r', final: 'u', pinyin: 'rū', group: 'retroflex' },
  { initial: 'r', final: 'ao', pinyin: 'rāo', group: 'retroflex' },
  { initial: 'r', final: 'ou', pinyin: 'rōu', group: 'retroflex' },
  { initial: 'r', final: 'an', pinyin: 'rān', group: 'retroflex' },
  { initial: 'r', final: 'en', pinyin: 'rēn', group: 'retroflex' },
  { initial: 'r', final: 'ang', pinyin: 'rāng', group: 'retroflex' },
  { initial: 'r', final: 'eng', pinyin: 'rēng', group: 'retroflex' },
  { initial: 'r', final: 'ui', pinyin: 'ruī', group: 'retroflex' },
  { initial: 'r', final: 'un', pinyin: 'rūn', group: 'retroflex' },
  { initial: 'r', final: 'ong', pinyin: 'rōng', group: 'retroflex' },
  // z
  { initial: 'z', final: 'a', pinyin: 'zā', group: 'dentalSibilant' },
  { initial: 'z', final: 'e', pinyin: 'zē', group: 'dentalSibilant' },
  { initial: 'z', final: 'i', pinyin: 'zī', group: 'dentalSibilant' },
  { initial: 'z', final: 'u', pinyin: 'zū', group: 'dentalSibilant' },
  { initial: 'z', final: 'ai', pinyin: 'zāi', group: 'dentalSibilant' },
  { initial: 'z', final: 'ei', pinyin: 'zēi', group: 'dentalSibilant' },
  { initial: 'z', final: 'ao', pinyin: 'zāo', group: 'dentalSibilant' },
  { initial: 'z', final: 'ou', pinyin: 'zōu', group: 'dentalSibilant' },
  { initial: 'z', final: 'an', pinyin: 'zān', group: 'dentalSibilant' },
  { initial: 'z', final: 'en', pinyin: 'zēn', group: 'dentalSibilant' },
  { initial: 'z', final: 'ang', pinyin: 'zāng', group: 'dentalSibilant' },
  { initial: 'z', final: 'eng', pinyin: 'zēng', group: 'dentalSibilant' },
  { initial: 'z', final: 'ui', pinyin: 'zuī', group: 'dentalSibilant' },
  { initial: 'z', final: 'un', pinyin: 'zūn', group: 'dentalSibilant' },
  { initial: 'z', final: 'ong', pinyin: 'zōng', group: 'dentalSibilant' },
  // c
  { initial: 'c', final: 'a', pinyin: 'cā', group: 'dentalSibilant' },
  { initial: 'c', final: 'e', pinyin: 'cē', group: 'dentalSibilant' },
  { initial: 'c', final: 'i', pinyin: 'cī', group: 'dentalSibilant' },
  { initial: 'c', final: 'u', pinyin: 'cū', group: 'dentalSibilant' },
  { initial: 'c', final: 'ai', pinyin: 'cāi', group: 'dentalSibilant' },
  { initial: 'c', final: 'ao', pinyin: 'cāo', group: 'dentalSibilant' },
  { initial: 'c', final: 'ou', pinyin: 'cōu', group: 'dentalSibilant' },
  { initial: 'c', final: 'an', pinyin: 'cān', group: 'dentalSibilant' },
  { initial: 'c', final: 'en', pinyin: 'cēn', group: 'dentalSibilant' },
  { initial: 'c', final: 'ang', pinyin: 'cāng', group: 'dentalSibilant' },
  { initial: 'c', final: 'eng', pinyin: 'cēng', group: 'dentalSibilant' },
  { initial: 'c', final: 'ui', pinyin: 'cuī', group: 'dentalSibilant' },
  { initial: 'c', final: 'un', pinyin: 'cūn', group: 'dentalSibilant' },
  { initial: 'c', final: 'ong', pinyin: 'cōng', group: 'dentalSibilant' },
  // s
  { initial: 's', final: 'a', pinyin: 'sā', group: 'dentalSibilant' },
  { initial: 's', final: 'e', pinyin: 'sē', group: 'dentalSibilant' },
  { initial: 's', final: 'i', pinyin: 'sī', group: 'dentalSibilant' },
  { initial: 's', final: 'u', pinyin: 'sū', group: 'dentalSibilant' },
  { initial: 's', final: 'ai', pinyin: 'sāi', group: 'dentalSibilant' },
  { initial: 's', final: 'ao', pinyin: 'sāo', group: 'dentalSibilant' },
  { initial: 's', final: 'ou', pinyin: 'sōu', group: 'dentalSibilant' },
  { initial: 's', final: 'an', pinyin: 'sān', group: 'dentalSibilant' },
  { initial: 's', final: 'en', pinyin: 'sēn', group: 'dentalSibilant' },
  { initial: 's', final: 'ang', pinyin: 'sāng', group: 'dentalSibilant' },
  { initial: 's', final: 'eng', pinyin: 'sēng', group: 'dentalSibilant' },
  { initial: 's', final: 'ui', pinyin: 'suī', group: 'dentalSibilant' },
  { initial: 's', final: 'un', pinyin: 'sūn', group: 'dentalSibilant' },
  { initial: 's', final: 'ong', pinyin: 'sōng', group: 'dentalSibilant' },
  // y
  { initial: 'y', final: 'a', pinyin: 'yā', group: 'approximant' },
  { initial: 'y', final: 'o', pinyin: 'yō', group: 'approximant' },
  { initial: 'y', final: 'e', pinyin: 'yē', group: 'approximant' },
  { initial: 'y', final: 'i', pinyin: 'yī', group: 'approximant' },
  { initial: 'y', final: 'u', pinyin: 'yū', group: 'approximant' },
  { initial: 'y', final: 'ü', pinyin: 'yǖ', group: 'approximant' },
  { initial: 'y', final: 'ai', pinyin: 'yāi', group: 'approximant' },
  { initial: 'y', final: 'ao', pinyin: 'yāo', group: 'approximant' },
  { initial: 'y', final: 'ou', pinyin: 'yōu', group: 'approximant' },
  { initial: 'y', final: 'ie', pinyin: 'yē', group: 'approximant' },
  { initial: 'y', final: 'üe', pinyin: 'yuē', group: 'approximant' },
  { initial: 'y', final: 'an', pinyin: 'yān', group: 'approximant' },
  { initial: 'y', final: 'en', pinyin: 'yēn', group: 'approximant' },
  { initial: 'y', final: 'in', pinyin: 'yīn', group: 'approximant' },
  { initial: 'y', final: 'un', pinyin: 'yūn', group: 'approximant' },
  { initial: 'y', final: 'ang', pinyin: 'yāng', group: 'approximant' },
  { initial: 'y', final: 'eng', pinyin: 'yēng', group: 'approximant' },
  { initial: 'y', final: 'ing', pinyin: 'yīng', group: 'approximant' },
  { initial: 'y', final: 'ong', pinyin: 'yōng', group: 'approximant' },
  // w
  { initial: 'w', final: 'a', pinyin: 'wā', group: 'approximant' },
  { initial: 'w', final: 'o', pinyin: 'wō', group: 'approximant' },
  { initial: 'w', final: 'u', pinyin: 'wū', group: 'approximant' },
  { initial: 'w', final: 'ai', pinyin: 'wāi', group: 'approximant' },
  { initial: 'w', final: 'ei', pinyin: 'wēi', group: 'approximant' },
  { initial: 'w', final: 'an', pinyin: 'wān', group: 'approximant' },
  { initial: 'w', final: 'en', pinyin: 'wēn', group: 'approximant' },
  { initial: 'w', final: 'ang', pinyin: 'wāng', group: 'approximant' },
  { initial: 'w', final: 'eng', pinyin: 'wēng', group: 'approximant' },
  { initial: 'w', final: 'ong', pinyin: 'wōng', group: 'approximant' },
  // standalone finals (no initial)
  { initial: '', final: 'a', pinyin: 'ā', group: 'approximant' },
  { initial: '', final: 'o', pinyin: 'ō', group: 'approximant' },
  { initial: '', final: 'e', pinyin: 'ē', group: 'approximant' },
  { initial: '', final: 'i', pinyin: 'yī', group: 'approximant' },
  { initial: '', final: 'u', pinyin: 'wū', group: 'approximant' },
  { initial: '', final: 'ü', pinyin: 'yǖ', group: 'approximant' },
  { initial: '', final: 'ai', pinyin: 'āi', group: 'approximant' },
  { initial: '', final: 'ei', pinyin: 'ēi', group: 'approximant' },
  { initial: '', final: 'ao', pinyin: 'āo', group: 'approximant' },
  { initial: '', final: 'ou', pinyin: 'ōu', group: 'approximant' },
  { initial: '', final: 'er', pinyin: 'ēr', group: 'approximant' },
  { initial: '', final: 'an', pinyin: 'ān', group: 'approximant' },
  { initial: '', final: 'en', pinyin: 'ēn', group: 'approximant' },
  { initial: '', final: 'ang', pinyin: 'āng', group: 'approximant' },
  { initial: '', final: 'eng', pinyin: 'ēng', group: 'approximant' },
];

/* ------------------------------------------------------------------ */
/* Finals list (columns)                                              */
/* ------------------------------------------------------------------ */

const FINALS = [
  { id: 'a', label: 'a', category: 'Simple' },
  { id: 'o', label: 'o', category: 'Simple' },
  { id: 'e', label: 'e', category: 'Simple' },
  { id: 'i', label: 'i', category: 'Simple' },
  { id: 'u', label: 'u', category: 'Simple' },
  { id: 'ü', label: 'ü', category: 'Simple' },
  { id: 'ai', label: 'ai', category: 'Compound' },
  { id: 'ei', label: 'ei', category: 'Compound' },
  { id: 'ui', label: 'ui', category: 'Compound' },
  { id: 'ao', label: 'ao', category: 'Compound' },
  { id: 'ou', label: 'ou', category: 'Compound' },
  { id: 'iu', label: 'iu', category: 'Compound' },
  { id: 'ie', label: 'ie', category: 'Compound' },
  { id: 'üe', label: 'üe', category: 'Compound' },
  { id: 'er', label: 'er', category: 'Compound' },
  { id: 'an', label: 'an', category: 'Nasal' },
  { id: 'en', label: 'en', category: 'Nasal' },
  { id: 'in', label: 'in', category: 'Nasal' },
  { id: 'un', label: 'un', category: 'Nasal' },
  { id: 'ün', label: 'ün', category: 'Nasal' },
  { id: 'ang', label: 'ang', category: 'Nasal' },
  { id: 'eng', label: 'eng', category: 'Nasal' },
  { id: 'ing', label: 'ing', category: 'Nasal' },
  { id: 'ong', label: 'ong', category: 'Nasal' },
];

/* ------------------------------------------------------------------ */
/* Initials list (rows)                                               */
/* ------------------------------------------------------------------ */

const INITIALS = [
  { id: '', label: '∅', group: 'approximant', tooltip: 'No initial (zero initial)' },
  { id: 'b', label: 'b', group: 'bilabial' },
  { id: 'p', label: 'p', group: 'bilabial' },
  { id: 'm', label: 'm', group: 'bilabial' },
  { id: 'f', label: 'f', group: 'labiodental' },
  { id: 'd', label: 'd', group: 'alveolar' },
  { id: 't', label: 't', group: 'alveolar' },
  { id: 'n', label: 'n', group: 'alveolar' },
  { id: 'l', label: 'l', group: 'alveolar' },
  { id: 'g', label: 'g', group: 'velar' },
  { id: 'k', label: 'k', group: 'velar' },
  { id: 'h', label: 'h', group: 'velar' },
  { id: 'j', label: 'j', group: 'palatal' },
  { id: 'q', label: 'q', group: 'palatal' },
  { id: 'x', label: 'x', group: 'palatal' },
  { id: 'zh', label: 'zh', group: 'retroflex' },
  { id: 'ch', label: 'ch', group: 'retroflex' },
  { id: 'sh', label: 'sh', group: 'retroflex' },
  { id: 'r', label: 'r', group: 'retroflex' },
  { id: 'z', label: 'z', group: 'dentalSibilant' },
  { id: 'c', label: 'c', group: 'dentalSibilant' },
  { id: 's', label: 's', group: 'dentalSibilant' },
  { id: 'y', label: 'y', group: 'approximant' },
  { id: 'w', label: 'w', group: 'approximant' },
];

/* ------------------------------------------------------------------ */
/* Tone selector data                                                 */
/* ------------------------------------------------------------------ */

const TONES: { id: Tone; label: string; nameZh: string; mark: string; desc: string }[] = [
  { id: 1, label: '1st', nameZh: '第一声', mark: 'ā', desc: 'High & flat' },
  { id: 2, label: '2nd', nameZh: '第二声', mark: 'á', desc: 'Rising' },
  { id: 3, label: '3rd', nameZh: '第三声', mark: 'ǎ', desc: 'Dip' },
  { id: 4, label: '4th', nameZh: '第四声', mark: 'à', desc: 'Falling' },
  { id: 0, label: 'Light', nameZh: '轻声', mark: 'a', desc: 'Neutral' },
];

/* ------------------------------------------------------------------ */
/* Pronunciation rules                                                 */
/* ------------------------------------------------------------------ */

const PRONUNCIATION_RULES = [
  {
    title: 'Tone Sandhi (3-3 Rule)',
    rule: 'When two third tones appear together, the first becomes a second tone.',
    example: 'nǐ hǎo → ní hǎo',
    desc: 'Two consecutive third-tone syllables are pronounced as second tone + third tone. This is the most important tone-change rule in Mandarin.',
  },
  {
    title: 'The "i" After zh/ch/sh/r',
    rule: 'The "i" in zhi, chi, shi, ri is NOT the same as the "i" in bi, pi, mi.',
    desc: 'After retroflex initials, "i" represents a syllabic continuant — a buzzy, sustained sound rather than the vowel "ee". Your tongue stays curled back.',
    example: 'zhī (知) — the "i" is a buzzing continuation of the "zh"',
  },
  {
    title: 'The "i" After z/c/s',
    rule: 'The "i" in zi, ci, si is a syllabic sibilant — a buzzing "z" sound.',
    desc: 'After dental sibilants, "i" is pronounced as a sustained buzzing sound. Think of the "zz" in "buzz" held longer.',
    example: 'zì (字) — the "i" is a buzzing continuation of the "z"',
  },
  {
    title: 'ü After j/q/x/y',
    rule: 'When ü follows j, q, x, or y, the umlaut is dropped in spelling but the pronunciation stays the same.',
    desc: 'Ju, qu, xu, yu are spelled without the dots but still pronounced with the ü sound (like the French "u" or German "ü").',
    example: 'jū (居) — pronounced like "jü", not "joo"',
  },
  {
    title: 'Tone Mark Placement',
    rule: 'The tone mark goes on the main vowel. If there is "a" or "e", it goes there. For "ou", it goes on "o".',
    desc: 'Memorize the order: a, o, e, i, u, ü. The tone mark goes on whichever vowel appears first in this order.',
    example: 'xiǎo (小) — mark on "a" (appears before "o")',
  },
  {
    title: 'Half Third Tone',
    rule: 'When a third tone is followed by a first, second, or fourth tone, it becomes a "half third tone" — just the low falling part, without the rise.',
    desc: 'In natural speech, full third tones (with the rise) are rare. Most of the time the third tone is just a low tone.',
    example: 'hěn gāo (很高) — hěn is pronounced as a low tone, not a full dip',
  },
];

/* ------------------------------------------------------------------ */
/* Build lookup map                                                   */
/* ------------------------------------------------------------------ */

function buildLookupMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const syl of VALID_SYLLABLES) {
    map.set(`${syl.initial}|${syl.final}`, syl.pinyin);
  }
  return map;
}

const LOOKUP = buildLookupMap();

/* ------------------------------------------------------------------ */
/* Audio playback helper                                              */
/* ------------------------------------------------------------------ */

function speakPinyin(pinyin: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(pinyin);
  u.lang = 'zh-CN';
  u.rate = 0.75;
  u.pitch = 1.0;
  u.volume = 1.0;
  window.speechSynthesis.speak(u);
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function PinyinChart() {
  const [tone, setTone] = useState<Tone>(1);
  const [selectedCell, setSelectedCell] = useState<{ initial: string; final: string } | null>(null);
  const [showAllTones, setShowAllTones] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Build a quick lookup map for the grid
  const lookupMap = useMemo(() => LOOKUP, []);

  const handleCellClick = useCallback(
    (initial: string, final: string, pinyin: string) => {
      setSelectedCell({ initial, final });
      const pinyinWithTone = changeTone(pinyin, tone);
      speakPinyin(pinyinWithTone);
    },
    [tone]
  );

  const handleToneChange = useCallback((t: Tone) => {
    setTone(t);
    // Re-speak current selection with new tone
    if (selectedCell) {
      const pinyin = lookupMap.get(`${selectedCell.initial}|${selectedCell.final}`);
      if (pinyin) {
        speakPinyin(changeTone(pinyin, t));
      }
    }
  }, [selectedCell, lookupMap]);

  // Keyboard: arrow keys to navigate grid
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;
      const initIdx = INITIALS.findIndex((i) => i.id === selectedCell.initial);
      const finIdx = FINALS.findIndex((f) => f.id === selectedCell.final);
      if (initIdx === -1 || finIdx === -1) return;

      let newInit = initIdx;
      let newFin = finIdx;

      switch (e.key) {
        case 'ArrowUp': newInit = Math.max(0, initIdx - 1); break;
        case 'ArrowDown': newInit = Math.min(INITIALS.length - 1, initIdx + 1); break;
        case 'ArrowLeft': newFin = Math.max(0, finIdx - 1); break;
        case 'ArrowRight': newFin = Math.min(FINALS.length - 1, finIdx + 1); break;
        default: return;
      }
      e.preventDefault();
      const newInitial = INITIALS[newInit].id;
      const newFinal = FINALS[newFin].id;
      const pinyin = lookupMap.get(`${newInitial}|${newFinal}`);
      if (pinyin) {
        setSelectedCell({ initial: newInitial, final: newFinal });
        speakPinyin(changeTone(pinyin, tone));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, tone, lookupMap]);

  // Count valid syllables
  const totalCells = INITIALS.length * FINALS.length;
  const validCount = VALID_SYLLABLES.length;

  return (
    <div className="space-y-8">
      {/* ===== Tone selector ===== */}
      <div
        className="rounded-2xl border border-[#D4AF37]/25 p-5"
        style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
      >
        <p className="text-center text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
          Select a Tone
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => handleToneChange(t.id)}
              className="group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-w-[72px]"
              style={{
                background: tone === t.id
                  ? 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: tone === t.id
                  ? '2px solid #FFD700'
                  : '2px solid rgba(212,175,55,0.25)',
                color: tone === t.id ? '#1a0808' : '#F5F0E8',
                boxShadow: tone === t.id ? '0 0 20px rgba(212,175,55,0.4)' : 'none',
              }}
            >
              <span className="block text-xl font-serif leading-tight">{t.mark}</span>
              <span className="block text-[10px] opacity-75 mt-0.5">{t.label}</span>
              <span className="block text-[10px] opacity-60">{t.nameZh}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-3 text-xs text-[#F5F0E8]/50">
          <button
            onClick={() => setShowAllTones(!showAllTones)}
            className="hover:text-[#FFD700] transition-colors underline underline-offset-2"
          >
            {showAllTones ? 'Hide all-tone view' : 'Show all 4 tones per cell'}
          </button>
        </div>
      </div>

      {/* ===== Legend ===== */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {Object.entries(INITIAL_GROUPS).map(([key, group]) => (
          <button
            key={key}
            onClick={() => setHoveredGroup(hoveredGroup === key ? null : key)}
            className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-colors"
            style={{
              background: hoveredGroup === key ? group.bgColor : 'transparent',
              border: `1px solid ${group.borderColor}`,
              color: group.color,
            }}
            title={group.description}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: group.color }}
              aria-hidden="true"
            />
            {group.nameZh} ({group.name})
          </button>
        ))}
      </div>

      {/* ===== Grid ===== */}
      <div
        className="relative rounded-2xl border border-[#D4AF37]/25 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
      >
        {/* Stats bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4AF37]/15 text-xs text-[#F5F0E8]/50">
          <span>
            <strong className="text-[#FFD700]">{validCount}</strong> valid syllables
            of <strong className="text-[#F5F0E8]/60">{totalCells}</strong> possible combinations
          </span>
          <span className="hidden sm:inline">
            Click a cell to hear pronunciation · Use arrow keys to navigate
          </span>
        </div>

        {/* Scrollable grid container */}
        <div
          ref={gridRef}
          className="overflow-auto max-h-[70vh]"
          style={{ scrollBehavior: 'smooth' }}
        >
          <table className="border-collapse w-max min-w-full">
            {/* Column headers (finals) */}
            <thead>
              <tr>
                <th
                  className="sticky top-0 left-0 z-20 px-2 py-2 text-xs font-medium text-[#D4AF37] min-w-[48px]"
                  style={{ background: 'rgba(26,8,8,0.97)' }}
                >
                  <span className="sr-only">Initials</span>
                  <span aria-hidden="true">声母</span>
                </th>
                {FINALS.map((f) => (
                  <th
                    key={f.id}
                    className="sticky top-0 z-10 px-1 py-2 text-xs font-medium text-[#D4AF37] min-w-[52px]"
                    style={{ background: 'rgba(26,8,8,0.97)' }}
                    title={f.category}
                  >
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INITIALS.map((init) => {
                const groupInfo = INITIAL_GROUPS[init.group];
                const isGroupHovered = hoveredGroup === init.group;
                const isOtherHovered = hoveredGroup !== null && hoveredGroup !== init.group;

                return (
                  <tr key={init.id}>
                    {/* Row header (initial) */}
                    <th
                      className="sticky left-0 z-10 px-2 py-2 text-xs font-medium text-right min-w-[48px]"
                      style={{
                        background: isGroupHovered ? groupInfo.bgColor : 'rgba(26,8,8,0.95)',
                        color: groupInfo.color,
                        borderRight: `2px solid ${groupInfo.color}40`,
                        opacity: isOtherHovered ? 0.3 : 1,
                        transition: 'opacity 0.2s',
                      }}
                      title={init.tooltip || groupInfo.description}
                    >
                      {init.label}
                    </th>
                    {/* Cells */}
                    {FINALS.map((fin) => {
                      const key = `${init.id}|${fin.id}`;
                      const pinyin = lookupMap.get(key);
                      const isSelected = selectedCell?.initial === init.id && selectedCell?.final === fin.id;

                      if (!pinyin) {
                        return (
                          <td
                            key={fin.id}
                            className="px-1 py-1"
                            style={{ opacity: isOtherHovered ? 0.15 : 0.08 }}
                          >
                            <div className="w-full aspect-[2/1] rounded" />
                          </td>
                        );
                      }

                      const displayPinyin = changeTone(pinyin, tone);

                      return (
                        <td key={fin.id} className="px-1 py-1">
                          <button
                            onClick={() => handleCellClick(init.id, fin.id, pinyin)}
                            className="w-full aspect-[2/1] rounded text-xs font-medium transition-all duration-150 flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                            style={{
                              background: isSelected
                                ? 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)'
                                : isGroupHovered
                                  ? groupInfo.bgColor
                                  : 'rgba(255,255,255,0.03)',
                              border: isSelected
                                ? '2px solid #FFD700'
                                : `1px solid ${groupInfo.borderColor}`,
                              color: isSelected ? '#1a0808' : groupInfo.color,
                              opacity: isOtherHovered ? 0.3 : 1,
                              boxShadow: isSelected
                                ? '0 0 12px rgba(212,175,55,0.5)'
                                : 'none',
                            }}
                            title={`${init.label || '∅'} + ${fin.label} → ${displayPinyin}`}
                          >
                            {showAllTones ? (
                              <div className="flex flex-col items-center leading-tight">
                                <span className="text-[10px] opacity-90">{changeTone(pinyin, 1)}</span>
                                <span className="text-[9px] opacity-70">{changeTone(pinyin, 2)} {changeTone(pinyin, 3)} {changeTone(pinyin, 4)}</span>
                              </div>
                            ) : (
                              <span className="text-sm">{displayPinyin}</span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Selected cell detail ===== */}
      {selectedCell && (() => {
        const pinyinBase = lookupMap.get(`${selectedCell.initial}|${selectedCell.final}`);
        if (!pinyinBase) return null;
        const initGroup = INITIAL_GROUP_MAP[selectedCell.initial] || 'approximant';
        const groupInfo = INITIAL_GROUPS[initGroup];
        return (
          <div
            className="rounded-2xl border border-[#D4AF37]/25 p-5"
            style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
          >
            <div className="flex items-center gap-4 flex-wrap">
              <div
                className="w-16 h-16 flex items-center justify-center text-2xl font-serif rounded-xl"
                style={{
                  background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
                  color: '#1a0808',
                  boxShadow: '0 0 20px rgba(212,175,55,0.4)',
                }}
              >
                {changeTone(pinyinBase, tone)}
              </div>
              <div className="space-y-1">
                <p className="text-[#F5F0E8] font-bold text-lg">
                  {selectedCell.initial || '(zero initial)'} + {selectedCell.final}
                </p>
                <p className="text-[#F5F0E8]/60 text-sm">
                  Initial group: <span style={{ color: groupInfo.color }}>{groupInfo.nameZh} ({groupInfo.name})</span>
                </p>
                <p className="text-[#F5F0E8]/60 text-sm">
                  {groupInfo.description}
                </p>
              </div>
            </div>
            {/* All 4 tones row */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {TONES.filter((t) => t.id !== 0).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleToneChange(t.id)}
                  className="flex flex-col items-center px-4 py-2 rounded-lg transition-all"
                  style={{
                    background: tone === t.id ? 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${tone === t.id ? '#FFD700' : 'rgba(212,175,55,0.25)'}`,
                    color: tone === t.id ? '#1a0808' : '#F5F0E8',
                  }}
                >
                  <span className="text-lg font-serif">{changeTone(pinyinBase, t.id)}</span>
                  <span className="text-[10px] opacity-70">{t.nameZh} ({t.label})</span>
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ===== Pronunciation rules ===== */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Rules</span>
          <h3 className="text-xl font-bold text-[#F5F0E8] mt-2">Important Pronunciation Rules</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRONUNCIATION_RULES.map((rule) => (
            <div
              key={rule.title}
              className="rounded-xl border border-[#D4AF37]/20 p-5"
              style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)' }}
            >
              <h4 className="text-[#FFD700] font-bold text-sm mb-2">{rule.title}</h4>
              <p className="text-[#D4AF37] text-xs font-medium mb-2">{rule.rule}</p>
              <p className="text-[#F5F0E8]/65 text-xs leading-relaxed mb-2">{rule.desc}</p>
              {rule.example && (
                <p className="text-[#F5F0E8]/85 text-xs font-serif italic">
                  Example: {rule.example}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}