const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input_b.txt"),
  crlfDelay: Infinity,
});

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let total = 0;

rl.on("line", (line) => {
  const num = [];

  // get the first number or word
  const [firstNumber] = line.match(
    /([0-9])|(one|two|three|four|five|six|seven|eight|nine)/
  );

  // convert the word to a number or parse to an int if already a number
  num.push(isNaN(firstNumber) ? numbers[firstNumber] : parseInt(firstNumber));

  // reverse the array so we could get the first number backwards
  const reversedLine = line.split("").reverse().join("");
  const [secondNumber] = reversedLine.match(
    /([0-9])|(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/
  );

  // reverse the word back to normal and convert to a number otherwise parse to an int
  num.push(
    isNaN(secondNumber)
      ? numbers[secondNumber.split("").reverse().join("")]
      : parseInt(secondNumber)
  );

  // calculate the total
  total += parseInt(`${num[0]}${num[1]}`);
});

rl.on("close", () => {
  console.log({ total });
});
