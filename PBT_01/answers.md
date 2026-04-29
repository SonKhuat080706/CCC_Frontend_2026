# PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1
1. Quá trình khi gõ `https://shopee.vn`:
   - Bước 1: **DNS Lookup** - Trình duyệt tìm IP của server `shopee.vn` từ DNS server.
   - Bước 2: **TCP Handshake** - Thiết lập kết nối TCP/IP 3 bước giữa trình duyệt và server.
   - Bước 3: **TLS Negotiation** - Thiết lập mã hóa bảo mật HTTPS.
   - Bước 4: **HTTP Request/Response** - Trình duyệt gửi GET request và server trả về HTML.
   - Bước 5: **Rendering** - Trình duyệt phân tích HTML, tải CSS, JS, ảnh và vẽ (render) trang web lên màn hình.
2. Tab Network hiển thị: Tất cả các HTTP requests được gửi đi bởi trang web, bao gồm thời gian tải, mã trạng thái (status code), dung lượng và loại file.
*(Lưu ý: Bạn hãy tự chụp ảnh screenshot của trình duyệt và chèn vào đây để hoàn thiện nhé)*

### Câu A2
Lỗi semantic trong đoạn HTML:
1. `<div class="header">` nên dùng thẻ `<header>` để xác định rõ phần đầu trang.
2. `<div class="menu">` chứa các link điều hướng, nên dùng thẻ `<nav>`.
3. `<div class="main">` nên dùng thẻ `<main>` để bọc nội dung chính.
4. `<div class="product">` nên dùng thẻ `<article>` cho một thẻ sản phẩm độc lập.
5. `<div class="title">` nên dùng thẻ heading như `<h2>` hoặc `<h3>`.
6. `<div class="footer">` nên dùng thẻ `<footer>`.

Sửa lại:
```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
<main>
    <article class="product">
        <h2 class="title">iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure class="image"><img src="iphone.jpg" alt="iPhone 16 Pro"></figure>
    </article>
</main>
<footer>© 2026 ShopTLU</footer>
```

### Câu A3
Kết quả hiển thị:
```text
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
```
Giải thích:
- `<div>` là phần tử khối (Block-level), nên nó sẽ luôn bắt đầu trên một dòng mới và chiếm toàn bộ chiều rộng (Hộp 1, Hộp 2, Hộp 3).
- `<span>` và `<strong>` là phần tử nội dòng (Inline-level), chúng chỉ chiếm không gian cần thiết cho nội dung và nằm trên cùng một dòng nếu có đủ chỗ (Text A và Text B nằm cạnh nhau, Text C và Text D nằm cạnh nhau giữa hai Hộp 2 và 3).

### Câu A4
Sự khác nhau:
- `<thead>`: Định nghĩa phần tiêu đề của bảng (các cột).
- `<tbody>`: Chứa nội dung chính của bảng (các hàng dữ liệu).
- `<tfoot>`: Định nghĩa phần chân bảng (thường dùng để tổng kết, ví dụ: tổng tiền).

Tại sao KHÔNG NÊN dùng table để tạo layout trang web:
1. **Khó bảo trì và phức tạp (Spaghetti code):** Code table layout thường lồng nhau nhiều tầng, khó đọc và sửa đổi.
2. **Kém linh hoạt (Không Responsive):** Bảng khó thay đổi bố cục trên các thiết bị di động so với CSS Flexbox hoặc Grid.
3. **Ảnh hưởng Accessibility và SEO:** Trình đọc màn hình (Screen readers) đọc bảng theo dòng/cột, nếu dùng table cho layout sẽ làm người dùng khiếm thị rối loạn, đồng thời search engine cũng khó hiểu cấu trúc logic của nội dung.

---

# PHẦN B — THỰC HÀNH CODE
*(Code được lưu trong các file `profile.html`, `products.html`, `debug.html`)*

### Bài B3 - Lỗi và cách sửa
- Lỗi 1: Dòng 136 — Sai thẻ DOCTYPE. Cách sửa: `<!DOCTYPE html>`
- Lỗi 2: Dòng 137 — Thiếu thuộc tính `lang`. Cách sửa: `<html lang="vi">`
- Lỗi 3: Dòng 139 — Thiếu thẻ đóng `</title>`. Cách sửa: `<title>Trang web</title>`
- Lỗi 4: Dòng 140 — Sai giá trị charset và thiếu dấu `/`. Cách sửa: `<meta charset="UTF-8">`
- Lỗi 5: Dòng 143 — Đóng sai thẻ `<h1>` bằng `<h1>`. Cách sửa: `</h1>`
- Lỗi 6: Dòng 147 — Đóng sai thẻ `<a>` bằng `<a>`. Cách sửa: `</a>`
- Lỗi 7: Dòng 155 — Thuộc tính `src` thiếu dấu ngoặc kép và thiếu `alt`. Cách sửa: `<img src="iphone.jpg" alt="iPhone 16 Pro">`
- Lỗi 8: Dòng 157 — Lỗi lồng chéo thẻ (nesting error) giữa `<p>` và `<b>`. Cách sửa: `<p>Giá: <b>25.990.000đ</b></p>`
- Lỗi 9: Dòng 175-177 — Có 2 thẻ `<main>` trên cùng một trang (sai semantic, chỉ nên có 1). Cách sửa: Đổi thẻ `<main>` thứ hai thành `<aside>` vì nội dung là sidebar.
- Lỗi 10: Dòng 180 — Thiếu thẻ đóng `</p>`. Cách sửa: `<p>Copyright 2026</p>`

