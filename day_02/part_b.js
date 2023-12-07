const fs = require("fs");
const readline = require("readline");

// define the total allowed
const RED = 12;
const GREEN = 13;
const BLUE = 14;

const rl = readline.createInterface({
  input: fs.createReadStream("input_b.txt"),
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

  let minRed = 0;
  let minGreen = 0;
  let minBlue = 0;

  // check the minimum numbers of each color
  for (let i = 2; i < words.length; i += 2) {
    if (words[i + 1] === "red" && words[i] > minRed) {
      minRed = parseInt(words[i]);
    } else if (words[i + 1] === "green" && words[i] > minGreen) {
      minGreen = parseInt(words[i]);
    } else if (words[i + 1] === "blue" && words[i] > minBlue) {
      minBlue = parseInt(words[i]);
    }
  }

  // calculate the total of the three minimum numbers multiplied with each other
  total += minRed * minGreen * minBlue;
});

rl.on("close", () => {
  console.log({ total });
});
