'use client';

import { useState } from 'react';

export default function ShareButtons({
  url,
  title,
  description = '',
}: {
  url: string;
  title: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 兜底方案
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      name: '微信',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      href: `javascript:void(0)`,
      onClick: handleCopy,
    },
    {
      name: '微博',
      icon: '🌐',
      color: 'bg-red-500 hover:bg-red-600',
      href: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'QQ',
      icon: '🐧',
      color: 'bg-blue-500 hover:bg-blue-600',
      href: `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDesc}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: '复制链接',
      icon: copied ? '✓' : '🔗',
      color: copied ? 'bg-emerald-500' : 'bg-slate-600 hover:bg-slate-500',
      href: `javascript:void(0)`,
      onClick: handleCopy,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-slate-400 mr-1">分享：</span>
      {shareLinks.map((s) => (
        <a
          key={s.name}
          href={s.href}
          onClick={s.onClick}
          target={s.href.startsWith('http') ? '_blank' : undefined}
          rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${s.color} text-white text-sm rounded-lg transition-colors cursor-pointer`}
          aria-label={`分享到${s.name}`}
        >
          <span>{s.icon}</span>
          <span className="hidden sm:inline">{copied && s.name === '复制链接' ? '已复制' : s.name}</span>
        </a>
      ))}
    </div>
  );
}