### Bài B4 - Phân tích trang web thật
*(Bạn hãy dùng DevTools để chụp 3 ảnh màn hình theo yêu cầu đề bài và lưu vào mục screenshots/ nhé)*

---

# PHẦN C — SUY LUẬN

### Câu C1
```html
<!-- Bọc toàn bộ trong cấu trúc chuẩn -->
<header>
    <!-- Header chứa navigation chính -->
    <nav aria-label="main-navigation">
        <!-- Có thể chứa logo, thanh tìm kiếm, các link điều hướng -->
    </nav>
</header>

<main>
    <!-- Breadcrumb điều hướng -->
    <nav aria-label="breadcrumb">
        <ol>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/category/dien-thoai">Điện thoại</a></li>
            <li><a href="/product/iphone-16">iPhone 16</a></li>
        </ol>
    </nav>

    <!-- Khu vực chính của sản phẩm -->
    <article class="product-details">
        <!-- Khu vực ảnh sản phẩm -->
        <section class="product-gallery">
            <!-- figure dùng để nhóm ảnh và chú thích ảnh -->
            <figure>
                <img src="main-img.jpg" alt="iPhone 16">
                <!-- Chứa các ảnh thumbnail -->
            </figure>
        </section>

        <!-- Thông tin tổng quan sản phẩm -->
        <section class="product-info">
            <h1>iPhone 16 Pro</h1>
            <p class="price">25.990.000đ</p>
            <!-- ... Các thông tin khác -->
        </section>

        <!-- Bảng thông số kỹ thuật -->
        <section class="product-specs">
            <h2>Thông số kỹ thuật</h2>
            <!-- table cho dữ liệu dạng cột hàng như thông số -->
            <table>
                <tbody>
                    <!-- các hàng tr/td/th -->
                </tbody>
            </table>
        </section>

        <!-- Khu vực đánh giá/bình luận -->
        <section class="product-reviews">
            <h2>Đánh giá</h2>
            <!-- Mỗi review là một article vì nó là nội dung độc lập -->
            <article class="review-item">
                <!-- Nội dung review -->
            </article>
        </section>
    </article>
</main>

<aside class="related-products">
    <!-- aside vì nó chứa nội dung có liên quan gián tiếp, như sản phẩm tương tự -->
    <h2>Sản phẩm tương tự</h2>
    <!-- Các article sản phẩm -->
</aside>

<footer>
    <!-- Chân trang chứa bản quyền, link chính sách -->
    <p>&copy; 2026 ShopTLU</p>
</footer>
```

### Câu C2
Phản biện:
Nhận định "Dùng `<div>` cho mọi thứ rồi thêm class là được" là một sai lầm phổ biến và gây ra nhiều hậu quả kỹ thuật lâu dài.

Thứ nhất, về mặt **SEO (Tối ưu hóa công cụ tìm kiếm)**: Các bot của Google hay Bing sử dụng thẻ Semantic HTML (như `<header>`, `<main>`, `<article>`) để hiểu thứ bậc và tầm quan trọng của nội dung. Nếu mọi thứ đều là `<div>`, bot sẽ không phân biệt được đâu là nội dung chính (article) và đâu là nội dung phụ (sidebar/aside), dẫn đến việc đánh giá xếp hạng trang web không chính xác.

Thứ hai, về mặt **Accessibility (Trợ năng)**: Người khiếm thị sử dụng Screen Readers (trình đọc màn hình) để duyệt web. Screen Reader sử dụng các thẻ `<nav>`, `<main>`, `<footer>` làm mốc (landmarks) để người dùng có thể nhảy nhanh tới các khu vực cần thiết. Một trang toàn `<div>` (div soup) sẽ giống như một cuốn sách không có mục lục hay đoạn văn, cực kỳ khó đọc.

**Ví dụ cụ thể**: Khi sử dụng thẻ `<button>` thay vì `<div class="button">`, trình duyệt tự động hỗ trợ tính năng focus bằng phím `Tab` và kích hoạt bằng phím `Enter`/`Space`. Với `<div>`, bạn phải viết thêm rất nhiều Javascript và `tabindex` để mô phỏng lại hành vi này, dễ sinh lỗi.

**Trường hợp thực tế `<div>` vẫn phù hợp**: Khi bạn cần tạo các container chỉ để gom nhóm phần tử phục vụ cho mục đích dàn trang (layout) bằng CSS Flexbox/Grid, hoặc một wrapper background không mang ý nghĩa nội dung, thì `<div>` là lựa chọn chính xác.
