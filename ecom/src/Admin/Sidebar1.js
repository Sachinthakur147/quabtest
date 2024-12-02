import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../Assets/logo.png";

const Sidebar1 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`bg-white   flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } md:w-64`}
    >
      <div className="p-3 flex justify-between items-center">
        <div className="flex w-full">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-36 object-cover rounded-md opacity-75"
          />
        </div>
        <button onClick={handleToggle} className="p-2 md:hidden">
          {sidebarOpen ? "✖️" : "☰"}
        </button>
      </div>
      <nav className="flex-1">
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="home">
            🏠
          </span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Home</span>
        </Link>
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="dashboard">
            🖥️
          </span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Dashboard</span>
        </Link>

        <Link
          to="/productlist"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="products">
            📋
          </span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>
            Product List
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar1;
