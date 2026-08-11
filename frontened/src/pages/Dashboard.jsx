
import BalanceCard from "../components/dashboard/BalanceCard";
import IncomeCard from "../components/dashboard/IncomeCard";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import SavingsCard from "../components/dashboard/SavingsCard";

import OverviewChart from "../components/dashboard/OverviewChart";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import Layout from "../components/layout/Layout"
import RecentTransactions from "../components/dashboard/RecentTransactions"
import QuickActions from "../components/dashboard/QuickActions"
export default function Dashboard() {
  return (
    <Layout>

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's your financial overview.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <BalanceCard />
        <IncomeCard />
        <ExpenseCard />
        <SavingsCard />
      </div>

      {/* Charts */}
      <div className="mt-8">
  <RecentTransactions />
</div>
   <div className="mt-8">
    <QuickActions />
</div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2">
          <OverviewChart />
        </div>

        <ExpensePieChart />

      </div>

    </Layout>
  );
}