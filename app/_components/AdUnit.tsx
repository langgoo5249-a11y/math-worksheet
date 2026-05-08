'use client';

import { useEffect } from 'react';

export default function AdUnit({ slot = '', format = 'auto', responsive = true }: { slot?: string; format?: string; responsive?: boolean }) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded (e.g. user rejected cookies)
    }
  }, []);

  return (
    <div className="my-4 text-center">
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
