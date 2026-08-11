import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">

      <div className="w-72 bg-red-500">
        <Sidebar />
      </div>

      <div className="flex-1">

        <Navbar />

        <div className="p-10 bg-gray-100 h-full">
          {children}
        </div>

      </div>

    </div>
  );
}