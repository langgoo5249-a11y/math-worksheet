'use client';

import { useEffect } from 'react';

const BAIDU_HM_ID = 'b1c5ccce83f4e80c4c12dea6bd544723';
const BAIDU_PUSH_SRC = 'https://zz.bdstatic.com/linksubmit/push.js';
const TOUTIAO_PUSH_SRC =
  'https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?278b7bc276aa0b514ff5c4e28d63b1e083f58bd22a48d8e0e73447efb03530befd9a9dcb5ced4d7780eb6f3bbd089073c2a6d54440560d63862bbf4ec01bba3a';

// AdSense 发布商 ID
const ADSENSE_PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

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
 * 简化版：中国用户为主，Consent Mode 默认全部 granted，
 * 所以所有追踪脚本在页面加载后直接注入，不需要等待用户同意。
 */
export default function ConsentAwareScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Google AdSense Core Script
    injectExternalScript(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`,
      { crossorigin: 'anonymous', 'data-ad-client': ADSENSE_PUB_ID }
    );

    // 延迟初始化 AdSense 广告单元
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
