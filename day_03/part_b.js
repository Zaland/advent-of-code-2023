const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input_sample.txt"),
  crlfDelay: Infinity,
});

// declare a 2d array where the data will be stored and an index to iterate through it
let values = [[]];
let hash = {};
let valuesIndex = 0;
let total = 0;

// store the data in the file into a 2d array
rl.on("line", (line) => {
  values[valuesIndex] = line.split("");
  valuesIndex++;
});

// try to find more numbers and mark them in the same group
const markRest = (lineIndex, letterIndex, tempNumber) => {
  tempNumber = [];
  tempNumber.push(values[lineIndex][letterIndex]);

  // try to iterate through values on the left
  let tempLetterIndex = letterIndex - 1;
  while (tempLetterIndex >= 0 && !isNaN(values[lineIndex][tempLetterIndex])) {
    tempNumber.unshift(values[lineIndex][tempLetterIndex]);
    tempLetterIndex--;
  }

  // try to iterate through values on the right
  tempLetterIndex = letterIndex + 1;
  while (tempLetterIndex <= values[lineIndex].length - 1 && !isNaN(values[lineIndex][tempLetterIndex])) {
    tempNumber.push(values[lineIndex][tempLetterIndex]);
    tempLetterIndex++;
  }

  hash[parseInt(tempNumber.join(""))] = 1;
};

// find the numbers around the symbol and mark them
const markNumbers = (indexLine, indexLetter) => {
  const gridLength = values.length - 1;
  const lineLength = values[indexLine].length - 1;
  let tempNumber = [];

  // middle left
  if (indexLetter > 0 && !isNaN(values[indexLine][indexLetter - 1])) {
    markRest(indexLine, indexLetter - 1, tempNumber);
  }

  // top left
  if (indexLine > 0 && indexLetter > 0 && !isNaN(values[indexLine - 1][indexLetter - 1])) {
    markRest(indexLine - 1, indexLetter - 1, tempNumber);
  }

  // top middle
  if (indexLine > 0 && !isNaN(values[indexLine - 1][indexLetter])) {
    markRest(indexLine - 1, indexLetter, tempNumber);
  }

  // top right
  if (indexLine > 0 && indexLetter < lineLength && !isNaN(values[indexLine - 1][indexLetter + 1])) {
    markRest(indexLine - 1, indexLetter + 1, tempNumber);
  }

  // middle right
  if (indexLetter < lineLength && !isNaN(values[indexLine][indexLetter + 1])) {
    markRest(indexLine, indexLetter + 1, tempNumber);
  }

  // bottom right
  if (indexLine < gridLength && indexLetter < lineLength && !isNaN(values[indexLine + 1][indexLetter + 1])) {
    markRest(indexLine + 1, indexLetter + 1, tempNumber);
  }

  // bottom middle
  if (indexLine < gridLength && !isNaN(values[indexLine + 1][indexLetter])) {
    markRest(indexLine + 1, indexLetter, tempNumber);
  }

  // bottom left
  if (indexLine < gridLength && indexLetter > 0 && !isNaN(values[indexLine + 1][indexLetter - 1])) {
    markRest(indexLine + 1, indexLetter - 1, tempNumber);
  }

  // calculate the value of multiplying the two values and add to the total
  if (Object.keys(hash).length === 2) {
    total += parseInt(Object.keys(hash)[0]) * parseInt(Object.keys(hash)[1]);
  }

  // reset the hash
  hash = {};
};

// after reading the file, do the calculations
rl.on("close", () => {
  // mark the values in another 2d array
  for (const [indexLine, line] of values.entries()) {
    for (const [indexLetter, letter] of line.entries()) {
      if (letter === "*") {
        markNumbers(indexLine, indexLetter);
      }
    }
  }

  console.log({ total });
});
