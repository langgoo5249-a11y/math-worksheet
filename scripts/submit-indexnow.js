#!/usr/bin/env node

/**
 * IndexNow 提交脚本
 * 用法: node scripts/submit-indexnow.js [url1] [url2] ...
 * 或: node scripts/submit-indexnow.js --all  (提交所有sitemap中的URL)
 * 或: node scripts/submit-indexnow.js --recent-days 7  (提交最近N天的博客文章)
 */

const INDEXNOW_KEY = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const HOST = 'www.skillxm.cn';
const BASE_URL = `https://${HOST}`;

async function submitUrls(urls) {
  if (!urls.length) {
    console.log('No URLs to submit');
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let result = {};
    try {
      result = await response.json();
    } catch {
      result = { status, message: response.statusText };
    }

    if (status === 200 || status === 202) {
      console.log('✅ IndexNow submission successful');
      console.log(`   Submitted: ${urls.length} URLs`);
    } else {
      console.log(`❌ IndexNow submission failed (HTTP ${status})`);
    }

    if (result.message) {
      console.log(`   Message: ${result.message}`);
    }

    return { success: status === 200 || status === 202, status, result };
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    return { success: false, error: error.message };
  }
}

// 从 sitemap.xml 提取所有 URL
async function getUrlsFromSitemap() {
  try {
    const fs = await import('fs');
    const xml = fs.readFileSync('./out/sitemap.xml', 'utf-8');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    return urls;
  } catch (error) {
    console.error('Error reading sitemap:', error.message);
    return [];
  }
}

// 从博客数据获取最近N天的文章URL
async function getRecentBlogUrls(days = 7) {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    // 动态导入博客数据
    const { articles } = await import('../app/blog/data.ts');
    const urls = articles
      .filter(a => new Date(a.date) >= cutoff)
      .map(a => `${BASE_URL}/blog/${a.id}/`);

    return urls;
  } catch (error) {
    console.error('Error reading blog data:', error.message);
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--all')) {
    const urls = await getUrlsFromSitemap();
    await submitUrls(urls);
  } else if (args.includes('--recent-days')) {
    const daysIndex = args.indexOf('--recent-days') + 1;
    const days = parseInt(args[daysIndex]) || 7;
    const urls = await getRecentBlogUrls(days);
    await submitUrls(urls);
  } else if (args.length > 0) {
    // 直接提交传入的URL
    const urls = args.filter(arg => arg.startsWith('http'));
    await submitUrls(urls);
  } else {
    console.log('Usage:');
    console.log('  node scripts/submit-indexnow.js --all');
    console.log('  node scripts/submit-indexnow.js --recent-days 7');
    console.log('  node scripts/submit-indexnow.js https://www.skillxm.cn/blog/article-1/');
  }
}

main().catch(console.error);
