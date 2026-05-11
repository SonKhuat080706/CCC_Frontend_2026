# 📋 PHIẾU BÀI TẬP 03 — BÀI LÀM

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 (5đ) — 3 Cách nhúng CSS

#### 1. Inline CSS

```html
<p style="color: red; font-size: 18px;">Đây là inline CSS</p>
```

- **Ưu điểm:** Áp dụng trực tiếp, nhanh chóng, ưu tiên cao (dễ override)
- **Nhược điểm:** Không tái sử dụng, khó bảo trì, trộn lẫn HTML và CSS
- **Khi nào dùng:** Khi cần style nhanh 1 element duy nhất, test nhanh, hoặc trong email HTML

#### 2. Internal CSS (Embedded)

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
```

- **Ưu điểm:** Gom CSS tại 1 chỗ trong file, không cần file riêng
- **Nhược điểm:** Không chia sẻ được giữa các trang, file HTML dài hơn
- **Khi nào dùng:** Trang đơn lẻ, prototype nhanh, hoặc CSS đặc thù cho 1 trang

#### 3. External CSS

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

```css
/* style.css */
p {
    color: green;
    font-size: 14px;
}
```

- **Ưu điểm:** Tái sử dụng cho nhiều trang, dễ bảo trì, tách biệt concerns, trình duyệt cache được
- **Nhược điểm:** Cần thêm HTTP request, nếu CSS file lỗi thì cả trang bị ảnh hưởng
- **Khi nào dùng:** Hầu hết mọi dự án thực tế, website nhiều trang

#### Câu hỏi thêm: Cách nào "thắng"?

Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, **Inline CSS "thắng"**.

**Giải thích:** Theo quy tắc Cascade, thứ tự ưu tiên (từ thấp đến cao):
1. External CSS (specificity thấp nhất trong cùng selector)
2. Internal CSS (cùng specificity thì internal CSS xuất hiện sau external nếu `<link>` trước `<style>`)
3. **Inline CSS** (specificity cao nhất: `1,0,0,0`)

Inline CSS luôn có specificity `(1,0,0,0)` — cao hơn bất kỳ selector nào trong external/internal (trừ `!important`).

---

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

```
1. h1                           → Chọn: "ShopTLU" (thẻ h1 trong header)
2. .price                       → Chọn: "25.990.000đ" và "45.990.000đ" (2 phần tử có class="price")
3. #app header                  → Chọn: phần tử <header class="top-bar dark"> (toàn bộ header)
4. nav a:first-child             → Chọn: "Home" (thẻ <a> đầu tiên trong nav)
5. .product.featured h2         → Chọn: "MacBook Pro" (h2 trong article có cả class product và featured)
6. article > p                  → Chọn: "25.990.000đ", "Mô tả sản phẩm..." (article 1) và "45.990.000đ", "Mô tả sản phẩm..." (article 2) — tổng 4 phần tử <p> là con trực tiếp của article
7. a[href="/"]                  → Chọn: "Home" (thẻ <a> có href chính xác bằng "/")
8. .top-bar.dark h1              → Chọn: "ShopTLU" (h1 bên trong element có cả class top-bar và dark)
```

**Kiểm chứng:** Xem file `selectors_test.html`

---

### Câu A3 (7đ) — Box Model — Tính toán kích thước

#### Trường hợp 1: content-box (mặc định)

```
.box-1 {
    width: 400px;        /* content width */
    padding: 20px;       /* left + right = 40px */
    border: 5px solid;   /* left + right = 10px */
    margin: 10px;        /* left + right = 20px */
}
```

- **Chiều rộng hiển thị** (border edge) = 400 + 40 + 10 = **450px**
- **Không gian chiếm trên trang** (bao gồm margin) = 450 + 20 = **470px**

#### Trường hợp 2: border-box

```
.box-2 {
    box-sizing: border-box;
    width: 400px;        /* = content + padding + border */
    padding: 20px;       /* left + right = 40px */
    border: 5px solid;   /* left + right = 10px */
    margin: 10px;        /* left + right = 20px */
}
```

- **Chiều rộng hiển thị** (border edge) = **400px** (width đã bao gồm padding + border)
- **Kích thước content thực tế** = 400 - 40 - 10 = **350px**
- **Không gian chiếm trên trang** (bao gồm margin) = 400 + 20 = **420px**

#### Trường hợp 3: Margin collapse

```
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

