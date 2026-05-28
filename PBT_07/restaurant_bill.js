const order1 = [
  { ten: "Phở bò", gia: 65000, soLuong: 2 },
  { ten: "Trà đá", gia: 5000, soLuong: 3 },
  { ten: "Bún chả", gia: 55000, soLuong: 1 },
];
tinhHoaDon(order1, true);
function tinhHoaDon(danhSachMon, coTip = false) {
  const hom_nay = new Date().getDay();
  const LA_THU_3 = hom_nay === 3;

  let tong = 0;
  for (const mon of danhSachMon) {
    tong += mon.gia * mon.soLuong;
  }

  let phanTramGiam = 0;
  if (tong > 1000000) phanTramGiam = 15;
  else if (tong > 500000) phanTramGiam = 10;
  if (LA_THU_3) phanTramGiam += 5;

  const soTienGiam = Math.round((tong * phanTramGiam) / 100);
  const sauGiam = tong - soTienGiam;
  const vat = Math.round(sauGiam * 0.08);
  const tip = coTip ? Math.round(tong * 0.05) : 0;
  const thanhToan = sauGiam + vat + tip;

  const f = (n) => n.toLocaleString("vi-VN") + "đ";
  const pad = (str, len) => str + " ".repeat(Math.max(0, len - str.length));

  const LINE = "╠══════════════════════════════════════╣";
  console.log("╔══════════════════════════════════════╗");
  console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
  console.log(LINE);

  danhSachMon.forEach((mon, i) => {
    const thanh = mon.gia * mon.soLuong;
    const dong = `${i + 1}. ${pad(mon.ten, 12)} x${mon.soLuong}  @${(mon.gia / 1000).toFixed(0)}k  = ${(thanh / 1000).toFixed(0)}k`;
    console.log(`║ ${pad(dong, 36)} ║`);
  });

  console.log(LINE);
  console.log(`║ ${pad("Tổng cộng:", 20)} ${pad(f(tong), 16)} ║`);
  console.log(`║ ${pad(`Giảm giá (${phanTramGiam}%):`, 20)} ${pad("-" + f(soTienGiam), 16)} ║`);
  console.log(`║ ${pad("VAT (8%):", 20)} ${pad(f(vat), 16)} ║`);
  console.log(`║ ${pad("Tip (5%):", 20)} ${pad(coTip ? f(tip) : "Không", 16)} ║`);
  if (LA_THU_3) console.log(`║ ${pad("* Khuyến mãi thứ 4!", 36)} ║`);
  console.log(LINE);
  console.log(`║ ${pad("THANH TOÁN:", 20)} ${pad(f(thanhToan), 16)} ║`);
  console.log("╚══════════════════════════════════════╝");
}
