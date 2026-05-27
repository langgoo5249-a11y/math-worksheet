'use client';

import { useEffect, useRef, useState } from 'react';

export default function AdUnit({ slot = '', format = 'auto', responsive = true }: { slot?: string; format?: string; responsive?: boolean }) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    if (!slot) {
      setAdBlocked(true);
      return;
    }

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded (e.g. user rejected cookies)
    }

    // 检测广告是否被屏蔽或加载失败
    const timer = setTimeout(() => {
      if (adRef.current) {
        const ins = adRef.current.querySelector('ins');
        if (ins && ins.innerHTML.trim() === '' && ins.offsetHeight < 50) {
          setAdBlocked(true);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [slot]);

  // 广告申请通过前，始终显示推荐内容替代
  if (!slot || true) {
    return (
      <div className="my-6 p-4 bg-slate-800/30 rounded-xl border border-white/5">
        <p className="text-xs text-gray-500 text-center mb-3">📚 推荐阅读</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href="/tools/math-worksheet/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
          >
            <span className="text-blue-400 text-sm">🔢</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">数学练习卷生成器</span>
          </a>
          <a
            href="/tools/calligraphy/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
          >
            <span className="text-emerald-400 text-sm">✍️</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">字帖生成器</span>
          </a>
          <a
            href="/tools/mental-math/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
          >
            <span className="text-orange-400 text-sm">🧮</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">口算练习工具</span>
          </a>
          <a
            href="/blog/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
          >
            <span className="text-purple-400 text-sm">📖</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">更多教育文章</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className="my-4 text-center">
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4710405779358793"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
