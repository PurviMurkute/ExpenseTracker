const htmlBody =(name) => {
  return `
      <div>
      <p>
        Thank you for registering at <strong>ExpenseDiary</strong> ${name}!
      </p>
      <p>Click below to access your dashboard:</p>
      <a
        href="https://expensetracker-client-bixd.onrender.com"
        style="color: #4f46e5;"
      >
        Go to Dashboard
      </a>
    </div>
  `;
};

export default htmlBody;