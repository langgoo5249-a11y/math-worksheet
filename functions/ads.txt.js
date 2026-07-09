/**
 * Cloudflare Pages Function: 处理 /ads.txt 请求
 * 
 * 绕过 Cloudflare 区域级安全头（x-content-type-options: nosniff 等），
 * 确保 Google AdSense 能正确验证 ads.txt 文件。
 */
export async function onRequest() {
  const adsTxtContent = 'google.com, pub-4710405779358793, DIRECT, f08c47fec0942fa0\n';

  return new Response(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}