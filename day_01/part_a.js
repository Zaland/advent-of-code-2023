const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input_a.txt"),
  crlfDelay: Infinity,
});

let total = 0;

rl.on("line", (line) => {
  const num = [];

  // add all numbers to the list
  for (const letter of line) {
    if (!isNaN(letter)) {
      num.push(letter);
    }
  }

  // take the first and last number to calculate the total
  total += parseInt(`${num[0]}${num[num.length - 1]}`);
});

rl.on("close", () => {
  console.log({ total });
});
