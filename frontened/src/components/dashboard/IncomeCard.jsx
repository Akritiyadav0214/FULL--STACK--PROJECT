import { FaArrowTrendUp } from "react-icons/fa6";

export default function IncomeCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            Income
          </p>

          <h2 className="text-3xl font-bold mt-3">
            $8,430
          </h2>

          <p className="text-green-500 mt-2">
            ↑ 8.5%
          </p>

        </div>

        <div className="bg-green-100 h-14 w-14 rounded-2xl flex justify-center items-center">

          <FaArrowTrendUp
            size={24}
            className="text-green-600"
          />

        </div>

      </div>

    </div>
  );
}