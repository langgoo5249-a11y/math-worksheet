from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    errors = []
    page.on('console', lambda msg: errors.append(f"[{msg.type}] {msg.text}"))
    page.on('pageerror', lambda err: errors.append(f"[PAGE_ERROR] {err}"))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(3000)
    
    # Check if main content is visible
    body_text = page.inner_text('body')
    print(f"Body text length: {len(body_text)}")
    print(f"Body text preview: {body_text[:500]}")
    
    # Check for key UI elements
    template_type = page.locator('text=模板类型').count()
    input_area = page.locator('text=输入练习文字').count()
    download_btn = page.locator('text=下载 PDF').count()
    
    print(f"\n模板类型: {template_type}")
    print(f"输入练习文字: {input_area}")
    print(f"下载 PDF: {download_btn}")
    
    # Check for error boundaries or empty state
    error_boundary = page.locator('text=发生错误').count()
    print(f"错误边界: {error_boundary}")
    
    print(f"\n=== Console Errors ({len(errors)}) ===")
    for err in errors[:20]:
        print(err)
    
    browser.close()
