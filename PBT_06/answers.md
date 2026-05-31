# PHIẾU BÀI TẬP 06 — CSS FRAMEWORKS

> Track đã chọn: **Track A — Bootstrap 5**  
> Ghi chú: Phần chụp ảnh responsive và quay video OBS sẽ được thực hiện sau. Bộ file này hoàn thành phần lý thuyết + thực hành Bootstrap và tạo sẵn thư mục `screenshots/`, `videos/`.

---

# TRACK A — BOOTSTRAP 5

# PHẦN A — ĐỌC HIỂU

## Câu A1 — Grid System

HTML:

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

Bootstrap Grid chia layout thành 12 cột. Các class trong đoạn code trên có ý nghĩa:

- `col-12`: mặc định mỗi box chiếm 12/12 cột, tức là mỗi box nằm 1 dòng.
- `col-md-6`: từ màn hình `md` trở lên, mỗi box chiếm 6/12 cột, tức là 2 box trên 1 dòng.
- `col-lg-3`: từ màn hình `lg` trở lên, mỗi box chiếm 3/12 cột, tức là 4 box trên 1 dòng.

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Box 1, Box 2, Box 3, Box 4 xếp dọc | Hàng 1: Box 1 + Box 2; Hàng 2: Box 3 + Box 4 | Box 1 + Box 2 + Box 3 + Box 4 nằm cùng một hàng |

Mô phỏng layout:

```text
< 768px
┌───────┐
│ Box 1 │
├───────┤
│ Box 2 │
├───────┤
│ Box 3 │
├───────┤
│ Box 4 │
└───────┘
```

```text
768px - 991px
┌───────┬───────┐
│ Box 1 │ Box 2 │
├───────┼───────┤
│ Box 3 │ Box 4 │
└───────┴───────┘
```

```text
≥ 992px
┌───────┬───────┬───────┬───────┐
│ Box 1 │ Box 2 │ Box 3 │ Box 4 │
└───────┴───────┴───────┴───────┘
```

### `col-md-6` nghĩa là gì?

`col-md-6` nghĩa là từ breakpoint `md` trở lên, phần tử chiếm 6 trong tổng số 12 cột của Bootstrap Grid. Vì 12 / 6 = 2, nên mỗi hàng sẽ có 2 phần tử.

### Tại sao không cần viết `col-sm-12`?

Vì đã có `col-12`. Class `col-12` áp dụng cho mọi kích thước màn hình từ nhỏ nhất trở lên. Nếu không có class breakpoint lớn hơn ghi đè, phần tử sẽ tiếp tục chiếm 12 cột. Do đó không cần viết thêm `col-sm-12`.

---

## Câu A2 — Utilities & Components

### 1. Giải thích `d-none d-md-block`

```html
<div class="d-none d-md-block">Nội dung</div>
```

Ý nghĩa:

- `d-none`: ẩn element ở mặc định, tức là từ màn hình nhỏ nhất.
- `d-md-block`: từ breakpoint `md` trở lên, element hiển thị dạng `display: block`.

Kết quả:

| Kích thước màn hình | Trạng thái |
|---------------------|------------|
| < 768px | Ẩn |
| ≥ 768px | Hiện dạng block |

---

### 2. Liệt kê 5 spacing utilities

Bootstrap spacing utilities thường có dạng:

```text
{property}{side}-{size}
```

Trong đó:

- `m`: margin
- `p`: padding
- `t`: top
- `b`: bottom
- `s`: start/trái theo hướng LTR
- `e`: end/phải theo hướng LTR
- `x`: trục ngang trái + phải
- `y`: trục dọc trên + dưới

Ví dụ:

1. `mt-3`: margin-top mức 3.
2. `px-4`: padding-left và padding-right mức 4.
3. `mb-auto`: margin-bottom tự động.
4. `py-5`: padding-top và padding-bottom mức 5.
5. `ms-2`: margin-start mức 2.

---

### 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

#### `.container`

Có chiều rộng responsive cố định theo từng breakpoint. Ở màn hình lớn, container không chiếm toàn bộ màn hình mà có max-width.

Ví dụ dùng khi muốn nội dung nằm giữa trang, gọn và dễ đọc.

#### `.container-fluid`

Luôn chiếm 100% chiều rộng màn hình.

Ví dụ dùng cho layout full-width như dashboard, banner lớn, section nền kéo dài toàn màn hình.

#### `.container-md`

Dưới breakpoint `md`, nó rộng 100%. Từ `md` trở lên, nó hoạt động như container có max-width.

Ví dụ dùng khi muốn mobile full-width nhưng tablet/desktop có giới hạn chiều rộng.

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Tùy biến Bootstrap

### 1. Đổi màu `$primary` từ xanh mặc định sang `#E63946`

Để đổi màu `$primary` đúng cách, nên tùy biến Bootstrap bằng Sass.

Quy trình cơ bản:

1. Cài Bootstrap qua npm:

```bash
npm install bootstrap
```

2. Tạo file Sass riêng, ví dụ:

```text
scss/custom.scss
```

3. Trong `custom.scss`, khai báo biến trước khi import Bootstrap:

