from playwright.sync_api import sync_playwright
import json

def test_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 捕获所有控制台消息和错误
        console_messages = []
        page_errors = []
        failed_requests = []
        
        page.on('console', lambda msg: console_messages.append({
            'type': msg.type,
            'text': msg.text,
            'location': msg.location
        }))
        
        page.on('pageerror', lambda err: page_errors.append(str(err)))
        
        page.on('requestfailed', lambda req: failed_requests.append({
            'url': req.url,
            'failure': req.failure
        }))
        
        # 访问页面
        print("正在访问 https://www.skillxm.cn/tools/calligraphy/ ...")
        page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
        page.wait_for_timeout(5000)
        
        # 检查关键指标
        metrics = page.evaluate('''() => {
            return {
                hasNextF: typeof window.__next_f !== 'undefined',
                nextFLength: window.__next_f ? window.__next_f.length : -1,
                hasNextRouter: typeof window.next !== 'undefined',
                bodyTextLength: document.body.innerText.length,
                hasTemplateType: document.body.innerText.includes('模板类型'),
                hasInputArea: document.body.innerText.includes('输入练习文字'),
                hasDownloadBtn: document.body.innerText.includes('下载 PDF'),
                htmlLength: document.documentElement.outerHTML.length
            }
        }''')
        
        print("\n=== 页面指标 ===")
        print(json.dumps(metrics, indent=2, ensure_ascii=False))
        
        # 检查 CSP 头
        response = page.goto('https://www.skillxm.cn/tools/calligraphy/')
        csp_header = response.headers.get('content-security-policy', 'N/A')
        print(f"\n=== CSP Header ===\n{csp_header[:500]}")
        
        # 输出非 Google/Analytics 相关的错误
        print("\n=== 关键控制台错误 ===")
        for msg in console_messages:
            if msg['type'] == 'error':
                text_lower = msg['text'].lower()
                if not any(x in text_lower for x in ['google', 'analytics', 'cloudflare', 'beacon', 'collect']):
                    print(f"[{msg['type']}] {msg['text']}")
                    if msg['location'].get('url'):
                        print(f"  at {msg['location']['url']}:{msg['location'].get('lineNumber', '?')}")
        
        if page_errors:
            print("\n=== 页面错误 ===")
            for err in page_errors:
                print(err)
        
        if failed_requests:
            print("\n=== 失败的请求 ===")
            for req in failed_requests:
                print(f"{req['url']} - {req['failure']}")
        
        browser.close()
        
        return metrics

if __name__ == '__main__':
    test_page()
