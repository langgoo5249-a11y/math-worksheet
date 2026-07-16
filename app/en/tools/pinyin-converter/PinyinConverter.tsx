'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * PinyinConverter — an upgraded, fully client-side Chinese → pinyin tool.
 *
 * Highlights:
 *  - Built-in dictionary of 500+ high-frequency characters (HSK 1-3 core).
 *  - Four output formats: tone marks (mā), tone numbers (ma1),
 *    no tones (ma), and ruby annotation (pinyin above each character).
 *  - Speech synthesis (zh-CN) to pronounce the input text.
 *  - Live conversion stats (converted / unknown / total Han characters).
 *  - Unknown characters are highlighted in the output.
 *  - Copy + Download-as-TXT, plus improved mobile responsiveness.
 *
 * Note: the dictionary maps a single character to its most common pinyin
 * reading. Real Chinese is highly context-sensitive (polyphonic characters),
 * so for ambiguous characters we use the most frequent pronunciation.
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type OutputFormat = 'tone-marks' | 'tone-numbers' | 'no-tones' | 'ruby';

type TokenType =
  | 'han-known'
  | 'han-unknown'
  | 'space'
  | 'word'
  | 'punct';

interface Token {
  char: string;
  type: TokenType;
  pinyin?: string;
}

type SegType = 'pinyin' | 'word' | 'punct' | 'space';

/* ------------------------------------------------------------------ */
/* Tone-mark → base-vowel + tone-number                               */
/* ------------------------------------------------------------------ */

interface ToneInfo {
  base: string;
  tone: number;
}

const TONE_MARK_MAP: Record<string, ToneInfo> = {
  ā: { base: 'a', tone: 1 }, á: { base: 'a', tone: 2 },
  ǎ: { base: 'a', tone: 3 }, à: { base: 'a', tone: 4 },
  ē: { base: 'e', tone: 1 }, é: { base: 'e', tone: 2 },
  ě: { base: 'e', tone: 3 }, è: { base: 'e', tone: 4 },
  ī: { base: 'i', tone: 1 }, í: { base: 'i', tone: 2 },
  ǐ: { base: 'i', tone: 3 }, ì: { base: 'i', tone: 4 },
  ō: { base: 'o', tone: 1 }, ó: { base: 'o', tone: 2 },
  ǒ: { base: 'o', tone: 3 }, ò: { base: 'o', tone: 4 },
  ū: { base: 'u', tone: 1 }, ú: { base: 'u', tone: 2 },
  ǔ: { base: 'u', tone: 3 }, ù: { base: 'u', tone: 4 },
  ǖ: { base: 'ü', tone: 1 }, ǘ: { base: 'ü', tone: 2 },
  ǚ: { base: 'ü', tone: 3 }, ǜ: { base: 'ü', tone: 4 },
};

/** mā → ma1 (neutral-tone syllables keep no trailing number). */
function pinyinToNumbered(py: string): string {
  let tone = 0;
  let out = '';
  for (const ch of py) {
    const info = TONE_MARK_MAP[ch];
    if (info) {
      tone = info.tone;
      out += info.base;
    } else {
      out += ch;
    }
  }
  return tone > 0 ? `${out}${tone}` : out;
}

/** mā → ma (strip all tone marks). */
function pinyinToNoTone(py: string): string {
  let out = '';
  for (const ch of py) {
    const info = TONE_MARK_MAP[ch];
    out += info ? info.base : ch;
  }
  return out;
}

function formatPinyin(py: string, format: OutputFormat): string {
  switch (format) {
    case 'tone-marks':
      return py;
    case 'tone-numbers':
      return pinyinToNumbered(py);
    case 'no-tones':
      return pinyinToNoTone(py);
    case 'ruby':
      return py;
    default:
      return py;
  }
}

/* ------------------------------------------------------------------ */
/* Tokenisation & spacing helpers                                     */
/* ------------------------------------------------------------------ */

function isHan(ch: string): boolean {
  return /[\u4e00-\u9fff]/.test(ch);
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  for (const ch of input) {
    if (isHan(ch)) {
      const py = PINYIN_DICT[ch];
      if (py) {
        tokens.push({ char: ch, type: 'han-known', pinyin: py });
      } else {
        tokens.push({ char: ch, type: 'han-unknown' });
      }
    } else if (/\s/.test(ch)) {
      tokens.push({ char: ch, type: 'space' });
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      tokens.push({ char: ch, type: 'word' });
    } else {
      tokens.push({ char: ch, type: 'punct' });
    }
  }
  return tokens;
}

