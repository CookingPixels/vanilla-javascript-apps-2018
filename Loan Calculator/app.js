// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

// Calculate results
function calculateResults(e) {
  console.log("Calculating...");
  // UI Vars input
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  // UI Vars output
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // It's the amount but only the value, and turn into a decimal
  const principal = parseFloat(amount.value);
  // Calculate percentage(100) of interest monthly(12)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  // Calculated payments
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = principal * x * calculatedInterest / (x - 1);

  // Check if is a finite number
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); // number of decimals
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    console.log("Please check your numbers");
    showError("Please check your numbers");
  }

  e.preventDefault();
}

function showError(error) {
  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Creat text and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}
function clearError() {
  document.querySelector(".alert").remove();
}
