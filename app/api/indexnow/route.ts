import { NextRequest, NextResponse } from 'next/server';

/**
 * IndexNow API 端点
 * 接收 URL 列表，提交到 Bing/Yandex 的 IndexNow 服务
 * 文档: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = 'e8f3a2b1c4d5e6f7g8h9i0j1k2l3m4n5';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (!urls.length) {
      return NextResponse.json(
        { error: 'No URLs provided' },
        { status: 400 }
      );
    }

    // Validate URLs
    const validUrls = urls.filter(url => {
      try {
        const u = new URL(url);
        return u.hostname === 'www.skillxm.cn';
      } catch {
        return false;
      }
    });

    if (!validUrls.length) {
      return NextResponse.json(
        { error: 'No valid URLs provided' },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const payload = {
      host: 'www.skillxm.cn',
      key: INDEXNOW_KEY,
      keyLocation: `https://www.skillxm.cn/${INDEXNOW_KEY}.txt`,
      urlList: validUrls,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let result: any = {};
    try {
      result = await response.json();
    } catch {
      result = { status: status, message: response.statusText };
    }

    return NextResponse.json({
      success: status === 200,
      status,
      submitted: validUrls.length,
      urls: validUrls,
      response: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
