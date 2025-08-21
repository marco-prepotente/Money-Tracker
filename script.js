// In script.js, update the render function's row.innerHTML

// ... (rest of the JS is the same)

// Function to render all transactions and update the balance
const render = () => {
    // ... (balance calculation is the same)
    
    // Clear existing list and calculate balance (same as before)
    transactionListEl.innerHTML = '';
    const balance = transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
    balanceAmountEl.textContent = formatCurrency(balance);

    if (transactions.length === 0) {
        transactionListEl.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 2rem;">No transactions yet.</td></tr>';
        return;
    }

    transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(t => {
            const row = document.createElement('tr');
            row.className = 'transaction-row';

            // NEW: Define icon and text based on type
            const isIncome = t.type === 'income';
            const icon = isIncome ? '▲' : '▼';
            const amountClass = t.type;
            const sign = isIncome ? '+' : '-';

            // UPDATED innerHTML to include the icon
            row.innerHTML = `
                <td>${t.date}</td>
                <td class="description">
                    <span class="icon" style="color: ${isIncome ? 'var(--income-color)' : 'var(--expense-color)'}">${icon}</span>
                    ${t.description}
                </td>
                <td class="amount ${amountClass} text-right">${sign} ${formatCurrency(t.amount)}</td>
            `;
            transactionListEl.appendChild(row);
        });
};

// ... (rest of the JS is the same)