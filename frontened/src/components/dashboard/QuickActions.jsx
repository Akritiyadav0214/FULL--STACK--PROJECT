import {
  FaPlus,
  FaMinus,
  FaUniversity,
  FaExchangeAlt,
} from "react-icons/fa";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Income",
      icon: <FaPlus />,
      color: "bg-green-500",
    },
    {
      title: "Add Expense",
      icon: <FaMinus />,
      color: "bg-red-500",
    },
    {
      title: "Add Bank",
      icon: <FaUniversity />,
      color: "bg-blue-500",
    },
    {
      title: "Transfer",
      icon: <FaExchangeAlt />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {actions.map((action) => (
          <button
            key={action.title}
            className={`${action.color} text-white rounded-2xl p-6 hover:scale-105 transition duration-300`}
          >
            <div className="text-3xl mb-3 flex justify-center">
              {action.icon}
            </div>

            <p className="font-semibold">
              {action.title}
            </p>
          </button>
        ))}

      </div>

    </div>
  );
}