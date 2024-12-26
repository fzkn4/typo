import { generate } from "random-words";

let wordsToType = generate(50).join(" "); // Generate 50 random words
const displayText = document.querySelector(".display-text");
let userInput = ""; // Track the user's typed input
let startTime = null; // Variable to track the start time
let timerInterval = null; // Interval for updating the timer

// Function to display the words with individual span for each letter
function displayWords() {
  const words = wordsToType;
  displayText.innerHTML = ""; // Clear existing text

  // Create a span for each letter of the words
  words.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("letter"); // Add a class for each letter
    displayText.appendChild(span);
  });
}

// Function to update and display the timer
function updateTimer() {
  const timerElement = document.querySelector(".timer");
  if (!timerElement) return;

  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Elapsed time in seconds
  timerElement.textContent = `Time: ${elapsedTime}s`;
}

let isFinished = false; // Flag to indicate whether the typing is finished

function checkTyping() {
  const letters = displayText.querySelectorAll(".letter");

  letters.forEach((span, i) => {
    if (i < userInput.length) {
      if (userInput[i] === span.textContent) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      } else {
        span.classList.add("incorrect");
        span.classList.remove("correct");
      }
    } else {
      span.classList.remove("correct", "incorrect");
    }
  });

  if (userInput.length === wordsToType.length && !isFinished) {
    // Stop the timer
    clearInterval(timerInterval);
    isFinished = true; // Set the finished flag to true

    const finishContainer = document.querySelector(".finish-container");
    finishContainer.style.display = "flex";
    displayText.style.visibility = "hidden"; // Hide the letters

    // Display the final time
    const finalTime = Math.floor((Date.now() - startTime) / 1000);
    const duration = document.querySelector(".duration");
    const time = document.querySelector(".identifier");
    const wpm = document.querySelector(".finish-display");
    const wpm_display = document.querySelector(".wpm-sign");

    if (finalTime < 60) {
      duration.textContent = `${finalTime} seconds`;
    } else {
      const minutes = Math.floor(finalTime / 60);
      const seconds = finalTime % 60;
      duration.textContent = `${minutes} mins ${seconds} secs`;
    }

    const wordsTyped = userInput.split(" ").length;
    wpm.textContent = (wordsTyped / (finalTime / 60)).toFixed(2) + " wpm";
    wpm_display.textContent = "wpm";

    console.log(duration);
    console.log(finalTime);
    console.log((wordsTyped / (finalTime / 60)).toFixed(2));

    // Disabling keyboard on finish.
    document.onkeydown = function (e) {
      return false;
    };
  }
}

// Event listener for keydown to handle user input and key highlighting
window.addEventListener("keydown", function (e) {
  // Start the timer on the first input
  if (startTime === null) {
    startTime = Date.now(); // Record the start time
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
  }

  // Append typed key to user input
  if (e.key.length === 1) {
    userInput += e.key;
  } else if (e.key === "Backspace") {
    userInput = userInput.slice(0, -1); // Remove the last character for backspace
  }

  checkTyping(); // Check the typed input

  // Find the key-container element with the matching data-key
  const keyContainer = document.querySelector(
    `.key-container[data-key="${e.key.toUpperCase()}"]`
  );
  if (keyContainer) {
    keyContainer.classList.add("pressed");
  }
});

// Event listener for keyup to remove key highlighting
window.addEventListener("keyup", function (e) {
  const keyContainer = document.querySelector(
    `.key-container[data-key="${e.key.toUpperCase()}"]`
  );
  if (keyContainer) {
    keyContainer.classList.remove("pressed");
  }
});

function try_again() {
  location.reload();
}

const button = document.querySelector(".reset");
if (button) {
  button.addEventListener("click", try_again);
}

// Generate random words and display them
function generate_words() {
  wordsToType = generate(50);
  displayWords(); // Update the display
  userInput = ""; // Reset user input
  startTime = null; // Reset the timer
  clearInterval(timerInterval); // Stop any ongoing timer
}

// Display the words initially
displayWords();
