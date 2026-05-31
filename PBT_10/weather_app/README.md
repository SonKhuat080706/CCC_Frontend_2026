# Weather App (B1)

Ứng dụng xem thông tin thời tiết thời gian thực bằng cách sử dụng **Open-Meteo Geocoding & Weather Forecast API**.

## Các API sử dụng
1. **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search` (Tìm vĩ độ/kinh độ của thành phố theo tên).
2. **Forecast API**: `https://api.open-meteo.com/v1/forecast` (Lấy dữ liệu thời tiết hiện tại).

## Chức năng đã thực hiện
- Input nhập tên thành phố có hỗ trợ click tìm kiếm.
- Quản lý 3 trạng thái của giao diện: Loading, Success, Error.
- Lưu trữ lịch sử tìm kiếm tối đa 5 thành phố gần nhất bằng `LocalStorage` và có thể click vào lịch sử để tìm nhanh lại.
- Thiết kế giao diện Glassmorphism hiện đại, tối ưu di động và desktop, có hiệu ứng chuyển động mượt mà.

## Cách chạy ứng dụng
Mở file `index.html` trực tiếp trên trình duyệt hoặc sử dụng Live Server trong VS Code.
