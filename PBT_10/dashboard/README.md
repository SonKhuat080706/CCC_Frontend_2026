# Multi-API Dashboard (B4)

Bảng điều khiển tích hợp (dashboard) gọi song song và hiển thị dữ liệu từ 3 dịch vụ API công cộng khác nhau, minh họa cách thức xử lý ngoại lệ bất đồng bộ độc lập.

## Các API sử dụng
1. **REST Countries API**: `https://restcountries.com/v3.1/name/vietnam` (Thông tin quốc gia Việt Nam: quốc kỳ, thủ đô, dân số...).
2. **Random User API**: `https://randomuser.me/api/?results=3` (Danh sách 3 nhân sự ngẫu nhiên với hình đại diện, tên, email).
3. **Dog CEO API**: `https://dog.ceo/api/breeds/image/random` (Tải hình ảnh cún cưng ngẫu nhiên).

## Chức năng đã thực hiện
- **Đồng bộ hóa Song song**: Sử dụng `Promise.allSettled()` để gửi đồng thời cả 3 requests. Kỹ thuật này giúp tối ưu hóa thời gian tải trang (bằng thời gian của request lâu nhất, thay vì cộng dồn các request lại).
- **Trạng thái Độc lập**: Mỗi widget có một khung loading (skeleton loader) và cơ chế bắt lỗi (`catch`) riêng biệt. Nếu 1 API bị lỗi (ví dụ mất mạng/sever sập), widget đó sẽ hiển thị thông báo lỗi và nút "Thử lại" riêng biệt, trong khi 2 widget còn lại vẫn render dữ liệu bình thường mà không bị gián đoạn.
- **Thử lại đơn lẻ**: Mỗi widget có một nút refresh riêng trên header để gọi lại đúng API đó mà không ảnh hưởng các widget khác.
- **Làm mới toàn bộ**: Nút "Làm mới toàn bộ" ở header để gọi lại toàn bộ 3 API song song.
- **Đo lường Hiệu năng**: Tính toán thời gian thực hiện fetch dữ liệu từ lúc bắt đầu đến khi tất cả các API trả về kết quả (hiển thị "Dữ liệu tải trong X ms").

## Cách chạy ứng dụng
Mở file `index.html` trực tiếp trên trình duyệt hoặc sử dụng Live Server trong VS Code.
