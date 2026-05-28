function startGame() {
  const secret = Math.floor(Math.random() * 100) + 1;
  const maxTurns = 7;
  let turns = 0;
  const guessed = [];

  while (turns < maxTurns) {
    const remaining = maxTurns - turns;
    const input = prompt(`Đoán số từ 1-100 (còn ${remaining} lượt):`);

    if (input === null) {
      alert("Bạn đã thoát game. Đáp án là: " + secret);
      break;
    }

    const num = Number(input);

    if (!Number.isInteger(num) || num < 1 || num > 100) {
      alert("Vui lòng nhập số nguyên từ 1 đến 100!");
      continue;
    }

    if (guessed.includes(num)) {
      alert(`Bạn đã đoán số ${num} rồi! Hãy thử số khác.`);
      continue;
    }

    guessed.push(num);
    turns++;

    if (num === secret) {
      alert(`Đúng rồi! 🎉 Bạn đoán đúng sau ${turns} lần!`);
      break;
    }

    if (turns === maxTurns) {
      alert(`Hết lượt! 😢 Đáp án là: ${secret}`);
      break;
    }

    const hint = num < secret ? "Cao hơn ⬆️" : "Thấp hơn ⬇️";
    alert(`${hint} (đã đoán: ${guessed.join(", ")})`);
  }
}
