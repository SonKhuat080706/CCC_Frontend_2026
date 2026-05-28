function calculate(num1, operator, num2) {
  // Kiểm tra input có phải số không
  if (typeof num1 !== "number" || typeof num2 !== "number" || isNaN(num1) || isNaN(num2)) {
    return "Lỗi: Input không phải số";
  }

  // Kiểm tra operator hợp lệ
  const validOperators = ["+", "-", "*", "/", "%", "**"];
  if (!validOperators.includes(operator)) {
    return `Lỗi: Operator '${operator}' không hợp lệ`;
  }

  // Kiểm tra chia cho 0
  if ((operator === "/" || operator === "%") && num2 === 0) {
    return "Lỗi: Không thể chia cho 0";
  }

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    case "**":
      return num1 ** num2;
  }
}

// Test theo đề
console.log(calculate(10, "+", 5)); // → 15
console.log(calculate(10, "/", 0)); // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5)); // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10)); // → 1024
