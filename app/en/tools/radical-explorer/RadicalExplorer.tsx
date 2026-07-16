'use client';

import { useMemo, useRef, useState } from 'react';

/**
 * RadicalExplorer — a fully client-side Chinese radical exploration tool.
 *
 * Features:
 *  - A searchable grid of the 30 most common Chinese radicals.
 *  - Each radical card shows the radical character, pinyin, English meaning,
 *    and example characters that contain it.
 *  - Click a radical to expand full details: every example character with its
 *    complete decomposition (char = part + part).
 *  - A search box that filters radicals by character, variant, pinyin or
 *    English meaning (and even by example character).
 *  - A character decomposition viewer: type any Chinese character that lives in
 *    the built-in bank and instantly see its radical breakdown.
 *  - Chinese aesthetic: deep red (#8B0000 / #C41E3A), gold (#D4AF37 / #FFD700),
 *    cream text (#F5F0E8) on a near-black red background (#1a0808).
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface RadicalPart {
  /** The component character (may be a variant form of a radical). */
  c: string;
  /** Short meaning or role of this component. */
  m: string;
}

interface ExampleChar {
  /** The full character, e.g. 你. */
  char: string;
  /** Pinyin with tone marks, e.g. nǐ. */
  pinyin: string;
  /** English meaning, e.g. you. */
  meaning: string;
  /** Ordered decomposition into components. */
  parts: RadicalPart[];
}

interface Radical {
  id: number;
  /** Primary display form of the radical, e.g. 人. */
  radical: string;
  /** Alternate forms that appear in compounds, e.g. ['亻']. */
  variants: string[];
  pinyin: string;
  meaning: string;
  strokes: number;
  examples: ExampleChar[];
}

interface CharMatch {
  char: string;
  pinyin: string;
  meaning: string;
  parts: RadicalPart[];
  radicalId: number;
  radicalChar: string;
  radicalPinyin: string;
  radicalMeaning: string;
}

/* ------------------------------------------------------------------ */
/* Radical data — the 30 most common radicals with example breakdowns */
/* ------------------------------------------------------------------ */

