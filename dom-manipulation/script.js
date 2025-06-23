// Initial quotes array
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Motivation" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> ${quote.text}</p>
      <p><em>Category:</em> ${quote.category}</p>
    `;
  }
  
  // Function to add a new quote
  function createAddQuoteForm() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  
    alert("New quote added!");
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
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  });
  
  // upload a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }