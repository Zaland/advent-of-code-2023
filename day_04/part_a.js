const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input_sample.txt"),
  crlfDelay: Infinity,
});

let total = 0;

rl.on("line", (line) => {
  // get the data and divide into two separate into two arrays
  const numbers = line.split(":")[1].split("|");
  const hashMap = {};
  let cardTotal = 0;

  // set the hashMap of winning numbers
  for (const num of numbers[1].trim().split(" ")) {
    if (num !== "") {
      hashMap[num] = 1;
    }
  }

  // run through the chosen numbers and check if they are in the hashMap (winning numbers)
  for (const num of numbers[0].trim().split(" ")) {
    if (hashMap[num]) {
      if (cardTotal === 0) {
        cardTotal += 1;
      } else {
        cardTotal *= 2;
      }
    }
  }

  // add the card total to the overal total
  total += cardTotal;
});

rl.on("close", () => {
  console.log({ total });
});