function segType(tok: Token): SegType {
  switch (tok.type) {
    case 'han-known':
      return 'pinyin';
    case 'han-unknown':
      return 'word';
    case 'space':
      return 'space';
    case 'word':
      return 'word';
    case 'punct':
      return 'punct';
  }
}

function needsSpace(cur: SegType, prev: SegType | null): boolean {
  if (!prev || cur === 'space' || prev === 'space') return false;
  if (cur === 'punct') return false;
  if (cur === 'pinyin' && (prev === 'pinyin' || prev === 'word')) return true;
  if (cur === 'word' && prev === 'pinyin') return true;
  return false;
}

/** Build plain-text output (used for Copy / Download). */
function buildPlainText(tokens: Token[], format: OutputFormat): string {
  let out = '';
  let prev: SegType | null = null;
  for (const tok of tokens) {
    const seg = segType(tok);
    if (needsSpace(seg, prev)) out += ' ';
    if (tok.type === 'han-known' && tok.pinyin) {
      out += format === 'ruby' ? `${tok.char}(${tok.pinyin})` : formatPinyin(tok.pinyin, format);
    } else if (tok.type === 'han-unknown') {
      out += format === 'ruby' ? `${tok.char}(?)` : tok.char;
    } else if (tok.type === 'space') {
      out += ' ';
    } else {
      out += tok.char;
    }
    prev = seg;
  }
  return out.replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ */
/* Sample texts & format options                                      */
/* ------------------------------------------------------------------ */

const SAMPLE_TEXTS: { label: string; text: string }[] = [
  { label: 'Greeting', text: '你好，我是中国人。' },
  { label: 'Numbers', text: '一二三四五六七八九十' },
  { label: 'Self-intro', text: '我今天学习中文，很高兴认识你。' },
  { label: 'Question', text: '你是哪国人？你叫什么名字？' },
  { label: 'Daily life', text: '我每天早上喝一杯咖啡，然后去学校上课。' },
  { label: 'Food', text: '我喜欢吃米饭、饺子和水果，你呢？' },
  { label: 'Weather', text: '今天天气很好，不冷也不热，我们一起去公园吧。' },
  { label: 'Family', text: '我家有四口人：爸爸、妈妈、哥哥和我。' },
];

const FORMAT_OPTIONS: { id: OutputFormat; label: string; sample: string }[] = [
  { id: 'tone-marks', label: 'Tone marks', sample: 'mā' },
  { id: 'tone-numbers', label: 'Tone numbers', sample: 'ma1' },
  { id: 'no-tones', label: 'No tones', sample: 'ma' },
  { id: 'ruby', label: 'Ruby', sample: '你⏜nǐ' },
];

/* ------------------------------------------------------------------ */
/* Dictionary (500+ characters)                                       */
/* ------------------------------------------------------------------ */

const PINYIN_DICT: Record<string, string> = {
  // Pronouns & people
  我: 'wǒ', 你: 'nǐ', 您: 'nín', 他: 'tā', 她: 'tā', 它: 'tā',
  们: 'men', 人: 'rén', 谁: 'shuí', 自: 'zì', 己: 'jǐ', 咱: 'zán',
  彼: 'bǐ', 此: 'cǐ', 互: 'hù', 相: 'xiāng', 某: 'mǒu', 者: 'zhě',
  // Greetings & particles
  好: 'hǎo', 吗: 'ma', 呢: 'ne', 啊: 'a', 呀: 'ya', 吧: 'ba', 哇: 'wa',
  的: 'de', 得: 'de', 地: 'dì', 了: 'le', 着: 'zhe', 过: 'guò',
  // Core verbs
  是: 'shì', 有: 'yǒu', 在: 'zài', 来: 'lái', 去: 'qù', 看: 'kàn',
  听: 'tīng', 说: 'shuō', 读: 'dú', 写: 'xiě', 学: 'xué', 做: 'zuò',
  作: 'zuò', 吃: 'chī', 喝: 'hē', 买: 'mǎi', 卖: 'mài', 想: 'xiǎng',
  会: 'huì', 能: 'néng', 要: 'yào', 爱: 'ài', 知: 'zhī', 道: 'dào',
  给: 'gěi', 到: 'dào', 用: 'yòng', 找: 'zhǎo', 让: 'ràng', 使: 'shǐ',
  被: 'bèi', 把: 'bǎ', 对: 'duì', 向: 'xiàng', 往: 'wǎng', 成: 'chéng',
  变: 'biàn', 动: 'dòng', 停: 'tíng', 转: 'zhuǎn', 换: 'huàn', 改: 'gǎi',
  // Extended verbs
  喜: 'xǐ', 欢: 'huān', 迎: 'yíng', 帮: 'bāng', 助: 'zhù', 记: 'jì',
  告: 'gào', 诉: 'sù', 准: 'zhǔn', 备: 'bèi', 应: 'yìng', 信: 'xìn',
  望: 'wàng', 忘: 'wàng', 考: 'kǎo', 试: 'shì', 练: 'liàn', 习: 'xí',
  复: 'fù', 选: 'xuǎn', 择: 'zé', 决: 'jué', 定: 'dìng', 解: 'jiě',
  释: 'shì', 论: 'lùn', 讨: 'tǎo', 感: 'gǎn', 觉: 'jué', 认: 'rèn',
  识: 'shí', 发: 'fā', 现: 'xiàn', 开: 'kāi', 始: 'shǐ',
  结: 'jié', 束: 'shù', 继: 'jì', 续: 'xù', 止: 'zhǐ', 等: 'děng',
  待: 'dài', 遇: 'yù', 见: 'jiàn', 碰: 'pèng', 收: 'shōu', 接: 'jiē',
  送: 'sòng', 拿: 'ná', 带: 'dài', 放: 'fàng', 置: 'zhì', 安: 'ān',
  排: 'pái', 计: 'jì', 划: 'huà', 算: 'suàn', 虑: 'lǜ', 思: 'sī',
  保: 'bǎo', 持: 'chí', 完: 'wán', 实: 'shí', 达: 'dá', 超: 'chāo',
  怀: 'huái', 疑: 'yí', 确: 'què', 证: 'zhèng', 创: 'chuàng', 造: 'zào',
  建: 'jiàn', 展: 'zhǎn', 进: 'jìn', 步: 'bù', 提: 'tí', 降: 'jiàng',
  增: 'zēng', 加: 'jiā', 减: 'jiǎn', 统: 'tǒng', 析: 'xī', 研: 'yán',
  究: 'jiū', 测: 'cè', 检: 'jiǎn', 查: 'chá', 修: 'xiū',
  产: 'chǎn', 种: 'zhǒng', 植: 'zhí', 养: 'yǎng', 殖: 'zhí', 办: 'bàn',
  念: 'niàn', 玩: 'wán', 笑: 'xiào', 哭: 'kū', 怕: 'pà', 活: 'huó',
  死: 'sǐ', 回: 'huí', 答: 'dá', 问: 'wèn', 叫: 'jiào', 唱: 'chàng',
  跳: 'tiào', 跑: 'pǎo', 走: 'zǒu', 坐: 'zuò', 立: 'lì', 睡: 'shuì',
  // Common adverbs / modifiers
  不: 'bù', 没: 'méi', 都: 'dōu', 也: 'yě', 很: 'hěn', 太: 'tài',
  真: 'zhēn', 更: 'gèng', 最: 'zuì', 还: 'hái', 就: 'jiù', 才: 'cái',
  可: 'kě', 以: 'yǐ', 再: 'zài', 又: 'yòu', 只: 'zhǐ', 已: 'yǐ',
  经: 'jīng', 正: 'zhèng', 刚: 'gāng', 忽: 'hū', 然: 'rán', 突: 'tū',
  逐: 'zhú', 渐: 'jiàn', 赶: 'gǎn', 紧: 'jǐn', 随: 'suí', 便: 'biàn',
  何: 'hé', 处: 'chù', 各: 'gè', 每: 'měi', 另: 'lìng', 第: 'dì',
  次: 'cì', 边: 'biān', 旁: 'páng', 间: 'jiān', 非: 'fēi', 较: 'jiào',
  于: 'yú', 从: 'cóng', 朝: 'cháo', 按: 'àn', 将: 'jiāng', 跟: 'gēn',
  和: 'hé', 或: 'huò', 挺: 'tǐng', 尤: 'yóu', 其: 'qí', 即: 'jí',
  总: 'zǒng', 共: 'gòng', 几: 'jǐ', 半: 'bàn', 候: 'hòu',
  // Nouns — people & family
  家: 'jiā', 爸: 'bà', 妈: 'mā', 哥: 'gē', 弟: 'dì', 姐: 'jiě',
  妹: 'mèi', 儿: 'ér', 子: 'zǐ', 男: 'nán', 女: 'nǚ', 师: 'shī',
  生: 'shēng', 朋: 'péng', 友: 'yǒu', 老: 'lǎo', 先: 'xiān', 婴: 'yīng',
  // Nouns — places & objects (core)
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
  // Time & weather (core)
  今: 'jīn', 明: 'míng', 昨: 'zuó', 早: 'zǎo', 晚: 'wǎn', 白: 'bái',
  黑: 'hēi', 风: 'fēng', 雨: 'yǔ', 雪: 'xuě', 云: 'yún', 阳: 'yáng',
  // Time (extended)
  钟: 'zhōng', 表: 'biǎo', 秒: 'miǎo', 刻: 'kè', 周: 'zhōu', 末: 'mò',
  假: 'jià', 期: 'qī', 春: 'chūn', 夏: 'xià', 秋: 'qiū', 冬: 'dōng',
  底: 'dǐ', 初: 'chū', 星: 'xīng', 气: 'qì',
  // Language & learning
  汉: 'hàn', 语: 'yǔ', 英: 'yīng', 法: 'fǎ', 话: 'huà', 音: 'yīn',
  声: 'shēng', 调: 'diào', 笔: 'bǐ', 画: 'huà', 部: 'bù', 首: 'shǒu',
  // School & education
  校: 'xiào', 班: 'bān', 级: 'jí', 同: 'tóng', 教: 'jiào', 室: 'shì',
  桌: 'zhuō', 椅: 'yǐ', 板: 'bǎn', 粉: 'fěn', 图: 'tú', 照: 'zhào',
  片: 'piàn', 题: 'tí',
  // Technology & media
  电: 'diàn', 脑: 'nǎo', 机: 'jī', 联: 'lián', 网: 'wǎng', 息: 'xī',
  新: 'xīn', 闻: 'wén', 广: 'guǎng', 节: 'jié',
  影: 'yǐng', 乐: 'lè', 歌: 'gē', 曲: 'qǔ', 视: 'shì',
  // Sports & health
  运: 'yùn', 赛: 'sài', 球: 'qiú', 场: 'chǎng', 队: 'duì', 员: 'yuán',
  健: 'jiàn', 康: 'kāng', 身: 'shēn', 体: 'tǐ', 疾: 'jí', 病: 'bìng',
  医: 'yī', 院: 'yuàn', 药: 'yào', 护: 'hù', 士: 'shì', 果: 'guǒ',
  报: 'bào',
  // Abstract nouns
  理: 'lǐ', 由: 'yóu', 原: 'yuán', 因: 'yīn', 义: 'yì', 价: 'jià',
  值: 'zhí', 关: 'guān', 系: 'xì', 区: 'qū', 标: 'biāo', 规: 'guī',
  则: 'zé', 制: 'zhì', 度: 'dù', 政: 'zhèng', 策: 'cè', 律: 'lǜ',
  权: 'quán', 利: 'lì', 务: 'wù', 责: 'zé', 任: 'rèn', 案: 'àn',
  议: 'yì', 事: 'shì', 情: 'qíng', 品: 'pǐn', 号: 'hào', 密: 'mì',
  码: 'mǎ',
  // Adjectives — sensory & physical
  快: 'kuài', 慢: 'màn', 热: 'rè', 冷: 'lěng', 温: 'wēn', 暖: 'nuǎn',
  凉: 'liáng', 干: 'gān', 湿: 'shī', 亮: 'liàng', 暗: 'àn', 重: 'zhòng',
  轻: 'qīng', 粗: 'cū', 细: 'xì', 厚: 'hòu', 薄: 'báo', 深: 'shēn',
  浅: 'qiǎn', 宽: 'kuān', 窄: 'zhǎi', 远: 'yuǎn', 近: 'jìn', 旧: 'jiù',
  // Adjectives — appearance & quality
  美: 'měi', 丽: 'lì', 漂: 'piào', 难: 'nán', 聪: 'cōng', 笨: 'bèn',
  勤: 'qín', 劳: 'láo', 懒: 'lǎn', 勇: 'yǒng', 敢: 'gǎn', 礼: 'lǐ',
  貌: 'mào', 全: 'quán', 危: 'wēi', 险: 'xiǎn', 容: 'róng', 易: 'yì',
  简: 'jiǎn', 单: 'dān', 困: 'kùn', 杂: 'zá', 特: 'tè', 别: 'bié',
  般: 'bān', 普: 'pǔ', 通: 'tōng', 常: 'cháng', 奇: 'qí', 怪: 'guài',
  趣: 'qù', 无: 'wú',
  聊: 'liáo',
  // Adjectives — state & feeling
  忙: 'máng', 闲: 'xián', 累: 'lèi', 饿: 'è', 渴: 'kě', 饱: 'bǎo',
  醒: 'xǐng', 迟: 'chí', 坏: 'huài', 错: 'cuò', 贵: 'guì',
  宜: 'yí', 整: 'zhěng', 满: 'mǎn', 空: 'kōng', 急: 'jí',
  // Places — geography & buildings
  城: 'chéng', 市: 'shì', 村: 'cūn', 乡: 'xiāng', 镇: 'zhèn', 路: 'lù',
  街: 'jiē', 桥: 'qiáo', 湖: 'hú', 海: 'hǎi', 洋: 'yáng', 岛: 'dǎo',
  林: 'lín', 森: 'sēn', 沙: 'shā', 漠: 'mò', 田: 'tián', 农: 'nóng',
  公: 'gōng', 园: 'yuán', 物: 'wù', 博: 'bó', 馆: 'guǎn', 店: 'diàn',
  商: 'shāng', 饭: 'fàn', 酒: 'jiǔ', 宾: 'bīn', 站: 'zhàn',
  港: 'gǎng', 界: 'jiè', 世: 'shì', 楼: 'lóu', 层: 'céng', 梯: 'tī',
  // Food & drink
  米: 'mǐ', 面: 'miàn', 包: 'bāo', 馒: 'mán', 饺: 'jiǎo', 汤: 'tāng',
  菜: 'cài', 肉: 'ròu', 鸡: 'jī', 鸭: 'yā', 蛋: 'dàn', 奶: 'nǎi',
  茶: 'chá', 咖: 'kā', 啡: 'fēi', 糖: 'táng', 盐: 'yán', 油: 'yóu',
  酱: 'jiàng', 醋: 'cù', 豆: 'dòu', 腐: 'fǔ', 蔬: 'shū', 苹: 'píng',
  香: 'xiāng', 蕉: 'jiāo', 葡: 'pú', 萄: 'táo', 瓜: 'guā',
  // Body parts
  眼: 'yǎn', 睛: 'jīng', 耳: 'ěr', 朵: 'duǒ', 鼻: 'bí', 嘴: 'zuǐ',
  唇: 'chún', 牙: 'yá', 齿: 'chǐ', 舌: 'shé', 脖: 'bó', 肩: 'jiān',
  背: 'bèi', 胸: 'xiōng', 腹: 'fù', 腰: 'yāo', 腿: 'tuǐ', 膝: 'xī',
  趾: 'zhǐ', 皮: 'pí', 骨: 'gǔ', 血: 'xuè',
  // Animals
  鹅: 'é', 猪: 'zhū', 兔: 'tù', 鼠: 'shǔ', 蛇: 'shé', 龙: 'lóng',
  虎: 'hǔ', 狮: 'shī', 鹿: 'lù', 猴: 'hóu', 象: 'xiàng', 蝴: 'hú',
  蝶: 'dié', 蜜: 'mì', 蜂: 'fēng', 蚂: 'mǎ', 蚁: 'yǐ',
  // Nature & weather
  光: 'guāng', 雷: 'léi', 雾: 'wù', 霜: 'shuāng', 冰: 'bīng', 泉: 'quán',
  瀑: 'pù', 崖: 'yá', 峡: 'xiá', 谷: 'gǔ', 野: 'yě', 荒: 'huāng',
  // Clothes & accessories
  衣: 'yī', 裤: 'kù', 裙: 'qún', 鞋: 'xié', 袜: 'wà', 帽: 'mào',
  围: 'wéi', 巾: 'jīn', 套: 'tào', 领: 'lǐng',
  // Transport
  飞: 'fēi', 汽: 'qì', 行: 'xíng', 船: 'chuán',
  // Colours
  红: 'hóng', 黄: 'huáng', 蓝: 'lán', 绿: 'lǜ', 紫: 'zǐ', 棕: 'zōng',
  灰: 'huī',
  // Measure words
  条: 'tiáo', 张: 'zhāng', 件: 'jiàn', 双: 'shuāng', 群: 'qún', 堆: 'duī',
  列: 'liè', 类: 'lèi', 份: 'fèn', 段: 'duàn', 篇: 'piān',
  // Misc common characters
  起: 'qǐ', 独: 'dú', 方: 'fāng', 床: 'chuáng', 打: 'dǎ', 住: 'zhù',
};

/** Total number of characters in the built-in dictionary. */
const DICT_SIZE = Object.keys(PINYIN_DICT).length;

/* ------------------------------------------------------------------ */
/* Display renderer (structured output with styling)                  */
/* ------------------------------------------------------------------ */

function renderDisplay(tokens: Token[], format: OutputFormat): ReactNode {
  const nodes: ReactNode[] = [];
  const addSpaces = format !== 'ruby';
  let prev: SegType | null = null;

  tokens.forEach((tok, i) => {
    const seg = segType(tok);
    if (addSpaces && needsSpace(seg, prev)) {
      nodes.push(<span key={`sp-${i}`} aria-hidden="true"> </span>);
    }

    if (tok.type === 'han-known' && tok.pinyin) {
      if (format === 'ruby') {
        nodes.push(
          <ruby key={i} className="py-ruby">
            {tok.char}
            <rt className="py-rt">{tok.pinyin}</rt>
          </ruby>,
        );
      } else {
        nodes.push(
          <span key={i} className="py-syl">
            {formatPinyin(tok.pinyin, format)}
          </span>,
        );
      }
    } else if (tok.type === 'han-unknown') {
      nodes.push(
        <span
          key={i}
          className="py-unknown"
          title="Unknown character — not in the dictionary"
        >
          {tok.char}
        </span>,
      );
    } else if (tok.type === 'space') {
      nodes.push(<span key={i}> </span>);
    } else {
      nodes.push(<span key={i}>{tok.char}</span>);
    }
    prev = seg;
  });

  return nodes;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function PinyinConverter() {
  const [input, setInput] = useState<string>('');
  const [format, setFormat] = useState<OutputFormat>('tone-marks');
  const [copied, setCopied] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  const speakSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  const tokens = useMemo(() => tokenize(input), [input]);

  const plainText = useMemo(
    () => buildPlainText(tokens, format),
    [tokens, format],
  );

  const stats = useMemo(() => {
    let converted = 0;
    let unknown = 0;
    let total = 0;
    for (const ch of input) {
      if (isHan(ch)) {
        total += 1;
        if (PINYIN_DICT[ch]) converted += 1;
        else unknown += 1;
      }
    }
    return { converted, unknown, total };
  }, [input]);

  // Stop any ongoing speech when the component unmounts.
  useEffect(() => {
    return () => {
      if (speakSupported) window.speechSynthesis.cancel();
    };
  }, [speakSupported]);

  const handleCopy = useCallback(async () => {
    if (!plainText) return;
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = plainText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch {
        /* ignore */
      }
      document.body.removeChild(textarea);
    }
    setTimeout(() => setCopied(false), 1800);
  }, [plainText]);

  const handleSpeak = useCallback(() => {
    if (!speakSupported || !input) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(input);
    utter.lang = 'zh-CN';
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utter);
  }, [speakSupported, input, speaking]);

  const handleDownload = useCallback(() => {
    if (!plainText) return;
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinyin-${format}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [plainText, format]);

  const display = useMemo(() => renderDisplay(tokens, format), [tokens, format]);

  const hasOutput = plainText.length > 0;

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
        .py-ruby { ruby-position: over; margin: 0 0.05em; }
        .py-rt {
          font-size: 0.5em;
          line-height: 1;
          color: #D4AF37;
          font-family: ui-sans-serif, system-ui, sans-serif;
          text-transform: lowercase;
          letter-spacing: 0.02em;
          padding-bottom: 0.15em;
        }
        .py-syl { color: #FFD700; }
        .py-unknown {
          color: #FF8C66;
          border-bottom: 1px dotted #FF8C66;
          text-decoration: none;
        }
      `}</style>

      {/* Corner ornament */}
      <span
        aria-hidden="true"
        className="block text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4"
      >
        拼音转换 · Live Tool
      </span>

      {/* Format toggle */}
      <div className="mb-4">
        <span className="block text-xs font-medium text-[#F5F0E8]/60 mb-2">
          Output format
        </span>
        <div
          role="group"
          aria-label="Output format"
          className="flex flex-wrap gap-2"
        >
          {FORMAT_OPTIONS.map((opt) => {
            const active = opt.id === format;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFormat(opt.id)}
                className={
                  'px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-colors ' +
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
                <span className="mr-1.5">{opt.label}</span>
                <span className="opacity-60 font-mono">{opt.sample}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input */}
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
        <span className="text-xs text-[#F5F0E8]/50 self-center mr-1">
          Try:
        </span>
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
          <span className="text-sm font-medium text-[#F5F0E8]/80">
            Result
          </span>
          {stats.total > 0 && (
            <span className="text-xs text-[#F5F0E8]/50">
              {stats.converted} converted
              {stats.unknown > 0 && (
                <span className="text-[#FF8C66]">
                  {' '}/ {stats.unknown} unknown
                </span>
              )}
              {' '}/ {stats.total} chars
            </span>
          )}
        </div>

        <div
          className={
            'min-h-[96px] rounded-xl border px-4 py-3 text-lg leading-relaxed ' +
            (hasOutput
              ? 'border-[#D4AF37]/30 bg-[#1a0808]/70'
              : 'border-dashed border-[#D4AF37]/20 bg-[#1a0808]/40')
          }
        >
          {hasOutput ? (
            <p
              className={
                format === 'ruby'
                  ? 'text-2xl sm:text-3xl text-[#F5F0E8] font-serif'
                  : 'text-[#F5F0E8] font-serif'
              }
            >
              {display}
            </p>
          ) : (
            <p className="text-[#F5F0E8]/30 font-serif">
              Your pinyin conversion will appear here.
            </p>
          )}
        </div>

        {/* Conversion stats bar */}
        {stats.total > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#F5F0E8]/60">
            <span>
              Coverage:{' '}
              <span className="text-[#D4AF37] font-semibold">
                {Math.round((stats.converted / stats.total) * 100)}%
              </span>
            </span>
            <span>Converted: {stats.converted}</span>
            <span>Unknown: {stats.unknown}</span>
            <span>Total Han: {stats.total}</span>
            <span className="text-[#F5F0E8]/40">
              Dictionary: {DICT_SIZE} characters
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!hasOutput}
          className="px-4 py-2 text-sm rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!hasOutput}
          className="px-4 py-2 text-sm rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Download .txt
        </button>

        <button
          type="button"
          onClick={handleSpeak}
          disabled={!hasOutput || !speakSupported}
          title={
            speakSupported
              ? 'Pronounce the text in Chinese'
              : 'Speech synthesis is not supported in this browser'
          }
          className="px-4 py-2 text-sm rounded-lg text-[#1a0808] font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          style={{
            background:
              'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
          }}
        >
          {speaking ? 'Stop' : 'Listen'}
        </button>
      </div>

      {/* Legend */}
      {stats.unknown > 0 && (
        <p className="mt-3 text-xs text-[#F5F0E8]/50">
          <span className="py-unknown">Underlined</span> characters are not yet
          in the dictionary and are shown in their original form.
        </p>
      )}

      <p className="mt-5 text-xs text-[#F5F0E8]/40 leading-relaxed">
        Built-in dictionary of {DICT_SIZE} high-frequency characters covering
        HSK 1-3 core vocabulary. Polyphonic characters use their most common
        reading. For precise tonal context, cross-check with a full dictionary.
      </p>
    </div>
  );
}




