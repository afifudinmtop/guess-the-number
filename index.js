const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function start() {
  console.log("Welcome to the super optimized number-guessing AI game!");
  console.log("Think of a number between 1 and 100, and I'll try to guess it.");

  let min = 1;
  let max = 100;
  let guessCount = 0;

  while (min !== max) {
    guessCount++;
    const guess = Math.floor((min + max) / 2);

    console.log(`My guess #${guessCount}: Is your number ${guess}?`);

    const answer = await askQuestion(`(yes/higher/lower): `);

    if (answer === "yes") {
      console.log(`Hooray! I guessed it in ${guessCount} tries!`);
      break;
    } else if (answer === "higher") {
      min = guess + 1;
    } else if (answer === "lower") {
      max = guess - 1;
    } else {
      console.log("Invalid answer. Please enter yes, higher, or lower.");
    }
  }

  console.log(`The number was ${min}.`);

  const playAgain = await askQuestion(
    "Would you like to play again? (yes/no): "
  );

  if (playAgain === "yes") {
    start();
  } else {
    console.log("Thanks for playing! Goodbye!");
    rl.close();
  }
}

start();
