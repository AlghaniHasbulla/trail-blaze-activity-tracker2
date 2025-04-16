function ExpenseTable({ expenses, onDelete, totalAmount }) {
    return (
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
          {expenses.map((expense) => (
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
                  onClick={() => onDelete(expense.id, expense.name)}
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
    );
  }
  
  export default ExpenseTable;