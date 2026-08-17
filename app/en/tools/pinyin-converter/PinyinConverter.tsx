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
  // ---- HSK 4-6 extended vocabulary (grouped by pinyin initial) ----
  // pinyin initial: a  (1 chars)
  岸: 'àn',
  // pinyin initial: b  (15 chars)
  版: 'bǎn', 悲: 'bēi', 倍: 'bèi', 逼: 'bī', 比: 'bǐ', 必: 'bì',
  壁: 'bì', 避: 'bì', 兵: 'bīng', 饼: 'bǐng', 拨: 'bō', 波: 'bō',
  捕: 'bǔ', 补: 'bǔ', 哺: 'bǔ',
  // pinyin initial: c  (105 chars)
  擦: 'cā', 猜: 'cāi', 材: 'cái', 裁: 'cái', 财: 'cái', 采: 'cǎi',
  踩: 'cǎi', 餐: 'cān', 参: 'cān', 惭: 'cán', 惨: 'cǎn', 灿: 'càn',
  仓: 'cāng', 舱: 'cāng', 藏: 'cáng', 操: 'cāo', 册: 'cè', 叉: 'chā',
  差: 'chā', 察: 'chá', 岔: 'chà', 拆: 'chāi', 柴: 'chái', 馋: 'chán',
  缠: 'chán', 颤: 'chàn', 昌: 'chāng', 猖: 'chāng', 尝: 'cháng', 肠: 'cháng',
  厂: 'chǎng', 敞: 'chǎng', 畅: 'chàng', 抄: 'chāo', 钞: 'chāo', 潮: 'cháo',
  吵: 'chǎo', 炒: 'chǎo', 彻: 'chè', 撤: 'chè', 尘: 'chén', 沉: 'chén',
  陈: 'chén', 晨: 'chén', 趁: 'chèn', 称: 'chēng', 撑: 'chēng', 呈: 'chéng',
  诚: 'chéng', 承: 'chéng', 乘: 'chéng', 惩: 'chéng', 澄: 'chéng', 程: 'chéng',
  池: 'chí', 驰: 'chí', 匙: 'chí', 尺: 'chǐ', 耻: 'chǐ', 斥: 'chì',
  赤: 'chì', 翅: 'chì', 充: 'chōng', 冲: 'chōng', 虫: 'chóng', 崇: 'chóng',
  宠: 'chǒng', 抽: 'chōu', 仇: 'chóu', 愁: 'chóu', 丑: 'chǒu', 臭: 'chòu',
  出: 'chū', 除: 'chú', 厨: 'chú', 楚: 'chǔ', 触: 'chù', 川: 'chuān',
  穿: 'chuān', 传: 'chuán', 喘: 'chuǎn', 串: 'chuàn', 窗: 'chuāng', 吹: 'chuī',
  垂: 'chuí', 锤: 'chuí', 纯: 'chún', 蠢: 'chǔn', 戳: 'chuō', 瓷: 'cí',
  慈: 'cí', 辞: 'cí', 磁: 'cí', 刺: 'cì', 赐: 'cì', 匆: 'cōng',
  凑: 'còu', 促: 'cù', 窜: 'cuàn', 催: 'cuī', 摧: 'cuī', 存: 'cún',
  寸: 'cùn', 搓: 'cuō', 措: 'cuò',
  // pinyin initial: d  (61 chars)
  戴: 'dài', 丹: 'dān', 担: 'dān', 胆: 'dǎn', 弹: 'dàn', 淡: 'dàn',
  当: 'dāng', 党: 'dǎng', 档: 'dàng', 刀: 'dāo', 导: 'dǎo', 倒: 'dǎo',
  盗: 'dào', 稻: 'dào', 德: 'dé', 灯: 'dēng', 登: 'dēng', 凳: 'dèng',
  滴: 'dī', 敌: 'dí', 抵: 'dǐ', 递: 'dì', 典: 'diǎn', 垫: 'diàn',
  淀: 'diàn', 奠: 'diàn', 殿: 'diàn', 雕: 'diāo', 吊: 'diào', 钓: 'diào',
  掉: 'diào', 跌: 'diē', 叠: 'dié', 丁: 'dīng', 盯: 'dīng', 顶: 'dǐng',
  订: 'dìng', 钉: 'dìng', 丢: 'diū', 懂: 'dǒng', 洞: 'dòng', 兜: 'dōu',
  斗: 'dǒu', 抖: 'dǒu', 陡: 'dǒu', 逗: 'dòu', 毒: 'dú', 堵: 'dǔ',
  杜: 'dù', 肚: 'dù', 渡: 'dù', 端: 'duān', 断: 'duàn', 锻: 'duàn',
  兑: 'duì', 吨: 'dūn', 蹲: 'dūn', 顿: 'dùn', 夺: 'duó', 躲: 'duǒ',
  惰: 'duò',
  // pinyin initial: e  (3 chars)
  额: 'é', 恶: 'è', 恩: 'ēn',
  // pinyin initial: f  (53 chars)
  罚: 'fá', 帆: 'fān', 烦: 'fán', 繁: 'fán', 凡: 'fán', 反: 'fǎn',
  返: 'fǎn', 犯: 'fàn', 范: 'fàn', 泛: 'fàn', 防: 'fáng', 妨: 'fáng',
  仿: 'fǎng', 访: 'fǎng', 纺: 'fǎng', 肥: 'féi', 肺: 'fèi', 费: 'fèi',
  芬: 'fēn', 纷: 'fēn', 坟: 'fén', 焚: 'fén', 奋: 'fèn', 丰: 'fēng',
  封: 'fēng', 逢: 'féng', 缝: 'fèng', 讽: 'fěng', 奉: 'fèng', 佛: 'fó',
  否: 'fǒu', 夫: 'fū', 肤: 'fū', 跗: 'fū', 扶: 'fú', 服: 'fú',
  浮: 'fú', 符: 'fú', 幅: 'fú', 福: 'fú', 抚: 'fǔ', 斧: 'fǔ',
  府: 'fǔ', 俯: 'fǔ', 辅: 'fǔ', 父: 'fù', 赴: 'fù', 附: 'fù',
  负: 'fù', 富: 'fù', 赋: 'fù', 覆: 'fù', 風: 'fēng',
  // pinyin initial: g  (71 chars)
  该: 'gāi', 盖: 'gài', 概: 'gài', 杆: 'gān', 秆: 'gǎn', 肝: 'gān',
  赣: 'gàn', 纲: 'gāng', 钢: 'gāng', 杠: 'gàng', 糕: 'gāo', 搞: 'gǎo',
  稿: 'gǎo', 胳: 'gē', 鸽: 'gē', 搁: 'gē', 割: 'gē', 阁: 'gé',
  革: 'gé', 格: 'gé', 葛: 'gé', 隔: 'gé', 根: 'gēn', 耕: 'gēng',
  梗: 'gěng', 工: 'gōng', 弓: 'gōng', 功: 'gōng', 攻: 'gōng', 供: 'gōng',
  宫: 'gōng', 恭: 'gōng', 巩: 'gǒng', 贡: 'gòng', 钩: 'gōu', 构: 'gòu',
  购: 'gòu', 垢: 'gòu', 够: 'gòu', 估: 'gū', 姑: 'gū', 孤: 'gū',
  辜: 'gū', 古: 'gǔ', 股: 'gǔ', 鼓: 'gǔ', 固: 'gù', 故: 'gù',
  顾: 'gù', 雇: 'gù', 寡: 'guǎ', 挂: 'guà', 乖: 'guāi', 拐: 'guǎi',
  观: 'guān', 官: 'guān', 冠: 'guān', 管: 'guǎn', 贯: 'guàn', 惯: 'guàn',
  灌: 'guàn', 罐: 'guàn', 逛: 'guàng', 归: 'guī', 龟: 'guī', 诡: 'guǐ',
  跪: 'guì', 滚: 'gǔn', 棍: 'gùn', 锅: 'guō', 裹: 'guǒ',
  // pinyin initial: h  (78 chars)
  哈: 'hā', 孩: 'hái', 害: 'hài', 骇: 'hài', 邯: 'hán', 含: 'hán',
  寒: 'hán', 汗: 'hàn', 旱: 'hàn', 喊: 'hǎn', 捍: 'hàn', 焊: 'hàn',
  航: 'háng', 毫: 'háo', 豪: 'háo', 耗: 'hào', 浩: 'hào', 禾: 'hé',
  合: 'hé', 贺: 'hè', 荷: 'hé', 核: 'hé', 盒: 'hé', 貉: 'hé',
  吓: 'hè', 痕: 'hén', 狠: 'hěn', 恨: 'hèn', 恒: 'héng', 横: 'héng',
  衡: 'héng', 轰: 'hōng', 哄: 'hǒng', 宏: 'hóng', 洪: 'hóng', 虹: 'hóng',
  吼: 'hǒu', 呼: 'hū', 弧: 'hú', 狐: 'hú', 胡: 'hú', 壶: 'hú',
  户: 'hù', 哗: 'huā', 华: 'huá', 猾: 'huá', 滑: 'huá', 化: 'huà',
  环: 'huán', 缓: 'huǎn', 幻: 'huàn', 唤: 'huàn', 焕: 'huàn', 患: 'huàn',
  慌: 'huāng', 皇: 'huáng', 煌: 'huáng', 晃: 'huǎng', 谎: 'huǎng', 挥: 'huī',
  辉: 'huī', 恢: 'huī', 悔: 'huǐ', 毁: 'huǐ', 汇: 'huì', 绘: 'huì',
  贿: 'huì', 昏: 'hūn', 婚: 'hūn', 浑: 'hún', 魂: 'hún', 混: 'hùn',
  伙: 'huǒ', 货: 'huò', 获: 'huò', 祸: 'huò', 惑: 'huò', 霍: 'huò',
  // pinyin initial: j  (141 chars)
  讥: 'jī', 击: 'jī', 饥: 'jī', 肌: 'jī', 积: 'jī', 基: 'jī',
  绩: 'jì', 缉: 'jī', 激: 'jī', 及: 'jí', 吉: 'jí', 极: 'jí',
  棘: 'jí', 集: 'jí', 嫉: 'jí', 籍: 'jí', 挤: 'jǐ', 脊: 'jǐ',
  纪: 'jì', 技: 'jì', 际: 'jì', 剂: 'jì', 季: 'jì', 既: 'jì',
  迹: 'jì', 寂: 'jì', 祭: 'jì', 寄: 'jì', 佳: 'jiā', 嘉: 'jiā',
  夹: 'jiā', 荚: 'jiá', 甲: 'jiǎ', 钾: 'jiǎ', 驾: 'jià', 架: 'jià',
  坚: 'jiān', 歼: 'jiān', 监: 'jiān', 艰: 'jiān', 兼: 'jiān', 奸: 'jiān',
  茧: 'jiǎn', 剪: 'jiǎn', 碱: 'jiǎn', 剑: 'jiàn', 贱: 'jiàn', 舰: 'jiàn',
  践: 'jiàn', 鉴: 'jiàn', 键: 'jiàn', 箭: 'jiàn', 江: 'jiāng', 僵: 'jiāng',
  姜: 'jiāng', 浆: 'jiāng', 奖: 'jiǎng', 讲: 'jiǎng', 匠: 'jiàng', 交: 'jiāo',
  郊: 'jiāo', 浇: 'jiāo', 娇: 'jiāo', 骄: 'jiāo', 胶: 'jiāo', 焦: 'jiāo',
  角: 'jiǎo', 狡: 'jiǎo', 搅: 'jiǎo', 轿: 'jiào', 揭: 'jiē', 皆: 'jiē',
  截: 'jié', 竭: 'jié', 介: 'jiè', 戒: 'jiè', 届: 'jiè', 借: 'jiè',
  斤: 'jīn', 金: 'jīn', 津: 'jīn', 筋: 'jīn', 仅: 'jǐn', 锦: 'jǐn',
  谨: 'jǐn', 尽: 'jìn', 禁: 'jìn', 荆: 'jīng', 惊: 'jīng', 晶: 'jīng',
  精: 'jīng', 鲸: 'jīng', 井: 'jǐng', 颈: 'jǐng', 景: 'jǐng', 警: 'jǐng',
  净: 'jìng', 竞: 'jìng', 竟: 'jìng', 敬: 'jìng', 境: 'jìng', 镜: 'jìng',
  静: 'jìng', 纠: 'jiū', 久: 'jiǔ', 玖: 'jiǔ', 救: 'jiù', 舅: 'jiù',
  拘: 'jū', 驹: 'jū', 桔: 'jú', 局: 'jú', 菊: 'jú', 橘: 'jú',
  举: 'jǔ', 矩: 'jǔ', 巨: 'jù', 拒: 'jù', 具: 'jù', 俱: 'jù',
  剧: 'jù', 据: 'jù', 距: 'jù', 惧: 'jù', 锯: 'jù', 聚: 'jù',
  捐: 'juān', 卷: 'juǎn', 倦: 'juàn', 绢: 'juàn', 绝: 'jué', 掘: 'jué',
  崛: 'jué', 军: 'jūn', 均: 'jūn', 钧: 'jūn', 君: 'jūn', 俊: 'jùn',
  峻: 'jùn', 骏: 'jùn', 竣: 'jùn',
  // pinyin initial: k  (55 chars)
  科: 'kē', 卡: 'kǎ', 楷: 'kǎi', 刊: 'kān', 勘: 'kān', 慷: 'kāng',
  糠: 'kāng', 扛: 'káng', 抗: 'kàng', 炕: 'kàng', 拷: 'kǎo', 烤: 'kǎo',
  靠: 'kào', 棵: 'kē', 颗: 'kē', 蝌: 'kē', 壳: 'ké', 咳: 'ké',
  克: 'kè', 客: 'kè', 肯: 'kěn', 啃: 'kěn', 坑: 'kēng', 孔: 'kǒng',
  恐: 'kǒng', 控: 'kòng', 叩: 'kòu', 扣: 'kòu', 枯: 'kū', 窟: 'kū',
  苦: 'kǔ', 库: 'kù', 酷: 'kù', 夸: 'kuā', 垮: 'kuǎ', 跨: 'kuà',
  块: 'kuài', 筷: 'kuài', 款: 'kuǎn', 狂: 'kuáng', 况: 'kuàng', 旷: 'kuàng',
  矿: 'kuàng', 框: 'kuàng', 亏: 'kuī', 葵: 'kuí', 奎: 'kuí', 魁: 'kuí',
  愧: 'kuì', 馈: 'kuì', 昆: 'kūn', 捆: 'kǔn', 扩: 'kuò', 括: 'kuò',
  阔: 'kuò',
  // pinyin initial: l  (65 chars)
  拉: 'lā', 啦: 'lā', 喇: 'lǎ', 腊: 'là', 蜡: 'là', 落: 'luò',
  栏: 'lán', 拦: 'lán', 篮: 'lán', 兰: 'lán', 烂: 'làn', 滥: 'làn',
  郎: 'láng', 狼: 'láng', 廊: 'láng', 朗: 'lǎng', 浪: 'làng', 捞: 'lāo',
  牢: 'láo', 佬: 'lǎo', 勒: 'lè', 蕾: 'lěi', 垒: 'lěi', 泪: 'lèi',
  愣: 'lèng', 厘: 'lí', 梨: 'lí', 犁: 'lí', 离: 'lí', 璃: 'lí',
  梁: 'liáng', 粮: 'liáng', 良: 'liáng', 辆: 'liàng', 谅: 'liàng', 晾: 'liàng',
  量: 'liáng', 猎: 'liè', 裂: 'liè', 邻: 'lín', 临: 'lín', 淋: 'lín',
  羚: 'líng', 龄: 'líng', 铃: 'líng', 陵: 'líng', 灵: 'líng', 令: 'lìng',
  溜: 'liū', 硫: 'liú', 留: 'liú', 流: 'liú', 柳: 'liǔ', 漏: 'lòu',
  露: 'lù', 驴: 'lǘ', 旅: 'lǚ', 乱: 'luàn', 轮: 'lún', 罗: 'luó',
  螺: 'luó', 骡: 'luó', 裸: 'luǒ', 洛: 'luò', 骆: 'luò',
  // pinyin initial: m  (58 chars)
  玛: 'mǎ', 麦: 'mài', 迈: 'mài', 脉: 'mài', 瞒: 'mán', 蛮: 'mán',
  漫: 'màn', 盲: 'máng', 茫: 'máng', 毛: 'máo', 矛: 'máo', 锚: 'máo',
  冒: 'mào', 贸: 'mào', 眉: 'méi', 梅: 'méi', 媒: 'méi', 煤: 'méi',
  霉: 'méi', 魅: 'mèi', 闷: 'mèn', 蒙: 'mēng', 猛: 'měng', 梦: 'mèng',
  迷: 'mí', 谜: 'mí', 秘: 'mì', 棉: 'mián', 免: 'miǎn', 勉: 'miǎn',
  苗: 'miáo', 妙: 'miào', 庙: 'miào', 灭: 'miè', 民: 'mín', 敏: 'mǐn',
  名: 'míng', 鸣: 'míng', 铭: 'míng', 命: 'mìng', 谬: 'miù', 摸: 'mō',
  模: 'mó', 膜: 'mó', 磨: 'mó', 魔: 'mó', 抹: 'mǒ', 莫: 'mò',
  墨: 'mò', 默: 'mò', 母: 'mǔ', 慕: 'mù', 墓: 'mù', 暮: 'mù',
  木: 'mù', 沐: 'mù', 牧: 'mù', 穆: 'mù',
  // pinyin initial: n  (28 chars)
  纳: 'nà', 乃: 'nǎi', 耐: 'nài', 囊: 'náng', 闹: 'nào', 恼: 'nǎo',
  馁: 'něi', 内: 'nèi', 嫩: 'nèn', 尼: 'ní', 泥: 'ní', 拟: 'nǐ',
  逆: 'nì', 娘: 'niáng', 尿: 'niào', 聂: 'niè', 宁: 'níng', 凝: 'níng',
  拧: 'níng', 纽: 'niǔ', 扭: 'niǔ', 弄: 'nòng', 奴: 'nú', 努: 'nǔ',
  怒: 'nù', 虐: 'nüè', 挪: 'nuó', 诺: 'nuò',
  // pinyin initial: o  (5 chars)
  哦: 'ò', 欧: 'ōu', 鸥: 'ōu', 偶: 'ǒu', 藕: 'ǒu',
  // pinyin initial: p  (55 chars)
  胖: 'pàng', 拍: 'pāi', 牌: 'pái', 派: 'pài', 盘: 'pán', 判: 'pàn',
  叛: 'pàn', 庞: 'páng', 抛: 'pāo', 袍: 'páo', 泡: 'pào', 培: 'péi',
  赔: 'péi', 陪: 'péi', 佩: 'pèi', 喷: 'pēn', 盆: 'pén', 蓬: 'péng',
  棚: 'péng', 篷: 'péng', 膨: 'péng', 捧: 'pěng', 批: 'pī', 披: 'pī',
  劈: 'pī', 疲: 'pí', 脾: 'pí', 匹: 'pǐ', 屁: 'pì', 譬: 'pì',
  偏: 'piān', 骗: 'piàn', 飘: 'piāo', 票: 'piào', 拼: 'pīn', 贫: 'pín',
  频: 'pín', 聘: 'pìn', 乒: 'pīng', 评: 'píng', 凭: 'píng', 屏: 'píng',
  瓶: 'píng', 萍: 'píng', 坡: 'pō', 泼: 'pō', 颇: 'pō', 婆: 'pó',
  迫: 'pò', 破: 'pò', 魄: 'pò', 扑: 'pū', 铺: 'pū', 朴: 'pǔ',
  谱: 'pǔ',
  // pinyin initial: q  (60 chars)
  窍: 'qiào', 欺: 'qī', 漆: 'qī', 齐: 'qí', 祈: 'qí', 骑: 'qí',
  棋: 'qí', 旗: 'qí', 企: 'qǐ', 岂: 'qǐ', 弃: 'qì', 契: 'qì',
  器: 'qì', 掐: 'qiā', 迁: 'qiān', 牵: 'qiān', 铅: 'qiān', 谦: 'qiān',
  签: 'qiān', 潜: 'qián', 遣: 'qiǎn', 欠: 'qiàn', 枪: 'qiāng', 墙: 'qiáng',
  强: 'qiáng', 抢: 'qiǎng', 悄: 'qiāo', 敲: 'qiāo', 瞧: 'qiáo', 巧: 'qiǎo',
  俏: 'qiào', 切: 'qiē', 茄: 'qié', 且: 'qiě', 怯: 'qiè', 窃: 'qiè',
  亲: 'qīn', 琴: 'qín', 禽: 'qín', 寝: 'qǐn', 青: 'qīng', 倾: 'qīng',
  清: 'qīng', 晴: 'qíng', 氰: 'qíng', 请: 'qǐng', 庆: 'qìng', 丘: 'qiū',
  求: 'qiú', 驱: 'qū', 屈: 'qū', 躯: 'qū', 渠: 'qú', 取: 'qǔ',
  娶: 'qǔ', 圈: 'quān', 拳: 'quán', 劝: 'quàn', 券: 'quàn', 缺: 'quē',
  // pinyin initial: r  (23 chars)
  燃: 'rán', 染: 'rǎn', 嚷: 'rǎng', 绕: 'rào', 惹: 'rě', 忍: 'rěn',
  刃: 'rèn', 扔: 'rēng', 仍: 'réng', 蓉: 'róng', 荣: 'róng', 融: 'róng',
  柔: 'róu', 如: 'rú', 乳: 'rǔ', 辱: 'rǔ', 入: 'rù', 软: 'ruǎn',
  锐: 'ruì', 瑞: 'ruì', 润: 'rùn', 若: 'ruò', 弱: 'ruò',
  // pinyin initial: s  (128 chars)
  撒: 'sā', 洒: 'sǎ', 萨: 'sà', 腮: 'sāi', 塞: 'sāi', 散: 'sàn',
  丧: 'sāng', 桑: 'sāng', 嗓: 'sǎng', 扫: 'sǎo', 嫂: 'sǎo', 色: 'sè',
  僧: 'sēng', 杀: 'shā', 纱: 'shā', 傻: 'shǎ', 煞: 'shà', 晒: 'shài',
  删: 'shān', 杉: 'shān', 衫: 'shān', 扇: 'shàn', 闪: 'shǎn', 陕: 'shǎn',
  善: 'shàn', 汕: 'shàn', 赏: 'shǎng', 尚: 'shàng', 捎: 'shāo', 烧: 'shāo',
  稍: 'shāo', 邵: 'shào', 绍: 'shào', 奢: 'shē', 赊: 'shē', 舍: 'shě',
  设: 'shè', 射: 'shè', 涉: 'shè', 摄: 'shè', 社: 'shè', 申: 'shēn',
  伸: 'shēn', 呻: 'shēn', 绅: 'shēn', 神: 'shén', 沈: 'shěn', 审: 'shěn',
  婶: 'shěn', 肾: 'shèn', 甚: 'shèn', 渗: 'shèn', 慎: 'shèn', 升: 'shēng',
  胜: 'shèng', 盛: 'shèng', 剩: 'shèng', 尸: 'shī', 失: 'shī', 施: 'shī',
  诗: 'shī', 石: 'shí', 拾: 'shí', 食: 'shí', 蚀: 'shí', 史: 'shǐ',
  矢: 'shǐ', 驶: 'shǐ', 屎: 'shǐ', 氏: 'shì', 势: 'shì', 侍: 'shì',
  守: 'shǒu', 寿: 'shòu', 受: 'shòu', 狩: 'shòu', 兽: 'shòu', 瘦: 'shòu',
  梳: 'shū', 殊: 'shū', 抒: 'shū', 输: 'shū', 熟: 'shú', 薯: 'shǔ',
  曙: 'shǔ', 术: 'shù', 述: 'shù', 竖: 'shù', 数: 'shù', 漱: 'shù',
  帅: 'shuài', 衰: 'shuāi', 甩: 'shuǎi', 拴: 'shuān', 爽: 'shuǎng', 税: 'shuì',
  顺: 'shùn', 舜: 'shùn', 硕: 'shuò', 丝: 'sī', 司: 'sī', 私: 'sī',
  斯: 'sī', 撕: 'sī', 寺: 'sì', 似: 'sì', 饲: 'sì', 嗣: 'sì',
  松: 'sōng', 耸: 'sǒng', 颂: 'sòng', 诵: 'sòng', 苏: 'sū', 俗: 'sú',
  宿: 'sù', 粟: 'sù', 塑: 'sù', 酸: 'suān', 蒜: 'suàn', 虽: 'suī',
  髓: 'suǐ', 岁: 'suì', 碎: 'suì', 孙: 'sūn', 损: 'sǔn', 缩: 'suō',
  锁: 'suǒ', 索: 'suǒ',
  // pinyin initial: t  (61 chars)
  塔: 'tǎ', 踏: 'tà', 泰: 'tài', 贪: 'tān', 摊: 'tān', 瘫: 'tān',
  坛: 'tán', 谈: 'tán', 痰: 'tán', 坦: 'tǎn', 毯: 'tǎn', 叹: 'tàn',
  炭: 'tàn', 探: 'tàn', 碳: 'tàn', 塘: 'táng', 躺: 'tǎng', 烫: 'tàng',
  掏: 'tāo', 桃: 'táo', 逃: 'táo', 淘: 'táo', 陶: 'táo', 腾: 'téng',
  誊: 'téng', 踢: 'tī', 蹄: 'tí', 替: 'tì', 添: 'tiān', 甜: 'tián',
  填: 'tián', 挑: 'tiāo', 贴: 'tiē', 铁: 'tiě', 厅: 'tīng', 汀: 'tīng',
  艇: 'tǐng', 铜: 'tóng', 童: 'tóng', 桶: 'tǒng', 筒: 'tǒng', 痛: 'tòng',
  偷: 'tōu', 投: 'tóu', 透: 'tòu', 徒: 'tú', 途: 'tú', 涂: 'tú',
  屠: 'tú', 土: 'tǔ', 吐: 'tǔ', 推: 'tuī', 颓: 'tuí', 退: 'tuì',
  吞: 'tūn', 屯: 'tún', 拖: 'tuō', 脱: 'tuō', 鸵: 'tuó', 妥: 'tuǒ',
  椭: 'tuǒ',
  // pinyin initial: w  (44 chars)
  挖: 'wā', 娃: 'wá', 瓦: 'wǎ', 歪: 'wāi', 弯: 'wān', 湾: 'wān',
  丸: 'wán', 顽: 'wán', 挽: 'wǎn', 婉: 'wǎn', 腕: 'wàn', 汪: 'wāng',
  王: 'wáng', 亡: 'wáng', 威: 'wēi', 偎: 'wēi', 微: 'wēi', 巍: 'wēi',
  违: 'wéi', 尾: 'wěi', 委: 'wěi', 卫: 'wèi', 未: 'wèi', 伪: 'wèi',
  胃: 'wèi', 喂: 'wèi', 慰: 'wèi', 稳: 'wěn', 翁: 'wēng', 窝: 'wō',
  沃: 'wò', 卧: 'wò', 握: 'wò', 乌: 'wū', 污: 'wū', 屋: 'wū',
  芜: 'wú', 吴: 'wú', 午: 'wǔ', 武: 'wǔ', 捂: 'wǔ', 舞: 'wǔ',
  误: 'wù', 悟: 'wù',
  // pinyin initial: x  (107 chars)
  昔: 'xī', 牺: 'xī', 稀: 'xī', 熙: 'xī', 溪: 'xī', 锡: 'xī',
  席: 'xí', 媳: 'xí', 铣: 'xǐ', 洗: 'xǐ', 隙: 'xì', 戏: 'xì',
  瞎: 'xiā', 匣: 'xiá', 侠: 'xiá', 狭: 'xiá', 掀: 'xiān', 鲜: 'xiān',
  贤: 'xián', 弦: 'xián', 咸: 'xián', 衔: 'xián', 嫌: 'xián', 显: 'xiǎn',
  线: 'xiàn', 献: 'xiàn', 县: 'xiàn', 馅: 'xiàn', 羡: 'xiàn', 宪: 'xiàn',
  陷: 'xiàn', 箱: 'xiāng', 镶: 'xiāng', 详: 'xiáng', 享: 'xiǎng', 响: 'xiǎng',
  巷: 'xiàng', 项: 'xiàng', 像: 'xiàng', 橡: 'xiàng', 削: 'xuē', 消: 'xiāo',
  宵: 'xiāo', 销: 'xiāo', 晓: 'xiǎo', 孝: 'xiào', 效: 'xiào', 歇: 'xiē',
  协: 'xié', 挟: 'xié', 斜: 'xié', 谐: 'xié', 泄: 'xiè', 泻: 'xiè',
  卸: 'xiè', 谢: 'xiè', 屑: 'xiè', 辛: 'xīn', 欣: 'xīn', 薪: 'xīn',
  兴: 'xīng', 腥: 'xīng', 刑: 'xíng', 形: 'xíng', 型: 'xíng', 杏: 'xìng',
  幸: 'xìng', 性: 'xìng', 姓: 'xìng', 凶: 'xiōng', 兄: 'xiōng', 匈: 'xiōng',
  雄: 'xióng', 熊: 'xióng', 朽: 'xiǔ', 秀: 'xiù', 绣: 'xiù', 锈: 'xiù',
  嗅: 'xiù', 袖: 'xiù', 需: 'xū', 虚: 'xū', 嘘: 'xū', 须: 'xū',
  徐: 'xú', 许: 'xǔ', 旭: 'xù', 序: 'xù', 叙: 'xù', 恤: 'xù',
  绪: 'xù', 蓄: 'xù', 宣: 'xuān', 喧: 'xuān', 悬: 'xuán', 旋: 'xuán',
  癣: 'xuǎn', 炫: 'xuàn', 绚: 'xuàn', 穴: 'xué', 熏: 'xūn', 寻: 'xún',
  巡: 'xún', 询: 'xún', 循: 'xún', 讯: 'xùn', 迅: 'xùn',
  // pinyin initial: y  (139 chars)
  压: 'yā', 押: 'yā', 鸦: 'yā', 芽: 'yá', 涯: 'yá', 哑: 'yǎ',
  雅: 'yǎ', 亚: 'yà', 咽: 'yān', 胭: 'yān', 烟: 'yān', 淹: 'yān',
  严: 'yán', 颜: 'yán', 延: 'yán', 沿: 'yán', 炎: 'yán', 岩: 'yán',
  演: 'yǎn', 艳: 'yàn', 燕: 'yàn', 厌: 'yàn', 彦: 'yàn', 唁: 'yàn',
  宴: 'yàn', 验: 'yàn', 谚: 'yàn', 雁: 'yàn', 央: 'yāng', 殃: 'yāng',
  秧: 'yāng', 扬: 'yáng', 杨: 'yáng', 仰: 'yǎng', 氧: 'yǎng', 幺: 'yāo',
  摇: 'yáo', 遥: 'yáo', 咬: 'yǎo', 耀: 'yào', 椰: 'yē', 爷: 'yé',
  业: 'yè', 叶: 'yè', 页: 'yè', 夜: 'yè', 液: 'yè', 壹: 'yī',
  依: 'yī', 揖: 'yī', 仪: 'yí', 姨: 'yí', 移: 'yí', 遗: 'yí',
  乙: 'yǐ', 倚: 'yǐ', 亿: 'yì', 忆: 'yì', 艺: 'yì', 译: 'yì',
  疫: 'yì', 益: 'yì', 异: 'yì', 役: 'yì', 翼: 'yì', 意: 'yì',
  溢: 'yì', 毅: 'yì', 阴: 'yīn', 银: 'yín', 引: 'yǐn', 饮: 'yǐn',
  隐: 'yǐn', 印: 'yìn', 樱: 'yīng', 鹰: 'yīng', 营: 'yíng', 蝇: 'yíng',
  赢: 'yíng', 硬: 'yìng', 哟: 'yō', 拥: 'yōng', 佣: 'yōng', 庸: 'yōng',
  永: 'yǒng', 咏: 'yǒng', 泳: 'yǒng', 涌: 'yǒng', 优: 'yōu', 忧: 'yōu',
  幽: 'yōu', 邮: 'yóu', 游: 'yóu', 幼: 'yòu', 诱: 'yòu', 迂: 'yū',
  予: 'yǔ', 余: 'yú', 愚: 'yú', 娱: 'yú', 渔: 'yú', 愉: 'yú',
  逾: 'yú', 与: 'yǔ', 屿: 'yǔ', 宇: 'yǔ', 羽: 'yǔ', 玉: 'yù',
  芋: 'yù', 育: 'yù', 郁: 'yù', 浴: 'yù', 预: 'yù', 域: 'yù',
  欲: 'yù', 御: 'yù', 寓: 'yù', 裕: 'yù', 愈: 'yù', 誉: 'yù',
  冤: 'yuān', 渊: 'yuān', 元: 'yuán', 圆: 'yuán', 援: 'yuán', 缘: 'yuán',
  源: 'yuán', 猿: 'yuán', 怨: 'yuàn', 愿: 'yuàn', 岳: 'yuè', 钥: 'yuè',
  悦: 'yuè', 阅: 'yuè', 跃: 'yuè', 匀: 'yún', 允: 'yǔn', 孕: 'yùn',
  晕: 'yūn',
  // pinyin initial: z  (131 chars)
  砸: 'zá', 灾: 'zāi', 栽: 'zāi', 攒: 'zǎn', 暂: 'zàn', 赞: 'zàn',
  脏: 'zāng', 葬: 'zàng', 遭: 'zāo', 糟: 'zāo', 澡: 'zǎo', 藻: 'zǎo',
  燥: 'zào', 躁: 'zào', 泽: 'zé', 贼: 'zéi', 憎: 'zēng', 赠: 'zèng',
  扎: 'zhā', 眨: 'zhǎ', 诈: 'zhà', 炸: 'zhà', 摘: 'zhāi', 宅: 'zhái',
  债: 'zhài', 沾: 'zhān', 粘: 'zhān', 盏: 'zhǎn', 占: 'zhàn', 战: 'zhàn',
  绽: 'zhàn', 章: 'zhāng', 彰: 'zhāng', 掌: 'zhǎng', 丈: 'zhàng', 杖: 'zhàng',
  账: 'zhàng', 障: 'zhàng', 招: 'zhāo', 召: 'zhào', 罩: 'zhào', 遮: 'zhē',
  折: 'zhé', 哲: 'zhé', 浙: 'zhè', 珍: 'zhēn', 诊: 'zhěn', 枕: 'zhěn',
  阵: 'zhèn', 振: 'zhèn', 震: 'zhèn', 争: 'zhēng', 征: 'zhēng', 挣: 'zhèng',
  睁: 'zhēng', 蒸: 'zhēng', 之: 'zhī', 汁: 'zhī', 芝: 'zhī', 枝: 'zhī',
  织: 'zhī', 脂: 'zhī', 蜘: 'zhī', 执: 'zhí', 直: 'zhí', 侄: 'zhí',
  职: 'zhí', 址: 'zhǐ', 纸: 'zhǐ', 指: 'zhǐ', 至: 'zhì', 志: 'zhì',
  质: 'zhì', 治: 'zhì', 窒: 'zhì', 致: 'zhì', 智: 'zhì', 滞: 'zhì',
  忠: 'zhōng', 终: 'zhōng', 肿: 'zhǒng', 冢: 'zhǒng', 洲: 'zhōu', 粥: 'zhōu',
  轴: 'zhóu', 骤: 'zhòu', 竹: 'zhú', 烛: 'zhú', 主: 'zhǔ', 煮: 'zhǔ',
  嘱: 'zhǔ', 柱: 'zhù', 祝: 'zhù', 著: 'zhù', 筑: 'zhù', 铸: 'zhù',
  抓: 'zhuā', 拽: 'zhuāi', 专: 'zhuān', 砖: 'zhuān', 赚: 'zhuàn', 撰: 'zhuàn',
  庄: 'zhuāng', 装: 'zhuāng', 壮: 'zhuàng', 状: 'zhuàng', 撞: 'zhuàng', 追: 'zhuī',
  坠: 'zhuì', 浊: 'zhuó', 啄: 'zhuó', 资: 'zī', 姿: 'zī', 滋: 'zī',
  籽: 'zǐ', 宗: 'zōng', 综: 'zōng', 踪: 'zōng', 纵: 'zòng', 奏: 'zòu',
  租: 'zū', 足: 'zú', 卒: 'zú', 族: 'zú', 阻: 'zǔ', 组: 'zǔ',
  祖: 'zǔ', 钻: 'zuān', 罪: 'zuì', 醉: 'zuì', 座: 'zuò',
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




