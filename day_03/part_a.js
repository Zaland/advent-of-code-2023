const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input_sample.txt"),
  crlfDelay: Infinity,
});

// declare a 2d array where the data will be stored and an index to iterate through it
let values = [[]];
let markedValues = [[]];
let valuesIndex = 0;
let total = 0;

// store the data in the file into a 2d array
rl.on("line", (line) => {
  values[valuesIndex] = line.split("");
  valuesIndex++;
});

// try to find more numbers and mark them in the same group
const markRest = (lineIndex, letterIndex) => {
  // try to iterate through values on the left
  let tempLetterIndex = letterIndex - 1;
  while (tempLetterIndex >= 0 && !isNaN(values[lineIndex][tempLetterIndex])) {
    markedValues[lineIndex][tempLetterIndex] = 1;
    tempLetterIndex--;
  }

  // try to iterate through values on the right
  tempLetterIndex = letterIndex + 1;
  while (tempLetterIndex <= values[lineIndex].length - 1 && !isNaN(values[lineIndex][tempLetterIndex])) {
    markedValues[lineIndex][tempLetterIndex] = 1;
    tempLetterIndex++;
  }
};

// find the numbers around the symbol and mark them
const markNumbers = (indexLine, indexLetter) => {
  const gridLength = values.length - 1;
  const lineLength = values[indexLine].length - 1;

  // middle left
  if (indexLetter > 0 && !isNaN(values[indexLine][indexLetter - 1])) {
    markedValues[indexLine][indexLetter - 1] = 1;
    markRest(indexLine, indexLetter - 1);
  }

  // top left
  if (indexLine > 0 && indexLetter > 0 && !isNaN(values[indexLine - 1][indexLetter - 1])) {
    markedValues[indexLine - 1][indexLetter - 1] = 1;
    markRest(indexLine - 1, indexLetter - 1);
  }

  // top middle
  if (indexLine > 0 && !isNaN(values[indexLine - 1][indexLetter])) {
    markedValues[indexLine - 1][indexLetter] = 1;
    markRest(indexLine - 1, indexLetter);
  }

  // top right
  if (indexLine > 0 && indexLetter <= lineLength && !isNaN(values[indexLine - 1][indexLetter + 1])) {
    markedValues[indexLine - 1][indexLetter + 1] = 1;
    markRest(indexLine - 1, indexLetter + 1);
  }

  // middle right
  if (indexLetter <= lineLength && !isNaN(values[indexLine][indexLetter + 1])) {
    markedValues[indexLine][indexLetter + 1] = 1;
    markRest(indexLine, indexLetter + 1);
  }

  // bottom right
  if (indexLine <= gridLength && indexLetter <= lineLength && !isNaN(values[indexLine + 1][indexLetter + 1])) {
    markedValues[indexLine + 1][indexLetter + 1] = 1;
    markRest(indexLine + 1, indexLetter + 1);
  }

  // bottom middle
  if (indexLine <= gridLength && !isNaN(values[indexLine + 1][indexLetter])) {
    markedValues[indexLine + 1][indexLetter] = 1;
    markRest(indexLine + 1, indexLetter);
  }

  // bottom left
  if (indexLine <= gridLength && indexLetter > 0 && !isNaN(values[indexLine + 1][indexLetter - 1])) {
    markedValues[indexLine + 1][indexLetter - 1] = 1;
    markRest(indexLine + 1, indexLetter - 1);
  }
};

// after reading the file, do the calculations
rl.on("close", () => {
  // set the values in the new 2d array to be 0 by default
  for (let i = 0; i <= values.length - 1; i++) {
    markedValues[i] = [];
    for (let j = 0; j <= values[i].length - 1; j++) {
      markedValues[i][j] = 0;
    }
  }

  // mark the values in another 2d array
  for (const [indexLine, line] of values.entries()) {
    for (const [indexLetter, letter] of line.entries()) {
      if (isNaN(letter) && letter !== ".") {
        markNumbers(indexLine, indexLetter);
      }
    }
  }

  // calculate the total using the marked values
  for (const [indexLine, line] of markedValues.entries()) {
    let numbers = [];

    for (const [indexLetter, letter] of line.entries()) {
      if (letter === 1) {
        numbers.push(parseInt(values[indexLine][indexLetter]));
      } else if (numbers.length) {
        total += parseInt(numbers.join(""));
        numbers = [];
      }

      if (numbers.length && indexLetter === values[indexLine].length - 1) {
        total += parseInt(numbers.join(""));
        numbers = [];
      }
    }
  }

  console.log({ total });
});
