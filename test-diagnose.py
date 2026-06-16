from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # Test with no cache (fresh browser)
    context = browser.new_context()
    page = context.new_page()
    
    errors = []
    page.on('pageerror', lambda err: errors.append(str(err)))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(3000)
    
    # Check RSC payload
    next_f_len = page.evaluate('() => (window.__next_f || []).length')
    body_len = len(page.inner_text('body'))
    h1 = page.query_selector('h1')
    h1_text = h1.inner_text() if h1 else 'NOT FOUND'
    
    print(f"=== Fresh browser (no cache) ===")
    print(f"__next_f length: {next_f_len}")
    print(f"Body text length: {body_len}")
    print(f"H1: {h1_text}")
    print(f"Page errors: {errors}")
    
    # Check if there are hydration errors
    hydration_errors = [e for e in errors if 'hydration' in e.lower() or 'Hydration' in e]
    print(f"Hydration errors: {hydration_errors}")
    
    # Now test with simulated slow connection
    context2 = browser.new_context()
    page2 = context2.new_page()
    
    errors2 = []
    page2.on('pageerror', lambda err: errors2.append(str(err)))
    
    # Simulate slow 3G
    page2.route("**/*", lambda route: route.continue_())
    
    page2.goto('https://www.skillxm.cn/tools/math-worksheet/', wait_until='networkidle', timeout=30000)
    page2.wait_for_timeout(3000)
    
    next_f_len2 = page2.evaluate('() => (window.__next_f || []).length')
    body_len2 = len(page2.inner_text('body'))
    h1_2 = page2.query_selector('h1')
    h1_text2 = h1_2.inner_text() if h1_2 else 'NOT FOUND'
    
    print(f"\n=== Math Worksheet page ===")
    print(f"__next_f length: {next_f_len2}")
    print(f"Body text length: {body_len2}")
    print(f"H1: {h1_text2}")
    print(f"Page errors: {errors2}")
    
    # Test a third tool page
    context3 = browser.new_context()
    page3 = context3.new_page()
    
    errors3 = []
    page3.on('pageerror', lambda err: errors3.append(str(err)))
    
    page3.goto('https://www.skillxm.cn/tools/sudoku/', wait_until='networkidle', timeout=30000)
    page3.wait_for_timeout(3000)
    
    next_f_len3 = page3.evaluate('() => (window.__next_f || []).length')
    body_len3 = len(page3.inner_text('body'))
    h1_3 = page3.query_selector('h1')
    h1_text3 = h1_3.inner_text() if h1_3 else 'NOT FOUND'
    
    print(f"\n=== Sudoku page ===")
    print(f"__next_f length: {next_f_len3}")
    print(f"Body text length: {body_len3}")
    print(f"H1: {h1_text3}")
    print(f"Page errors: {errors3}")
    
    browser.close()
