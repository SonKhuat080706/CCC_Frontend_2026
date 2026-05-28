# Phần A: Kiểm tra đọc hiểu

## Câu A1 — var / let / const

| Đoạn | Dự đoán        | Thực tế                                   |
| ---- | -------------- | ----------------------------------------- |
| 1    | `undefined`    | `undefined`                               |
| 2    | ReferenceError | `Cannot access 'y' before initialization` |
| 3    | TypeError      | `Assignment to constant variable.`        |
| 4    | `[1, 2, 3, 4]` | `[1, 2, 3, 4]`                            |
| 5    | `2` rồi `1`    | `Trong block: 2` → `Ngoài block: 1`       |

1. Đoạn 1

- Đây là bẫy của `var`: dùng biến trước khi khai báo không báo lỗi, chỉ trả `undefined` — rất khó debug.

2. Đoạn 2

- `let` bị hoisting nhưng nằm trong vùng từ đầu block đến dòng khai báo. Truy cập trong vùng này lỗi ngay. Đây là hành vi tốt hơn `var` vì lỗi rõ ràng.

3. Đoạn 3

- `const` không cho gán lại biến → lỗi ở `z = 20`.

4. Đoạn 4

- `arr.push(4)` OK — vì `push` không gán lại biến, chỉ sửa nội dung bên trong mảng

5. Đoạn 5

- `let` có block scope nên `a = 2` bên trong `{}` là biến khác hoàn toàn, không ảnh hưởng `a = 1` bên ngoài. Nếu dùng `var` thì cả hai cùng là một biến → `Ngoài block: 2`.

## Câu A2 — Data Types & Coercion

| Biểu thức          | Dự đoán                    | Thực tế             |
| ------------------ | -------------------------- | ------------------- |
| `typeof null`      | `"object"`                 | `"object"`          |
| `typeof undefined` | `"undefined"`              | `"undefined"`       |
| `typeof NaN`       | `"number"`                 | `"number"`          |
| `"5" + 3`          | `"53"`                     | `"53"`              |
| `"5" - 3`          | `2`                        | `2`                 |
| `"5" * "3"`        | `15`                       | `15`                |
| `true + true`      | `2`                        | `2`                 |
| `[] + []`          | `""`                       | `""`                |
| `[] + {}`          | `"[object Object]"`        | `"[object Object]"` |
| `{} + []`          | `0 hoặc "[object Object]"` | `"[object Object]"` |

- `+` làm được 2 việc: cộng số và nối chuỗi. Khi thấy một bên là string, JS ưu tiên nối chuỗi — chuyển 3 thành "3" rồi ghép lại
- `-` chỉ làm được 1 việc: trừ số. Không có khái niệm "trừ chuỗi" nên JS buộc phải chuyển "5" thành số 5 rồi tính

## Câu A3 — So sánh == vs ===

| Biểu thức            | Dự đoán | Thực tế |
| -------------------- | ------- | ------- |
| `5 == "5"`           | `true`  | `true`  |
| `5 === "5"`          | `false` | `false` |
| `null == undefined`  | `true`  | `true`  |
| `null === undefined` | `false` | `false` |
| `NaN == NaN`         | `false` | `false` |
| `0 == false`         | `true`  | `true`  |
| `0 === false`        | `false` | `false` |
| `"" == false`        | `true`  | `true`  |

- Từ giờ trở đi luôn dùng `===` lý do đơn giản: `==` tự chuyển type theo quy tắc phức tạp, kết quả khó đoán và dễ gây bug âm thầm. `===` so sánh đúng thứ mình thấy — khác type là false, không có bất ngờ.

## Câu A4 — Truthy & Falsy

| Biểu thức | Dự đoán  | Thực tế  |
| --------- | -------- | -------- |
| `"0"`     | In "A"   | In "A"   |
| `""`      | Không in | Không in |
| `[]`      | In "C"   | In "C"   |
| `{}`      | In "D"   | In "D"   |
| `null`    | Không in | Không in |
| `0`       | Không in | Không in |
| `-1`      | In "G"   | In "G"   |
| `" "`     | In "H"   | In "H"   |

## Câu A5 — Template Literals

1. Cách 1: Chuỗi chào

```js
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

2. Cách 2: URL

```js
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

3. Cách 3 — HTML string

```js
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

# Phần C: Suy luận

## Câu C1 — Debug JavaScript

| #   | Vị trí                           | Lỗi                                           | Sửa                                     |
| --- | -------------------------------- | --------------------------------------------- | --------------------------------------- |
| 1   | `tinhGiaGiamGia("100000", 20)`   | truyền string thay vì number → tính ra `NaN`  | truyền `100000` hoặc validate trong hàm |
| 2   | `var giamGia`                    | dùng `var`                                    | đổi thành `const`                       |
| 3   | `let giaSauGiam`                 | không cần gán lại                             | đổi thành `const`                       |
| 4   | `if (giaSauGiam = 0)`            | `=` là gán chứ không phải so sánh, luôn falsy | đổi thành `===`                         |
| 5   | thiếu validate `giaBan`          | không kiểm tra input có phải số không         | thêm `typeof giaBan !== "number"`       |
| 6   | `for (var i ...)` + `setTimeout` | lỗi closure ẩn                                | đổi `var` thành `let`                   |

- Code sau khi sửa

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  if (typeof giaBan !== "number" || isNaN(giaBan)) {
    return "Giá bán không hợp lệ";
  }

  if (phanTramGiam < 0 || phanTramGiam > 100) {
    return "Phần trăm giảm không hợp lệ";
  }

  const giamGia = (giaBan * phanTramGiam) / 100;
  const giaSauGiam = giaBan - giamGia;

  if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

`var` có function scope nên chỉ có một biến `i` duy nhất dùng chung cho cả 5 callback. Khi setTimeout chạy sau 1 giây, vòng lặp đã xong và `i = 5` rồi → cả 5 đều in `Item 5`.

Dùng `let` thì mỗi lần lặp tạo ra một `i` riêng, callback nhớ đúng giá trị của lần lặp đó.
