import api from "./api";

// Add income or expense
export const addTransaction = async (data) => {
  const response = await api.post(
    "/transactions",
    data
  );

  return response.data;
};

// Get all transactions
export const getTransactions = async () => {
  const response = await api.get(
    "/transactions"
  );

  return response.data;
};