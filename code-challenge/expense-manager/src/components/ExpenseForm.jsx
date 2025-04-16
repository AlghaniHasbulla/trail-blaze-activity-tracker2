import { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    const newExpense = {
      id: crypto.randomUUID(),
      name: formData.name,
      description: formData.description,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date || new Date().toISOString().split('T')[0],
    };

    onAddExpense(newExpense);
    setFormData({ name: '', description: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Expense Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter expense name"
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
          placeholder="Enter description"
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
          placeholder="Enter amount"
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
  );
}

export default ExpenseForm;