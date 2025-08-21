document.addEventListener('DOMContentLoaded', () => {
    let transactions = [
        { date: '2025-08-21', description: 'Paycheck', amount: 2000.00, type: 'income' },
        { date: '2025-08-21', description: 'Groceries', amount: 75.50, type: 'expense' },
        { date: '2025-08-20', description: 'Gasoline', amount: 40.00, type: 'expense' }
    ];

    const balanceAmountEl = document.getElementById('balance-amount');
    const transactionListEl = document.getElementById('transaction-list');
    const modal = document.getElementById('transaction-modal');
    const showModalBtn = document.getElementById('show-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const transactionForm = document.getElementById('transaction-form');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const render = () => {
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

                const isIncome = t.type === 'income';
                const icon = isIncome ? '▲' : '▼';
                const amountClass = t.type;
                const sign = isIncome ? '+' : '-';

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
    
    const handleAddTransaction = (e) => {
        e.preventDefault();

        const newTransaction = {
            date: document.getElementById('date').value,
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
        };

        transactions.push(newTransaction);

        render();
        modal.classList.add('hidden');
        transactionForm.reset();
    };

    showModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    transactionForm.addEventListener('submit', handleAddTransaction);

    render();
});
