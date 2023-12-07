const fs = require("fs");
const readline = require("readline");

// define the total allowed
const RED = 12;
const GREEN = 13;
const BLUE = 14;

const rl = readline.createInterface({
  input: fs.createReadStream("input_a.txt"),
  crlfDelay: Infinity,
});

let total = 0;

rl.on("line", (line) => {
  // filter out the extra characters and split the line into words and numbers
  const words = line
    .replaceAll(",", "")
    .replaceAll(";", "")
    .replaceAll(":", "")
    .split(" ");

  // check to make sure that all the numbers are equal to or below the total allowed
  let success = true;
  for (let i = 2; i < words.length; i += 2) {
    if (
      (words[i + 1] === "red" && words[i] > RED) ||
      (words[i + 1] === "green" && words[i] > GREEN) ||
      (words[i + 1] === "blue" && words[i] > BLUE)
    ) {
      success = false;
      break;
    }
  }

  // if no issues earlier, then add to the total
  if (success) {
    total += parseInt(words[1]);
  }
});

rl.on("close", () => {
  console.log({ total });
});
