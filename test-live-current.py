from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    
    page_errors = []
    page.on('pageerror', lambda err: page_errors.append(str(err)))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(3000)
    
    next_f_len = page.evaluate('() => (window.__next_f || []).length')
    body_len = len(page.inner_text('body'))
    h1 = page.query_selector('h1')
    h1_text = h1.inner_text() if h1 else 'NOT FOUND'
    
    print(f"=== 线上站点状态 ===")
    print(f"__next_f length: {next_f_len}")
    print(f"Body text length: {body_len}")
    print(f"H1: {h1_text}")
    print(f"Page errors: {len(page_errors)}")
    
    if next_f_len > 0 and body_len > 1000 and h1_text != 'NOT FOUND':
        print("✓ 页面正常显示")
    else:
        print("✗ 页面空白")
    
    browser.close()
