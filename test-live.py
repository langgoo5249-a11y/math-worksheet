from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    errors = []
    page.on('console', lambda msg: errors.append(f"[{msg.type}] {msg.text}"))
    page.on('pageerror', lambda err: errors.append(f"[PAGE_ERROR] {err}"))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)
    
    # Check __next_f
    next_f_len = page.evaluate('() => (window.__next_f || []).length')
    print(f"window.__next_f length: {next_f_len}")
    
    # Check body text
    body_text = page.inner_text('body')
    print(f"Body text length: {len(body_text)}")
    print(f"Body text preview: {body_text[:500]}")
    
    # Check for main content elements
    h1 = page.query_selector('h1')
    print(f"H1 found: {h1 is not None}")
    if h1:
        print(f"H1 text: {h1.inner_text()}")
    
    # Check console errors
    print(f"\nConsole errors ({len(errors)}):")
    for err in errors[:20]:
        print(f"  {err}")
    
    # Check if JS files loaded
    js_errors = [e for e in errors if '404' in e or 'Failed' in e or 'error' in e.lower()]
    print(f"\nJS/Resource errors: {js_errors}")
    
    browser.close()
