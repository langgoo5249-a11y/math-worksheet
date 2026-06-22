'use client';

import { useEffect, useState } from 'react';

const ADSENSE_CLIENT = 'ca-pub-4710405779358793';
const BAIDU_HM_ID = 'b1c5ccce83f4e80c4c12dea6bd544723';
const BAIDU_PUSH_SRC = 'https://zz.bdstatic.com/linksubmit/push.js';
const TOUTIAO_PUSH_SRC =
  'https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?278b7bc276aa0b514ff5c4e28d63b1e083f58bd22a48d8e0e73447efb03530befd9a9dcb5ced4d7780eb6f3bbd089073c2a6d54440560d63862bbf4ec01bba3a';

function injectExternalScript(src: string, attrs?: Record<string, string>) {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
  }
  document.body.appendChild(script);
}

function injectInlineScript(code: string) {
  if (typeof document === 'undefined') return;
  const script = document.createElement('script');
  script.textContent = code;
  document.body.appendChild(script);
}

/**
 * ConsentAwareScripts
 *
 * 根据用户 Cookie 同意状态，按需注入 AdSense、百度统计、百度推送、头条推送。
 * 用户点击"接受全部"前，这些第三方追踪/广告脚本不会被加载，满足隐私合规要求。
 */
export default function ConsentAwareScripts() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (localStorage.getItem('cookie-consent') === 'accepted') {
        setAccepted(true);
      }
    } catch {
      // localStorage 不可用时不注入第三方脚本
    }

    const handleAccept = () => setAccepted(true);
    window.addEventListener('cookie-consent-accepted', handleAccept);
    return () => window.removeEventListener('cookie-consent-accepted', handleAccept);
  }, []);

  useEffect(() => {
    if (!accepted) return;

    // AdSense 基础库
    injectExternalScript(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
      { crossOrigin: 'anonymous' }
    );

    // 百度统计
    injectInlineScript(
      `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?${BAIDU_HM_ID}";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`
    );

    // 百度主动推送（延迟到页面加载后）
    injectInlineScript(
      `window.addEventListener('load',function(){var bp=document.createElement('script');bp.src='${BAIDU_PUSH_SRC}';var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(bp,s);});`
    );

    // 头条搜索主动推送（延迟到页面加载后）
    injectInlineScript(
      `window.addEventListener('load',function(){var el=document.createElement('script');el.src='${TOUTIAO_PUSH_SRC}';el.id='ttzz';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(el,s);});`
    );
  }, [accepted]);

  return null;
}
