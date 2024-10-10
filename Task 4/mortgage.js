// Mortgage calculation function
function calculateMortgage(loanAmount, annualInterestRate, loanTermYears) { // defines function called "calculateMortgage" with 3 parameters
    const monthlyRate = annualInterestRate / 100 / 12; // calculates the montly interest rate (transforms from percentage to decimal)
    const numberOfPayments = loanTermYears * 12; // calculates the total number of monthly payments over the loan term

    // If interest the rate is zero, then avoid dividing by zero in the formula
    let monthlyPayment;
    if (monthlyRate === 0) {
        monthlyPayment = loanAmount / numberOfPayments; // if its zero, it calculates the the monthly payment with simple division  
    } else {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / // If the interest rate is not zero, it calculates the
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);                                      // monthly payment using the standard mortgage formula 
    }

    const totalPayment = monthlyPayment * numberOfPayments; // This calculates the total amount paid over the loan period
    const totalInterest = totalPayment - loanAmount;        // This calulates the total interest paid by substracting the original 
                                                            // loan amount from the total payment
    return { // Returns the calculated value rounded to two decimal places 
        monthlyPayment: monthlyPayment.toFixed(2),       
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
    };
}

// These are just for examples for testing the function and can be changed to fit your need
const loanAmount = 200005;        // $200,000 loan
const annualInterestRate = 3.5;   // 3.5% annual interest rate
const loanTermYears = 30;         // 30-year loan term

try {    // This calls the "calculateMortgage" function with the examples values and stores the result
    const mortgageDetails = calculateMortgage(loanAmount, annualInterestRate, loanTermYears);
    
    // These lines print out the mortgage details. try-catch is used to handle any potential errors that might occur during the operation process      
    console.log("Here's a breakdown of your mortgage:"); // Prints a header message to the console to intoduce the mortgage breakdown
    console.log(`Loan Amount: $${loanAmount.toLocaleString()}`); // Prints the loan amount converting it to string
    console.log(`Interest Rate: ${annualInterestRate}%`);  //  Prints the anual interest with a '%' sing to clarify         
    console.log(`Loan Term: ${loanTermYears} years`);      // Prints the loan term in years
    console.log(`Your Monthly Payment: $${mortgageDetails.monthlyPayment}`); // Prints the calculated monthly payment
    console.log(`Total Payment (including interest): $${mortgageDetails.totalPayment}`); // Prints the total amoun that will paid over time, the loan plus the interest
    console.log(`Total Interest Paid: $${mortgageDetails.totalInterest}`); // Prints the total amount of interest that will be paid over time
} catch (error) { // this will catch any errors that may occur int the 'try' block
    console.error("An error occurred during mortgage calculation:", error.message); // Prints an error message if something went wrong in the try block
}

/* To run the function on the terminal console, Node.js can be used. Simply type "node mortgage.js"
   and the mortgage details will be displayed in the console.*/ 