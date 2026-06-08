// Next.js Route Handler 兜底：即便静态文件丢失，动态路由也能返回 ads.txt
// 防止 Cloudflare Pages / CDN 任何环节的丢失问题
// Google AdSense 申请会同时探测 4 个 URL：根域名、根域名+斜杠、/ads.txt、/ads.txt/
// 任何一个能返回正确内容即可通过

const ADS_TXT_CONTENT = 'google.com, pub-4710405779358793, DIRECT, f08c47fec0942fa0\n';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  return new Response(ADS_TXT_CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
