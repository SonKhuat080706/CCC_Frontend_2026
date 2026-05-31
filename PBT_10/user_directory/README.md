# User Directory CRUD (B2)

Ứng dụng quản trị thành viên đầy đủ chức năng Thêm, Sửa, Xóa, Tìm kiếm (CRUD) kết nối với **JSONPlaceholder API**.

## Các API sử dụng
Toàn bộ các tác vụ CRUD được thực hiện qua: `https://jsonplaceholder.typicode.com/users`
- `GET /users`: Lấy danh sách thành viên.
- `POST /users`: Tạo mới thành viên.
- `PUT /users/:id`: Cập nhật thông tin thành viên.
- `DELETE /users/:id`: Xóa thành viên.

## Chức năng đã thực hiện
- Tách biệt rõ ràng tầng gọi API (`api`) và tầng xử lý hiển thị giao diện (`ui`).
- **Create**: Form thêm mới thành viên hiển thị modal đẹp mắt, cập nhật danh sách lập tức không cần tải lại trang.
- **Read**: Tải danh sách từ API hiển thị dưới dạng card, hiển thị Skeleton Loader trong thời gian chờ.
- **Update**: Click nút "Sửa" tự động điền thông tin cũ vào modal và gọi API cập nhật.
- **Delete**: Xác nhận trước khi xóa, gửi API và lọc bỏ khỏi UI cục bộ.
- **Search**: Tìm kiếm lọc tức thì (Client-side filtering) theo tên hoặc email của thành viên.
- **Error Handling**: Thông báo Toast phản hồi trạng thái thành công/lỗi góc phải bên dưới màn hình.

## Cách chạy ứng dụng
Mở file `index.html` trực tiếp trên trình duyệt hoặc sử dụng Live Server trong VS Code.
