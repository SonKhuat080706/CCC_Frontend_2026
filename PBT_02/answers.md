# PHIẾU BÀI TẬP 02 - TRẢ LỜI LÝ THUYẾT

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Input Types
1. `type="text"` → Ô nhập văn bản cơ bản, chỉ có 1 dòng → Dùng cho nhập tên, địa chỉ.
2. `type="email"` → Ô nhập văn bản, tự kiểm tra xem chuỗi nhập vào có ký tự `@` và đúng định dạng cơ bản của email hay không → Dùng cho form đăng ký email, đăng nhập.
3. `type="password"` → Ô nhập mật khẩu, các ký tự nhập vào bị ẩn thành dấu chấm/sao để bảo mật → Dùng cho ô nhập mật khẩu đăng nhập/đăng ký.
4. `type="number"` → Ô nhập số, có nút mũi tên tăng/giảm ở cạnh, tự động kiểm tra xem giá trị nhập vào có phải là số hay không → Dùng để nhập số lượng sản phẩm cần mua.
5. `type="tel"` → Ô nhập số điện thoại, trên thiết bị di động sẽ tự động hiển thị bàn phím số (numpad) giúp nhập nhanh hơn → Dùng để nhập số điện thoại giao hàng.
6. `type="date"` → Ô chọn ngày tháng, tự động hiển thị công cụ Date picker để người dùng chọn thay vì phải gõ thủ công → Dùng để chọn ngày sinh, ngày nhận hàng.
7. `type="checkbox"` → Ô vuông cho phép tick chọn hoặc bỏ chọn. Có thể chọn nhiều ô trong một nhóm → Dùng cho phần chọn sở thích, hoặc "Đồng ý với các điều khoản".
8. `type="radio"` → Ô tròn cho phép chọn một tùy chọn duy nhất trong một nhóm (các input cùng name) → Dùng cho phần chọn giới tính (Nam/Nữ) hoặc chọn phương thức thanh toán.
9. `type="search"` → Ô tìm kiếm, thường có thêm biểu tượng dấu "x" ở góc để xóa nhanh nội dung tìm kiếm → Dùng cho thanh tìm kiếm sản phẩm trên E-commerce.
10. `type="file"` → Nút đính kèm, hiển thị cửa sổ hệ thống để người dùng duyệt và chọn file từ máy tính tải lên → Dùng cho mục upload ảnh đại diện (avatar) hoặc biên lai chuyển khoản.

### Câu A2 — Validation Attributes
1. **Trường hợp 1:** `required value=""` (User để trống) → Trình duyệt sẽ chặn form không cho submit và hiển thị một popup cảnh báo yêu cầu người dùng phải điền vào trường này. Lý do là vì thuộc tính `required` bắt buộc input không được bỏ trống.
2. **Trường hợp 2:** `type="email" value="abc"` (User gõ "abc") → Trình duyệt sẽ chặn form và báo lỗi định dạng. Lý do vì `type="email"` yêu cầu dữ liệu phải có chứa ký tự "@", trong khi "abc" không thỏa mãn định dạng email cơ bản.
3. **Trường hợp 3:** `min="1" max="10" value="15"` (User gõ 15) → Trình duyệt sẽ chặn form và báo lỗi giá trị phải nhỏ hơn hoặc bằng 10. Lý do vì thuộc tính `max="10"` giới hạn giá trị tối đa là 10.
4. **Trường hợp 4:** `pattern="[0-9]{10}" value="abc123"` (User gõ "abc123") → Trình duyệt sẽ chặn form báo dữ liệu không khớp với định dạng yêu cầu. Lý do là `pattern` này bắt buộc phải là dãy gồm đúng 10 chữ số từ 0-9, nhưng "abc123" lại chứa chữ cái và không đủ 10 ký tự.
5. **Trường hợp 5:** `minlength="8" value="123"` (User gõ "123") → Trình duyệt sẽ chặn submit và thông báo văn bản quá ngắn (chỉ có 3 ký tự, yêu cầu phải ít nhất 8). Lý do là vì thuộc tính `minlength="8"` bắt buộc chuỗi phải dài ít nhất 8 ký tự.

### Câu A3 — Accessibility
1. `<label for="email">` quan trọng cho screen reader vì nó liên kết thẻ label với ô input có id tương ứng. Khi ô input được focus, screen reader sẽ biết cách đọc to văn bản trong thẻ label lên cho người khiếm thị hiểu ô đó dùng để nhập gì. Ngoài ra người dùng bình thường cũng có thể bấm vào chữ label để tự động focus vào input.
2. Dùng `<fieldset>` kết hợp với `<legend>` khi chúng ta cần nhóm một tập hợp các form input liên quan đến nhau lại thành một khối logic, và `<legend>` đóng vai trò như tiêu đề cho khối đó.
   - Ví dụ: Trong form thanh toán, ta dùng một `<fieldset>` và `<legend>Thông tin giao hàng</legend>`, bên trong chứa các ô nhập Họ tên, số điện thoại, địa chỉ cụ thể. Điều này giúp các input được tổ chức rõ ràng cả về mặt giao diện lẫn cấu trúc cho screen reader.
