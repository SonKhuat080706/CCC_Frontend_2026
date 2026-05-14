# Phụ lục Bài tập 04 - CSS Layout

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Normal flow | Có | Giá trị mặc định của mọi phần tử. |
| `relative` | Có | Vị trí ban đầu của chính nó | Có | Dịch chuyển nhẹ phần tử hoặc làm mốc cho `absolute`. |
| `absolute` | Không | Nearest positioned ancestor (tổ tiên gần nhất có position != static) | Có | Đặt badge lên ảnh, làm menu dropdown, tooltip. |
| `fixed` | Không | Viewport (cửa sổ trình duyệt) | Không | Header cố định, nút "Back to top". |
| `sticky` | Có | Scroll container (thường là Viewport) | Có | Thanh tiêu đề bảng hoặc sidebar dính khi cuộn. |

**Câu hỏi thêm:** 
- `absolute` tham chiếu `body` khi không tìm thấy bất kỳ tổ tiên nào có `position` khác `static`. 
- Nó tham chiếu parent khi parent có `position` là `relative`, `absolute`, `fixed` hoặc `sticky`. 
- "Nearest positioned ancestor" là phần tử cha (hoặc ông bà...) gần nhất trong cây DOM có thuộc tính `position` được thiết lập (khác `static`).

### Câu A2 (10đ) — Flexbox vs Grid

- **Trường hợp 1:** 4 items nằm trên 1 hàng ngang, mỗi item chiếm 25% chiều rộng (chia đều).
- **Trường hợp 2:** Các items xếp thành 2 hàng, mỗi hàng 2 items (chiếm 45% + 45% + margin), item thứ 5 và 6 xuống hàng 3.
- **Trường hợp 3:** 3 items nằm trên 1 hàng: 1 ở sát trái, 1 ở giữa, 1 ở sát phải. Căn giữa theo chiều dọc.
- **Trường hợp 4:** 3 items: Cột 1 rộng 200px, cột 2 chiếm hết phần còn lại (`1fr`), cột 3 rộng 200px.
- **Trường hợp 5:** 7 items xếp thành 3 hàng. Hàng 1 (3 items), Hàng 2 (3 items), Hàng 3 (1 item nằm ở cột đầu tiên).

---

## PHẦN C — SUY LUẬN

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

1. **Navigation bar ngang**: **Flexbox**. Vì đây là bố cục 1 chiều, Flexbox mạnh về việc phân bổ khoảng cách (space-between) và căn giữa các phần tử có kích thước khác nhau.
2. **Lưới ảnh Instagram**: **Grid**. Vì đây là bố cục 2 chiều (lưới) với số cột cố định (3), Grid giúp quản lý các ô vuông đều nhau dễ dàng hơn.
3. **Layout blog**: **Grid**. Phù hợp để chia cấu trúc trang lớn (layout macro) thành các vùng Main và Sidebar rõ rệt.
4. **Footer 4 cột**: **Flexbox**. Dễ dàng xử lý khi số lượng cột thay đổi hoặc khi muốn các cột co dãn theo nội dung bên trong.
5. **Card sản phẩm**: **Flexbox**. Dùng `flex-direction: column` và `margin-top: auto` cho nút bấm để đảm bảo nút luôn nằm dưới cùng dù mô tả dài hay ngắn.

### Câu C2 (10đ) — Debug Flexbox

- **Lỗi 1:**
  - **Nguyên nhân:** `.card` chưa có `display: flex` và `flex-direction: column`, nên `margin-top: auto` trên nút bấm không có tác dụng.
  - **Sửa:** Thêm `display: flex; flex-direction: column;` cho `.card` và `margin-top: auto;` cho `.btn`.
- **Lỗi 2:**
  - **Nguyên nhân:** Thiếu `justify-content` và `align-items` trên container `.hero`. `display: flex` chỉ mới kích hoạt chế độ flex.
  - **Sửa:** Thêm `justify-content: center; align-items: center;`.
- **Lỗi 3:**
  - **Nguyên nhân:** Flex items mặc định có `flex-shrink: 1`, khiến nó bị bóp lại khi nội dung bên cạnh quá lớn.
  - **Sửa:** Thêm `flex-shrink: 0;` cho `.sidebar`.
