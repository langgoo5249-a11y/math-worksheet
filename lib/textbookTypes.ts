// 教材版本聚合页内容类型定义
// 说明：/textbook/{version}/ 由原来的 24 个年级页（4 版本 × 6 年级）合并而来，
// 每个版本页承载该版本 1-6 年级的完整学习地图。以下类型即为此结构的载体。

/** 单个教材单元：单元名 → 核心知识点 → 常见错因 */
export interface UnitNote {
  /** 单元名称（与教材目录一致）*/
  unit: string;
  /** 本单元核心知识点（一句话说清"学什么"）*/
  key: string;
  /** 本单元最常见的错误及其根因（一句话说清"错在哪、为什么错"）*/
  err: string;
}

/** 某个版本某个年级的学习指导 */
export interface GradeGuide {
  grade: number;
  /** 本年级核心能力目标 */
  focus: string;
  /** 核心知识点清单（4-6 条）*/
  keyPoints: string[];
  /** 易错点与纠正方法（3-4 条）*/
  pitfalls: { wrong: string; fix: string }[];
  /** 可验证的掌握标准 */
  standard: string;
  /** 家长辅导建议（本年级特有）*/
  coaching: string;
  /** 单元明细表 */
  units: UnitNote[];
}

/** 教材版本画像 */
export interface VersionProfile {
  /** 版本 id，与 lib/textbookConfig.ts 中的 id 一致 */
  id: string;
  /** 使用地区与实际覆盖面 */
  regions: string;
  /** 教材编排特点与编写理念 */
  design: string;
  /** 与课程标准的对应关系（证据）*/
  standardBasis: string;
  /** 与其他版本的核心差异（含常见误区的澄清）*/
  differences: string;
  /** 什么样的孩子更适合这套版本 / 使用建议 */
  bestFor: string;
  /** 本版本独有的常见问题（8-10 条，不与其他版本共用）*/
  faqs: { q: string; a: string }[];
}
