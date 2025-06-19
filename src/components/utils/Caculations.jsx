export const calculateLoanPayment = (principal, monthlyRate, numberOfPayments) => {
    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }

    const payment = principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return payment;
};