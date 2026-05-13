'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// 翻译缓存，避免重复请求
const translationCache = new Map<string, string>();

// Google Translate 免费端点（无需 API Key）
const TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single';

// 语言代码映射：网站 locale -> Google Translate 语言代码
const LOCALE_TO_GOOGLE: Record<string, string> = {
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  zh: 'zh-CN',
};

/**
 * 调用 Google Translate 免费接口翻译文本
 * 每次最多翻译约 5000 字符
 */
async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text.trim()) return text;
  if (targetLang === 'zh' || targetLang === 'zh-CN') return text;

  const cacheKey = `${targetLang}:${text.slice(0, 200)}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const url = `${TRANSLATE_API}?client=gtx&sl=zh-CN&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn('Translation API error:', response.status);
      return text;
    }

    const data = await response.json();
    
    // Google Translate 返回格式: [[["translated","original",...],...], ...]
    if (data && data[0]) {
      let translated = '';
      for (const segment of data[0]) {
        if (segment[0]) {
          translated += segment[0];
        }
      }
      
      if (translated.trim()) {
        translationCache.set(cacheKey, translated);
        return translated;
      }
    }
    
    return text;
  } catch (error) {
    console.warn('Translation failed:', error);
    return text;
  }
}

/**
 * 分段翻译长文本（每段最多 2000 字符）
 */
async function translateLongText(text: string, targetLang: string): Promise<string> {
  if (!text.trim() || targetLang === 'zh' || targetLang === 'zh-CN') return text;

  // 按段落分割
  const paragraphs = text.split('\n').filter(p => p.trim());
  
  if (paragraphs.length <= 1 && text.length <= 2000) {
    return translateText(text, targetLang);
  }

  // 将段落分组，每组不超过 2000 字符
  const chunks: string[] = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + '\n' + para).length > 2000) {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = para;
    } else {
      currentChunk = currentChunk ? currentChunk + '\n' + para : para;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  // 并行翻译（最多 3 个并发）
  const results: string[] = [];
  const batchSize = 3;
  
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(chunk => translateText(chunk, targetLang))
    );
    results.push(...batchResults);
  }

  return results.join('\n');
}

interface UseTranslationResult {
  translatedText: string;
  isTranslating: boolean;
  error: string | null;
  translate: (text: string) => Promise<void>;
}

/**
 * 自定义 Hook：翻译文本
 */
export function useTranslation(locale: string): UseTranslationResult {
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const translate = useCallback(async (text: string) => {
    const targetLang = LOCALE_TO_GOOGLE[locale];
    if (!targetLang || targetLang === 'zh-CN') {
      setTranslatedText(text);
      return;
    }

    abortRef.current = false;
    setIsTranslating(true);
    setError(null);

    try {
      const result = await translateLongText(text, targetLang);
      if (!abortRef.current) {
        setTranslatedText(result);
      }
    } catch (err) {
      if (!abortRef.current) {
        setError('Translation failed');
        setTranslatedText(text);
      }
    } finally {
      if (!abortRef.current) {
        setIsTranslating(false);
      }
    }
  }, [locale]);

  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  return { translatedText, isTranslating, error, translate };
}

/**
 * 翻译单段文本（用于标题、描述等短文本）
 */
export async function translateShortText(text: string, locale: string): Promise<string> {
  const targetLang = LOCALE_TO_GOOGLE[locale];
  if (!targetLang || targetLang === 'zh-CN') return text;
  return translateText(text, targetLang);
}

export { translateText, translateLongText };
