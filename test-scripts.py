from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    
    # Track script execution
    scripts_loaded = []
    scripts_failed = []
    
    def on_response(response):
        url = response.url
        if '/_next/static/chunks/' in url and url.endswith('.js'):
            if response.status == 200:
                scripts_loaded.append(url.split('/')[-1])
            else:
                scripts_failed.append(f"{url.split('/')[-1]} - {response.status}")
    
    page.on('response', on_response)
    
    # Track console
    console_msgs = []
    page.on('console', lambda msg: console_msgs.append(f"[{msg.type}] {msg.text}"))
    
    page_errors = []
    page.on('pageerror', lambda err: page_errors.append(str(err)))
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)
    
    print("=== Script Loading ===")
    print(f"Scripts loaded: {len(scripts_loaded)}")
    for s in scripts_loaded[:10]:
        print(f"  ✓ {s}")
    if scripts_failed:
        print(f"Scripts failed: {scripts_failed}")
    
    print("\n=== Page State ===")
    next_f = page.evaluate('() => window.__next_f')
    print(f"__next_f type: {type(next_f)}")
    print(f"__next_f value: {next_f}")
    
    # Check if React is loaded
    react_loaded = page.evaluate('() => !!window.React')
    print(f"React loaded: {react_loaded}")
    
    # Check for React root
    has_react_root = page.evaluate('''() => {
        // Next.js 16 doesn't use #__next, check for data-reactroot
        const body = document.body;
        return body.children.length > 0;
    }''')
    print(f"Has content in body: {has_react_root}")
    
    # Check body children
    body_children = page.evaluate('''() => {
        const children = [];
        for (let child of document.body.children) {
            children.push({
                tag: child.tagName,
                id: child.id || '',
                class: child.className || '',
                hidden: child.hidden || false,
                display: window.getComputedStyle(child).display,
                textLength: child.textContent.length
            });
        }
        return children;
    }''')
    print(f"\nBody children ({len(body_children)}):")
    for child in body_children[:15]:
        print(f"  {child}")
    
    print("\n=== Console Messages ===")
    for msg in console_msgs[:20]:
        print(f"  {msg[:150]}")
    
    print("\n=== Page Errors ===")
    for err in page_errors:
        print(f"  {err[:200]}")
    
    browser.close()
