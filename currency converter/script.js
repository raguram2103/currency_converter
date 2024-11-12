// API endpoint for currency exchange rates
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

let exchangeRates = {};
let currencies = [];

// Function to load currency data from the API
async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        exchangeRates = data.rates;
        currencies = Object.keys(exchangeRates);

        // Populate dropdowns with currencies
        populateCurrencySelect('from-currency');
        populateCurrencySelect('to-currency');
    } catch (error) {
        alert('Error loading exchange rates');
    }
}

// Function to populate currency dropdowns
function populateCurrencySelect(selectId) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ''; // Clear existing options
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.innerText = currency;
        selectElement.appendChild(option);
    });
}

// Function to convert the currency
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (fromCurrency === toCurrency) {
        alert('Please select different currencies');
        return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const convertedAmount = (amount / fromRate) * toRate;

    document.getElementById('result').innerText = convertedAmount.toFixed(2);
}

// Load the currencies when the page loads
window.onload = loadCurrencies;