3. Dùng `aria-label` khi một phần tử giao diện cần có nhãn mô tả cho screen reader nhưng lại không có đoạn text mô tả nào hiển thị trực tiếp trên màn hình. (Ví dụ: Nút có chứa icon cái kính lúp dùng để tìm kiếm `aria-label="Tìm kiếm"`). KHÔNG nên dùng `aria-label` khi đã có thẻ `<label>` vì nó sẽ dư thừa, và `aria-label` có thể đè lên nội dung hiển thị của `<label>` gốc khi screen reader đọc, gây hiểu nhầm.

### Câu A4 — Media
1. Thuộc tính `loading="lazy"` trên thẻ `<img>` báo cho trình duyệt chỉ được tải hình ảnh về khi người dùng chuẩn bị cuộn (scroll) màn hình đến vị trí của ảnh đó. Cải thiện: Tốc độ tải trang web ban đầu nhanh hơn và tiết kiệm băng thông. KHÔNG nên dùng cho những hình ảnh quan trọng nằm ngay trên màn hình đầu tiên (above the fold) như logo, hero banner, vì người dùng cần thấy chúng ngay khi trang web vừa mở.
2. Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì mỗi trình duyệt (Chrome, Safari, Firefox...) hỗ trợ các định dạng (codec) video khác nhau. Việc cung cấp nhiều source giúp trình duyệt tự động lựa chọn định dạng phù hợp nhất (đứng đầu tiên trong danh sách) mà nó đọc được.
   - 3 format video web phổ biến: MP4 (H.264), WebM, và Ogg.
3. Thuộc tính `alt` (alternative text) trên `<img>` dùng để: Hiển thị văn bản thay thế khi hình ảnh bị lỗi không tải được; Cung cấp mô tả cho screen reader đọc cho người khiếm thị; Tối ưu hóa công cụ tìm kiếm (SEO).
   - Ảnh sản phẩm iPhone 16: `alt="Điện thoại iPhone 16 Pro Max màu Titan tự nhiên, mặt lưng hiển thị cụm 3 camera và logo Apple"`
   - Ảnh trang trí (decorative): `alt=""` (để trống nhằm bảo screen reader bỏ qua)
   - Ảnh biểu đồ doanh thu Q1/2026: `alt="Biểu đồ cột hiển thị mức tăng trưởng doanh thu quý 1 năm 2026 đạt 15% so với cùng kỳ năm trước"`

### Câu A5 — So sánh `<figure>` vs `<img>`
- **Cách 1 (dùng `<img>`):** Dùng khi hình ảnh đóng vai trò trang trí đơn giản, các logo, icon hoặc hình ảnh độc lập không nhất thiết phải có dòng chú thích nào đi kèm và nội dung bài viết không cần tham chiếu tới nó.
  - Ví dụ 1: Hình logo công ty ở góc trên bên trái header trang web.
  - Ví dụ 2: Banner quảng cáo ngang nằm ở giữa bài viết.
- **Cách 2 (dùng `<figure>`):** Dùng khi hình ảnh cần đi kèm với một chú thích cụ thể (`<figcaption>`), và sự kết hợp giữa ảnh + chú thích đó tạo thành một khối thông tin độc lập có thể được tham chiếu từ nội dung bài viết.
  - Ví dụ 1: Một bức ảnh minh họa trong bài báo tin tức kèm theo dòng chú thích nhỏ (Nguồn ảnh, tác giả, mô tả sự kiện).
  - Ví dụ 2: Hình ảnh sản phẩm kèm theo tên sản phẩm và giá được đặt trong khung liền kề (như ví dụ đề bài đã cho).

---

## PHẦN B — THỰC HÀNH CODE

### Giải thích Bài B1: Tại sao HTML5 không thể validate confirm password?
HTML5 cung cấp các thuộc tính tĩnh để tự động kiểm tra sự hợp lệ trên một ô input độc lập (như required, pattern, min, max, minlength). Tuy nhiên, trường "Xác nhận mật khẩu" đòi hỏi một logic động: Giá trị của ô này **phải bằng chính xác** với giá trị người dùng vừa gõ vào ô "Mật khẩu" trước đó.
HTML5 không có khả năng so sánh chéo giá trị giữa hai ô input với nhau. Do vậy, để validate tính bằng nhau, chúng ta buộc phải dùng JavaScript để so sánh 2 giá trị này ở phía client, hoặc kiểm tra ở phía backend.

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 — Debug Form
Dưới đây là 8 lỗi trong form và cách khắc phục (bổ sung thuộc tính `id`, `name`, `label` theo chuẩn accessibility và best practices):

