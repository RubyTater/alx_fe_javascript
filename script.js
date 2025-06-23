// === Global Quotes Array ===
let quotes = [
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
];

// === Function: Show a Random Quote ===
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = quotes[randomIndex].text;
}

// === Function: Add a New Quote ===
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") return;

  // Add to array
  quotes.push({ text: newText, category: newCategory });

  // Optional: Show it immediately
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = newText;

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// === Attach Event Listeners on Load ===
document.addEventListener("DOMContentLoaded", () => {
  // Button to show a random quote
  const showBtn = document.getElementById("newQuote");
  showBtn.addEventListener("click", showRandomQuote);
});