- **Khoảng cách giữa box-a và box-b** = **40px**
- **Giải thích:** Margin collapse xảy ra khi 2 vertical margin (trên-dưới) tiếp giáp nhau. Thay vì cộng (25 + 40 = 65px), trình duyệt chỉ lấy **giá trị lớn hơn** (max(25, 40) = 40px). Đây là cơ chế **margin collapsing** của CSS — chỉ áp dụng cho vertical margin (không áp dụng cho horizontal margin).

#### Nâng cao: Negative margin

```
.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
```

- **Khoảng cách** = max positive + min negative = 40 + (-10) = **30px**
- Khi có margin âm, quy tắc: lấy giá trị dương lớn nhất cộng với giá trị âm nhỏ nhất (âm nhất).

---

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

```css
p { color: black; }                    /* Rule A — Specificity: (0, 0, 1) */
.price { color: blue; }               /* Rule B — Specificity: (0, 1, 0) */
#main-price { color: red; }           /* Rule C — Specificity: (0, 1, 0) → SỬA: (1, 0, 0) */
p.price { color: green; }             /* Rule D — Specificity: (0, 1, 1) */
```

**Tính specificity (a, b, c):**

| Rule | Selector | ID (a) | Class (b) | Element (c) | Score |
|------|----------|--------|------------|-------------|-------|
| A | `p` | 0 | 0 | 1 | (0,0,1) |
| B | `.price` | 0 | 1 | 0 | (0,1,0) |
| C | `#main-price` | 1 | 0 | 0 | (1,0,0) |
| D | `p.price` | 0 | 1 | 1 | (0,1,1) |

**1. Element sẽ có màu gì?**

→ **Màu đỏ (red)** — Rule C thắng vì có specificity cao nhất (1,0,0).

**2. Nếu thêm `style="color: orange;"`:**

→ **Màu cam (orange)** — Inline style có specificity (1,0,0,0), cao hơn mọi selector trong stylesheet.

**3. Nếu Rule A thêm `!important`:**

```css
p { color: black !important; }
```

→ **Màu đen (black)** — `!important` luôn thắng mọi rule không có `!important`, bất kể specificity. `!important` tạo ra một "layer" ưu tiên riêng, cao hơn cả inline style.

---

## PHẦN C — DEBUG & SUY LUẬN

---

### Câu C1 (10đ) — Debug CSS Layout

#### 1. Tính chiều rộng thực tế (content-box)

**Sidebar:**
- Content: 300px
- Padding: 20px × 2 = 40px
- Border: 1px × 2 = 2px
- **Chiều rộng thực tế = 300 + 40 + 2 = 342px**

**Content:**
- Content: 660px
- Padding: 30px × 2 = 60px
- Border: 1px × 2 = 2px
- **Chiều rộng thực tế = 660 + 60 + 2 = 722px**

#### 2. Giải thích tại sao layout bị vỡ

**Tổng chiều rộng = 342 + 722 = 1064px > 960px (container)**

Vì dùng `box-sizing: content-box` (mặc định), `width` chỉ tính content. Padding và border được cộng thêm bên ngoài, khiến tổng chiều rộng vượt quá 960px. Do đó, `.content` bị đẩy xuống dòng mới vì không đủ chỗ nằm cạnh `.sidebar`.

#### 3. Hai cách sửa

**Cách 1: Dùng `box-sizing: border-box`**

```css
.sidebar, .content {
    box-sizing: border-box;
}
```

Khi dùng `border-box`, `width` đã bao gồm padding + border:
- Sidebar: 300px (tổng)
- Content: 660px (tổng)
- Tổng: 300 + 660 = 960px ✓

**Cách 2: Tính lại width (không dùng border-box)**

```css
.sidebar {
    width: 258px;  /* 300 - 40 - 2 = 258px content */
    /* Tổng: 258 + 40 + 2 = 300px */
}
.content {
    width: 598px;  /* 660 - 60 - 2 = 598px content */
    /* Tổng: 598 + 60 + 2 = 660px */
}
/* Tổng: 300 + 660 = 960px ✓ */
```

**Chứng minh:** Xem file `debug_layout.html`

---

### Câu C2 (10đ) — Cascade Puzzle

#### 1. "Sản phẩm A" (h2.title.highlight trong #featured .card)

**`font-size` = 20px**
- `body { font-size: 16px }` → inherited
- `.container { font-size: 14px }` → inherited (ghi đè 16px)
- `.card .title { font-size: 20px }` → specificity (0,2,0) — áp dụng trực tiếp
- → **font-size = 20px**

