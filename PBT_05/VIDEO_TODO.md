# Ghi chú cho phần chụp ảnh và quay video

## Screenshots cần chụp

### Bài B1 — Responsive Product Page

Mở file:

```text
responsive.html
```

Chụp ở 3 breakpoint:

```text
screenshots/responsive_mobile_375.png
screenshots/responsive_tablet_768.png
screenshots/responsive_desktop_1200.png
```

Kích thước gợi ý:

- Mobile: 375px
- Tablet: 768px
- Desktop: 1200px

### Câu C1 — Phân tích website thật

Website chọn: Shopee.

Cần chụp:

```text
screenshots/shopee_mobile_375.png
screenshots/shopee_tablet_768.png
screenshots/shopee_desktop_1440.png
screenshots/shopee_media_query_1.png
screenshots/shopee_media_query_2.png
```

Mở DevTools → Toggle Device Toolbar để chọn kích thước.  
Mở tab Styles và tìm `@media` rules để chụp media queries.

## Video OBS cần quay

Tên video:

```text
videos/PBT05_HoTen_MaSV.mp4
```

Checklist video:

- Giới thiệu tên + MSSV + lớp.
- Webcam mặt SV ở góc phải dưới.
- Bắt đầu CSS Mobile-First với `.product-grid { grid-template-columns: 1fr; }`.
- Giải thích vì sao mặc định là mobile.
- Thêm breakpoint tablet `@media (min-width: 768px)`.
- Giải thích `min-width` và `max-width`.
- Thêm breakpoint desktop `@media (min-width: 1024px)`.
- Demo live resize: 4 cột → 2 cột → 1 cột.
- Mở DevTools Device Toolbar ở iPhone, iPad, Desktop.
- Thêm và giải thích thẻ viewport.
- Cuối video tổng kết Mobile-First approach.
