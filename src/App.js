import React, { useState, useEffect } from 'react';
import {
  getUsers, createUser, getCategories, createCategory, createExpense, createIncome, getPaymentMethods, createPaymentMethod,
  deleteCategory, deleteExpense, calculateCategoryTotals, calculateMonthlyTotal, calculateDailyAverage, findHighestExpense, calculateRemainingBudget,
  getExpenseSummary, getExpenses, getIncomes
} from './apiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './App.css';

// Register chart elements
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function App() {
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [paymentMethodDetails, setPaymentMethodDetails] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incomeDate, setIncomeDate] = useState(new Date());
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);
  const [highestExpense, setHighestExpense] = useState(null);
  const [budget, setBudget] = useState(1000);  // Example budget
  const [remainingBudget, setRemainingBudget] = useState(budget);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchCategories();
      await fetchPaymentMethods();
      await fetchExpenses();
      await fetchIncomes();
    };

    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const paymentMethodsData = await getPaymentMethods();
      setPaymentMethods(paymentMethodsData);
    } catch (error) {
      console.error('Error fetching payment methods', error);
    }
  };

  const fetchExpenses = async () => {
      try {
        const expensesData = await getExpenses();
        console.log('Expenses:', expensesData);
        setExpenses(expensesData);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const incomesData = await getIncomes();
        setIncomes(incomesData);
      } catch (error) {
        console.error('Error fetching incomes', error);
      }
    };

 const handleAddExpense = async () => {
   const newExpense = {
     user_id: selectedUser,
     category_id: parseInt(category),
     amount: parseFloat(amount),
     date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
     description: description,
     payment_method_id: parseInt(paymentMethod)
   };

   try {
     await createExpense(newExpense);
     setExpenses([...expenses, newExpense]);
     // Reset fields if necessary
     setCategory('');
     setAmount('');
     setDescription('');
     setPaymentMethod('');
     setSelectedUser('');
   } catch (error) {
     console.error('Error adding expense', error);
   }
 };

  const handleAddIncome = async () => {
    const newIncome = {
      user_id: selectedUser,
      amount: parseFloat(incomeAmount),
      date: incomeDate.toISOString().split('T')[0],
      source: incomeDescription
    };
    try {
          console.log('Sending request to add income:', newIncome);
          await createIncome(newIncome);
          setIncomeDate(new Date());
          setIncomeAmount('');
          setIncomeDescription('');
          setSelectedUser('');
          await fetchUsers(); // Update user data to reflect budget change
        } catch (error) {
          console.error('Error adding income', error);
        }
    };


  const handleAddCategory = async () => {
    try {
      const newCat = { category_name: newCategory };
      await createCategory(newCat);
      await fetchCategories(); // Fetch updated categories
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  // Fetch payment methods on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchCategories();
      await fetchPaymentMethods();
    };

    fetchData();
  }, []);

