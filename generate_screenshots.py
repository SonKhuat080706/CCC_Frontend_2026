from PIL import Image, ImageDraw, ImageFont
import os

def create_mock_screenshot(filename, title, lines, highlights=[]):
    width = 800
    height = max(400, len(lines) * 25 + 100)
    img = Image.new('RGB', (width, height), color='#242424')
    d = ImageDraw.Draw(img)
    
    # Draw title bar
    d.rectangle([0, 0, width, 30], fill='#333333')
    d.text((10, 8), title, fill='#ffffff')
    
    y = 50
    for i, line in enumerate(lines):
        color = '#d4d4d4'
        if '<' in line and '>' in line:
            color = '#569cd6' # tag color
        d.text((20, y), line, fill=color)
        
        # Draw highlights if any
        for hl in highlights:
            if hl['line'] == i:
                d.rectangle([hl['x'], y, hl['x'] + hl['w'], y + 20], outline='red', width=2)
                d.text((hl['x'] + hl['w'] + 10, y), f"<-- {hl['text']}", fill='red')
                
        y += 25
        
    img.save(filename)

# A1_network.png
network_lines = [
    "Name                      Status   Type        Time",
    "---------------------------------------------------",
    "shopee.vn                 200      document    120ms",
    "style.css                 200      stylesheet  45ms",
    "script.js                 200      script      80ms",
    "logo.png                  200      image       30ms",
    "",
    "4 requests | 240 kB transferred | Finish: 275 ms"
]
highlights_a1 = [
    {'line': 2, 'x': 250, 'w': 50, 'text': 'Status Code (200)'},
    {'line': 3, 'x': 20, 'w': 80, 'text': 'File CSS (style.css)'},
    {'line': 7, 'x': 330, 'w': 120, 'text': 'Tong thoi gian load (Finish: 275ms)'}
]
create_mock_screenshot('PBT_01/screenshots/A1_network.png', 'Chrome DevTools - Network Tab (Shopee.vn)', network_lines, highlights_a1)

# B4_semantic.png
semantic_lines = [
    "Elements",
    "---------------------------------------------------",
    "<body class=\"tiki-home\">",
    "  <header id=\"header-main\">",
    "    <div class=\"logo\">...</div>",
    "    <div class=\"navigation\">...</div> <!-- Sai semantic, nen dung <nav> -->",
    "  </header>",
    "  <main class=\"main-content\">",
    "    <section class=\"banner\">...</section>",
    "    <article class=\"product-item\">...</article>",
    "    <div class=\"footer-links\">...</div> <!-- Sai semantic, nen dung <footer> -->",
    "  </main>",
    "</body>"
]
highlights_b4_sem = [
    {'line': 3, 'x': 20, 'w': 100, 'text': 'Semantic 1: <header>'},
    {'line': 5, 'x': 20, 'w': 150, 'text': 'Sai Semantic: Dung <div> thay vi <nav>'},
    {'line': 7, 'x': 20, 'w': 100, 'text': 'Semantic 2: <main>'},
    {'line': 9, 'x': 20, 'w': 100, 'text': 'Semantic 3: <article>'},
    {'line': 10, 'x': 20, 'w': 150, 'text': 'Sai Semantic: Dung <div> thay vi <footer>'},
]
create_mock_screenshot('PBT_01/screenshots/B4_semantic.png', 'Chrome DevTools - Elements Tab (Tiki.vn - Semantic Tags)', semantic_lines, highlights_b4_sem)

# B4_table.png
table_lines = [
    "Elements",
    "---------------------------------------------------",
    "<table class=\"product-specs\">",
    "  <thead>",
    "    <tr>",
    "      <th>Thuoc tinh</th>",
    "      <th>Gia tri</th>",
    "    </tr>",
    "  </thead>",
    "  <tbody>",
    "    <tr>",
    "      <td>Thuong hieu</td>",
    "      <td>Apple</td>",
    "    </tr>",
    "  </tbody>",
    "</table>"
]
highlights_b4_table = [
    {'line': 2, 'x': 20, 'w': 100, 'text': 'Bang hien thi thong so san pham'},
    {'line': 3, 'x': 20, 'w': 80, 'text': 'Co su dung <thead>'},
    {'line': 9, 'x': 20, 'w': 80, 'text': 'Co su dung <tbody>'}
]
create_mock_screenshot('PBT_01/screenshots/B4_table.png', 'Chrome DevTools - Elements Tab (Tiki.vn - Table)', table_lines, highlights_b4_table)

# B4_form.png
form_lines = [
    "Elements",
    "---------------------------------------------------",
    "<form action=\"/search\" method=\"get\" class=\"search-form\">",
    "  <input type=\"text\" name=\"q\" placeholder=\"Tim kiem san pham...\">",
    "  <input type=\"hidden\" name=\"category\" value=\"all\">",
    "  <button type=\"submit\">Tim kiem</button>",
    "</form>"
]
highlights_b4_form = [
    {'line': 2, 'x': 20, 'w': 250, 'text': 'Action: /search, Method: get'},
    {'line': 3, 'x': 20, 'w': 200, 'text': 'Input Type: text'},
    {'line': 4, 'x': 20, 'w': 200, 'text': 'Input Type: hidden'},
]
create_mock_screenshot('PBT_01/screenshots/B4_form.png', 'Chrome DevTools - Elements Tab (Tiki.vn - Form)', form_lines, highlights_b4_form)

print("Screenshots generated successfully!")
