# 📋 PBT 05 — BÀI LÀM
# CSS Responsive & SCSS — Responsive Design, Media Queries, Sass

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

**1. Thẻ `<meta viewport>` chuẩn:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích từng thuộc tính:

| Thuộc tính | Giá trị | Ý nghĩa |
|---|---|---|
| `name="viewport"` | `viewport` | Cho trình duyệt biết thẻ meta này dùng để điều khiển viewport (vùng hiển thị) |
| `width=device-width` | `device-width` | Đặt chiều rộng viewport bằng chiều rộng thực tế của thiết bị. Ví dụ: iPhone 14 = 390px, Samsung Galaxy S23 = 360px |
| `initial-scale=1.0` | `1.0` | Đặt mức zoom ban đầu là 100% (không phóng to, không thu nhỏ). Giá trị 1.0 = tỷ lệ 1:1 giữa CSS pixels và device pixels |

**2. Nếu THIẾU thẻ viewport:**

Khi thiếu thẻ `<meta viewport>`, iPhone (và các trình duyệt mobile khác) sẽ:
- Giả định trang web được thiết kế cho desktop → render ở viewport mặc định **~980px** (Safari) hoặc ~1024px (Chrome mobile)
- Thu nhỏ (scale down) toàn bộ trang để vừa màn hình ~390px → nội dung rất **nhỏ, khó đọc**
- Người dùng phải **pinch-to-zoom** (chụm ngón tay phóng to) mới đọc được chữ
- Các media queries không hoạt động đúng vì viewport vẫn là 980px chứ không phải 390px

**3. Mobile-First vs Desktop-First:**

**Mobile-First** — CSS mặc định viết cho mobile, dùng `min-width` để thêm style cho màn hình lớn hơn:

```css
/* Base = Mobile (mặc định) */
.container {
    width: 100%;
    padding: 16px;
}

/* Tablet trở lên */
@media (min-width: 768px) {
    .container {
        width: 720px;
        margin: 0 auto;
    }
}
```

**Desktop-First** — CSS mặc định viết cho desktop, dùng `max-width` để ghi đè cho màn hình nhỏ hơn:

```css
/* Base = Desktop (mặc định) */
.container {
    width: 720px;
    margin: 0 auto;
}

/* Mobile */
@media (max-width: 767px) {
    .container {
        width: 100%;
        padding: 16px;
    }
}
```

**Tại sao Mobile-First được khuyên dùng?**

1. **Progressive Enhancement** — Xây dựng từ nền tảng đơn giản (mobile) lên phức tạp (desktop), thay vì cắt bỏ tính năng
2. **Hiệu suất tốt hơn** — Mobile tải ít CSS hơn vì chỉ cần base styles, thêm rules khi màn hình lớn
3. **Xu hướng sử dụng** — Hơn 60% traffic internet đến từ mobile → ưu tiên mobile là hợp lý
4. **Thiết kế tập trung** — Buộc phải ưu tiên nội dung quan trọng nhất khi không gian giới hạn
5. **Code sạch hơn** — Dễ mở rộng thêm features hơn là cắt bỏ

---

### Câu A2 (5đ) — Breakpoints

Breakpoints chuẩn (theo Bootstrap 5 và thực tiễn):

