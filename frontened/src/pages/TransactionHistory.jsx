import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
} from "react-icons/fa";

import Layout from "../components/layout/Layout";
import { getTransactions } from "../services/transactionService";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await getTransactions();

      setTransactions(response.transactions || []);
    } catch (error) {
      console.error(
        "Failed to load transactions:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Transaction History
        </h1>

        <p className="text-gray-500 mt-1">
          View all your income and expenses
        </p>

      </div>


      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-2xl shadow p-8 text-center">

          <p className="text-gray-500">
            Loading transactions...
          </p>

        </div>
      )}


      {/* No Transactions */}

      {!loading && transactions.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h2 className="text-xl font-semibold">
            No transactions yet
          </h2>

          <p className="text-gray-500 mt-2">
            Your income and expenses will appear here.
          </p>

        </div>
      )}


      {/* Transactions */}

      {!loading && transactions.length > 0 && (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Desktop Header */}

          <div className="hidden md:grid grid-cols-6 gap-4 p-5 bg-gray-50 font-semibold text-gray-600">

            <div>
              Date
            </div>

            <div>
              Description
            </div>

            <div>
              Category
            </div>

            <div>
              Account
            </div>

            <div>
              Type
            </div>

            <div className="text-right">
              Amount
            </div>

          </div>


          {/* Transaction Rows */}

          {transactions.map((transaction) => {

            const isIncome =
              transaction.type === "income";

            return (

              <div
                key={transaction._id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-5 border-t hover:bg-gray-50"
              >

                {/* Date */}

                <div className="flex items-center gap-2">

                  <FaCalendarAlt className="text-gray-400" />

                  <span>
                    {new Date(
                      transaction.date
                    ).toLocaleDateString()}
                  </span>

                </div>


                {/* Description */}

                <div>

                  <p className="font-medium">
                    {transaction.description ||
                      "No description"}
                  </p>

                </div>


                {/* Category */}

                <div>

                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {transaction.category}
                  </span>

                </div>


                {/* Account */}

                <div>

                  <p className="font-medium">
                    {transaction.bankAccount
                      ?.bankName ||
                      "Unknown"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {transaction.bankAccount
                      ?.accountName ||
                      ""}
                  </p>

                </div>


                {/* Type */}

                <div>

                  {isIncome ? (

                    <span className="flex items-center gap-2 text-green-600 font-medium">

                      <FaArrowUp />

                      Income

                    </span>

                  ) : (

                    <span className="flex items-center gap-2 text-red-500 font-medium">

                      <FaArrowDown />

                      Expense

                    </span>

                  )}

                </div>


                {/* Amount */}

                <div
                  className={`text-right font-bold ${
                    isIncome
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >

                  {isIncome ? "+" : "-"}$
                  {Number(
                    transaction.amount
                  ).toLocaleString()}

                </div>

              </div>

            );
          })}

        </div>

      )}

    </Layout>
  );
}