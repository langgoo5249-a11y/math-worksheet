from playwright.sync_api import sync_playwright
import http.server
import socketserver
import threading
import os

# Start local server
PORT = 3456
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)
server_thread = threading.Thread(target=httpd.serve_forever)
server_thread.daemon = True
server_thread.start()

print(f"Local server running on port {PORT}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    
    errors = []
    page.on('pageerror', lambda err: errors.append(str(err)))
    
    # Test local build
    page.goto(f'http://localhost:{PORT}/out/tools/calligraphy/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(3000)
    
    next_f_len = page.evaluate('() => (window.__next_f || []).length')
    body_len = len(page.inner_text('body'))
    h1 = page.query_selector('h1')
    h1_text = h1.inner_text() if h1 else 'NOT FOUND'
    
    print(f"\n=== Local build ===")
    print(f"__next_f length: {next_f_len}")
    print(f"Body text length: {body_len}")
    print(f"H1: {h1_text}")
    print(f"Page errors: {errors}")
    
    if next_f_len > 0 and body_len > 1000:
        print("✓ Local build is working correctly")
    else:
        print("✗ Local build has the same issue")
    
    browser.close()

httpd.shutdown()
