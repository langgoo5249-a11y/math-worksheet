from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os

# Start local server from out/ directory
PORT = 3458
os.chdir('/workspace/out')
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)
server_thread = threading.Thread(target=httpd.serve_forever)
server_thread.daemon = True
server_thread.start()

print(f"Local server running on port {PORT}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # Test multiple times to check for race conditions
    results = []
    for i in range(5):
        context = browser.new_context()
        page = context.new_page()
        
        page_errors = []
        page.on('pageerror', lambda err: page_errors.append(str(err)))
        
        page.goto(f'http://localhost:{PORT}/tools/calligraphy/', wait_until='networkidle', timeout=30000)
        page.wait_for_timeout(3000)
        
        next_f_len = page.evaluate('() => (window.__next_f || []).length')
        body_len = len(page.inner_text('body'))
        h1 = page.query_selector('h1')
        h1_text = h1.inner_text() if h1 else 'NOT FOUND'
        
        results.append({
            'run': i + 1,
            'next_f': next_f_len,
            'body_len': body_len,
            'h1': h1_text,
            'errors': len(page_errors)
        })
        
        context.close()
    
    print("\n=== Test Results (5 runs) ===")
    all_pass = True
    for r in results:
        status = "✓" if r['h1'] != 'NOT FOUND' and r['body_len'] > 1000 else "✗"
        if status == "✗":
            all_pass = False
        print(f"Run {r['run']}: {status} __next_f={r['next_f']}, body={r['body_len']}, h1='{r['h1']}', errors={r['errors']}")
    
    if all_pass:
        print("\n✓ All tests passed! Fix is working correctly.")
    else:
        print("\n✗ Some tests failed. Issue persists.")
    
    browser.close()

httpd.shutdown()