| Breakpoint | Kích thước | Thiết bị đại diện | Lưới sản phẩm (cột) |
|---|---|---|---|
| **xs** | < 576px | Điện thoại dọc (iPhone SE, Galaxy A) | **1 cột** |
| **sm** | ≥ 576px | Điện thoại ngang, điện thoại lớn | **1-2 cột** |
| **md** | ≥ 768px | Tablet dọc (iPad Mini, iPad Air) | **2 cột** |
| **lg** | ≥ 992px | Tablet ngang, laptop nhỏ (MacBook Air) | **3 cột** |
| **xl** | ≥ 1200px | Desktop, laptop lớn (MacBook Pro 15") | **4 cột** |
| **xxl** | ≥ 1400px | Desktop lớn, màn hình ultra-wide | **4-5 cột** |

**Giải thích logic chọn số cột:**
- **Mobile (1 cột):** Màn hình hẹp (~375px), mỗi card chiếm toàn bộ chiều rộng để đảm bảo nội dung đọc được
- **Tablet (2 cột):** Chiều rộng ~768px, mỗi card ~370px → vừa đủ hiển thị ảnh + text
- **Laptop (3 cột):** ~992px ÷ 3 = ~330px mỗi card, vẫn thoải mái
- **Desktop (4 cột):** ~1200px ÷ 4 = ~300px mỗi card, tối ưu không gian lớn

---

### Câu A3 (5đ) — Media Queries

Phân tích CSS đã cho (Mobile-First, sử dụng `min-width`):

```css
.container { width: 100%; padding: 10px; }
@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container` width | Giải thích |
|---|---|---|
| **375px** (iPhone SE) | **100%** | Không media query nào match (375 < 576). Dùng CSS mặc định: `width: 100%` |
| **600px** | **540px** | `min-width: 576px` match ✅ (600 ≥ 576). Các query 768, 992, 1200 không match |
| **800px** | **720px** | `min-width: 576px` match ✅ → width: 540px. `min-width: 768px` match ✅ → **ghi đè** thành 720px (rule sau ghi đè rule trước theo cascade) |
| **1000px** | **960px** | 576 ✅, 768 ✅, 992 ✅ → rule cuối match ghi đè: **960px** |
| **1400px** | **1140px** | Tất cả match ✅. Rule cuối cùng `min-width: 1200px` ghi đè: **1140px** |

**Nguyên lý hoạt động:**
- Với `min-width`, **tất cả** media queries có giá trị ≤ chiều rộng màn hình đều match
- Khi nhiều rules cùng match, rule **xuất hiện sau** trong CSS sẽ ghi đè rule trước (theo CSS Cascade)
- Đây là lý do media queries Mobile-First **phải viết từ nhỏ → lớn** để đảm bảo rule lớn hơn ghi đè đúng

---

### Câu A4 (5đ) — SCSS Basics

**4 tính năng chính của SCSS:**

#### 1. Variables (Biến)

```scss
// Khai báo biến
$primary-color: #e94560;
$font-main: 'Inter', sans-serif;
$spacing: 16px;

// Sử dụng biến
.header {
    background: $primary-color;
    font-family: $font-main;
    padding: $spacing;
}
```

→ Thay đổi giá trị `$primary-color` một lần sẽ tự động cập nhật **toàn bộ** file. Rất tiện cho việc quản lý design system.

#### 2. Nesting (Viết CSS lồng nhau)

```scss
// SCSS — cấu trúc phản ánh HTML
.nav {
    background: #333;
    
    .nav-item {
        padding: 10px;
        
        a {
            color: white;
            text-decoration: none;
        }
    }
    
    // Parent selector (&) = .nav:hover
    &:hover {
        background: #444;
    }
}
```

Compile ra CSS:
```css
.nav { background: #333; }
.nav .nav-item { padding: 10px; }
.nav .nav-item a { color: white; text-decoration: none; }
.nav:hover { background: #444; }
```

→ Code dễ đọc hơn, phản ánh cấu trúc HTML, không cần viết lại selector dài.

#### 3. Mixins (`@mixin` + `@include`)

```scss
// Khai báo mixin (có thể nhận tham số)
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin respond-to($breakpoint) {
    @media (min-width: $breakpoint) {
        @content;
    }
}

// Sử dụng mixin
.hero {
    @include flex-center;
    height: 100vh;
    
    @include respond-to(768px) {
        height: 60vh;
    }
}
```

→ Mixins là các "đoạn code tái sử dụng" có thể nhận tham số. Tránh lặp lại code.

#### 4. `@extend` / Inheritance (Kế thừa)

```scss
// Class gốc
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

// Kế thừa từ .btn
.btn-primary {
    @extend .btn;
    background: blue;
    color: white;
}

.btn-danger {
    @extend .btn;
    background: red;
    color: white;
}
```

→ `.btn-primary` và `.btn-danger` tự động có tất cả style của `.btn` mà không cần viết lại.

**Tại sao trình duyệt KHÔNG đọc được file `.scss`?**

SCSS (Sassy CSS) là một **preprocessor language** — ngôn ngữ tiền xử lý. Trình duyệt chỉ hiểu **CSS thuần** (plain CSS). Các tính năng như biến `$`, nesting, mixin, @extend KHÔNG phải cú pháp CSS hợp lệ.

**Cần compile (biên dịch) SCSS → CSS** bằng:

```bash
# Cài đặt Sass
npm install -g sass

# Compile 1 lần
sass style.scss style.css

# Watch (tự compile khi file thay đổi)
sass --watch style.scss:style.css

# Compile cả thư mục
sass --watch scss/:css/
```

Hoặc dùng build tools: Webpack, Vite, Gulp tích hợp sass compiler.

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực

**Trang web phân tích: Shopee.vn**

*(Screenshots được lưu trong thư mục `screenshots/`)*

#### Mobile (375px):

- **Navigation:** Thanh navigation ở **dưới cùng** (bottom nav bar) với 5 icon: Home, Mall, Live, Thông báo, Tôi. Thanh tìm kiếm ở trên cùng chiếm toàn bộ chiều rộng
- **Content grid:** Sản phẩm hiển thị dạng **2 cột**, card nhỏ gọn chỉ có ảnh + tên + giá
- **Elements ẩn:** Category sidebar bị ẩn hoàn toàn, banner carousel thu nhỏ, các filter nâng cao bị ẩn sau nút "Lọc"
- **Font size:** Tên sản phẩm ~13px, giá ~14px, tiêu đề ~16px

#### Tablet (768px):

- **Navigation:** Vẫn dạng top bar nhưng hiển thị thêm text bên cạnh icon. Có thêm thanh category ngang bên dưới header
- **Content grid:** Sản phẩm **3-4 cột**, card lớn hơn với thêm thông tin (đánh giá, đã bán, freeship badge)
- **Elements hiện thêm:** Banner carousel lớn hơn, có sidebar filter bên trái (có thể toggle)
- **Font size:** Tăng nhẹ, tên SP ~14px, giá ~15px

#### Desktop (1440px):

- **Navigation:** Top bar đầy đủ với mega menu dropdown. Hiển thị: Logo, Search bar rộng, Giỏ hàng, Tài khoản, Ngôn ngữ, Download app, Seller Centre
- **Content grid:** Sản phẩm **5-6 cột**, card có đầy đủ info: ảnh, tên, giá gốc, giá sale, rating, lượt bán, freeship, yêu thích
- **Sidebar:** Bên trái có danh mục sản phẩm dạng tree (danh mục > danh mục con)
- **Elements hiện thêm:** Flash sale banner, top search, voucher section, right-side promotional ads
- **Font size:** Tên SP ~14px, giá ~16px, heading ~20px

#### Media Queries phát hiện trong DevTools:

```css
/* Shopee sử dụng kết hợp min-width và max-width */
@media (min-width: 1200px) {
    .shopee-search-bar-section { max-width: 1200px; }
}

@media (max-width: 767px) {
    .shopee-header-section__header { display: none; }
    .shopee-bottom-navbar { display: flex; }
}
```

#### Tổng kết phân tích:
- Shopee sử dụng **Desktop-First** approach (base CSS = desktop, dùng `max-width` để ẩn/thay đổi trên mobile)
- Navigation thay đổi mạnh nhất: bottom bar (mobile) → top bar đầy đủ (desktop)
- Grid tăng dần: 2 → 3-4 → 5-6 cột
- Nhiều element bị ẩn hoàn toàn trên mobile để giảm cognitive load

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy

**Trang: Đặt bàn nhà hàng**

#### Mobile Wireframe (< 768px):

```
┌──────────────────────┐
│    🍽️ LOGO           │
│   ☎️ 1900-1234       │
├──────────────────────┤
│                      │
│    HERO IMAGE        │
│    (full width)      │
│                      │
├──────────────────────┤
│ ┌────┐ ┌────┐       │
│ │ Ảnh│ │ Ảnh│       │
│ │  1 │ │  2 │       │
│ └────┘ └────┘       │
│ ┌────┐ ┌────┐       │
│ │ Ảnh│ │ Ảnh│       │
│ │  3 │ │  4 │       │
│ └────┘ └────┘       │
│ ┌────┐ ┌────┐       │
│ │ Ảnh│ │ Ảnh│       │
│ │  5 │ │  6 │       │
│ └────┘ └────┘       │
├──────────────────────┤
│   📋 FORM ĐẶT BÀN   │
│   Ngày: [_______]   │
│   Giờ:  [_______]   │
│   Số người: [___]   │
│   Ghi chú: [____]   │
│   [  ĐẶT BÀN  ]    │
├──────────────────────┤
│   🗺️ GOOGLE MAPS     │
│   (full width)       │
├──────────────────────┤
│      FOOTER          │
│   Địa chỉ | SĐT     │
│   © 2026             │
└──────────────────────┘
```

- **Ẩn:** Một số ảnh trang trí, subtitle text dài
- **Form:** Full width, stacked vertically
- **Logo + SĐT:** Centered, stacked

#### Tablet Wireframe (768px - 1023px):

```
┌──────────────────────────────────┐
│ 🍽️ LOGO          ☎️ 1900-1234   │
├──────────────────────────────────┤
│                                  │
│         HERO IMAGE               │
│         (full width)             │
│                                  │
├──────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐     │
│ │ Ảnh 1│ │ Ảnh 2│ │ Ảnh 3│     │
│ └──────┘ └──────┘ └──────┘     │
│ ┌──────┐ ┌──────┐ ┌──────┐     │
│ │ Ảnh 4│ │ Ảnh 5│ │ Ảnh 6│     │
│ └──────┘ └──────┘ └──────┘     │
├────────────────┬─────────────────┤
│ 📋 FORM ĐẶT BÀN│ 🗺️ GOOGLE MAPS │
│  Ngày, Giờ     │                 │
│  Số người      │   [Map embed]   │
│  Ghi chú       │                 │
│  [ĐẶT BÀN]    │                 │
├────────────────┴─────────────────┤
│  FOOTER (2 cột)                  │
│  Về chúng tôi  |  Liên hệ       │
└──────────────────────────────────┘
```

- **Grid ảnh:** 3 cột
- **Form + Map:** Chia 2 cột, nằm ngang cạnh nhau
- **Footer:** 2 cột

#### Desktop Wireframe (≥ 1024px):

```
┌─────────────────────────────────────────────┐
│ 🍽️ LOGO    Thực đơn  Đặt bàn  Về chúng tôi │ ☎️ 1900-1234 │
├─────────────────────────────────────────────┤
│                                             │
│              HERO IMAGE                     │
│              (full width, parallax)         │
│                                             │
├──────────────────────────────┬──────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ │   SIDEBAR    │
│ │ Ảnh 1│ │ Ảnh 2│ │ Ảnh 3│ │  Giờ mở cửa  │
│ └──────┘ └──────┘ └──────┘ │  Đánh giá    │
│ ┌──────┐ ┌──────┐ ┌──────┐ │  Special     │
│ │ Ảnh 4│ │ Ảnh 5│ │ Ảnh 6│ │              │
│ └──────┘ └──────┘ └──────┘ │              │
├──────────────────────────────┴──────────────┤
│    📋 FORM ĐẶT BÀN (rộng)    │ 🗺️ MAPS    │
│    Ngày | Giờ | Số người      │             │
│    Ghi chú    [ĐẶT BÀN]      │  [Map]      │
├─────────────────────────────────────────────┤
│  FOOTER (4 cột)                             │
│  Giới thiệu | Thực đơn | Liên hệ | MXH     │
└─────────────────────────────────────────────┘
```

- **Layout:** 2 cột chính (main + sidebar)
- **Grid ảnh:** 3 cột trong main area
- **Sidebar:** Có thêm giờ mở cửa, đánh giá, thông tin đặc biệt
- **Footer:** 4 cột

#### CSS Skeleton (Mobile-First, Grid + Media Queries):

```css
/* ===== BASE = MOBILE ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }

.page {
    display: grid;
    grid-template-columns: 1fr;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
}

.hero {
    width: 100%;
    min-height: 250px;
}

.food-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);  /* Mobile: 2 cột */
    gap: 12px;
    padding: 16px;
}

.booking-section {
    display: grid;
    grid-template-columns: 1fr;  /* Mobile: stacked */
    gap: 16px;
    padding: 16px;
}

.sidebar { display: none; }  /* Ẩn trên mobile */

.map-embed {
    width: 100%;
    min-height: 250px;
}

.footer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 16px;
}

/* ===== TABLET (≥ 768px) ===== */
@media (min-width: 768px) {
    .header {
        flex-direction: row;
        justify-content: space-between;
    }

    .hero {
        min-height: 350px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);  /* Tablet: 3 cột */
        gap: 16px;
    }

    .booking-section {
        grid-template-columns: 1fr 1fr;  /* Form + Map ngang */
    }

    .footer {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ===== DESKTOP (≥ 1024px) ===== */
@media (min-width: 1024px) {
    .main-content {
        display: grid;
        grid-template-columns: 1fr 280px;  /* Main + Sidebar */
        gap: 24px;
    }

    .sidebar { display: block; }  /* Hiện sidebar */

    .hero {
        min-height: 450px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .footer {
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
    }
}
```

---

## GHI CHÚ COMPILE SCSS

```bash
# Cài đặt Sass globally
npm install -g sass

# Compile SCSS → CSS (1 lần)
sass scss/style.scss scss/style.css

# Watch mode (tự compile khi thay đổi)
sass --watch scss/style.scss:scss/style.css

# Compile với compressed output (minified)
sass scss/style.scss scss/style.min.css --style=compressed
```

---

*Bài làm hoàn thành — PBT 05: CSS Responsive & SCSS*
