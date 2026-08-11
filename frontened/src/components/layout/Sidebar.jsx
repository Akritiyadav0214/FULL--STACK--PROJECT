// src/components/layout/Sidebar.jsx

import {
  FaHome,
  FaWallet,
  FaChartPie,
  FaRobot,
  FaFileAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Transactions", path: "/transactions", icon: <FaWallet /> },
    { name: "Budget", path: "/budget", icon: <FaChartPie /> },
    { name: "AI Advisor", path: "/ai", icon: <FaRobot /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="w-72 h-screen bg-[#0F172A] text-white flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-green-400">
          FinSmart AI
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Personal Finance
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 mt-6 px-4">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-xl mb-2 transition ${
                isActive
                  ? "bg-green-500 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
}