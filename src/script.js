import { generate } from "random-words";

let wordsToType = generate(50).join(" "); // Generate 50 random words
const displayText = document.querySelector(".display-text");
let userInput = ""; // Track the user's typed input

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

// Function to check the typed input and update the letter color
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

  if (userInput.length === wordsToType.length) {
    const finishContainer = document.querySelector(".finish-container");
    finishContainer.style.display = "flex";
    displayText.style.visibility = "hidden"; // Hide the letters
  }
}

// Event listener for keydown to handle user input and key highlighting
window.addEventListener("keydown", function (e) {
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

// Generate random words and display them
function generate_words() {
  wordsToType = generate(50); // Generate new words if needed
  displayWords(); // Update the display
  userInput = ""; // Reset user input
}

// Display the words initially
displayWords();