**`color` = green**
- `.card { color: blue }` → specificity (0,1,0)
- `#featured .title { color: red }` → specificity (1,1,0)
- `.highlight { color: green !important }` → có `!important`!
- → Dù `#featured .title` có specificity cao hơn `.highlight`, nhưng `!important` luôn thắng.
- → **color = green**

#### 2. "Mô tả sản phẩm" (p trong #featured .card)

**`color` = blue**
- `body { color: #333 }` → inherited
- `.card { color: blue }` → specificity (0,1,0) — áp dụng trực tiếp cho parent .card
- `.card p { color: inherit }` → specificity (0,1,1) — `inherit` nghĩa là lấy giá trị từ parent
- Parent `.card` có `color: blue`
- → **color = blue**

#### 3. "Sản phẩm B" (h2.title trong .card thứ 2, không có id)

**`font-size` = 20px**
- `.card .title { font-size: 20px }` → áp dụng trực tiếp
- → **font-size = 20px**

**`color` = blue**
- `body { color: #333 }` → inherited
- `.card { color: blue }` → specificity (0,1,0) — áp dụng cho parent
- `#featured .title { color: red }` → KHÔNG áp dụng (element này không nằm trong #featured)
- `.card .title` không set color → kế thừa từ `.card` → blue
- → **color = blue** (inherited từ `.card`)

#### 4. "Mô tả sản phẩm B" (p.highlight)

**`color` = green**
- `.card { color: blue }` → specificity (0,1,0) cho parent
- `.card p { color: inherit }` → specificity (0,1,1) — inherit từ parent = blue
- `.highlight { color: green !important }` → có `!important`!
- → `!important` thắng mọi thứ
- → **color = green**

**Kiểm chứng:** Xem file `cascade_test.html`

---

## Bài B1 — Liệt kê 5 loại selector đã dùng trong style.css

1. **Element selector**: `body`, `header`, `nav`, `table`, `footer`, `h2`, `p`
2. **Class selector**: `.active`
3. **ID selector**: `#about`, `#skills`, `#contact`
4. **Descendant selector**: `nav ul`, `nav ul li a`, `thead tr`, `tbody tr`
5. **Pseudo-class selector**: `nav ul li a:hover`, `tbody tr:nth-child(even)`, `tbody tr:hover`

---

## Bài B2 — Kết quả đo DevTools

```
Hộp 1 (content-box): chiều rộng thực tế = 350px (300 + 20*2 + 5*2 = 350px)
Hộp 2 (border-box): chiều rộng thực tế = 300px (width đã bao gồm padding + border)
Giải thích sự khác biệt:
- content-box: width chỉ tính phần content, padding và border cộng thêm bên ngoài
- border-box: width bao gồm cả content + padding + border, nên kích thước hiển thị đúng bằng width
```

> **[TODO - Chụp screenshot DevTools cho 2 hộp]**

---

## Bài B3 — 10 CSS Rules & Specificity

| # | Selector | Specificity | Color |
|---|----------|-------------|-------|
| 1 | `*` | (0,0,0) | gray |
| 2 | `p` | (0,0,1) | brown |
| 3 | `.text` | (0,1,0) | blue |
| 4 | `.highlight` | (0,1,0) | cyan |
| 5 | `p.text` | (0,1,1) | teal |
| 6 | `.text.highlight` | (0,2,0) | magenta |
| 7 | `p.text.highlight` | (0,2,1) | orange |
| 8 | `#demo` | (1,0,0) | red |
| 9 | `#demo.text` | (1,1,0) | purple |
| 10 | `#demo.text.highlight` | (1,2,0) | gold |

**Element cuối cùng hiển thị màu gì?** → **gold**

**Tại sao?** Rule 10 (`#demo.text.highlight`) có specificity cao nhất `(1,2,0)`, nên nó thắng tất cả các rule khác.

**Thay đổi thứ tự rules có đổi kết quả không?** → **Không**, vì mỗi rule có specificity khác nhau. Thứ tự chỉ quan trọng khi 2 rules có **cùng specificity** — khi đó rule xuất hiện sau sẽ thắng. Ở đây, tất cả 10 rules đều có specificity khác nhau nên thứ tự không ảnh hưởng.

> **[TODO - Chụp screenshot kết quả]**
