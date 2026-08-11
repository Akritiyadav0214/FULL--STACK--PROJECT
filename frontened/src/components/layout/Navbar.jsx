import {
  FaSearch,
  FaBell,
  FaComments,
  FaChevronDown,
} from "react-icons/fa";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 h-20 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          {today}
        </p>
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex items-center bg-gray-100 rounded-xl px-4 py-3 w-[420px]">

        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search transactions..."
          className="ml-3 bg-transparent outline-none w-full"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Chat */}
        <button className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-green-100 flex items-center justify-center transition">
          <FaComments className="text-gray-600" />
        </button>

        {/* Notification */}
        <div className="relative">

          <button className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-green-100 flex items-center justify-center transition">
            <FaBell className="text-gray-600" />
          </button>

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-800">
              Akrit
            </h3>

            <p className="text-sm text-gray-500">
              Premium User
            </p>
          </div>

          <FaChevronDown className="text-gray-500" />

        </div>

      </div>

    </header>
  );
}