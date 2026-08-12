import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BankAccounts from "./pages/BankAccounts";
import Transactions from "./pages/Transactions";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bank-accounts" element={<BankAccounts />} />
      <Route path="/transactions" element={<Transactions />}
/>
<Route
  path="/transaction-history"
  element={<TransactionHistory />}
/>
    </Routes>
  );
}

export default App;