# PHIẾU BÀI TẬP 05 — CSS RESPONSIVE & SCSS

> Ghi chú: Phần chụp ảnh responsive, ảnh phân tích website thật và quay video OBS sẽ được thực hiện sau. Bộ file này hoàn thành phần lý thuyết, thực hành code, SCSS và tạo sẵn thư mục `screenshots/`, `videos/`.

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — Viewport & Mobile-First

### 1. Thẻ meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích:

- `name="viewport"`: khai báo thẻ này dùng để điều khiển vùng hiển thị của trình duyệt trên thiết bị.
- `width=device-width`: đặt chiều rộng viewport bằng chiều rộng thật của thiết bị.
- `initial-scale=1.0`: đặt mức zoom ban đầu là 100%.

### 2. Nếu thiếu thẻ viewport, iPhone sẽ hiển thị thế nào?

Nếu thiếu thẻ viewport, trình duyệt mobile thường giả lập một viewport desktop rộng khoảng 980px rồi thu nhỏ toàn bộ trang lại để vừa màn hình điện thoại.

Hậu quả:

- Chữ và nội dung bị thu nhỏ.
- Người dùng phải zoom/pinch để đọc.
- Media query theo kích thước mobile có thể không hoạt động như mong muốn.
- Trang nhìn giống bản desktop bị co lại, không phải giao diện mobile thật.

### 3. Mobile-First và Desktop-First khác nhau thế nào?

#### Mobile-First

Mobile-First nghĩa là viết CSS mặc định cho màn hình nhỏ trước, sau đó dùng `@media (min-width: ...)` để mở rộng layout cho tablet và desktop.

Ví dụ:

```css
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

#### Desktop-First

Desktop-First nghĩa là viết CSS mặc định cho màn hình lớn trước, sau đó dùng `@media (max-width: ...)` để thu nhỏ layout cho tablet/mobile.

Ví dụ:

```css
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

@media (max-width: 767px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}
```

### Tại sao Mobile-First được khuyên dùng?

Mobile-First được khuyên dùng vì:

- Phù hợp với xu hướng người dùng truy cập web bằng điện thoại nhiều.
- CSS mặc định đơn giản, nhẹ hơn cho mobile.
- Dễ mở rộng dần cho màn hình lớn.
- Giúp ưu tiên nội dung quan trọng trước.
- Thường tối ưu hiệu năng tốt hơn trên thiết bị yếu.

---

## Câu A2 — Breakpoints

Có thể tham khảo hệ breakpoint phổ biến giống Bootstrap:

| Breakpoint | Kích thước pixel | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|------------|------------------|-------------------|---------------------|
| xs | < 576px | Điện thoại nhỏ | 1 cột |
| sm | ≥ 576px | Điện thoại lớn | 1-2 cột |
| md | ≥ 768px | Tablet | 2 cột |
| lg | ≥ 992px | Laptop nhỏ | 3 cột |
| xl | ≥ 1200px | Desktop | 4 cột |
| xxl | ≥ 1400px | Màn hình lớn | 4-6 cột |

Trong bài này dùng các breakpoint chính:

- Mobile: `< 768px` → 1 cột
- Tablet: `768px - 1023px` → 2 cột
- Desktop: `≥ 1024px` → 4 cột

---

## Câu A3 — Media Queries

CSS:

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

Bảng kết quả:

| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

Giải thích:

- 375px nhỏ hơn 576px nên dùng CSS mặc định: `width: 100%`.
- 600px lớn hơn 576px nhưng nhỏ hơn 768px nên dùng `width: 540px`.
- 800px lớn hơn 768px nhưng nhỏ hơn 992px nên dùng `width: 720px`.
- 1000px lớn hơn 992px nhưng nhỏ hơn 1200px nên dùng `width: 960px`.
- 1400px lớn hơn 1200px nên dùng `width: 1140px`.

---

## Câu A4 — SCSS Basics

### 1. Variables

Variables dùng để lưu giá trị tái sử dụng nhiều lần như màu, font, spacing, breakpoint.

```scss
$primary-color: #2563eb;
$spacing-md: 16px;

.button {
    background: $primary-color;
    padding: $spacing-md;
}
```

### 2. Nesting

Nesting cho phép viết CSS lồng nhau theo cấu trúc HTML, giúp code gọn hơn.

```scss
.card {
    padding: 16px;

    .card-title {
        font-size: 20px;
        font-weight: bold;
    }

    &:hover {
        transform: translateY(-4px);
    }
}
```

Sau khi compile thành CSS:

```css
.card {
    padding: 16px;
}

.card .card-title {
    font-size: 20px;
    font-weight: bold;
}

