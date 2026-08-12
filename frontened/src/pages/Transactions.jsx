import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import { getBankAccounts } from "../services/bankService";
import { addTransaction } from "../services/transactionService";

export default function Transactions() {
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    bankAccount: "",
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await getBankAccounts();

      setAccounts(response.accounts || []);
    } catch (error) {
      console.error(
        "Failed to load accounts:",
        error
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await addTransaction({
        ...formData,
        amount: Number(formData.amount),
      });

      alert(
        response.message ||
        "Transaction added successfully"
      );

      setFormData({
        bankAccount: "",
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
      });

    } catch (error) {
      console.error(
        "Failed to add transaction:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to add transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold">
          Add Transaction
        </h1>

        <p className="text-gray-500 mt-1 mb-8">
          Record your income or expenses
        </p>


        <div className="bg-white rounded-2xl shadow-md p-8">

          <form onSubmit={handleSubmit}>

            {/* Transaction Type */}

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Transaction Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              >

                <option value="expense">
                  Expense
                </option>

                <option value="income">
                  Income
                </option>

              </select>

            </div>


            {/* Bank Account */}

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Bank Account
              </label>

              <select
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              >

                <option value="">
                  Select Bank Account
                </option>

                {accounts.map((account) => (

                  <option
                    key={account._id}
                    value={account._id}
                  >
                    {account.bankName} -{" "}
                    {account.accountName}
                  </option>

                ))}

              </select>

            </div>


            {/* Amount */}

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>


            {/* Category */}

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Food, Salary, Rent"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>


            {/* Description */}

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional description"
                rows="4"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>


            {/* Date */}

            <div className="mb-6">

              <label className="block font-medium mb-2">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? "Adding..."
                : "Add Transaction"}
            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}