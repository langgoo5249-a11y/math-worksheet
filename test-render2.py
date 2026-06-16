from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    all_console = []
    page.on('console', lambda msg: all_console.append(f"[{msg.type}] {msg.text}"))
    page.on('pageerror', lambda err: all_console.append(f"[PAGE_ERROR] {err}"))
    
    # 监听网络请求
    failed_requests = []
    page.on('requestfailed', lambda req: failed_requests.append(f"{req.url} - {req.failure}"))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)
    
    # 检查 HTML 结构
    html = page.content()
    print(f"Total HTML length: {len(html)}")
    
    # 检查是否有 React root
    react_root = page.query_selector('[data-reactroot]')
    print(f"React root (data-reactroot): {react_root is not None}")
    
    # 检查 body 下的直接 div
    body_divs = page.eval_on_selector('body', 'el => Array.from(el.children).map(c => c.tagName + (c.id ? "#" + c.id : "") + (c.className ? "." + c.className.split(" ")[0] : "")).join(", ")')
    print(f"Body children: {body_divs}")
    
    # 检查 RSC payload 是否存在
    has_next_f = 'self.__next_f' in html
    print(f"Has RSC payload (self.__next_f): {has_next_f}")
    
    # 检查 Next.js 的 app router root
    next_root = page.query_selector('#__next')
    print(f"Has #__next: {next_root is not None}")
    
    # 在 Next.js 16 中，检查 body 下的 hidden div
    hidden_div = page.query_selector('body > div[hidden]')
    print(f"Has hidden div: {hidden_div is not None}")
    
    # 检查主要可见内容区域
    visible_text = page.eval_on_selector('body', 'el => el.innerText')
    print(f"\nVisible text length: {len(visible_text)}")
    print(f"Visible text (first 1000): {visible_text[:1000]}")
    
    # 检查是否有 "模板类型" 在 HTML 源码中（SSR）
    has_template_in_html = '模板类型' in html
    print(f"\n'模板类型' in HTML source: {has_template_in_html}")
    
    # 检查 JS chunk 加载情况
    print(f"\n=== Failed Requests ({len(failed_requests)}) ===")
    for req in failed_requests[:10]:
        print(req)
    
    # 检查所有 console 消息（包括 log, warning）
    print(f"\n=== All Console Messages ({len(all_console)}) ===")
    for msg in all_console[:30]:
        if 'google' not in msg.lower() and 'cloudflare' not in msg.lower() and 'analytics' not in msg.lower():
            print(msg)
    
    browser.close()
