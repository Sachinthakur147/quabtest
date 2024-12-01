import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      <Header isSidebarOpen={isSidebarOpen} />
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg relative z-40">
        <div className="bg-gray-800">
          <div className="flex flex-wrap items-center space-x-1 h-12 max-w-full">
            {/* Added flex-wrap and reduced space-x */}
            <button
              onClick={toggleSidebar}
              className="flex items-center text-sm font-medium hover:bg-blue-600 px-3 py-2 rounded-md transition duration-150 ease-in-out"
            >
              All
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        /> // Backdrop
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        expandedCategory={expandedCategory}
      />
    </div>
  );
}
