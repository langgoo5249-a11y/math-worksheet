from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    
    all_console = []
    page.on('console', lambda msg: all_console.append(f"[{msg.type}] {msg.text}"))
    page.on('pageerror', lambda err: all_console.append(f"[PAGE_ERROR] {err}"))
    
    # Track failed requests
    failed_requests = []
    page.on('requestfailed', lambda req: failed_requests.append(f"{req.url} - {req.failure}"))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)
    
    # Check HTML structure
    has_next_div = page.evaluate('() => !!document.getElementById("__next")')
    print(f"Has #__next div: {has_next_div}")
    
    # Check __next_f
    next_f_len = page.evaluate('() => (window.__next_f || []).length')
    print(f"__next_f length: {next_f_len}")
    
    # Check body HTML length
    body_html_len = len(page.inner_html('body'))
    print(f"Body HTML length: {body_html_len}")
    
    # Check body text
    body_text = page.inner_text('body')
    print(f"Body text length: {len(body_text)}")
    print(f"Body text: {repr(body_text[:500])}")
    
    # Check failed requests
    print(f"\nFailed requests ({len(failed_requests)}):")
    for req in failed_requests[:20]:
        print(f"  {req}")
    
    # Check console messages
    print(f"\nConsole messages ({len(all_console)}):")
    for msg in all_console[:30]:
        print(f"  {msg[:200]}")
    
    # Check if the page has any visible content
    visible_text = page.evaluate('''() => {
        const elements = document.querySelectorAll('h1, h2, h3, p, span, div');
        let texts = [];
        elements.forEach(el => {
            const text = el.textContent.trim();
            if (text && text.length > 5 && text.length < 100) {
                texts.push(text);
            }
        });
        return texts.slice(0, 20);
    }''')
    print(f"\nVisible text elements: {visible_text}")
    
    browser.close()
