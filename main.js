// API endpoint for currency exchange rates
const api = "https://api.exchangerate-api.com/v6/latest";

// Selecting DOM elements
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultInput = document.getElementById("result");
const convertBtn = document.querySelector("button[type='submit']");
const form = document.getElementById("converter-form");

// Select the clear button
const clearBtn = document.getElementById("clear-btn");

let fromRate;
let toRate;

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (fromCurrency.value && toCurrency.value && amountInput.value) {
    getExchangeRate();
  }
});

// Fetch exchange rates and update the DOM
function getExchangeRate() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const rates = data.rates;
      fromRate = rates[fromCurrency.value];
      toRate = rates[toCurrency.value];

      if (fromRate && toRate) {
        const fromAmount = parseFloat(amountInput.value);
        const exchangeRate = toRate / fromRate;
        const toAmount = (fromAmount * exchangeRate).toFixed(2);
        resultInput.value = toAmount;
      } else {
        resultInput.value = "Invalid currency";
      }
    })
    .catch((error) => {
      console.error("Error fetching exchange rates:", error);
      resultInput.value = "Error occurred";
    });
}

// Populate currency dropdowns
function populateCurrencyDropdowns() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.rates);
      currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.text = currency;
        fromCurrency.add(option.cloneNode(true));
        toCurrency.add(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching currencies:", error);
    });
}

// Function to toggle dark mode
function toggleDarkMode() {
  const htmlElement = document.documentElement;
  if (htmlElement.getAttribute("data-theme") === "dark") {
    htmlElement.removeAttribute("data-theme");
  } else {
    htmlElement.setAttribute("data-theme", "dark");
  }
}

// Event listener for clear button
clearBtn.addEventListener("click", () => {
  fromCurrency.value = "";
  toCurrency.value = "";
  amountInput.value = "";
  resultInput.value = "";
});

// Initialize the app
populateCurrencyDropdowns();
