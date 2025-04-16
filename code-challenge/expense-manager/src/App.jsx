import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: '1',
      name: 'Ugali',
      description: "Wednesday's Lunch",
      amount: 450,
      date: '2023-06-15',
    },
    {
      id: '2',
      name: 'KPLC Tokens',
      description: 'Power tokens',
      amount: 1000,
      date: '2023-06-14',
    },
    {
      id: '3',
      name: 'Buy Shoes',
      description: 'Add to my shoe collection',
      amount: 3500,
      date: '2023-06-13',
    },
    {
      id: '4',
      name: 'Buy Book',
      description: 'Add to my book collection',
      amount: 1200,
      date: '2023-06-12',
    },
    {
      id: '5',
      name: 'Pay Rent',
      description: 'Absa Bank',
      amount: 5000,
      date: '2023-06-10',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    date: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    const newExpense = {
      id: crypto.randomUUID(),
      name: formData.name,
      description: formData.description || 'No description',
      amount: parseFloat(formData.amount) || 0,
      date: formData.date || new Date().toISOString().split('T')[0],
    };

    setExpenses([...expenses, newExpense]);
    setFormData({ name: '', description: '', amount: '', date: '' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete expense "${name}"?`)) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    const sorted = [...expenses].sort((a, b) => {
      if (field === 'amount') return a[field] - b[field];
      return a[field].localeCompare(b[field]);
    });
    setExpenses(sorted);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expense.name.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower)
    );
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="app-container">
      <header>
        <h1>Expense Tracker</h1>
        <p className="subtitle">
          Manage your finances: track, categorize, and review your expenses.
        </p>
      </header>

      <div className="content-section">
        <div className="form-section">
          <h2>Add New Expense</h2>
          <p className="form-subtitle">Enter details to track your spending</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Expense Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Groceries"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="e.g., Weekly shopping"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="amount">Amount (Ksh)</label>
              <input
                id="amount"
                type="number"
                placeholder="e.g., 500"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <button type="submit">Add Expense</button>
          </form>
        </div>

        <div className="search-section">
          <label htmlFor="search">Search Expenses</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sort-section">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        <div className="expenses-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Amount (Ksh)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.name}</td>
                  <td>{expense.description}</td>
                  <td className="amount-cell">
                    {expense.amount.toLocaleString('en-KE', {
                      style: 'currency',
                      currency: 'KES',
                    })}
                  </td>
                  <td>{expense.date}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(expense.id, expense.name)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="total-label">
                  Total
                </td>
                <td className="total-amount">
                  {totalAmount.toLocaleString('en-KE', {
                    style: 'currency',
                    currency: 'KES',
                  })}
                </td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;