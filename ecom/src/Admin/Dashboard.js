import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import CurrentBookings from "./CurrentBookings";
import axios from "axios";  
import Sidebar1 from "./Sidebar1";
import DashboardHeader from "./DashboardHeader";

const Dashboard = ({  onLogout }) => {
  const [userCount, setUserCount] = useState(0);
  const [retailerCount, setRetailerCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryCount, setSubCategoryCount] = useState(0);

 

  return (
    <div>
    <div className="flex h-screen">
    <Sidebar1 onLogout={onLogout} />
    <div className="flex-1 flex flex-col overflow-hidden">
    <DashboardHeader onLogout={onLogout} />
    
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-blue-600">👥</span> {/* User Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{userCount}</p>
          </div>
        </div>

        <div className="bg-green-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-green-600">👨🏻‍💻</span> {/* Retailer Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Retailers</h3>
            <p className="text-3xl font-bold text-green-600">{retailerCount}</p>
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-purple-600">📑</span> {/* Category Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Categories</h3>
            <p className="text-3xl font-bold text-purple-600">{categoryCount}</p>
          </div>
        </div>

        <div className="bg-red-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-red-600">📋</span> {/* Subcategory Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Subcategories</h3>
            <p className="text-3xl font-bold text-red-600">{subCategoryCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">User Growth Analytics</h3>
          <LineChart />
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
         
        </div>
      </div>
    </main>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
