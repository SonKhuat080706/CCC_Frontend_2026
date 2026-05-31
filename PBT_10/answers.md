# PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Sync vs Async

#### 1. Dự đoán thứ tự Output:
```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

#### 2. Giải thích cơ chế Event Loop, Microtask Queue, Macrotask Queue:
- **Call Stack (Ngăn xếp cuộc gọi):** Thực thi các câu lệnh đồng bộ (synchronous). 
- **Macrotask Queue (Hàng đợi tác vụ lớn):** Chứa các callback từ `setTimeout`, `setInterval`, sự kiện I/O, UI Rendering.
- **Microtask Queue (Hàng đợi tác vụ nhỏ):** Chứa các callback của `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`. Microtask queue có độ ưu tiên cao hơn Macrotask queue. Sau mỗi task trong Call Stack hoàn thành, Event Loop sẽ thực hiện sạch toàn bộ các task có trong Microtask Queue trước khi lấy một task mới từ Macrotask Queue.

**Luồng chạy chi tiết:**
1. **Đồng bộ:**
   - Chạy `console.log("1 - Start")` -> In ra `1 - Start`.
   - Gặp `setTimeout(..., 0)` đầu tiên -> Đẩy callback `2 - Timeout 0ms` vào **Macrotask Queue** (thời gian chờ: 0ms).
   - Gặp `Promise.resolve().then(...)` -> Đẩy callback `3 - Promise` vào **Microtask Queue**.
   - Chạy `console.log("4 - End")` -> In ra `4 - End`.
   - Gặp `setTimeout(..., 100)` -> Đẩy callback `5 - Timeout 100ms` vào **Macrotask Queue** (hẹn giờ 100ms).
   - Gặp `Promise.resolve().then(...)` thứ hai -> Đẩy callback `6 - Promise 2...` vào **Microtask Queue**.
2. **Xử lý Microtask Queue (khi Call Stack trống):**
   - Lấy task đầu tiên trong Microtask Queue: Chạy callback và in ra `3 - Promise`.
   - Lấy task thứ hai trong Microtask Queue: Chạy callback, in ra `6 - Promise 2`, đồng thời gặp `setTimeout(..., 0)` bên trong nên đẩy callback `7 - Nested timeout` vào **Macrotask Queue**.
3. **Xử lý Macrotask Queue:**
   - Lúc này Macrotask Queue chứa: `[2 - Timeout 0ms]`, `[7 - Nested timeout]`, và `[5 - Timeout 100ms]` (đang đếm ngược).
   - Thực thi `2 - Timeout 0ms` -> In ra `2 - Timeout 0ms`.
   - Thực thi `7 - Nested timeout` -> In ra `7 - Nested timeout`.
   - Sau 100ms, thực thi `5 - Timeout 100ms` -> In ra `5 - Timeout 100ms`.

---

### Câu A2 (5đ) — Fetch API

1. **`await fetch(...)`**:
   - `fetch()` trả về một **Promise** đại diện cho phản hồi từ server (`Response` object).
   - Cần dùng `await` để dừng việc thực thi hàm `async` cho tới khi Promise được giải quyết (resolve), giúp chúng ta nhận trực tiếp đối tượng `Response` mà không cần sử dụng chuỗi `.then()`.

2. **`response.ok`**:
   - Thuộc tính này trả về `false` khi HTTP Status Code của phản hồi nằm ngoài khoảng 200–299 (không thành công).
   - **3 status codes tương ứng:**
     - `404` (Not Found)
     - `500` (Internal Server Error)
     - `403` (Forbidden) / `401` (Unauthorized)

3. **`response.json()`**:
   - Phương thức này đọc toàn bộ luồng dữ liệu (body stream) từ phản hồi và phân tích cú pháp dưới dạng JSON.
   - Cần dùng `await` vì việc đọc và parse luồng dữ liệu này là một hoạt động bất đồng bộ (tốn thời gian truyền tải dữ liệu body). Nó trả về một Promise phân giải thành dữ liệu JavaScript gốc.

4. **`try...catch`**:
   - Khối `catch` sẽ bắt các lỗi:
     - Lỗi kết nối mạng (mất mạng, DNS không phân giải được, CORS block).
     - Lỗi cú pháp JSON khi dữ liệu trả về từ `response.json()` không đúng định dạng JSON chuẩn.
     - Các lỗi do lập trình viên chủ động ném ra bằng từ khóa `throw` (ví dụ `throw new Error(...)` khi `!response.ok`).
   - *Lưu ý:* `fetch` sẽ **không** reject khi nhận mã lỗi 404 hoặc 500 từ server, nó chỉ trả về `ok: false`. Do đó, dòng check `if (!response.ok) throw new Error(...)` là bắt buộc để chuyển đổi các lỗi HTTP thành ngoại lệ có thể catch được.

---

### Câu A3 (5đ) — Promise States

#### 1. Sơ đồ trạng thái của Promise:
```text
                  +-------------------+
                  |      PENDING      |
                  +-------------------+
                     /             \
            resolve /               \ reject
                   v                 v
        +-------------+           +------------+
        |  FULFILLED  |           |  REJECTED  |
        | (value/data)|           |   (error)  |
        +-------------+           +------------+
