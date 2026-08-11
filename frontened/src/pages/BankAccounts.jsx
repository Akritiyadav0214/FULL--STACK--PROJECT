import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import Layout from "../components/layout/Layout";
import {
  getBankAccounts,
  addBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from "../services/bankService";

export default function BankAccounts() {
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountType: "Savings",
    balance: "",
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await getBankAccounts();

      setAccounts(response.accounts || []);
    } catch (error) {
      console.error(
        "Failed to load bank accounts:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEdit = (account) => {
  setEditingAccount(account);

  setFormData({
    bankName: account.bankName,
    accountName: account.accountName,
    accountType: account.accountType,
    balance: account.balance,
  });

  setShowForm(true);
};
const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this account?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteBankAccount(id);

    setAccounts(
      accounts.filter((account) => account._id !== id)
    );

  } catch (error) {
    console.error("Failed to delete account:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete account"
    );
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    const data = {
      ...formData,
      balance: Number(formData.balance),
    };

    if (editingAccount) {

      const response = await updateBankAccount(
        editingAccount._id,
        data
      );

      setAccounts(
        accounts.map((account) =>
          account._id === editingAccount._id
            ? response.account
            : account
        )
      );

    } else {

      const response = await addBankAccount(data);

      setAccounts([
        ...accounts,
        response.account,
      ]);
    }

    setFormData({
      bankName: "",
      accountName: "",
      accountType: "Savings",
      balance: "",
    });

    setEditingAccount(null);

    setShowForm(false);

  } catch (error) {
    console.error(
      "Failed to save bank account:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to save bank account"
    );

  } finally {
    setSaving(false);
  }
};

  return (
    <Layout>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Bank Accounts
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your accounts and balances
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
        >
          <FaPlus />
          Add Account
        </button>

      </div>


      {/* Add Account Form */}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold">
  {editingAccount
    ? "Edit Bank Account"
    : "Add Bank Account"}
</h2>

            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              {/* Bank Name */}

              <div>

                <label className="block font-medium mb-2">
                  Bank Name
                </label>

                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="e.g. SBI"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Account Name */}

              <div>

                <label className="block font-medium mb-2">
                  Account Name
                </label>

                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  placeholder="e.g. Savings Account"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Account Type */}

              <div>

                <label className="block font-medium mb-2">
                  Account Type
                </label>

                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                >

                  <option value="Savings">
                    Savings
                  </option>

                  <option value="Current">
                    Current
                  </option>

                  <option value="Credit Card">
                    Credit Card
                  </option>

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="Wallet">
                    Wallet
                  </option>

                </select>

              </div>


              {/* Balance */}

              <div>

                <label className="block font-medium mb-2">
                  Initial Balance
                </label>

                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

            </div>


            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-6">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-xl border border-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Account"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Loading */}

      {loading && (
        <p className="text-gray-500">
          Loading accounts...
        </p>
      )}


      {/* No Accounts */}

      {!loading && accounts.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <FaUniversity className="text-5xl text-gray-400 mx-auto mb-4" />

          <h2 className="text-xl font-semibold">
            No bank accounts yet
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first account to start
            tracking your finances.
          </p>

        </div>
      )}


      {/* Account Cards */}

      {!loading && accounts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {accounts.map((account) => (

            <div
              key={account._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

                  <FaUniversity className="text-green-600 text-xl" />

                </div>

                <div>

                  <h2 className="font-bold text-lg">
                    {account.bankName}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {account.accountName}
                  </p>

                </div>

              </div>


              <div className="mt-6">

                <p className="text-gray-500 text-sm">
                  Current Balance
                </p>

                <h3 className="text-3xl font-bold mt-1">
                  {account.currency} {account.balance}
                </h3>

              </div>


              <div className="mt-4">

                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {account.accountType}
                </span>

              </div>
              <div className="flex gap-3 mt-5">

  <button
    onClick={() => handleEdit(account)}
    className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-xl hover:bg-blue-50"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(account._id)}
    className="flex-1 border border-red-500 text-red-500 py-2 rounded-xl hover:bg-red-50"
  >
    Delete
  </button>

</div>

            </div>

          ))}

        </div>
      )}

    </Layout>
  );
}