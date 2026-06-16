from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # 访问工具页面
    page.goto('https://www.skillxm.cn/tools/math-worksheet/')
    page.wait_for_load_state('networkidle')
    
    # 截图
    page.screenshot(path='/tmp/tool-page.png', full_page=True)
    
    # 检查页面内容
    content = page.content()
    print(f"页面大小: {len(content)} bytes")
    
    # 检查是否有可见内容
    visible_text = page.inner_text('body')
    print(f"可见文本长度: {len(visible_text)}")
    print(f"前500字符: {visible_text[:500]}")
    
    # 检查是否有错误
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.wait_for_timeout(2000)
    
    if errors:
        print(f"\n页面错误: {errors}")
    
    # 检查关键元素
    h1 = page.locator('h1').first
    if h1.is_visible():
        print(f"\nH1 可见: {h1.inner_text()}")
    else:
        print("\nH1 不可见")
    
    browser.close()
