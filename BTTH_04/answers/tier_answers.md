# Tier Answers

## Tier 0 — Câu hỏi

### 1. File `.jsx` khác gì file `.js`?

File `.jsx` là file JavaScript có chứa JSX — cú pháp viết giao diện giống HTML bên trong JavaScript. File `.js` cũng có thể chứa React code, nhưng đặt `.jsx` giúp dễ nhận biết file có JSX.

### 2. Tại sao phải `export default App`?

`export default App` cho phép file khác import component `App`.

Ví dụ trong `main.jsx`:

```jsx
import App from "./App.jsx";
```

Nếu không export, file khác không dùng được component này.

### 3. Xóa `export default` thì chuyện gì xảy ra?

Nếu `main.jsx` vẫn import `App` từ file đó, ứng dụng sẽ báo lỗi vì không tìm thấy export mặc định.

## Tier 1 — Câu hỏi

### 1. Tại sao component chỉ render 1 lần?

Nếu component không có state/props thay đổi, React chỉ render lần đầu khi component được mount vào DOM.

### 2. Khi nào component render lại?

Component render lại khi:

- State thay đổi bằng `setState`.
- Props từ component cha thay đổi.
- Component cha render lại.
- Key thay đổi khiến React mount lại component.

## Ghi nhớ nhanh

```text
User action → setState → component render lại → JSX mới → DOM cập nhật
```
