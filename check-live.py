import requests

# Check live site headers
resp = requests.get('https://www.skillxm.cn/tools/calligraphy/', 
                     headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
print(f"Status: {resp.status_code}")
print(f"cf-cache-status: {resp.headers.get('cf-cache-status', 'N/A')}")
print(f"Content-Length: {len(resp.text)}")
print(f"Cache-Control: {resp.headers.get('Cache-Control', 'N/A')}")
print(f"Content-Security-Policy present: {'Content-Security-Policy' in resp.headers}")

# Check if __next_f is present
next_f_count = resp.text.count('self.__next_f')
print(f"self.__next_f occurrences: {next_f_count}")

# Check if promises issue exists
if '"promises"' in resp.text:
    print("WARNING: 'promises' found in RSC payload - this may cause hydration issues")
else:
    print("No 'promises' in RSC payload - OK")

# Check for key content
if '田字格字帖生成器' in resp.text:
    print("Content '田字格字帖生成器' found in HTML - OK")
else:
    print("WARNING: Content NOT found in HTML")
