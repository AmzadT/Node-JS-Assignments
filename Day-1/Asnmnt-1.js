// Import the crypto module
const crypto = require("crypto");

// Get the commands using process.argv
const args = process.argv.slice(2);
const operation = args[0];
const numbers = args.slice(1).map(Number);

// Helper function to validate if arguments are numbers
const areNumbers = (args) => args.every(Number.isFinite);

// Complete the function
switch (operation) {
  case "add":
    areNumbers(numbers) && numbers.length >= 2
      ? console.log(`Result: ${numbers.reduce((acc, num) => acc + num, 0)}`)
      : console.log("Please provide at least two numbers for addition.");
    break;

  case "sub":
    areNumbers(numbers) && numbers.length >= 2
      ? console.log(`Result: ${numbers.reduce((acc, num) => acc - num)}`)
      : console.log("Please provide at least two numbers for subtraction.");
    break;

  case "mult":
    areNumbers(numbers) && numbers.length >= 2
      ? console.log(`Result: ${numbers.reduce((acc, num) => acc * num, 1)}`)
      : console.log("Please provide at least two numbers for multiplication.");
    break;

  case "divide":
    areNumbers(numbers) && numbers.length >= 2
      ? console.log(`Result: ${numbers.reduce((acc, num) => acc / num)}`)
      : console.log("Please provide at least two numbers for division.");
    break;

  case "sin":
    numbers.length === 1 && Number.isFinite(numbers[0])
      ? console.log(`Result: ${Math.sin(numbers[0])}`)
      : console.log("Please provide one number for sine calculation.");
    break;

  case "cos":
    numbers.length === 1 && Number.isFinite(numbers[0])
      ? console.log(`Result: ${Math.cos(numbers[0])}`)
      : console.log("Please provide one number for cosine calculation.");
    break;

  case "tan":
    numbers.length === 1 && Number.isFinite(numbers[0])
      ? console.log(`Result: ${Math.tan(numbers[0])}`)
      : console.log("Please provide one number for tangent calculation.");
    break;

  case "random":
    numbers.length === 1 && Number.isInteger(numbers[0]) && numbers[0] > 0
      ? console.log(`Random Number: ${crypto.randomBytes(numbers[0]).toString("hex")}`)
      : console.log("Provide length for random number generation.");
    break;

  default:
    console.log("Invalid operation");
}

// Usage instructions
args.length === 0 && console.log(`Usage: node index.js <operation> <numbers>
Supported operations:
  add       - Addition of numbers
  sub       - Subtraction of numbers
  mult      - Multiplication of numbers
  divide    - Division of numbers
  sin       - Sine of a number
  cos       - Cosine of a number
  tan       - Tangent of a number
  random    - Generate a random number of specified length
`);
