import { FaArrowTrendDown } from "react-icons/fa6";

export default function ExpenseCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            Expenses
          </p>

          <h2 className="text-3xl font-bold mt-3">
            $4,250
          </h2>

          <p className="text-red-500 mt-2">
            ↓ 3.2%
          </p>

        </div>

        <div className="bg-red-100 h-14 w-14 rounded-2xl flex justify-center items-center">

          <FaArrowTrendDown
            size={24}
            className="text-red-600"
          />

        </div>

      </div>

    </div>
  );
}