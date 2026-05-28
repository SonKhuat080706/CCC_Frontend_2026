const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1. Tính điểm TB và xếp loại cho mỗi SV
for (const s of students) {
  s.avg = Math.round((s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3) * 10) / 10;

  if (s.avg >= 8.0) s.rank = "Giỏi";
  else if (s.avg >= 6.5) s.rank = "Khá";
  else if (s.avg >= 5.0) s.rank = "Trung bình";
  else s.rank = "Yếu";
}

// 2. In bảng kết quả
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < students.length; i++) {
  const s = students[i];
  const stt = String(i + 1).padEnd(3);
  const name = s.name.padEnd(6);
  const avg = String(s.avg.toFixed(1)).padEnd(4);
  const rank = s.rank.padEnd(11);
  console.log(`| ${stt} | ${name} | ${avg} | ${rank} |`);
}

// 3. Đếm số SV mỗi xếp loại
const count = { Giỏi: 0, Khá: 0, "Trung bình": 0, Yếu: 0 };
for (const s of students) count[s.rank]++;
console.log("\nSố SV mỗi xếp loại:");
for (const rank in count) {
  console.log(`  ${rank}: ${count[rank]} SV`);
}

// 4. SV điểm cao nhất và thấp nhất
let best = students[0];
let worst = students[0];
for (const s of students) {
  if (s.avg > best.avg) best = s;
  if (s.avg < worst.avg) worst = s;
}
console.log(`\nCao nhất:  ${best.name} — ${best.avg.toFixed(1)}`);
console.log(`Thấp nhất: ${worst.name} — ${worst.avg.toFixed(1)}`);

// 5. Điểm TB toàn lớp từng môn
let totalMath = 0,
  totalPhysics = 0,
  totalCs = 0;
for (const s of students) {
  totalMath += s.math;
  totalPhysics += s.physics;
  totalCs += s.cs;
}
const n = students.length;
console.log("\nĐiểm TB toàn lớp:");
console.log(`  Toán:    ${(totalMath / n).toFixed(1)}`);
console.log(`  Lý:      ${(totalPhysics / n).toFixed(1)}`);
console.log(`  CNTT:    ${(totalCs / n).toFixed(1)}`);

// 6. Bonus: Điểm TB theo giới tính
let sumM = 0,
  countM = 0,
  sumF = 0,
  countF = 0;
for (const s of students) {
  if (s.gender === "M") {
    sumM += s.avg;
    countM++;
  } else {
    sumF += s.avg;
    countF++;
  }
}
console.log("\nĐiểm TB theo giới tính:");
console.log(`  Nam: ${(sumM / countM).toFixed(1)}`);
console.log(`  Nữ:  ${(sumF / countF).toFixed(1)}`);
