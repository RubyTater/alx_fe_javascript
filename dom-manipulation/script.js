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

    const newQuote = { text: quoteText, category: quoteCategory };
  
    quotes.push(newQuote);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    postQuoteToServer(newQuote);
  
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
    document.getElementById("addQuoteBtn").addEventListener("click", createAddQuoteForm);
  });

  function saveQuotes() {
    localStorage.setItem("selectedCategory", categoryFilter.value);
    showRandomQuote();
  }

  // import quotes from JSON file
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

  // Export quotes to JSON
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}


function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Get unique categories from quotes
  const categories = [...new Set(quotes.map(q => q.category))];

  // Reset dropdown
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category if it exists
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory && categories.includes(savedCategory)) {
    categoryFilter.value = savedCategory;
  }
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected); // Save selected category
  showRandomQuote(); // Display filtered quote
}

const serverUrl = 'https://jsonplaceholder.typicode.com/posts/1';
fetchQuotesFromServer();
setInterval(fetchQuotesFromServer, 60000);

async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });

    const result = await response.json();
    console.log("Posted to server:", result);
  } catch (error) {
    console.error("Failed to post quote:", error);
  }
}

async function fetchQuotesFromServer() { 
  try {
    const res = await fetch(serverUrl);
    const serverData = await res.json(); // assume serverData.quotes is an array

    syncQuotes(serverData.quotes);
  } catch {
    console.warn('Server fetch failed');
  }
 }
function syncQuotes(serverQuotes) { 
  let changed = false;

  serverQuotes.forEach(sq => {
    const idx = quotes.findIndex(lq => lq.text === sq.text);
    if (idx === -1) {
      quotes.push(sq);
      changed = true;
    } else if (JSON.stringify(quotes[idx]) !== JSON.stringify(sq)) {
      quotes[idx] = sq; // server wins
      changed = true;
    }
  });

  if (changed) {
    saveQuotes();
    populateCategories();
    showRandomQuote();
    displayNotification("Quotes updated from server");
  }
 }
function displayNotification(msg) { 
  const container = document.getElementById("notifications");
  container.textContent = msg;
  setTimeout(() => { container.textContent = ""; }, 5000);
 }