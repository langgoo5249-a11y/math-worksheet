'use client';

import { useEffect } from 'react';

const BAIDU_HM_ID = 'b1c5ccce83f4e80c4c12dea6bd544723';
const BAIDU_PUSH_SRC = 'https://zz.bdstatic.com/linksubmit/push.js';
const TOUTIAO_PUSH_SRC =
  'https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?278b7bc276aa0b514ff5c4e28d63b1e083f58bd22a48d8e0e73447efb03530befd9a9dcb5ced4d7780eb6f3bbd089073c2a6d54440560d63862bbf4ec01bba3a';

// ⚠️ Google AdSense 核心脚本 **不在此处注入**。
// 原因：AdSense 的网站验证是抓取页面原始 HTML 查找 `adsbygoogle.js?client=...`，
// 而本组件是客户端组件，useEffect 里用 createElement 注入的脚本不会出现在 SSR 输出中
// （线上实测 HTML 0 命中 → 后台持续提示"未检测到网站代码"）。
// 核心脚本已直接写入 app/layout.tsx 的 <head>：client=ca-pub-4710405779358793
// 本文件仅保留：广告单元初始化 + 百度统计/主动推送 + 头条推送。

function injectInlineScript(code: string) {
  if (typeof document === 'undefined') return;
  const script = document.createElement('script');
  script.textContent = code;
  document.body.appendChild(script);
}

/**
 * ConsentAwareScripts
 *
 * 简化版：中国用户为主，Consent Mode 默认全部 granted，
 * 所以这些追踪脚本在页面加载后直接注入，不需要等待用户同意。
 */
export default function ConsentAwareScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 初始化 AdSense 广告单元（核心脚本由 app/layout.tsx 的 <head> 提供）
    injectInlineScript(
      `window.addEventListener('load',function(){try{var ads=document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])');for(var i=0;i<ads.length;i++){(adsbygoogle=window.adsbygoogle||[]).push({})};}catch(e){console.log('AdSense init deferred:',e)}});`
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
      `window.addEventListener('load',function(){var el=document.createElement('script');el.src='${TOUTIAO_PUSH_SRC}';el.id='ttzz';var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(el,s);});`
    );
  }, []);

  return null;
}
