import api from "./api";


// Add account
export const addBankAccount = async (data) => {
  const response = await api.post("/banks", data);

  return response.data;
};


// Get accounts
export const getBankAccounts = async () => {
  const response = await api.get("/banks");

  return response.data;
};


// Update account
export const updateBankAccount = async (id, data) => {
  const response = await api.put(`/banks/${id}`, data);

  return response.data;
};


// Delete account
export const deleteBankAccount = async (id) => {
  const response = await api.delete(`/banks/${id}`);

  return response.data;
};