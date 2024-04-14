// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

// Function to find out if the card is valid or not (Long version)
const validateCred = (array) => {
  const arrayCopy = array.slice();
  let lastDigit = arrayCopy.pop();
  let arrayLessLastDigit = arrayCopy.reverse();
  let oddDigit_x2Array = [];
  let oddDigitMoreThan_9Array = [];

  // a loop to go through odd card digits
  for (let i = 0; i < arrayLessLastDigit.length; i += 2) {
    let num_x2 = arrayCopy[i] * 2;
    if (num_x2 > 9) {
      oddDigitMoreThan_9Array.push(num_x2 - 9);
    } else {
      oddDigit_x2Array.push(num_x2);
    }
  }

  // a loop to go through even card digits
  let evenNumArray = [];

  for (let j = 1; j < arrayLessLastDigit.length; j += 2) {
    evenNumArray.push(arrayCopy[j]);
  }

  // adding up the odd and even digits
  const arraySum =
    oddDigit_x2Array.reduce((a, b) => a + b) +
    oddDigitMoreThan_9Array.reduce((a, b) => a + b) +
    evenNumArray.reduce((a, b) => a + b);

  // modulo check
  const arrayModuloCheck = (arraySum + lastDigit) % 10;

  let validationResult;

  if (arrayModuloCheck === 0) {
    validationResult = true;
  } else {
    validationResult = false;
  }

  return validationResult;
};

// Function to find out if the card is valid or not (Short version)
const validateCred = (array) => {
  let sum = 0;
  let isSecondDigit = false;

  for (let i = array.length - 1; i >= 0; i--) {
    let digit = array[i];

    if (isSecondDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  return sum % 10 === 0;
};

// Invalid card finder from a variable 'batch'
let invalidCardArray = [];

const findInvalidCards = (array) => {
  array.forEach((element) => {
    if (!validateCred(element)) {
      invalidCardArray.push(element);
    }
  });

  return invalidCardArray;
};

// Invalid card companies array function
let badCardCompanies = [];

const idInvalidCardCompanies = (array) => {

  for (let i = 0; i < array.length; i++) {
    let firstIndex = array[i][0];

    if (firstIndex === 3 && !badCardCompanies.includes("Amex")) {
      badCardCompanies.push("Amex");
    }
    if (firstIndex === 4 && !badCardCompanies.includes("Visa")) {
      badCardCompanies.push("Visa");
    }
    if (firstIndex === 5 && !badCardCompanies.includes("Mastercard")) {
      badCardCompanies.push("Mastercard");
    }
    if (firstIndex === 6 && !badCardCompanies.includes("Discover")) {
      badCardCompanies.push("Discover");
    } else {
      console.log("Company was not found");
    }
  }

  return badCardCompanies;
};

findInvalidCards(batch);
console.log(idInvalidCardCompanies(invalidCardArray));