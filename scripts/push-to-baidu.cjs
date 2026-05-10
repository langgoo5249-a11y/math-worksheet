#!/usr/bin/env node
/**
 * 百度主动推送脚本
 * 在构建完成后，自动推送所有页面URL到百度站长平台
 * 使用接口: http://data.zz.baidu.com/urls
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 百度主动推送配置
const BAIDU_PUSH_URL = 'http://data.zz.baidu.com/urls?site=https://biaoji.skillxm.cn&token=zJsDaj5ibt8ZlVgz';
const SITE_BASE_URL = 'https://biaoji.skillxm.cn';

// 需要推送的URL列表
const urlsToPush = [
  // 首页
  `${SITE_BASE_URL}/`,
  // 主要页面
  `${SITE_BASE_URL}/about/`,
  `${SITE_BASE_URL}/contact/`,
  `${SITE_BASE_URL}/blog/`,
  `${SITE_BASE_URL}/privacy/`,
  `${SITE_BASE_URL}/terms/`,
  // 工具页面
  `${SITE_BASE_URL}/tools/math-worksheet/`,
  `${SITE_BASE_URL}/tools/calligraphy/`,
  `${SITE_BASE_URL}/tools/english-calligraphy/`,
  `${SITE_BASE_URL}/tools/flashcards/`,
  `${SITE_BASE_URL}/tools/mental-math/`,
  `${SITE_BASE_URL}/tools/pinyin/`,
  `${SITE_BASE_URL}/tools/poem-memo/`,
  `${SITE_BASE_URL}/tools/sudoku/`,
  `${SITE_BASE_URL}/tools/unit-test/`,
  `${SITE_BASE_URL}/tools/writing-template/`,
];

// 从博客数据中提取文章URL
function getBlogUrls() {
  try {
    const dataFile = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
    const content = fs.readFileSync(dataFile, 'utf-8');
    
    // 提取所有文章ID
    const idMatches = content.match(/id:\s*["']([^"']+)["']/g);
    if (!idMatches) return [];
    
    return idMatches.map(match => {
      const id = match.match(/id:\s*["']([^"']+)["']/)?.[1];
      return id ? `${SITE_BASE_URL}/blog/${id}/` : null;
    }).filter(Boolean);
  } catch (error) {
    console.error('读取博客文章列表失败:', error.message);
    return [];
  }
}

// 推送URL到百度
function pushUrlsToBaidu(urls) {
  if (urls.length === 0) {
    console.log('没有需要推送的URL');
    return;
  }

  console.log(`准备推送 ${urls.length} 个URL到百度...`);
  
  // 将URL写入临时文件
  const tempFile = '/tmp/baidu_push_urls.txt';
  fs.writeFileSync(tempFile, urls.join('\n'));
  
  try {
    // 使用curl推送
    const cmd = `curl -s --data-binary @${tempFile} "${BAIDU_PUSH_URL}" -H "Content-Type:text/plain"`;
    const result = execSync(cmd, { encoding: 'utf-8' });
    
    // 解析返回结果
    const response = JSON.parse(result);
    
    if (response.success) {
      console.log(`✅ 推送成功！成功: ${response.success}, 剩余配额: ${response.remain}`);
    } else if (response.error) {
      console.error(`❌ 推送失败: ${response.message} (错误码: ${response.error})`);
    } else {
      console.log('推送结果:', response);
    }
  } catch (error) {
    console.error('推送过程出错:', error.message);
  } finally {
    // 清理临时文件
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

// 主函数
function main() {
  console.log('=== 百度主动推送 ===');
  console.log(`站点: ${SITE_BASE_URL}`);
  console.log(`推送接口: ${BAIDU_PUSH_URL}`);
  console.log('');
  
  // 获取博客文章URL
  const blogUrls = getBlogUrls();
  console.log(`发现 ${blogUrls.length} 篇博客文章`);
  
  // 合并所有URL
  const allUrls = [...urlsToPush, ...blogUrls];
  
  // 去重
  const uniqueUrls = [...new Set(allUrls)];
  console.log(`总共 ${uniqueUrls.length} 个唯一URL`);
  console.log('');
  
  // 推送（每次最多2000个URL，百度限制）
  const batchSize = 2000;
  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const batch = uniqueUrls.slice(i, i + batchSize);
    console.log(`推送批次 ${Math.floor(i / batchSize) + 1}/${Math.ceil(uniqueUrls.length / batchSize)}...`);
    pushUrlsToBaidu(batch);
  }
  
  console.log('');
  console.log('=== 推送完成 ===');
}

main();
