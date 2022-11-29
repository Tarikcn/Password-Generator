// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Store password length the user can choose
var password_length = 0;

// Store boolean values of the character options the user chooses
var lowercase = {
  name: "lowercase",
  array: lowerCasedCharacters,
  bool: false,
};

var uppercase = {
  name: "uppercase",
  array: upperCasedCharacters,
  bool: false,
};

var numeric = {
  name: "numeric",
  array: numericCharacters,
  bool: false,
};

var special = {
  name: "special",
  array: specialCharacters,
  bool: false,
};

var characterOptions = [lowercase, uppercase, numeric, special];

// Prompt user for password options
function getPasswordOptions() {
  // Reset the character options to their default value
  for (var i = 0; i < characterOptions.length; i++) {
    characterOptions[i].bool = false;
  }
  // Use counter to display alert when user enters incorrect values
  var counter = 0;
  // Get password length.
  // Ensure user enters a number between 10 and 64
  do {
    if (counter > 0) {
      // Add this so that user isnt forced to enter a number if they select cancel for the first prompt
      if (password_length == null) {
        return;
      }
      alert(
        "You must enter a number that is at least 10 and not greater than 64!"
      );
    }
    password_length = prompt(
      "How long do you want your password to be? \n Must be between 10 - 64 characters!"
    );
    counter++;
  } while (!(password_length >= 10 && password_length <= 64));

  counter = 0;
  // Make sure user chooses at least 1 character option for their password
  do {
    if (counter > 0) {
      alert("You must pick at least one of the options!");
    }
    alert(
      "Which characters would you like to include in your password? Pick at least one of the following options. \n(Select OK to include and Cancel to exclude)"
    );
    for (var i = 0; i < characterOptions.length; i++) {
      characterOptions[i].bool = confirm(
        `Would you like to include ${characterOptions[i].name} characters in your password?`
      );
    }
    counter++;
  } while (!(lowercase.bool || uppercase.bool || numeric.bool || special.bool));
  counter = 0;
}
// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// Function to shuffle a string
function shuffleString(str) {
  // Use split to turn the string into an array so you can make use of
  // the sort() array method. Then use join() array method to turn the
  // array back into a string.
  // Math.random() -0.5 returns a random positive or negative value for
  // the sort method to decide whether to switch around elements of the
  // array.
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
// Function to generate password with user input
function generatePassword() {
  getPasswordOptions();
  var password_options = [];
  var password = "";
  // If the user wants to include the character option then add the relevant character array to the password options array
  for (var i = 0; i < characterOptions.length; i++) {
    if (characterOptions[i].bool) {
      // Make sure at least 1 of the options is included in the password
      password += getRandom(characterOptions[i].array);
      password_options = password_options.concat(characterOptions[i].array);
    }
  }

  // Randomise the rest of the characters
  while (password.length < password_length) {
    password += getRandom(password_options);
  }

  // Shuffle the password for extra randomness
  password = shuffleString(password);

  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