const RADICALS: Radical[] = [
  {
    id: 1,
    radical: '人',
    variants: ['亻'],
    pinyin: 'rén',
    meaning: 'person',
    strokes: 2,
    examples: [
      { char: '你', pinyin: 'nǐ', meaning: 'you', parts: [{ c: '亻', m: 'person' }, { c: '尔', m: 'sound' }] },
      { char: '他', pinyin: 'tā', meaning: 'he / him', parts: [{ c: '亻', m: 'person' }, { c: '也', m: 'sound' }] },
      { char: '们', pinyin: 'men', meaning: 'plural marker', parts: [{ c: '亻', m: 'person' }, { c: '门', m: 'sound' }] },
      { char: '做', pinyin: 'zuò', meaning: 'to do', parts: [{ c: '亻', m: 'person' }, { c: '故', m: 'sound' }] },
      { char: '住', pinyin: 'zhù', meaning: 'to live / stay', parts: [{ c: '亻', m: 'person' }, { c: '主', m: 'sound' }] },
    ],
  },
  {
    id: 2,
    radical: '口',
    variants: [],
    pinyin: 'kǒu',
    meaning: 'mouth',
    strokes: 3,
    examples: [
      { char: '吃', pinyin: 'chī', meaning: 'to eat', parts: [{ c: '口', m: 'mouth' }, { c: '乞', m: 'sound' }] },
      { char: '喝', pinyin: 'hē', meaning: 'to drink', parts: [{ c: '口', m: 'mouth' }, { c: '曷', m: 'sound' }] },
      { char: '叫', pinyin: 'jiào', meaning: 'to call', parts: [{ c: '口', m: 'mouth' }, { c: '丩', m: 'sound' }] },
      { char: '听', pinyin: 'tīng', meaning: 'to listen', parts: [{ c: '口', m: 'mouth' }, { c: '斤', m: 'sound' }] },
      { char: '唱', pinyin: 'chàng', meaning: 'to sing', parts: [{ c: '口', m: 'mouth' }, { c: '昌', m: 'sound' }] },
    ],
  },
  {
    id: 3,
    radical: '心',
    variants: ['忄'],
    pinyin: 'xīn',
    meaning: 'heart',
    strokes: 4,
    examples: [
      { char: '想', pinyin: 'xiǎng', meaning: 'to think', parts: [{ c: '相', m: 'mutual' }, { c: '心', m: 'heart' }] },
      { char: '忘', pinyin: 'wàng', meaning: 'to forget', parts: [{ c: '亡', m: 'flee' }, { c: '心', m: 'heart' }] },
      { char: '意', pinyin: 'yì', meaning: 'meaning', parts: [{ c: '音', m: 'sound' }, { c: '心', m: 'heart' }] },
      { char: '息', pinyin: 'xī', meaning: 'breath / rest', parts: [{ c: '自', m: 'self' }, { c: '心', m: 'heart' }] },
      { char: '急', pinyin: 'jí', meaning: 'anxious', parts: [{ c: '彐', m: 'snout' }, { c: '心', m: 'heart' }] },
    ],
  },
  {
    id: 4,
    radical: '手',
    variants: ['扌'],
    pinyin: 'shǒu',
    meaning: 'hand',
    strokes: 4,
    examples: [
      { char: '打', pinyin: 'dǎ', meaning: 'to hit', parts: [{ c: '扌', m: 'hand' }, { c: '丁', m: 'sound' }] },
      { char: '把', pinyin: 'bǎ', meaning: 'to hold', parts: [{ c: '扌', m: 'hand' }, { c: '巴', m: 'sound' }] },
      { char: '拉', pinyin: 'lā', meaning: 'to pull', parts: [{ c: '扌', m: 'hand' }, { c: '立', m: 'sound' }] },
      { char: '推', pinyin: 'tuī', meaning: 'to push', parts: [{ c: '扌', m: 'hand' }, { c: '隹', m: 'sound' }] },
      { char: '拿', pinyin: 'ná', meaning: 'to take', parts: [{ c: '合', m: 'join' }, { c: '手', m: 'hand' }] },
    ],
  },
  {
    id: 5,
    radical: '水',
    variants: ['氵'],
    pinyin: 'shuǐ',
    meaning: 'water',
    strokes: 4,
    examples: [
      { char: '河', pinyin: 'hé', meaning: 'river', parts: [{ c: '氵', m: 'water' }, { c: '可', m: 'sound' }] },
      { char: '海', pinyin: 'hǎi', meaning: 'sea', parts: [{ c: '氵', m: 'water' }, { c: '每', m: 'sound' }] },
      { char: '洗', pinyin: 'xǐ', meaning: 'to wash', parts: [{ c: '氵', m: 'water' }, { c: '先', m: 'sound' }] },
      { char: '清', pinyin: 'qīng', meaning: 'clear', parts: [{ c: '氵', m: 'water' }, { c: '青', m: 'sound' }] },
      { char: '流', pinyin: 'liú', meaning: 'to flow', parts: [{ c: '氵', m: 'water' }, { c: '㐬', m: 'sound' }] },
    ],
  },
  {
    id: 6,
    radical: '木',
    variants: [],
    pinyin: 'mù',
    meaning: 'wood / tree',
    strokes: 4,
    examples: [
      { char: '树', pinyin: 'shù', meaning: 'tree', parts: [{ c: '木', m: 'tree' }, { c: '对', m: 'sound' }] },
      { char: '林', pinyin: 'lín', meaning: 'woods', parts: [{ c: '木', m: 'tree' }, { c: '木', m: 'tree' }] },
      { char: '森', pinyin: 'sēn', meaning: 'forest', parts: [{ c: '木', m: 'tree' }, { c: '木', m: 'tree' }, { c: '木', m: 'tree' }] },
      { char: '桌', pinyin: 'zhuō', meaning: 'table', parts: [{ c: '卜', m: 'divination' }, { c: '日', m: 'sun' }, { c: '木', m: 'wood' }] },
      { char: '椅', pinyin: 'yǐ', meaning: 'chair', parts: [{ c: '木', m: 'tree' }, { c: '奇', m: 'sound' }] },
    ],
  },
  {
    id: 7,
    radical: '火',
    variants: ['灬'],
    pinyin: 'huǒ',
    meaning: 'fire',
    strokes: 4,
    examples: [
      { char: '烧', pinyin: 'shāo', meaning: 'to burn', parts: [{ c: '火', m: 'fire' }, { c: '尧', m: 'sound' }] },
      { char: '灯', pinyin: 'dēng', meaning: 'lamp', parts: [{ c: '火', m: 'fire' }, { c: '丁', m: 'sound' }] },
      { char: '烟', pinyin: 'yān', meaning: 'smoke', parts: [{ c: '火', m: 'fire' }, { c: '因', m: 'sound' }] },
      { char: '热', pinyin: 'rè', meaning: 'hot', parts: [{ c: '执', m: 'sound' }, { c: '灬', m: 'fire' }] },
      { char: '炒', pinyin: 'chǎo', meaning: 'to stir-fry', parts: [{ c: '火', m: 'fire' }, { c: '少', m: 'sound' }] },
    ],
  },
  {
    id: 8,
    radical: '土',
    variants: [],
    pinyin: 'tǔ',
    meaning: 'earth',
    strokes: 3,
    examples: [
      { char: '地', pinyin: 'dì', meaning: 'ground', parts: [{ c: '土', m: 'earth' }, { c: '也', m: 'sound' }] },
      { char: '场', pinyin: 'chǎng', meaning: 'field / venue', parts: [{ c: '土', m: 'earth' }, { c: '𠃓', m: 'sound' }] },
      { char: '坐', pinyin: 'zuò', meaning: 'to sit', parts: [{ c: '人', m: 'person' }, { c: '人', m: 'person' }, { c: '土', m: 'earth' }] },
      { char: '城', pinyin: 'chéng', meaning: 'city', parts: [{ c: '土', m: 'earth' }, { c: '成', m: 'sound' }] },
      { char: '堂', pinyin: 'táng', meaning: 'hall', parts: [{ c: '尚', m: 'sound' }, { c: '土', m: 'earth' }] },
    ],
  },
  {
    id: 9,
    radical: '日',
    variants: [],
    pinyin: 'rì',
    meaning: 'sun / day',
    strokes: 4,
    examples: [
      { char: '明', pinyin: 'míng', meaning: 'bright', parts: [{ c: '日', m: 'sun' }, { c: '月', m: 'moon' }] },
      { char: '早', pinyin: 'zǎo', meaning: 'early', parts: [{ c: '日', m: 'sun' }, { c: '十', m: 'ten' }] },
      { char: '晚', pinyin: 'wǎn', meaning: 'late', parts: [{ c: '日', m: 'sun' }, { c: '免', m: 'sound' }] },
      { char: '时', pinyin: 'shí', meaning: 'time', parts: [{ c: '日', m: 'sun' }, { c: '寸', m: 'measure' }] },
      { char: '春', pinyin: 'chūn', meaning: 'spring', parts: [{ c: '三人', m: 'sprout' }, { c: '日', m: 'sun' }] },
    ],
  },
  {
    id: 10,
    radical: '月',
    variants: [],
    pinyin: 'yuè',
    meaning: 'moon / month',
    strokes: 4,
    examples: [
      { char: '明', pinyin: 'míng', meaning: 'bright', parts: [{ c: '日', m: 'sun' }, { c: '月', m: 'moon' }] },
      { char: '期', pinyin: 'qī', meaning: 'period', parts: [{ c: '其', m: 'sound' }, { c: '月', m: 'moon' }] },
      { char: '望', pinyin: 'wàng', meaning: 'to gaze', parts: [{ c: '亡', m: 'flee' }, { c: '月', m: 'moon' }, { c: '王', m: 'king' }] },
      { char: '朋', pinyin: 'péng', meaning: 'friend', parts: [{ c: '月', m: 'moon' }, { c: '月', m: 'moon' }] },
      { char: '胖', pinyin: 'pàng', meaning: 'fat', parts: [{ c: '月', m: 'flesh' }, { c: '半', m: 'sound' }] },
    ],
  },
  {
    id: 11,
    radical: '女',
    variants: [],
    pinyin: 'nǚ',
    meaning: 'woman',
    strokes: 3,
    examples: [
      { char: '好', pinyin: 'hǎo', meaning: 'good', parts: [{ c: '女', m: 'woman' }, { c: '子', m: 'child' }] },
      { char: '妈', pinyin: 'mā', meaning: 'mother', parts: [{ c: '女', m: 'woman' }, { c: '马', m: 'sound' }] },
      { char: '姐', pinyin: 'jiě', meaning: 'older sister', parts: [{ c: '女', m: 'woman' }, { c: '且', m: 'sound' }] },
      { char: '妹', pinyin: 'mèi', meaning: 'younger sister', parts: [{ c: '女', m: 'woman' }, { c: '未', m: 'sound' }] },
      { char: '如', pinyin: 'rú', meaning: 'as / like', parts: [{ c: '女', m: 'woman' }, { c: '口', m: 'sound' }] },
    ],
  },
  {
    id: 12,
    radical: '子',
    variants: [],
    pinyin: 'zǐ',
    meaning: 'child',
    strokes: 3,
    examples: [
      { char: '好', pinyin: 'hǎo', meaning: 'good', parts: [{ c: '女', m: 'woman' }, { c: '子', m: 'child' }] },
      { char: '学', pinyin: 'xué', meaning: 'to study', parts: [{ c: '𦥯', m: 'hands' }, { c: '子', m: 'child' }] },
      { char: '孩', pinyin: 'hái', meaning: 'child', parts: [{ c: '子', m: 'child' }, { c: '亥', m: 'sound' }] },
      { char: '字', pinyin: 'zì', meaning: 'character', parts: [{ c: '宀', m: 'roof' }, { c: '子', m: 'child' }] },
      { char: '孔', pinyin: 'kǒng', meaning: 'hole', parts: [{ c: '子', m: 'child' }, { c: '乚', m: 'sound' }] },
    ],
  },
  {
    id: 13,
    radical: '言',
    variants: ['讠'],
    pinyin: 'yán',
    meaning: 'speech',
    strokes: 7,
    examples: [
      { char: '说', pinyin: 'shuō', meaning: 'to say', parts: [{ c: '讠', m: 'speech' }, { c: '兑', m: 'sound' }] },
      { char: '话', pinyin: 'huà', meaning: 'speech / words', parts: [{ c: '讠', m: 'speech' }, { c: '舌', m: 'sound' }] },
      { char: '语', pinyin: 'yǔ', meaning: 'language', parts: [{ c: '讠', m: 'speech' }, { c: '吾', m: 'sound' }] },
      { char: '读', pinyin: 'dú', meaning: 'to read', parts: [{ c: '讠', m: 'speech' }, { c: '卖', m: 'sound' }] },
      { char: '请', pinyin: 'qǐng', meaning: 'please', parts: [{ c: '讠', m: 'speech' }, { c: '青', m: 'sound' }] },
    ],
  },
  {
    id: 14,
    radical: '走',
    variants: ['辶'],
    pinyin: 'zǒu',
    meaning: 'walk / go',
    strokes: 7,
    examples: [
      { char: '起', pinyin: 'qǐ', meaning: 'to rise', parts: [{ c: '走', m: 'walk' }, { c: '己', m: 'sound' }] },
      { char: '超', pinyin: 'chāo', meaning: 'to exceed', parts: [{ c: '走', m: 'walk' }, { c: '召', m: 'sound' }] },
      { char: '越', pinyin: 'yuè', meaning: 'to exceed', parts: [{ c: '走', m: 'walk' }, { c: '戉', m: 'sound' }] },
      { char: '赶', pinyin: 'gǎn', meaning: 'to catch up', parts: [{ c: '走', m: 'walk' }, { c: '干', m: 'sound' }] },
      { char: '趣', pinyin: 'qù', meaning: 'interest', parts: [{ c: '走', m: 'walk' }, { c: '取', m: 'sound' }] },
    ],
  },
  {
    id: 15,
    radical: '车',
    variants: [],
    pinyin: 'chē',
    meaning: 'vehicle',
    strokes: 4,
    examples: [
      { char: '转', pinyin: 'zhuǎn', meaning: 'to turn', parts: [{ c: '车', m: 'vehicle' }, { c: '专', m: 'sound' }] },
      { char: '软', pinyin: 'ruǎn', meaning: 'soft', parts: [{ c: '车', m: 'vehicle' }, { c: '欠', m: 'sound' }] },
      { char: '轻', pinyin: 'qīng', meaning: 'light', parts: [{ c: '车', m: 'vehicle' }, { c: '𢀖', m: 'sound' }] },
      { char: '较', pinyin: 'jiào', meaning: 'to compare', parts: [{ c: '车', m: 'vehicle' }, { c: '交', m: 'sound' }] },
      { char: '载', pinyin: 'zài', meaning: 'to carry', parts: [{ c: '𢦏', m: 'sound' }, { c: '车', m: 'vehicle' }] },
    ],
  },
  {
    id: 16,
    radical: '金',
    variants: ['钅'],
    pinyin: 'jīn',
    meaning: 'gold / metal',
    strokes: 8,
    examples: [
      { char: '钱', pinyin: 'qián', meaning: 'money', parts: [{ c: '钅', m: 'metal' }, { c: '戋', m: 'sound' }] },
      { char: '铁', pinyin: 'tiě', meaning: 'iron', parts: [{ c: '钅', m: 'metal' }, { c: '失', m: 'sound' }] },
      { char: '银', pinyin: 'yín', meaning: 'silver', parts: [{ c: '钅', m: 'metal' }, { c: '艮', m: 'sound' }] },
      { char: '错', pinyin: 'cuò', meaning: 'wrong', parts: [{ c: '钅', m: 'metal' }, { c: '昔', m: 'sound' }] },
      { char: '钟', pinyin: 'zhōng', meaning: 'bell / clock', parts: [{ c: '钅', m: 'metal' }, { c: '中', m: 'sound' }] },
    ],
  },
  {
    id: 17,
    radical: '石',
    variants: [],
    pinyin: 'shí',
    meaning: 'stone',
    strokes: 5,
    examples: [
      { char: '确', pinyin: 'què', meaning: 'certain', parts: [{ c: '石', m: 'stone' }, { c: '角', m: 'sound' }] },
      { char: '破', pinyin: 'pò', meaning: 'to break', parts: [{ c: '石', m: 'stone' }, { c: '皮', m: 'sound' }] },
      { char: '硬', pinyin: 'yìng', meaning: 'hard', parts: [{ c: '石', m: 'stone' }, { c: '更', m: 'sound' }] },
      { char: '矿', pinyin: 'kuàng', meaning: 'mine', parts: [{ c: '石', m: 'stone' }, { c: '广', m: 'sound' }] },
      { char: '碎', pinyin: 'suì', meaning: 'broken', parts: [{ c: '石', m: 'stone' }, { c: '卒', m: 'sound' }] },
    ],
  },
  {
    id: 18,
    radical: '糸',
    variants: ['纟'],
    pinyin: 'sī',
    meaning: 'silk',
    strokes: 6,
    examples: [
      { char: '线', pinyin: 'xiàn', meaning: 'thread / line', parts: [{ c: '纟', m: 'silk' }, { c: '戋', m: 'sound' }] },
      { char: '红', pinyin: 'hóng', meaning: 'red', parts: [{ c: '纟', m: 'silk' }, { c: '工', m: 'sound' }] },
      { char: '绿', pinyin: 'lǜ', meaning: 'green', parts: [{ c: '纟', m: 'silk' }, { c: '录', m: 'sound' }] },
      { char: '结', pinyin: 'jié', meaning: 'to tie', parts: [{ c: '纟', m: 'silk' }, { c: '吉', m: 'sound' }] },
      { char: '继', pinyin: 'jì', meaning: 'to continue', parts: [{ c: '纟', m: 'silk' }, { c: '㔾', m: 'sound' }] },
    ],
  },
  {
    id: 19,
    radical: '食',
    variants: ['饣'],
    pinyin: 'shí',
    meaning: 'food / eat',
    strokes: 9,
    examples: [
      { char: '饭', pinyin: 'fàn', meaning: 'meal', parts: [{ c: '饣', m: 'food' }, { c: '反', m: 'sound' }] },
      { char: '饮', pinyin: 'yǐn', meaning: 'to drink', parts: [{ c: '饣', m: 'food' }, { c: '欠', m: 'sound' }] },
      { char: '饿', pinyin: 'è', meaning: 'hungry', parts: [{ c: '饣', m: 'food' }, { c: '我', m: 'sound' }] },
      { char: '餐', pinyin: 'cān', meaning: 'meal', parts: [{ c: '歺', m: 'remains' }, { c: '又', m: 'hand' }, { c: '食', m: 'food' }] },
      { char: '馆', pinyin: 'guǎn', meaning: 'hostel / shop', parts: [{ c: '饣', m: 'food' }, { c: '官', m: 'sound' }] },
    ],
  },
  {
    id: 20,
    radical: '衣',
    variants: ['衤'],
    pinyin: 'yī',
    meaning: 'clothing',
    strokes: 6,
    examples: [
      { char: '裤', pinyin: 'kù', meaning: 'pants', parts: [{ c: '衤', m: 'clothing' }, { c: '库', m: 'sound' }] },
      { char: '被', pinyin: 'bèi', meaning: 'quilt', parts: [{ c: '衤', m: 'clothing' }, { c: '皮', m: 'sound' }] },
      { char: '初', pinyin: 'chū', meaning: 'beginning', parts: [{ c: '衤', m: 'clothing' }, { c: '刀', m: 'sound' }] },
      { char: '裙', pinyin: 'qún', meaning: 'skirt', parts: [{ c: '衤', m: 'clothing' }, { c: '君', m: 'sound' }] },
      { char: '衬', pinyin: 'chèn', meaning: 'lining', parts: [{ c: '衤', m: 'clothing' }, { c: '寸', m: 'sound' }] },
    ],
  },
  {
    id: 21,
    radical: '竹',
    variants: ['⺮'],
    pinyin: 'zhú',
    meaning: 'bamboo',
    strokes: 6,
    examples: [
      { char: '笔', pinyin: 'bǐ', meaning: 'pen', parts: [{ c: '⺮', m: 'bamboo' }, { c: '毛', m: 'hair' }] },
      { char: '简', pinyin: 'jiǎn', meaning: 'simple', parts: [{ c: '⺮', m: 'bamboo' }, { c: '间', m: 'sound' }] },
      { char: '答', pinyin: 'dá', meaning: 'to answer', parts: [{ c: '⺮', m: 'bamboo' }, { c: '合', m: 'sound' }] },
      { char: '算', pinyin: 'suàn', meaning: 'to calculate', parts: [{ c: '⺮', m: 'bamboo' }, { c: '目', m: 'eye' }, { c: '廾', m: 'hands' }] },
      { char: '篇', pinyin: 'piān', meaning: 'article', parts: [{ c: '⺮', m: 'bamboo' }, { c: '扁', m: 'sound' }] },
    ],
  },
  {
    id: 22,
    radical: '艹',
    variants: ['草'],
    pinyin: 'cǎo',
    meaning: 'grass',
    strokes: 3,
    examples: [
      { char: '花', pinyin: 'huā', meaning: 'flower', parts: [{ c: '艹', m: 'grass' }, { c: '化', m: 'sound' }] },
      { char: '茶', pinyin: 'chá', meaning: 'tea', parts: [{ c: '艹', m: 'grass' }, { c: '余', m: 'sound' }] },
      { char: '药', pinyin: 'yào', meaning: 'medicine', parts: [{ c: '艹', m: 'grass' }, { c: '约', m: 'sound' }] },
      { char: '菜', pinyin: 'cài', meaning: 'vegetable', parts: [{ c: '艹', m: 'grass' }, { c: '采', m: 'sound' }] },
      { char: '蓝', pinyin: 'lán', meaning: 'blue', parts: [{ c: '艹', m: 'grass' }, { c: '监', m: 'sound' }] },
    ],
  },
  {
    id: 23,
    radical: '虫',
    variants: [],
    pinyin: 'chóng',
    meaning: 'insect',
    strokes: 6,
    examples: [
      { char: '蚂', pinyin: 'mǎ', meaning: 'leech / ant', parts: [{ c: '虫', m: 'insect' }, { c: '马', m: 'sound' }] },
      { char: '蚁', pinyin: 'yǐ', meaning: 'ant', parts: [{ c: '虫', m: 'insect' }, { c: '义', m: 'sound' }] },
      { char: '蝶', pinyin: 'dié', meaning: 'butterfly', parts: [{ c: '虫', m: 'insect' }, { c: '枼', m: 'sound' }] },
      { char: '蜘', pinyin: 'zhī', meaning: 'spider', parts: [{ c: '虫', m: 'insect' }, { c: '知', m: 'sound' }] },
      { char: '蛛', pinyin: 'zhū', meaning: 'spider', parts: [{ c: '虫', m: 'insect' }, { c: '朱', m: 'sound' }] },
    ],
  },
  {
    id: 24,
    radical: '马',
    variants: [],
    pinyin: 'mǎ',
    meaning: 'horse',
    strokes: 3,
    examples: [
      { char: '骑', pinyin: 'qí', meaning: 'to ride', parts: [{ c: '马', m: 'horse' }, { c: '奇', m: 'sound' }] },
      { char: '驾', pinyin: 'jià', meaning: 'to drive', parts: [{ c: '加', m: 'sound' }, { c: '马', m: 'horse' }] },
      { char: '骗', pinyin: 'piàn', meaning: 'to deceive', parts: [{ c: '马', m: 'horse' }, { c: '扁', m: 'sound' }] },
      { char: '骄', pinyin: 'jiāo', meaning: 'proud', parts: [{ c: '马', m: 'horse' }, { c: '乔', m: 'sound' }] },
      { char: '骂', pinyin: 'mà', meaning: 'to scold', parts: [{ c: '口', m: 'mouth' }, { c: '口', m: 'mouth' }, { c: '马', m: 'horse' }] },
    ],
  },
  {
    id: 25,
    radical: '鸟',
    variants: [],
    pinyin: 'niǎo',
    meaning: 'bird',
    strokes: 5,
    examples: [
      { char: '鸡', pinyin: 'jī', meaning: 'chicken', parts: [{ c: '又', m: 'hand' }, { c: '鸟', m: 'bird' }] },
      { char: '鸭', pinyin: 'yā', meaning: 'duck', parts: [{ c: '甲', m: 'sound' }, { c: '鸟', m: 'bird' }] },
      { char: '鹅', pinyin: 'é', meaning: 'goose', parts: [{ c: '我', m: 'sound' }, { c: '鸟', m: 'bird' }] },
      { char: '鸣', pinyin: 'míng', meaning: 'to cry / chirp', parts: [{ c: '口', m: 'mouth' }, { c: '鸟', m: 'bird' }] },
      { char: '鹤', pinyin: 'hè', meaning: 'crane', parts: [{ c: '隺', m: 'sound' }, { c: '鸟', m: 'bird' }] },
    ],
  },
  {
    id: 26,
    radical: '鱼',
    variants: [],
    pinyin: 'yú',
    meaning: 'fish',
    strokes: 8,
    examples: [
      { char: '鲜', pinyin: 'xiān', meaning: 'fresh', parts: [{ c: '鱼', m: 'fish' }, { c: '羊', m: 'sheep' }] },
      { char: '鲁', pinyin: 'lǔ', meaning: 'Lu (state) / rash', parts: [{ c: '鱼', m: 'fish' }, { c: '日', m: 'sun' }] },
      { char: '鲸', pinyin: 'jīng', meaning: 'whale', parts: [{ c: '鱼', m: 'fish' }, { c: '京', m: 'sound' }] },
      { char: '鳄', pinyin: 'è', meaning: 'crocodile', parts: [{ c: '鱼', m: 'fish' }, { c: '咢', m: 'sound' }] },
      { char: '鳞', pinyin: 'lín', meaning: 'scale', parts: [{ c: '鱼', m: 'fish' }, { c: '粦', m: 'sound' }] },
    ],
  },
  {
    id: 27,
    radical: '雨',
    variants: [],
    pinyin: 'yǔ',
    meaning: 'rain',
    strokes: 8,
    examples: [
      { char: '雪', pinyin: 'xuě', meaning: 'snow', parts: [{ c: '雨', m: 'rain' }, { c: '彐', m: 'sound' }] },
      { char: '零', pinyin: 'líng', meaning: 'zero', parts: [{ c: '雨', m: 'rain' }, { c: '令', m: 'sound' }] },
      { char: '需', pinyin: 'xū', meaning: 'to need', parts: [{ c: '雨', m: 'rain' }, { c: '而', m: 'sound' }] },
      { char: '震', pinyin: 'zhèn', meaning: 'to shake', parts: [{ c: '雨', m: 'rain' }, { c: '辰', m: 'sound' }] },
      { char: '露', pinyin: 'lù', meaning: 'dew', parts: [{ c: '雨', m: 'rain' }, { c: '路', m: 'sound' }] },
    ],
  },
  {
    id: 28,
    radical: '门',
    variants: [],
    pinyin: 'mén',
    meaning: 'door',
    strokes: 3,
    examples: [
      { char: '间', pinyin: 'jiān', meaning: 'between', parts: [{ c: '门', m: 'door' }, { c: '日', m: 'sun' }] },
      { char: '闪', pinyin: 'shǎn', meaning: 'to dodge', parts: [{ c: '门', m: 'door' }, { c: '人', m: 'person' }] },
      { char: '闭', pinyin: 'bì', meaning: 'to close', parts: [{ c: '门', m: 'door' }, { c: '才', m: 'sound' }] },
      { char: '闲', pinyin: 'xián', meaning: 'idle', parts: [{ c: '门', m: 'door' }, { c: '木', m: 'tree' }] },
      { char: '问', pinyin: 'wèn', meaning: 'to ask', parts: [{ c: '门', m: 'door' }, { c: '口', m: 'mouth' }] },
    ],
  },
  {
    id: 29,
    radical: '广',
    variants: [],
    pinyin: 'guǎng',
    meaning: 'shelter',
    strokes: 3,
    examples: [
      { char: '店', pinyin: 'diàn', meaning: 'shop', parts: [{ c: '广', m: 'shelter' }, { c: '占', m: 'sound' }] },
      { char: '床', pinyin: 'chuáng', meaning: 'bed', parts: [{ c: '广', m: 'shelter' }, { c: '木', m: 'tree' }] },
      { char: '席', pinyin: 'xí', meaning: 'mat', parts: [{ c: '广', m: 'shelter' }, { c: '廿', m: 'twenty' }, { c: '巾', m: 'cloth' }] },
      { char: '座', pinyin: 'zuò', meaning: 'seat', parts: [{ c: '广', m: 'shelter' }, { c: '坐', m: 'sit' }] },
      { char: '库', pinyin: 'kù', meaning: 'warehouse', parts: [{ c: '广', m: 'shelter' }, { c: '车', m: 'vehicle' }] },
    ],
  },
  {
    id: 30,
    radical: '疒',
    variants: ['病'],
    pinyin: 'bìng',
    meaning: 'sickness',
    strokes: 5,
    examples: [
      { char: '病', pinyin: 'bìng', meaning: 'illness', parts: [{ c: '疒', m: 'sickness' }, { c: '丙', m: 'sound' }] },
      { char: '疼', pinyin: 'téng', meaning: 'ache', parts: [{ c: '疒', m: 'sickness' }, { c: '冬', m: 'sound' }] },
      { char: '痛', pinyin: 'tòng', meaning: 'pain', parts: [{ c: '疒', m: 'sickness' }, { c: '甬', m: 'sound' }] },
      { char: '疗', pinyin: 'liáo', meaning: 'to treat', parts: [{ c: '疒', m: 'sickness' }, { c: '了', m: 'sound' }] },
      { char: '痕', pinyin: 'hén', meaning: 'scar', parts: [{ c: '疒', m: 'sickness' }, { c: '艮', m: 'sound' }] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Character index — lets the decomposition viewer look up any char   */
/* that appears in the radical bank.                                  */
/* ------------------------------------------------------------------ */

const CHAR_INDEX: Map<string, CharMatch[]> = (() => {
  const map = new Map<string, CharMatch[]>();
  for (const r of RADICALS) {
    for (const ex of r.examples) {
      const match: CharMatch = {
        char: ex.char,
        pinyin: ex.pinyin,
        meaning: ex.meaning,
        parts: ex.parts,
        radicalId: r.id,
        radicalChar: r.radical,
        radicalPinyin: r.pinyin,
        radicalMeaning: r.meaning,
      };
      const list = map.get(ex.char);
      if (list) {
        list.push(match);
      } else {
        map.set(ex.char, [match]);
      }
    }
  }
  return map;
})();

/** Extract the first CJK ideograph from a string. */
function firstHan(input: string): string {
  const match = input.match(/[\u3400-\u9fff\uf900-\ufaff]/u);
  return match ? match[0] : '';
}

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function RadicalBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 text-2xl text-[#FFD700] font-serif rounded-md"
      style={{ background: 'rgba(139,0,0,0.55)', border: '1px solid rgba(212,175,55,0.45)' }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function PartChip({ part }: { part: RadicalPart }) {
  return (
    <div className="text-center">
      <span
        className="inline-flex items-center justify-center w-11 h-11 text-2xl text-[#FFD700] font-serif rounded-md"
        style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
        aria-hidden="true"
      >
        {part.c}
      </span>
      <p className="text-[#F5F0E8]/55 text-[11px] mt-1">{part.m}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function RadicalExplorer() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(RADICALS[0].id);
  const [decomposeInput, setDecomposeInput] = useState('好');
  const viewerRef = useRef<HTMLDivElement | null>(null);

  /* ---- Filter radicals by character / variant / pinyin / meaning ---- */
  const filteredRadicals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RADICALS;
    return RADICALS.filter((r) => {
      if (r.radical.toLowerCase().includes(q)) return true;
      if (r.pinyin.toLowerCase().includes(q)) return true;
      if (r.meaning.toLowerCase().includes(q)) return true;
      if (r.variants.some((v) => v.toLowerCase().includes(q))) return true;
      if (r.examples.some((ex) => ex.char.includes(q) || ex.pinyin.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query]);

  const selectedRadical = useMemo(
    () => RADICALS.find((r) => r.id === selectedId) ?? null,
    [selectedId],
  );

  /* ---- Decomposition viewer lookup ---- */
  const decomposeTarget = firstHan(decomposeInput);
  const decomposeMatches = decomposeTarget ? (CHAR_INDEX.get(decomposeTarget) ?? []) : [];

  const loadCharIntoViewer = (char: string) => {
    setDecomposeInput(char);
    viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative py-14 px-4 sm:px-6 bg-[#1a0808]">
      <div className="max-w-6xl mx-auto">
        {/* ===== Section heading ===== */}
        <div className="text-center mb-10">
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Interactive</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">
            Explore Radicals &amp; Decompose Characters
          </h2>
          <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
            Search the 30 most common radicals, click any card for full example
            breakdowns, or type a character to see its radical decomposition.
          </p>
        </div>

        {/* ===== Search box ===== */}
        <div className="max-w-xl mx-auto mb-8">
          <label htmlFor="radical-search" className="sr-only">
            Search radicals by character, pinyin or meaning
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/70 text-lg"
              aria-hidden="true"
            >
              ⌕
            </span>
            <input
              id="radical-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: 口, kǒu, mouth, 吃…"
              className="w-full pl-11 pr-4 py-3 rounded-full text-[#F5F0E8] placeholder:text-[#F5F0E8]/35 bg-[#3d0606]/60 border border-[#D4AF37]/30 focus:border-[#D4AF37]/70 focus:outline-none transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F0E8]/50 hover:text-[#FFD700] text-sm px-2"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-center text-[#F5F0E8]/40 text-xs mt-2">
            Showing {filteredRadicals.length} of {RADICALS.length} radicals
          </p>
        </div>

        {/* ===== Radical grid ===== */}
        {filteredRadicals.length === 0 ? (
          <div className="text-center text-[#F5F0E8]/55 py-12">
            No radicals match &ldquo;{query}&rdquo;. Try a character, pinyin or English meaning.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredRadicals.map((r) => {
              const isActive = r.id === selectedId;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedId(r.id)}
                  className={`rounded-xl border p-4 text-center transition-all duration-150 ${
                    isActive
                      ? 'border-[#D4AF37] shadow-[0_0_0_1px_rgba(212,175,55,0.5),0_0_18px_rgba(212,175,55,0.25)]'
                      : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:-translate-y-0.5'
                  }`}
                  style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
                  aria-pressed={isActive}
                >
                  <span className="flex justify-center mb-2">
                    <RadicalBadge>{r.radical}</RadicalBadge>
                  </span>
                  <p className="text-[#FFD700] font-serif text-xs">
                    {r.pinyin}
                    {r.variants.length > 0 && (
                      <span className="text-[#F5F0E8]/40"> · {r.variants.join(' / ')}</span>
                    )}
                  </p>
                  <p className="text-[#F5F0E8]/85 text-sm font-medium">{r.meaning}</p>
                  <p className="text-[#F5F0E8]/45 text-[11px] mt-1">
                    {r.strokes} stroke{r.strokes === 1 ? '' : 's'} · {r.examples.length} examples
                  </p>
                  <p className="text-[#D4AF37]/70 text-base mt-1 font-serif tracking-wide">
                    {r.examples.map((e) => e.char).join(' ')}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* ===== Expanded details for the selected radical ===== */}
        {selectedRadical && (
          <div
            className="mt-10 rounded-2xl border border-[#D4AF37]/30 bg-[#3d0606]/40 p-6 sm:p-8"
            role="region"
            aria-label={`Details for radical ${selectedRadical.radical} (${selectedRadical.pinyin})`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <span
                className="w-16 h-16 flex items-center justify-center text-4xl text-[#FFD700] font-serif rounded-xl"
                style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
                aria-hidden="true"
              >
                {selectedRadical.radical}
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#F5F0E8]">
                  {selectedRadical.radical}
                  {selectedRadical.variants.length > 0 && (
                    <span className="text-[#F5F0E8]/50 text-base font-normal">
                      {' '}({selectedRadical.variants.join(' / ')})
                    </span>
                  )}
                </h3>
                <p className="text-[#FFD700] font-serif text-sm">
                  {selectedRadical.pinyin} · {selectedRadical.meaning} · {selectedRadical.strokes} strokes
                </p>
                <p className="text-[#F5F0E8]/55 text-xs mt-1">
                  {selectedRadical.examples.length} example characters with full decomposition
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedRadical.examples.map((ex) => (
                <div
                  key={ex.char + ex.pinyin}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-[#D4AF37]/15 bg-[#1a0808]/50 p-4"
                >
                  {/* Whole character (clickable → viewer) */}
                  <button
                    type="button"
                    onClick={() => loadCharIntoViewer(ex.char)}
                    className="flex items-center gap-3 sm:w-44 shrink-0 text-left group"
                    title={`Decompose ${ex.char} in the viewer below`}
                  >
                    <span
                      className="w-14 h-14 flex items-center justify-center text-3xl text-[#F5F0E8] font-serif rounded-xl group-hover:border-[#D4AF37] transition-colors"
                      style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(212,175,55,0.35)' }}
                      aria-hidden="true"
                    >
                      {ex.char}
                    </span>
                    <span>
                      <span className="block text-[#FFD700] font-serif text-sm">{ex.pinyin}</span>
                      <span className="block text-[#F5F0E8]/85 text-sm">{ex.meaning}</span>
                      <span className="block text-[#D4AF37]/70 text-[11px] mt-0.5 group-hover:text-[#FFD700]">
                        view ↓
                      </span>
                    </span>
                  </button>

                  {/* Decomposition */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#D4AF37] text-sm font-medium">=</span>
                    {ex.parts.map((p, i) => (
                      <div key={`${p.c}-${i}`} className="flex items-center gap-3">
                        <PartChip part={p} />
                        {i < ex.parts.length - 1 && (
                          <span className="text-[#D4AF37] text-sm" aria-hidden="true">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Character decomposition viewer ===== */}
        <div
          ref={viewerRef}
          className="mt-10 rounded-2xl border border-[#D4AF37]/30 bg-[#0f0303]/70 p-6 sm:p-8 scroll-mt-24"
        >
          <div className="text-center mb-6">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Decomposition Viewer</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E8] mt-2">
              Type a Character, See Its Radical Breakdown
            </h3>
            <p className="text-[#F5F0E8]/55 text-sm mt-2 max-w-xl mx-auto">
              Enter any Chinese character from our bank of {CHAR_INDEX.size} example
              characters to reveal which radical it contains and how it decomposes.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <label htmlFor="decompose-input" className="sr-only">
              Chinese character to decompose
            </label>
            <input
              id="decompose-input"
              type="text"
              value={decomposeInput}
              onChange={(e) => setDecomposeInput(e.target.value)}
              placeholder="Type a character, e.g. 好"
              maxLength={4}
              className="w-full text-center text-2xl tracking-[0.3em] px-4 py-3 rounded-xl text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 bg-[#3d0606]/60 border border-[#D4AF37]/30 focus:border-[#D4AF37]/70 focus:outline-none transition-colors font-serif"
            />
          </div>

          {/* Result */}
          {!decomposeTarget ? (
            <div className="text-center text-[#F5F0E8]/50 py-6">
              Type a Chinese character above to begin.
            </div>
          ) : decomposeMatches.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-[#F5F0E8]/80 text-lg font-serif mb-1">
                <span className="text-[#FFD700] text-2xl">{decomposeTarget}</span>
              </p>
              <p className="text-[#F5F0E8]/55 text-sm">
                This character is not yet in our demonstration bank. Try one of the
                examples above, such as{' '}
                <button
                  type="button"
                  onClick={() => setDecomposeInput('好')}
                  className="text-[#FFD700] underline hover:text-[#D4AF37]"
                >
                  好
                </button>
                ,{' '}
                <button
                  type="button"
                  onClick={() => setDecomposeInput('明')}
                  className="text-[#FFD700] underline hover:text-[#D4AF37]"
                >
                  明
                </button>{' '}
                or{' '}
                <button
                  type="button"
                  onClick={() => setDecomposeInput('妈')}
                  className="text-[#FFD700] underline hover:text-[#D4AF37]"
                >
                  妈
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {decomposeMatches.map((m, idx) => (
                <div
                  key={`${m.char}-${m.radicalId}-${idx}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-[#D4AF37]/20 bg-[#3d0606]/40 p-5"
                >
                  {/* Whole character */}
                  <div className="flex items-center gap-4 sm:w-52 shrink-0">
                    <span
                      className="w-16 h-16 flex items-center justify-center text-4xl text-[#F5F0E8] font-serif rounded-xl"
                      style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(212,175,55,0.35)' }}
                      aria-hidden="true"
                    >
                      {m.char}
                    </span>
                    <div>
                      <p className="text-[#FFD700] font-serif text-sm">{m.pinyin}</p>
                      <p className="text-[#F5F0E8]/85 text-sm">{m.meaning}</p>
                      <p className="text-[#D4AF37]/70 text-[11px] mt-1">
                        radical: {m.radicalChar} ({m.radicalPinyin}, {m.radicalMeaning})
                      </p>
                    </div>
                  </div>

                  {/* Decomposition */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#D4AF37] text-sm font-medium">=</span>
                    {m.parts.map((p, i) => (
                      <div key={`${p.c}-${i}`} className="flex items-center gap-3">
                        <PartChip part={p} />
                        {i < m.parts.length - 1 && (
                          <span className="text-[#D4AF37] text-sm" aria-hidden="true">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
