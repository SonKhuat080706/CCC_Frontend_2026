// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

const process = pipe(
  (x) => x * 2,
  (x) => x + 10,
  (x) => x.toString(),
  (x) => "Kết quả: " + x,
);
console.log(process(5)); // → "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});
console.log(expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

search("i");
search("ip");
search("iph");
search("ipho");
search("iphon");
search("iphone"); // → chỉ dòng này chạy sau 500ms

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`Lần ${attempt} thất bại: ${err.message}`);
      if (attempt === maxAttempts) throw new Error(`Thất bại sau ${maxAttempts} lần thử.`);
    }
  }
}
