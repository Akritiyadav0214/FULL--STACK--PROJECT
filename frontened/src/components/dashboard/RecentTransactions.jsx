import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const transactions = [
  {
    id: 1,
    title: "Salary",
    category: "Income",
    amount: 5000,
    date: "01 Aug 2026",
    type: "income",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    amount: 250,
    date: "02 Aug 2026",
    type: "expense",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    amount: 15,
    date: "03 Aug 2026",
    type: "expense",
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Income",
    amount: 1200,
    date: "04 Aug 2026",
    type: "income",
  },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Recent Transactions
        </h2>

        <button className="text-green-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">

        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4"
          >

            <div className="flex items-center gap-4">

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  item.type === "income"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {item.type === "income" ? (
                  <FaArrowDown className="text-green-600" />
                ) : (
                  <FaArrowUp className="text-red-600" />
                )}
              </div>

              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.category}
                </p>
              </div>

            </div>

            <div className="text-right">
              <h3
                className={`font-bold ${
                  item.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.type === "income" ? "+" : "-"}$
                {item.amount}
              </h3>

              <p className="text-sm text-gray-500">
                {item.date}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