```scss
$primary: #E63946;

@import "../node_modules/bootstrap/scss/bootstrap";
```

4. Dùng công cụ build Sass để biên dịch:

```bash
sass scss/custom.scss css/custom.css
```

5. Trong HTML, thay vì dùng Bootstrap CDN, dùng file CSS đã build:

```html
<link rel="stylesheet" href="css/custom.css">
```

Khi đó các component sử dụng màu primary như `.btn-primary`, `.text-primary`, `.bg-primary`, `.alert-primary` sẽ đồng bộ theo màu mới.

---

### 2. Tại sao không nên override trực tiếp `.btn-primary { background: red; }`?

Không nên override trực tiếp vì:

- Chỉ sửa được một class cụ thể, không đồng bộ toàn bộ hệ thống màu.
- Dễ bị thiếu các trạng thái như `:hover`, `:focus`, `:active`, `disabled`.
- Có thể gây xung đột CSS và khó bảo trì.
- Khi nâng cấp Bootstrap, code override dễ bị lỗi.
- Bootstrap dùng hệ thống Sass variables để sinh ra nhiều utility/component liên quan, nên sửa biến `$primary` sẽ đúng chuẩn hơn.

Ví dụ nếu chỉ viết:

```css
.btn-primary {
    background: red;
}
```

Thì có thể `.bg-primary`, `.text-primary`, `.border-primary`, `.alert-primary` vẫn giữ màu xanh mặc định. Cách tốt hơn là đổi `$primary` trong Sass.

---

## Câu C2 — So sánh CSS thuần với Bootstrap

### 1. CSS thuần tạo navbar responsive + product card

Ví dụ CSS thuần:

```html
<nav class="navbar">
    <div class="logo">ShopNow</div>
    <button class="menu-btn">☰</button>
    <ul class="menu">
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Sản phẩm</a></li>
        <li><a href="#">Liên hệ</a></li>
    </ul>
</nav>

<div class="product-card">
    <img src="product.jpg" alt="Product">
    <div class="product-body">
        <h3>iPhone 16</h3>
        <p>Điện thoại cao cấp, hiệu năng mạnh.</p>
        <strong>25.990.000đ</strong>
        <button>Mua ngay</button>
    </div>
</div>
```

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background: #111827;
    color: white;
}

.menu {
    display: flex;
    gap: 24px;
    list-style: none;
}

.menu a {
    color: white;
    text-decoration: none;
}

.menu-btn {
    display: none;
}

.product-card {
    width: 280px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.product-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.product-body {
    padding: 16px;
}

.product-body h3 {
    margin-bottom: 8px;
}

.product-body button {
    margin-top: 12px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #0d6efd;
    color: white;
}

@media (max-width: 768px) {
    .menu {
        display: none;
    }

    .menu-btn {
        display: block;
    }

    .navbar {
        padding: 12px 16px;
    }
}
```

### 2. So sánh với Bootstrap version

Với Bootstrap, navbar có thể viết nhanh bằng:

```html
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container">
        <a class="navbar-brand" href="#">ShopNow</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="#">Trang chủ</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Sản phẩm</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Liên hệ</a></li>
            </ul>
        </div>
    </div>
</nav>
```

Product card:

```html
<div class="card shadow-sm">
    <img src="product.jpg" class="card-img-top" alt="Product">
    <div class="card-body">
        <h5 class="card-title">iPhone 16</h5>
        <p class="card-text">Điện thoại cao cấp, hiệu năng mạnh.</p>
        <strong>25.990.000đ</strong>
        <a href="#" class="btn btn-primary w-100 mt-3">Mua ngay</a>
    </div>
</div>
```

### 3. Bảng so sánh

| Tiêu chí | CSS thuần | Bootstrap |
|----------|-----------|-----------|
| Số dòng CSS | Nhiều hơn, phải tự viết layout, responsive, button, card | Ít hơn vì dùng class có sẵn |
| Thời gian phát triển | Lâu hơn | Nhanh hơn |
| Responsive | Phải tự viết media query | Có sẵn breakpoint và grid |
| Tùy biến | Tự do tối đa | Nhanh nhưng đôi khi bị phụ thuộc class/framework |
| Tính đồng bộ UI | Phải tự quản lý design system | Có sẵn hệ thống component đồng bộ |
| Dễ học ban đầu | Cần hiểu CSS sâu hơn | Dễ dựng giao diện nhanh nếu nhớ class |

### 4. Khi nào nên dùng Bootstrap?

Nên dùng Bootstrap khi:

- Cần làm giao diện nhanh.
- Dự án nhỏ/vừa, admin dashboard, landing page, prototype.
- Team muốn có component đồng bộ sẵn.
- Không yêu cầu thiết kế quá khác biệt.

### 5. Khi nào không nên dùng Bootstrap?

Không nên dùng Bootstrap khi:

- Giao diện cần custom mạnh, khác biệt nhiều so với Bootstrap mặc định.
- Muốn tối ưu dung lượng CSS cực nhỏ.
- Dự án đã có design system riêng.
- Không muốn HTML chứa nhiều class framework.
- Team muốn kiểm soát hoàn toàn CSS.
