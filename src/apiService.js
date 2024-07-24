import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // My backend URL

// User APIs
export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${API_BASE_URL}/users`, {
      name: user.name, // Correct field name
      email: user.email,
      password: user.password
    });
  return response.data;
};

// Category APIs
export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(`${API_BASE_URL}/categories`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
  return response.data;
};

// Expense APIs
export const createExpense = async (expense) => {
  const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
  return response.data;
};


export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/expenses/${id}`);
  return response.data;
};

// Income APIs
export const createIncome = async (income) => {
  const response = await axios.post(`${API_BASE_URL}/incomes`, {
    user_id: income.user_id,
    amount: income.amount,
    date: income.date,
    source: income.source
  });
  return response.data;
};


// Payment Method APIs
export const getPaymentMethods = async () => {
  const response = await axios.get(`${API_BASE_URL}/paymentMethods`);
  return response.data;
};

export const createPaymentMethod = async (paymentMethod) => {
  const response = await axios.post(`${API_BASE_URL}/paymentMethods`, {
      user_id: paymentMethod.user_id, // Correct field name
      method_name: paymentMethod.method_name, // Correct field name
      details: paymentMethod.details // Correct field name
  });
  return response.data;
};

// Calculation APIs
export const calculateCategoryTotals = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/calculations/categoryTotals`, {
    params: { userId }
  });
  return response.data;
};

export const calculateMonthlyTotal = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/calculations/monthlyTotal`, {
    params: { userId }
  });
  return response.data;
};

export const calculateDailyAverage = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/calculations/dailyAverage`, {
    params: { userId }
  });
  return response.data;
};

export const findHighestExpense = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/calculations/highestExpense`, {
    params: { userId }
  });
  return response.data;
};

export const calculateRemainingBudget = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/calculations/remainingBudget`, {
        params: { userId }
    });
    return response.data;
};

// Expense Summary APIs
export const getExpenseSummary = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/expenseSummaries`, {
    params: { userId }
  });
  return response.data;
};

export const getExpenses = async () => {
  const response = await axios.get(`${API_BASE_URL}/expenses`);
  return response.data;
};

export const getIncomes = async () => {
  const response = await axios.get(`${API_BASE_URL}/incomes`);
  return response.data;
};

