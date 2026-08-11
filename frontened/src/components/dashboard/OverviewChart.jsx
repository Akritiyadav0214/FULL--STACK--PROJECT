import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", income: 5000, expense: 3200 },
  { month: "Feb", income: 6200, expense: 3500 },
  { month: "Mar", income: 5500, expense: 3000 },
  { month: "Apr", income: 7000, expense: 4200 },
  { month: "May", income: 6800, expense: 3900 },
  { month: "Jun", income: 7500, expense: 4500 },
];

export default function OverviewChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[400px]">

      <h2 className="text-xl font-bold mb-5">
        Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}