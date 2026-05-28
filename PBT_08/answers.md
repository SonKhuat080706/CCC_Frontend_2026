# Phần A: Kiểm tra đọc hiểu

## Câu A1 — Function Declaration vs Expression vs Arrow

1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
}
```

2. Function Expression

```javascript
const tinhThueBaoHiem = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
};
```

3. Arrow Function

```javascript
const tinhThueBaoHiem = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
};
```

4. Hoisting — Khác nhau như thế nào?

- Function Declaration → Hoisted hoàn toàn

```javascript
// Gọi TRƯỚC khi khai báo → vẫn chạy được!
const ketQua = tinhThueBaoHiem(15000000);
console.log(ketQua); // { thue: 1500000, thuc_nhan: 13500000 } ✅

function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
}
```

- Function Expression & Arrow Function → không hoisted

```javascript
// Gọi TRƯỚC khi khai báo → LỖI!
const ketQua = tinhThueBaoHiem(15000000);
// ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization

const tinhThueBaoHiem = function(luong) { ... };
```

```javascript
const ketQua = tinhThueBaoHiem(15000000);
// ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization

const tinhThueBaoHiem = (luong) => { ... };
```

## Câu A2 — Scope & Closure

1. Đoạn 1: Closure Counter

```javascript
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount()); // 2
```

- `count` không bị reset mỗi lần gọi vì nó sống trong closure, không phải trong từng arrow function.

2. Đoạn 2: var vs let trong setTimeout

```
// Sau 100ms (var loop):
var: 3
var: 3
var: 3

// Sau 200ms (let loop):
let: 0
let: 1
let: 2
```

Tại sao `var` và `let` khác nhau trong setTimeout?

- `var` có function scope — cả 3 lần lặp dùng chung 1 biến `i` duy nhất. Khi 3 callback chạy sau 100ms, loop đã kết thúc, `i` = 3 → cả 3 in ra `3`.
- `let` có block scope — mỗi lần lặp tạo ra 1 biến `j` riêng. Mỗi callback nhớ biến `j` của lần lặp đó → in ra `0`, `1`, `2`.

## Câu A3 — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
nums.filter((n) => n % 2 === 0);

// 2. Nhân mỗi số với 3
nums.map((n) => n * 3);

// 3. Tính tổng tất cả
nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
nums.find((n) => n > 7);

// 5. Kiểm tra CÓ số > 10 không
nums.some((n) => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
nums.every((n) => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
[...nums].reverse();
```

## Câu A4 — Object Destructuring & Spread

1. Destructuring

```javascript
console.log(name, price, ram, color); // "iPhone 16" 25990000 8 "Titan"
console.log(specs); // ReferenceError: specs is not defined
```

- `specs: { ram, color }` có nghĩa: lấy `ram` và `color` từ bên trong `specs`, nhưng không tạo ra biến `specs`. Muốn có biến `specs` phải viết: `const { specs, specs: { ram, color } } = product`

2. Spread

```javascript
console.log(updated.price); // 23990000
console.log(updated.sale); // true
console.log(product.price); // 25990000  (gốc không đổi)
```

`{ ...product, price: 23990000 }` copy tất cả property của `product` rồi override `price`. `product` gốc không bị ảnh hưởng

3. Spread Gotcha

```javascript
console.log(product.specs.ram); // 16
```

- Spread chỉ copy shallow (1 tầng). `copy.specs` và `product.specs` vẫn trỏ đến cùng 1 object trong bộ nhớ
- `copy.specs.ram = 16` sửa object gốc → `product.specs.ram` cũng thành `16`.

# Phần C: Suy luận

## Câu C1 — Refactor Code

```javascript
const processOrders = (orders) =>
  orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

## Câu C2 — Thiết kế API

```javascript
const miniArray = {
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) result.push(arr[i]);
    }
    return result;
  },

  reduce(arr, fn, initialValue) {
    let acc = initialValue;
    let startIndex = 0;

    if (acc === undefined) {
      acc = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      acc = fn(acc, arr[i], i, arr);
    }
    return acc;
  },
};

// Test
console.log(miniArray.map([1, 2, 3], (x) => x * 2)); // → [2,4,6]
console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2)); // → [3,4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10
```

# PHẦN D — VIDEO THỰC HÀNH OBS

