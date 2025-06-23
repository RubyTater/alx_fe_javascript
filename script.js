// Quotes array
let quotes = [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// Show a random quote
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = filteredQuotes[randomIndex].text;
}

// Add a new quote
function createAddQuoteForm() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });

    // Update the DOM and storage
    populateCategories();
    filterQuotes(); // To reflect immediately if it's the current category
    textInput.value = "";
    categoryInput.value = "";
  }
}

// Populate category dropdown
function createElement() {
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Re-select the last selected category
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory && categories.includes(savedCategory)) {
    categoryFilter.value = savedCategory;
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  localStorage.setItem("selectedCategory", categoryFilter.value);
  showRandomQuote();
}

// Event listeners
newQuoteButton.addEventListener("click", showRandomQuote);
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedCategory;
  filterQuotes();
});