```

#### 2. Callback Hell là gì?
Callback Hell (hay Pyramid of Doom) là hiện tượng các hàm bất đồng bộ lồng nhau qua nhiều cấp callback, khiến code phình to theo chiều ngang, cực kỳ khó đọc, bảo trì và xử lý lỗi.

#### 3. Ví dụ Callback Hell (4 cấp):
```javascript
// Callback Hell
getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetail(orders[0].id, (detail) => {
            getShippingStatus(detail.shippingId, (status) => {
                console.log("Shipping status:", status);
            }, (err) => console.error(err));
        }, (err) => console.error(err));
    }, (err) => console.error(err));
}, (err) => console.error(err));
```

#### Refactor thành async/await:
```javascript
// Sử dụng Async/Await sạch đẹp
async function showShippingStatus(userId) {
    try {
        const user = await getUser(userId);
        const orders = await getOrders(user.id);
        const detail = await getOrderDetail(orders[0].id);
        const status = await getShippingStatus(detail.shippingId);
        console.log("Shipping status:", status);
    } catch (err) {
        console.error("Đã xảy ra lỗi:", err.message);
    }
}
```

---

# PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

Khi xây dựng ứng dụng E-Commerce, chiến lược xử lý lỗi phải đảm bảo trải nghiệm người dùng mượt mà và hệ thống hoạt động ổn định:

1. **Network errors (Mất mạng giữa chừng):**
   - Sử dụng `navigator.onLine` để kiểm tra kết nối mạng trước khi gọi API.
   - Lắng nghe sự kiện `window.addEventListener('offline')` và `online` để hiển thị một thanh thông báo (Toast/Banner) thông báo trạng thái kết nối cho khách hàng.
   - Lưu trữ tạm dữ liệu giỏ hàng hoặc các hành động người dùng vào `IndexedDB` hoặc `LocalStorage` để đồng bộ lại khi có mạng.

2. **API errors (Server trả về mã 500, 404, 429):**
   - **404 (Not Found):** Hiển thị giao diện "Sản phẩm không tồn tại" thay vì báo lỗi hệ thống.
   - **500 (Internal Server Error):** Hiển thị thông báo "Hệ thống đang bảo trì, vui lòng thử lại sau" và gửi log về hệ thống giám sát (Sentry/LogRocket).
   - **429 (Too Many Requests):** Áp dụng cơ chế trì hoãn (Backoff) trước khi tự động gọi lại hoặc hiển thị thông báo yêu cầu người dùng thao tác chậm lại.

3. **Timeout (API chậm > 10 giây):**
   - Sử dụng `AbortController` để hủy request nếu quá thời gian quy định.
   - **Code `fetchWithTimeout`:**
     ```javascript
     async function fetchWithTimeout(resource, options = {}) {
         const { timeout = 10000 } = options;
         
         const controller = new AbortController();
         const id = setTimeout(() => controller.abort(), timeout);
         
         try {
             const response = await fetch(resource, {
                 ...options,
                 signal: controller.signal
             });
             clearTimeout(id);
             return response;
         } catch (error) {
             clearTimeout(id);
             if (error.name === 'AbortError') {
                 throw new Error('Yêu cầu bị quá thời gian phản hồi (Timeout)');
             }
             throw error;
         }
     }
     ```

4. **Retry logic (Thử lại tối đa 3 lần nếu lỗi mạng):**
   - Tự động gửi lại request sau một khoảng thời gian tăng dần (Exponential Backoff).
   - **Code `fetchWithRetry`:**
     ```javascript
     async function fetchWithRetry(url, options = {}, maxRetries = 3, delayMs = 1000) {
         try {
             const response = await fetch(url, options);
             if (!response.ok) {
                 // Nếu lỗi HTTP không phải lỗi mạng, tùy trường hợp để retry (ví dụ 502, 503, 504)
                 if ([502, 503, 504].includes(response.status) && maxRetries > 0) {
                     throw new Error(`Server Error: ${response.status}`);
                 }
                 return response; 
             }
             return response;
         } catch (error) {
             if (maxRetries <= 0) {
                 throw new Error(`Đã thử lại tối đa nhưng thất bại: ${error.message}`);
             }
             console.warn(`Lỗi xảy ra: ${error.message}. Đang thử lại sau ${delayMs}ms... (Còn lại ${maxRetries} lần)`);
             await new Promise(resolve => setTimeout(resolve, delayMs));
             return fetchWithRetry(url, options, maxRetries - 1, delayMs * 2);
         }
     }
     ```

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

#### 1. Bảng so sánh chi tiết:

| Method | Khi nào resolve? | Khi nào reject? | Use case thực tế |
|---|---|---|---|
| **`Promise.all()`** | Khi **tất cả** các Promise thành viên đều resolve. Trả về mảng các kết quả. | Ngay khi **chỉ cần 1** Promise thành viên bị reject. Trả về lý do reject của Promise lỗi đó. | Tải dữ liệu trang chi tiết sản phẩm: Cần đồng thời thông tin sản phẩm, danh mục và bình luận. Nếu thiếu 1 trong số đó, trang sẽ không hiển thị được. |
| **`Promise.allSettled()`** | Khi **tất cả** các Promise thành viên đều kết thúc (dù resolve hay reject). Trả về mảng các object chứa `{status, value}` hoặc `{status, reason}`. | **Không bao giờ** bị reject. | Tải dữ liệu Dashboard: Có widget Thời tiết, widget Tỷ giá, widget Tin tức. Widget này lỗi thì widget khác vẫn phải hiện thông tin bình thường. |
| **`Promise.race()`** | Ngay khi **bất kỳ** Promise thành viên nào kết thúc đầu tiên (resolve). | Ngay khi **bất kỳ** Promise thành viên nào kết thúc đầu tiên (reject). | Giới hạn thời gian kết nối (Timeout): Cho một request mạng chạy đua với một hàm delay ném ra lỗi sau 5 giây. Cái nào nhanh hơn sẽ quyết định kết quả. |
| **`Promise.any()`** | Ngay khi **chỉ cần 1** Promise thành viên nào resolve đầu tiên. | Khi **tất cả** các Promise thành viên đều bị reject (trả về lỗi `AggregateError`). | Tải ảnh hoặc tài nguyên từ nhiều nguồn CDN khác nhau: Gọi đồng thời server CDN Singapore, Tokyo và Mỹ. Lấy nguồn nào trả về ảnh nhanh nhất để hiển thị. |

#### 2. Ví dụ code thực tế:

##### Ví dụ `Promise.all`:
```javascript
// Gọi đồng thời thông tin một đơn hàng và thông tin khách hàng sở hữu đơn hàng đó
async function getOrderDetails(orderId) {
    try {
        const [orderResponse, customerResponse] = await Promise.all([
            fetch(`https://api.shop.com/orders/${orderId}`).then(r => r.json()),
            fetch(`https://api.shop.com/customers/profile`).then(r => r.json())
        ]);
        return { order: orderResponse, customer: customerResponse };
    } catch (error) {
        console.error("Không thể load chi tiết đơn hàng vì thiếu thông tin thiết yếu:", error);
        throw error;
    }
}
```

##### Ví dụ `Promise.allSettled`:
```javascript
// Load Dashboard với nhiều Widget độc lập
async function loadDashboardWidgets() {
    const widgets = [
        fetch("https://api.shop.com/widgets/weather").then(r => r.json()),
        fetch("https://api.shop.com/widgets/stock-rates").then(r => r.json()),
        fetch("https://api.shop.com/widgets/news").then(r => r.json())
    ];

    const results = await Promise.allSettled(widgets);

    results.forEach((result, idx) => {
        if (result.status === "fulfilled") {
            updateWidgetUI(idx, result.value);
        } else {
            showWidgetError(idx, "Không thể tải dữ liệu: " + result.reason.message);
        }
    });
}
```

##### Ví dụ `Promise.race`:
```javascript
// Thực hiện thanh toán với giới hạn thời gian (Timeout)
async function processPaymentWithTimeout(paymentData) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Giao dịch quá hạn (Timeout)")), 5000)
    );

    const paymentPromise = fetch("https://api.payment-gateway.com/charge", {
        method: "POST",
        body: JSON.stringify(paymentData)
    }).then(r => r.json());

    try {
        // Đua giữa API thanh toán thật và Timeout 5s
        const result = await Promise.race([paymentPromise, timeoutPromise]);
        return result;
    } catch (error) {
        alert("Thanh toán thất bại: " + error.message);
        throw error;
    }
}
```

##### Ví dụ `Promise.any`:
```javascript
// Lấy ảnh đại diện từ CDN nhanh nhất
async function getFastestAvatar(userId) {
    const cdns = [
        `https://cdn-sg.example.com/avatars/${userId}.jpg`,
        `https://cdn-jp.example.com/avatars/${userId}.jpg`,
        `https://cdn-us.example.com/avatars/${userId}.jpg`
    ];

    try {
        // Lấy kết quả từ CDN đầu tiên trả về ảnh thành công
        const fastestImageUrl = await Promise.any(
            cdns.map(url => fetch(url).then(res => {
                if (!res.ok) throw new Error("Lỗi tải ảnh");
                return url;
            }))
        );
        return fastestImageUrl;
    } catch (error) {
        console.error("Tất cả CDN đều lỗi:", error.errors);
        return "/images/default-avatar.jpg"; // Trả về ảnh mặc định
    }
}
```
