# Infinite Scroll Gallery (B3)

Thư viện trưng bày hình ảnh nghệ thuật độ phân giải cao bằng kỹ thuật tải vô hạn và tối ưu hóa hiệu suất tải hình ảnh.

## Các API sử dụng
Sử dụng **Lorem Picsum API**:
- `https://picsum.photos/v2/list?page=1&limit=20`: Tải danh sách hình ảnh theo trang.
- Để tăng tốc độ load trang, ảnh đại diện trên lưới được nén kích thước nhỏ (`https://picsum.photos/id/{id}/400/300`), còn ảnh xem chi tiết phóng to sẽ load độ phân giải cao hơn (`https://picsum.photos/id/{id}/1000/750`).

## Chức năng đã thực hiện
- **Infinite Scroll**: Khi kéo trang xuống dưới, `IntersectionObserver` theo dõi phần tử trigger ở đáy trang để kích hoạt tải trang tiếp theo.
- **Lazy Loading**: Ảnh chỉ được tải về khi bắt đầu xuất hiện trong vùng nhìn thấy (viewport) của trình duyệt nhờ `IntersectionObserver` theo dõi từng thẻ ảnh riêng biệt, giúp tiết kiệm băng thông tối đa.
- **Lightbox**: Click vào ảnh mở ra giao diện phóng to tối nền (lightbox modal), kèm tên tác giả và hỗ trợ phím ESC để tắt nhanh.
- **Grid Layout Responsive**: 4 cột trên desktop, 3 cột ở màn hình trung bình, 2 cột trên tablet và 1 cột trên điện thoại di động.

## Cách chạy ứng dụng
Mở file `index.html` trực tiếp trên trình duyệt hoặc sử dụng Live Server trong VS Code.