const handleAddPaymentMethod = async () => {
  const newPM = { user_id: selectedUser, method_name: newPaymentMethod, details: paymentMethodDetails };
  try {
    await createPaymentMethod(newPM);
    await fetchPaymentMethods(); // Fetch updated payment methods
    setNewPaymentMethod('');
    setPaymentMethodDetails('');
    setSelectedUser('');
  } catch (error) {
    console.error('Error adding payment method', error);
  }
};

  const handleAddUser = async () => {
    const newUser = { name: userName, email, password };
    try {
      await createUser(newUser);
      await fetchUsers(); // Fetch updated users
      setUserName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const handleCalculateCategoryTotals = async () => {
    try {
      const totals = await calculateCategoryTotals(selectedUser);
      setCategoryTotals(totals);
    } catch (error) {
      console.error('Error calculating category totals', error);
    }
  };

  const handleCalculateMonthlyTotal = async () => {
    try {
      const total = await calculateMonthlyTotal(selectedUser);
      setMonthlyTotal(total);
    } catch (error) {
      console.error('Error calculating monthly total', error);
    }
  };

  const handleCalculateDailyAverage = async () => {
    try {
      const average = await calculateDailyAverage(selectedUser);
      setDailyAverage(average);
    } catch (error) {
      console.error('Error calculating daily average', error);
    }
  };

  const handleFindHighestExpense = async () => {
    try {
      const highest = await findHighestExpense(selectedUser);
      setHighestExpense(highest);
    } catch (error) {
      console.error('Error finding highest expense', error);
    }
  };

  const handleCalculateRemainingBudget = async () => {
    try {
      const remaining = await calculateRemainingBudget(selectedUser);
      setRemainingBudget(remaining);
    } catch (error) {
      console.error('Error calculating remaining budget', error);
    }
  };

  const handleDeleteSelectedExpenses = async () => {
    try {
      await Promise.all(selectedExpenses.map(id => deleteExpense(id)));
      setExpenses(expenses.filter(exp => !selectedExpenses.includes(exp.expense_id)));
      setSelectedExpenses([]);
    } catch (error) {
      console.error('Error deleting selected expenses', error);
    }
  };

  const handleToggleExpenseSelection = (id) => {
    setSelectedExpenses(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(expId => expId !== id) : [...prevSelected, id]
    );
  };

  const handleSortByDateAsc = () => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    setExpenses(sortedExpenses);
  };

  const handleSortByDateDesc = () => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    setExpenses(sortedExpenses);
  };

  const handleGetExpenseSummary = async () => {
    try {
      const summary = await getExpenseSummary(selectedUser);
      setCategoryTotals(summary.categoryTotals || {}); // Ensure defaults to an empty object
      setMonthlyTotal(summary.monthlyTotal || 0);
      setDailyAverage(summary.dailyAverage || 0);
      setHighestExpense(summary.highestExpense ? {
        ...summary.highestExpense,
        date: new Date(summary.highestExpense.date) // Convert date to Date object
      } : null);
      setRemainingBudget(summary.remainingBudget || 0);
    } catch (error) {
      console.error('Error getting expense summary', error);
    }
  };

  useEffect(() => {
    if (highestExpense) {
      console.log('Highest Expense:', highestExpense);
      console.log('Highest Expense Date:', highestExpense.date);
    }
  }, [highestExpense]);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const categoryData = categories.map(cat => {
    const categorySum = expenses
      .filter(exp => exp.category === cat.category_name)
      .reduce((acc, exp) => acc + exp.amount, 0);
    return categorySum;
  });

  return (
      <div className="App">
        <header className="App-header">
          <h1>Daily Expense Tracker</h1>
          <p>Track your daily expenses and view your monthly spending summary.</p>
        </header>
        <main>
          <section className="input-section">
            <div>
              <label>Date:</label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
            <div>
              <label>Category:</label>
              <select value={category} onChange={(e) => setCategory(parseInt(e.target.value))}>
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          <div>
            <label>Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Select Payment Method</option>
              {paymentMethods.map(pm => (
                <option key={pm.payment_method_id} value={pm.payment_method_id}>{pm.method_name}</option>
              ))}
            </select>
          </div>
            <div>
              <label>User:</label>
              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>{user.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleAddExpense}>Add Expense</button>
          </section>

          <section className="income-section">
            <h2>Add Income</h2>
            <div>
              <label>Date:</label>
              <DatePicker selected={incomeDate} onChange={(date) => setIncomeDate(date)} />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={incomeDescription}
                onChange={(e) => setIncomeDescription(e.target.value)}
              />
            </div>
            <div>
              <label>User:</label>
              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>{user.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleAddIncome}>Add Income</button>
          </section>

          <section className="category-section">
            <h2>Add Category</h2>
            <div>
              <label>Category Name:</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <button onClick={handleAddCategory}>Add Category</button>
          </section>

      <section className="payment-method-section">
        <h2>Add Payment Method</h2>
        <div>
          <label>Payment Method Name:</label>
          <input
            type="text"
            value={newPaymentMethod}
            onChange={(e) => setNewPaymentMethod(e.target.value)}
          />
        </div>
            <div>
              <label>Details:</label>
              <input
                type="text"
                value={paymentMethodDetails}
                onChange={(e) => setPaymentMethodDetails(e.target.value)}
              />
            </div>
            <div>
              <label>User:</label>
              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>{user.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleAddPaymentMethod}>Add Payment Method</button>
          </section>

      <section className="input-section">
        <div>
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Select Payment Method</option>
            {paymentMethods.map(pm => (
              <option key={pm.payment_method_id} value={pm.method_name}>{pm.method_name}</option>
            ))}
          </select>
        </div>
      </section>

          <section className="user-section">
            <h2>Add User</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleAddUser}>Add User</button>
          </section>

          <section className="calculation-buttons">
            <div>
              <label>User:</label>
              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>{user.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleCalculateCategoryTotals}>Calculate Category Totals</button>
            <button onClick={handleCalculateMonthlyTotal}>Calculate Monthly Total</button>
            <button onClick={handleCalculateDailyAverage}>Calculate Daily Average</button>
            <button onClick={handleFindHighestExpense}>Find Highest Expense</button>
            <button onClick={handleCalculateRemainingBudget}>Calculate Remaining Budget</button>
          </section>

      <section className="expense-summary-section">
        <h2>Expense Summary</h2>
        <div>
          <label>User:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.user_id} value={user.user_id}>{user.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleGetExpenseSummary}>Get Expense Summary</button>
        <div>
          <h3>Category Totals:</h3>
          {Object.entries(categoryTotals).map(([cat, total]) => (
            <p key={cat}>{cat}: ${total.toFixed(2)}</p>
          ))}
        </div>
        <div>
          <h3>Monthly Total: ${monthlyTotal.toFixed(2)}</h3>
        </div>
        <div>
          <h3>Daily Average: ${dailyAverage.toFixed(2)}</h3>
        </div>
        <div>
          <h3>Highest Expense:</h3>
          {highestExpense && (
            <p>{highestExpense.date.toLocaleDateString()} - {highestExpense.category}: ${highestExpense.amount.toFixed(2)} ({highestExpense.description})</p>
          )}
        </div>
        <div>
          <h3>Remaining Budget: ${remainingBudget.toFixed(2)}</h3>
        </div>
      </section>

          <section className="expense-chart-section">
            <h2>Total Expense Chart</h2>
            <Pie
              data={{
                labels: categories.map(cat => cat.category_name),
                datasets: [
                  {
                    data: categoryData,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF914D', '#B2FF59', '#F7B7A3', '#A3F7B7', '#A3B7F7', '#F7F7A3'],
                  },
                ],
              }}
              width={400}
              height={400}
            />
          </section>

          <section className="recent-expenses-section">
            <h2>Recent Expenses</h2>
            <button onClick={handleSortByDateAsc}>Sort by Date Ascending</button>
            <button onClick={handleSortByDateDesc}>Sort by Date Descending</button>
            <ul className="expenses-list">
              {expenses.map((exp, index) => (
                <li key={index} className="expense-item">
                  <input type="checkbox" onChange={() => handleToggleExpenseSelection(exp.expense_id)} />
                  <div>{new Date(exp.date).toLocaleDateString()}</div>
                  <div>{exp.category}</div>
                  <div>${exp.amount.toFixed(2)}</div>
                  <div>{exp.description}</div>
                </li>
              ))}
            </ul>
            <button onClick={handleDeleteSelectedExpenses}>Delete Selected Expenses</button>
          </section>
        </main>
      </div>
    );
  }

  export default App;