1. **Lỗi 1:** Dòng 2 — Input "Tên" không có thẻ `<label for="...">`, vi phạm accessibility.
   - Sửa: `<label for="firstName">Tên:</label> <input type="text" id="firstName" name="firstName" required>`
2. **Lỗi 2:** Dòng 4 — Input email không được bọc bằng thẻ `<label>`, thiếu id và name.
   - Sửa: `<label for="email">Email của bạn:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>`
3. **Lỗi 3:** Dòng 6 — Input "Mật khẩu" không có `<label>`, thiếu id và name.
   - Sửa: `<label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" placeholder="Mật khẩu" required>`
4. **Lỗi 4:** Dòng 7 — Input "Nhập lại mật khẩu" không có `<label>`, thiếu id và name.
   - Sửa: `<label for="confirmPassword">Nhập lại mật khẩu:</label> <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" required>`
5. **Lỗi 5:** Dòng 9 — Ô nhập Phone đang dùng `type="text"` thay vì `type="tel"`, không có `<label>` đúng chuẩn.
   - Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567" pattern="[0-9]{10}">`
6. **Lỗi 6:** Dòng 11 — Thẻ `<select>` không có id, name và `<label>` đi kèm.
   - Sửa: `<label for="city">Thành phố:</label> <select id="city" name="city"> <option value="HN">Hà Nội</option> <option value="HCM">TP.HCM</option> </select>`
7. **Lỗi 7:** Dòng 16 — Thẻ `<label>` bọc "Tôi đồng ý điều khoản" thiếu một ô `<input type="checkbox">` bên trong.
   - Sửa: `<label><input type="checkbox" name="agree" required> Tôi đồng ý điều khoản</label>`
8. **Lỗi 8:** Dòng 20 — Dùng `<input type="submit">` là cách cũ và thiếu linh hoạt, nên thay bằng thẻ `<button type="submit">`.
   - Sửa: `<button type="submit">Gửi</button>`

### Câu C2 — Thiết kế chiến lược Validation
1. **Viết pattern regex:**
   - CMND/CCCD (đúng 12 chữ số): `pattern="[0-9]{12}"`
   - Số tài khoản (10-15 chữ số): `pattern="[0-9]{10,15}"`
2. **HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?**
   - Trả lời: **CHƯA ĐỦ**. HTML5 validation (Frontend Validation) chỉ mang tính chất cải thiện trải nghiệm người dùng (UX) - giúp báo lỗi ngay lập tức để họ sửa mà không phải chờ request gửi đi.
   - Lý do: Bất kỳ người dùng nào cũng có thể vượt qua HTML5 validation bằng cách sử dụng trình duyệt DevTools để xóa thuộc tính (như bỏ chữ `required` hoặc `pattern`), vô hiệu hóa JavaScript trên trình duyệt, hoặc dùng các công cụ như Postman/cURL để gửi request trực tiếp đến Backend bỏ qua hoàn toàn giao diện Web. 
3. **3 loại validation HTML5 KHÔNG THỂ làm được (phải dùng JavaScript):**
   - **Kiểm tra trùng lặp cơ sở dữ liệu:** (Ví dụ: Email hoặc Username đã có người khác đăng ký trong hệ thống chưa).
   - **Validation so sánh chéo giữa nhiều ô:** (Ví dụ: Password và Confirm Password phải giống nhau; hoặc Ngày bắt đầu không được trễ hơn Ngày kết thúc).
   - **Kiểm tra logic nghiệp vụ phức tạp:** (Ví dụ: Số tiền chuyển khoản không được vượt quá số dư tài khoản hiện tại).
4. **2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:**
   - **Lỗ hổng Injection (SQL Injection, XSS):** Kẻ tấn công gửi các đoạn mã độc dạng ký tự đặc biệt thẳng vào database. Nếu backend không kiểm tra lại, ứng dụng có thể bị rò rỉ dữ liệu hoặc mã độc chạy trên máy nạn nhân khác.
   - **Mất tính toàn vẹn dữ liệu (Data Integrity) và lỗi hệ thống:** Kẻ tấn công có thể cố tình gửi số tiền âm (gây lỗi nghiệp vụ nạp/rút tiền) hoặc thay đổi tham số không được phép. Điều này phá vỡ dữ liệu trong DB và gây sập ứng dụng.
## Phần D
https://www.youtube.com/watch?v=viE9xaI-u5o&t=1s