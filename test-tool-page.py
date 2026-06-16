#!/usr/bin/env python3
"""Test tool page rendering with Playwright"""

from playwright.sync_api import sync_playwright
import sys

def test_page(url):
    print(f"\n{'='*60}")
    print(f"Testing: {url}")
    print(f"{'='*60}\n")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = context.new_page()
        
        # Collect console messages and errors
        console_messages = []
        page_errors = []
        
        page.on('console', lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
        page.on('pageerror', lambda err: page_errors.append(str(err)))
        
        try:
            # Navigate and wait for network idle
            print("Navigating...")
            response = page.goto(url, wait_until='networkidle', timeout=30000)
            
            print(f"Status: {response.status if response else 'No response'}")
            
            # Wait a bit more for React hydration
            page.wait_for_timeout(2000)
            
            # Take screenshot
            screenshot_path = '/tmp/tool-page-test.png'
            page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot saved: {screenshot_path}")
            
            # Check if main content is visible
            print("\n--- Content Check ---")
            
            # Check for common tool page elements
            h1 = page.query_selector('h1')
            if h1:
                h1_text = h1.inner_text()
                print(f"H1 found: {h1_text}")
                print(f"H1 visible: {h1.is_visible()}")
            else:
                print("H1 NOT found")
            
            # Check for tool-specific elements
            buttons = page.query_selector_all('button')
            print(f"Buttons found: {len(buttons)}")
            
            inputs = page.query_selector_all('input, textarea, select')
            print(f"Form elements found: {len(inputs)}")
            
            # Check body content
            body_text = page.inner_text('body')
            print(f"Body text length: {len(body_text)} chars")
            print(f"Body text preview: {body_text[:200]}...")
            
            # Check if React app mounted
            next_root = page.query_selector('#__next')
            if next_root:
                print(f"\n#__next exists: True")
                print(f"#__next children: {next_root.evaluate('el => el.children.length')}")
            else:
                print("\n#__next NOT found - React may not have mounted")
            
            # Console errors
            print(f"\n--- Console Messages ({len(console_messages)}) ---")
            for msg in console_messages[:20]:  # Show first 20
                print(msg)
            if len(console_messages) > 20:
                print(f"... and {len(console_messages) - 20} more")
            
            print(f"\n--- Page Errors ({len(page_errors)}) ---")
            for err in page_errors:
                print(f"ERROR: {err}")
            
            # Check network requests
            print(f"\n--- Network Summary ---")
            print(f"Total console messages: {len(console_messages)}")
            print(f"Total page errors: {len(page_errors)}")
            
            # Return success/failure
            has_content = len(body_text.strip()) > 100 and h1 is not None
            has_errors = len(page_errors) > 0
            
            if has_content and not has_errors:
                print(f"\n✓ Page appears to be working correctly")
                return True
            else:
                print(f"\n✗ Page has issues:")
                if not has_content:
                    print("  - Insufficient content visible")
                if has_errors:
                    print(f"  - {len(page_errors)} JavaScript error(s)")
                return False
                
        except Exception as e:
            print(f"\n✗ Test failed with exception: {e}")
            return False
        finally:
            browser.close()

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'https://www.skillxm.cn/tools/calligraphy/'
    success = test_page(url)
    sys.exit(0 if success else 1)