.card:hover {
    transform: translateY(-4px);
}
```

### 3. Mixins

Mixins dùng để tái sử dụng một nhóm thuộc tính CSS.

```scss
@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero {
    @include flex-center;
}
```

### 4. `@extend` / Inheritance

`@extend` cho phép một selector kế thừa style từ selector khác.

```scss
.message {
    padding: 16px;
    border-radius: 8px;
}

.success-message {
    @extend .message;
    background: #dcfce7;
    color: #166534;
}
```

### Tại sao trình duyệt không đọc được `.scss`?

Trình duyệt chỉ hiểu CSS, không hiểu cú pháp đặc biệt của SCSS như variables, nesting, mixins, partials. Vì vậy cần bước biên dịch SCSS sang CSS.

Ví dụ lệnh compile:

```bash
sass scss/style.scss scss/style.css
```

Hoặc dùng npm script/build tool như Vite, Webpack, Parcel.

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Phân tích trang web thực

Trang web chọn phân tích: **Shopee**.

> Ghi chú: Phần screenshot thực tế sẽ chụp sau và lưu vào thư mục `screenshots/`. Nội dung dưới đây là phần phân tích để đưa vào báo cáo.

### 1. Mobile 375px

Ở kích thước mobile:

- Navigation được rút gọn để ưu tiên thanh tìm kiếm và các icon quan trọng.
- Nhiều mục menu phụ, banner phụ hoặc thông tin dài bị ẩn để tiết kiệm không gian.
- Lưới sản phẩm thường hiển thị 2 cột nhỏ hoặc 1 cột tùy khu vực.
- Font size nhỏ hơn desktop để vừa màn hình.
- Các card sản phẩm giảm padding, ảnh và giá là thông tin nổi bật nhất.

Wireframe mobile:

```text
┌──────────────────────┐
│ Search / Logo / Icon │
├──────────────────────┤
│ Banner chính         │
├──────────┬───────────┤
│ Product  │ Product   │
├──────────┼───────────┤
│ Product  │ Product   │
└──────────┴───────────┘
```

### 2. Tablet 768px

Ở kích thước tablet:

- Navigation có nhiều không gian hơn, có thể hiển thị thêm một số icon hoặc menu.
- Banner lớn hơn mobile.
- Lưới sản phẩm thường tăng lên khoảng 3 cột.
- Một số section phụ bắt đầu xuất hiện lại.
- Khoảng cách giữa các phần tử lớn hơn mobile.

Wireframe tablet:

```text
┌──────────────────────────────┐
│ Logo + Search + User/Cart    │
├──────────────────────────────┤
│ Banner / Campaign            │
├────────┬────────┬────────────┤
│ Prod   │ Prod   │ Prod       │
├────────┼────────┼────────────┤
│ Prod   │ Prod   │ Prod       │
└────────┴────────┴────────────┘
```

### 3. Desktop 1440px

Ở kích thước desktop:

- Navigation đầy đủ hơn, có thanh tìm kiếm lớn, nhiều link, icon và thông tin tài khoản.
- Layout có thể có nhiều cột hơn.
- Lưới sản phẩm thường hiển thị 5-6 cột.
- Banner, danh mục, flash sale, gợi ý sản phẩm hiển thị nhiều hơn.
- Font size, khoảng cách, ảnh đều lớn và thoáng hơn.

Wireframe desktop:

```text
┌────────────────────────────────────────────┐
│ Top links / User / Cart                    │
├────────────────────────────────────────────┤
│ Logo      Search bar lớn        Actions    │
├────────────────────────────────────────────┤
│ Banner lớn + danh mục / campaign           │
├──────┬──────┬──────┬──────┬──────┬────────┤
│ Prod │ Prod │ Prod │ Prod │ Prod │ Prod   │
└──────┴──────┴──────┴──────┴──────┴────────┘
```

### 4. Navigation thay đổi thế nào?

- Mobile: ưu tiên search/icon, ẩn bớt link phụ.
- Tablet: hiển thị nhiều mục hơn mobile nhưng vẫn tối giản.
- Desktop: hiển thị đầy đủ thanh topbar, search, menu, icon, thông tin tài khoản.

### 5. Lưới content thay đổi mấy cột?

- Mobile: khoảng 1-2 cột.
- Tablet: khoảng 2-3 cột.
- Desktop: khoảng 5-6 cột.

### 6. Elements nào bị ẩn trên mobile?

Các phần thường bị ẩn/rút gọn:

- Menu phụ.
- Một số banner nhỏ.
- Text mô tả dài.
- Danh mục mở rộng.
- Footer nhiều cột.

### 7. Font size có thay đổi không?

Có. Trên mobile, font thường nhỏ và gọn hơn. Trên desktop, font headline, banner, card title có thể lớn hơn để tận dụng không gian màn hình.

### 8. Media queries cần chụp sau

Cần mở DevTools → tab Styles, tìm ít nhất 2 rule có dạng:

```css
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

Hoặc có thể là breakpoint riêng của website như:

```css
@media screen and (max-width: 767px) { ... }
@media screen and (min-width: 1200px) { ... }
```

Ảnh chụp nên lưu:

```text
screenshots/shopee_mobile_375.png
screenshots/shopee_tablet_768.png
screenshots/shopee_desktop_1440.png
screenshots/shopee_media_query_1.png
screenshots/shopee_media_query_2.png
```

---

## Câu C2 — Thiết kế Responsive Strategy

Yêu cầu trang đặt bàn nhà hàng gồm:

- Header với logo + điện thoại đặt bàn
- Hero image toàn trang
- Grid 6 ảnh món ăn
- Form đặt bàn
- Google Maps
- Footer

### 1. Mobile wireframe

```text
┌──────────────────────────┐
│ Logo      ☎              │
├──────────────────────────┤
│ Hero image + CTA         │
├──────────────────────────┤
│ Form đặt bàn             │
│ - Ngày                   │
│ - Giờ                    │
│ - Số người               │
│ - Ghi chú                │
├──────────────────────────┤
│ Ảnh món ăn: 1 cột        │
├──────────────────────────┤
│ Google Maps              │
├──────────────────────────┤
│ Footer                   │
└──────────────────────────┘
```

Mobile:

- Không nên ẩn form vì đây là chức năng chính.
- Có thể ẩn bớt text mô tả dài trong hero.
- Grid ảnh món ăn 1 cột.
- Google Maps đặt dưới form và ảnh món ăn.
- Footer xếp dọc.

### 2. Tablet wireframe

```text
┌────────────────────────────────┐
│ Logo        Điện thoại đặt bàn │
├────────────────────────────────┤
│ Hero image                     │
├────────────────────────────────┤
│ Form đặt bàn                   │
├───────────────┬────────────────┤
│ Ảnh món ăn    │ Ảnh món ăn     │
│ 2 cột         │                │
├────────────────────────────────┤
│ Google Maps                    │
├────────────────────────────────┤
│ Footer 2 cột                   │
└────────────────────────────────┘
```

Tablet:

- Form nằm ngay dưới hero.
- Grid ảnh món ăn 2 cột.
- Bản đồ nằm dưới grid ảnh hoặc dưới form.
- Footer có thể chia 2 cột.

### 3. Desktop wireframe

```text
┌──────────────────────────────────────────────┐
│ Logo        Menu        Điện thoại đặt bàn   │
├──────────────────────────────────────────────┤
│ Hero image full width + CTA                  │
├───────────────────────┬──────────────────────┤
│ Form đặt bàn          │ Google Maps          │
├───────┬───────┬───────┬───────┬───────┬──────┤
│ Ảnh 1 │ Ảnh 2 │ Ảnh 3 │ Ảnh 4 │ Ảnh 5 │ Ảnh6 │
├──────────────────────────────────────────────┤
│ Footer 3-4 cột                               │
└──────────────────────────────────────────────┘
```

Desktop:

- Header hiển thị logo, menu và số điện thoại.
- Hero image toàn trang.
- Form và Google Maps chia 2 cột.
- Grid ảnh món ăn 3 hoặc 6 cột.
- Footer chia 3-4 cột.
- Không cần sidebar nếu trang đơn giản; chỉ cần layout 2 cột cho form + map là đủ.

### 4. CSS skeleton Mobile-First

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
}

.nav {
    display: none;
}

.hero {
    min-height: 60vh;
    display: grid;
    place-items: center;
    background: url("hero.jpg") center / cover no-repeat;
    color: white;
    text-align: center;
    padding: 32px 16px;
}

.booking-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px 16px;
}

.booking-form {
    display: grid;
    gap: 12px;
}

.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 16px;
}

.food-grid img,
.map iframe {
    width: 100%;
    max-width: 100%;
}

.map iframe {
    min-height: 300px;
    border: 0;
}

.footer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 16px;
    background: #111827;
    color: white;
}

@media (min-width: 768px) {
    .food-grid {
        grid-template-columns: repeat(2, 1fr);
        padding: 32px;
    }

    .footer {
        grid-template-columns: repeat(2, 1fr);
        padding: 32px;
    }
}

@media (min-width: 1024px) {
    .nav {
        display: flex;
        gap: 24px;
    }

    .booking-layout {
        grid-template-columns: 1fr 1fr;
        padding: 48px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
        padding: 48px;
    }

    .footer {
        grid-template-columns: repeat(4, 1fr);
        padding: 48px;
    }
}
```

---

# Lệnh compile SCSS

Dùng Dart Sass:

```bash
sass scss/style.scss scss/style.css
```

Hoặc nếu cài bằng npm:

```bash
npm install -g sass
sass scss/style.scss scss/style.css
```

Trong bộ bài này đã có sẵn file `scss/style.css` là CSS đã compile từ SCSS.
