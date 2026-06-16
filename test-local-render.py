from playwright.sync_api import sync_playwright
import json

def test_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 捕获所有控制台消息
        console_messages = []
        page.on('console', lambda msg: console_messages.append({
            'type': msg.type,
            'text': msg.text,
            'location': msg.location
        }))
        
        # 捕获页面错误
        page_errors = []
        page.on('pageerror', lambda err: page_errors.append(str(err)))
        
        # 捕获网络请求
        failed_requests = []
        page.on('requestfailed', lambda req: failed_requests.append({
            'url': req.url,
            'failure': req.failure
        }))
        
        # 访问页面
        print("正在访问页面...")
        page.goto('http://localhost:3000/tools/calligraphy/', wait_until='networkidle')
        
        # 等待 React 水合
        page.wait_for_timeout(3000)
        
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
        
        # 输出所有控制台消息
        print(f"\n=== 控制台消息 ({len(console_messages)}) ===")
        for msg in console_messages[:20]:
            print(f"[{msg['type']}] {msg['text']}")
            if msg['location'].get('url'):
                print(f"  at {msg['location']['url']}:{msg['location'].get('lineNumber', '?')}")
        
        if page_errors:
            print(f"\n=== 页面错误 ({len(page_errors)}) ===")
            for err in page_errors:
                print(err)
        
        if failed_requests:
            print(f"\n=== 失败的请求 ({len(failed_requests)}) ===")
            for req in failed_requests:
                print(f"{req['url']} - {req['failure']}")
        
        # 检查 DOM 结构
        dom_check = page.evaluate('''() => {
            const body = document.body;
            return {
                childCount: body.children.length,
                hasMainContent: body.querySelector('main') !== null,
                hasHiddenDiv: body.querySelector('div[hidden]') !== null,
                firstChildTag: body.children[0]?.tagName,
                firstChildClass: body.children[0]?.className
            }
        }''')
        
        print("\n=== DOM 结构 ===")
        print(json.dumps(dom_check, indent=2, ensure_ascii=False))
        
        browser.close()
        
        return metrics

if __name__ == '__main__':
    test_page()
