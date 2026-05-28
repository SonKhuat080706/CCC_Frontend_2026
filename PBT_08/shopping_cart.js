function createCart() {
  let items = [];
  let discount = { type: null, value: 0 };

  return {
    addItem(product, quantity = 1) {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    removeItem(productId) {
      items = items.filter((i) => i.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      const item = items.find((i) => i.id === productId);
      if (item) {
        if (newQuantity <= 0) {
          items = items.filter((i) => i.id !== productId);
        } else {
          item.quantity = newQuantity;
        }
      }
    },

    getTotal() {
      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      if (discount.type === "percent") return subtotal * (1 - discount.value);
      if (discount.type === "fixed") return subtotal - discount.value;
      return subtotal;
    },

    applyDiscount(code) {
      const codes = {
        SALE10: { type: "percent", value: 0.1 },
        SALE20: { type: "percent", value: 0.2 },
        FREESHIP: { type: "fixed", value: 30000 },
      };
      if (codes[code]) {
        discount = codes[code];
        console.log(`Áp dụng mã "${code}" thành công!`);
      } else {
        console.log(`Mã "${code}" không hợp lệ.`);
      }
    },

    printCart() {
      const line = "─".repeat(62);
      const top = "┌" + line + "┐";
      const mid = "├" + line + "┤";
      const bot = "└" + line + "┘";

      const pad = (str, len) => String(str).padEnd(len);
      const padL = (str, len) => String(str).padStart(len);

      console.log(top);
      console.log(`│ ${"#"} │ ${pad("Sản phẩm", 16)} │ ${padL("SL", 2)} │ ${padL("Đơn giá", 12)} │ ${padL("Tổng", 12)} │`);
      console.log(mid);

      items.forEach((item, index) => {
        const donGia = item.price.toLocaleString("vi-VN");
        const tong = (item.price * item.quantity).toLocaleString("vi-VN");
        console.log(`│ ${index + 1} │ ${pad(item.name, 16)} │ ${padL(item.quantity, 2)} │ ${padL(donGia, 12)} │ ${padL(tong, 12)} │`);
      });

      console.log(mid);

      const total = this.getTotal().toLocaleString("vi-VN");
      console.log(`│ ${"Tổng cộng:".padEnd(46)} ${padL(total + "đ", 12)} │`);
      console.log(bot);
    },

    getItemCount() {
      return items.reduce((sum, i) => sum + i.quantity, 0);
    },

    clearCart() {
      items = [];
      discount = { type: null, value: 0 };
    },
  };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());
