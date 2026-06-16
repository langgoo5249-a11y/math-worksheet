from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # 捕获所有错误
    errors = []
    page.on('console', lambda msg: errors.append({
        'type': msg.type,
        'text': msg.text,
        'location': msg.location
    }))
    page.on('pageerror', lambda err: errors.append({
        'type': 'pageerror',
        'text': str(err),
        'location': {}
    }))
    
    # 访问页面
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)
    
    # 检查 React 状态
    react_info = page.evaluate('''() => {
        return {
            hasReact: typeof window.React !== 'undefined',
            hasNextF: typeof window.__next_f !== 'undefined',
            nextFLength: window.__next_f ? window.__next_f.length : -1,
            hasNextRouter: typeof window.next !== 'undefined' && typeof window.next.router !== 'undefined'
        }
    }''')
    
    print("=== React State ===")
    print(json.dumps(react_info, indent=2))
    
    # 检查 DOM 结构
    dom_check = page.evaluate('''() => {
        const body = document.body;
        const result = {
            childCount: body.children.length,
            hasMainContent: false,
            errorBoundary: null,
            visibleText: body.innerText.substring(0, 500)
        };
        
        // 查找主内容区域
        for (const child of body.children) {
            if (child.tagName === 'MAIN' || child.className?.includes('container') || child.className?.includes('max-w')) {
                result.hasMainContent = true;
                break;
            }
        }
        
        // 查找错误边界
        const errorDiv = body.querySelector('div[class*="error"], div[class*="Error"]');
        if (errorDiv) {
            result.errorBoundary = errorDiv.innerText;
        }
        
        return result;
    }''')
    
    print("\n=== DOM Check ===")
    print(json.dumps(dom_check, indent=2, ensure_ascii=False))
    
    # 过滤出非分析相关的错误
    print("\n=== Console Errors (non-analytics) ===")
    for err in errors:
        text = err['text'].lower()
        if not any(x in text for x in ['google', 'analytics', 'cloudflare', 'collect', 'beacon']):
            print(f"[{err['type']}] {err['text']}")
            if err['location'].get('url'):
                print(f"  at {err['location']['url']}:{err['location'].get('lineNumber', '?')}")
    
    browser.close()
