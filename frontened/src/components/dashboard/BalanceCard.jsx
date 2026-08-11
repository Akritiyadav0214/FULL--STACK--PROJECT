import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";

import { getBankAccounts } from "../../services/bankService";

export default function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const response = await getBankAccounts();

      const accounts = response.accounts || [];

      const total = accounts.reduce(
        (sum, account) =>
          sum + Number(account.balance || 0),
        0
      );

      setBalance(total);
    } catch (error) {
      console.error(
        "Failed to load balance:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            Total Balance
          </p>

          {loading ? (
            <h2 className="text-3xl font-bold mt-2">
              Loading...
            </h2>
          ) : (
            <h2 className="text-3xl font-bold mt-2">
              ${balance.toLocaleString()}
            </h2>
          )}

        </div>

        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">

          <FaWallet className="text-green-600 text-xl" />

        </div>

      </div>

    </div>
  );
}