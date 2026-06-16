from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    all_console = []
    page.on('console', lambda msg: all_console.append(f"[{msg.type}] {msg.text}"))
    page.on('pageerror', lambda err: all_console.append(f"[PAGE_ERROR] {str(err)}"))
    
    # Track JS requests
    js_responses = {}
    def on_response(response):
        url = response.url
        if '/_next/static/chunks/' in url and url.endswith('.js'):
            js_responses[url.split('/')[-1]] = response.status
    page.on('response', on_response)
    
    page.goto('https://www.skillxm.cn/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(5000)
    
    # Check if self.__next_f was populated
    next_f_length = page.evaluate('() => window.__next_f ? window.__next_f.length : -1')
    print(f"window.__next_f length: {next_f_length}")
    
    # Check if React is loaded
    has_react = page.evaluate('() => typeof window.React !== "undefined"')
    print(f"window.React exists: {has_react}")
    
    # Check for Next.js internal state
    next_state = page.evaluate('() => { try { return typeof window.__next_router_components__ } catch(e) { return e.message } }')
    print(f"Next router state: {next_state}")
    
    # Check JS chunk loading
    print(f"\n=== JS Chunks Loaded ({len(js_responses)}) ===")
    for name, status in sorted(js_responses.items()):
        print(f"  {name}: {status}")
    
    # Check for error messages in the page
    error_text = page.evaluate('''() => {
        const body = document.body.innerHTML;
        const errors = [];
        if (body.includes('Application error')) errors.push('Application error found');
        if (body.includes('hydration')) errors.push('Hydration error mentioned');
        if (body.includes('Error')) {
            // find context around "Error"
            const idx = body.indexOf('Error');
            errors.push('Error context: ' + body.substring(Math.max(0, idx-50), idx+100));
        }
        return errors;
    }''')
    print(f"\nError text in page: {error_text}")
    
    # Check all non-analytics console messages
    print(f"\n=== Non-analytics console ({len(all_console)}) ===")
    for msg in all_console:
        lower = msg.lower()
        if 'google' not in lower and 'cloudflare' not in lower and 'analytics' not in lower and 'collect' not in lower:
            print(msg)
    
    # Check DOM structure more carefully
    dom_info = page.evaluate('''() => {
        const body = document.body;
        const children = [];
        for (const child of body.children) {
            const info = {
                tag: child.tagName,
                id: child.id || '',
                class: child.className?.toString().substring(0, 50) || '',
                hidden: child.hidden,
                display: getComputedStyle(child).display,
                visibility: getComputedStyle(child).visibility,
                childCount: child.children.length,
                textLen: child.innerText?.length || 0
            };
            children.push(info);
        }
        return children;
    }''')
    print(f"\n=== DOM Structure ===")
    for child in dom_info:
        print(f"  {child['tag']} id={child['id']} class={child['class'][:30]} hidden={child['hidden']} display={child['display']} children={child['childCount']} text={child['textLen']}")
    
    browser.close()
