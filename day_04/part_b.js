const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input_sample.txt"),
  crlfDelay: Infinity,
});

let total = 0;
let index = 1;
const cardsHash = { 1: 1 };
const totalHash = {};

rl.on("line", (line) => {
  // get the data and divide into two separate into two arrays
  const numbers = line.split(":")[1].split("|");
  const hashMap = {};
  const numbersIndex = [];
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
      cardTotal++;
      numbersIndex.push(index + cardTotal);
      if (!cardsHash[index + cardTotal]) {
        cardsHash[index + cardTotal] = 2;
      } else {
        cardsHash[index + cardTotal] += 1;
      }
    }
  }

  // update the values
  totalHash[index] = cardTotal;
  cardsHash[index]--;
  total++;

  // iterate through the duplicate cards and update the total numbers
  while (cardsHash[index] > 0) {
    for (let i = 0; i < numbersIndex.length; i++) {
      cardsHash[numbersIndex[i]]++;
    }
    total++;
    cardsHash[index]--;
  }

  // move to the next card
  index++;
});

rl.on("close", () => {
  console.log({ total });
});
