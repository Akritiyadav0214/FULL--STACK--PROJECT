import { FaPiggyBank } from "react-icons/fa";

export default function SavingsCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            Savings
          </p>

          <h2 className="text-3xl font-bold mt-3">
            $12,300
          </h2>

          <p className="text-blue-500 mt-2">
            Goal 75%
          </p>

        </div>

        <div className="bg-blue-100 h-14 w-14 rounded-2xl flex justify-center items-center">

          <FaPiggyBank
            size={24}
            className="text-blue-600"
          />

        </div>

      </div>

    </div>
  );
}