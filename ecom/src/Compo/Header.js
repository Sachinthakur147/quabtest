import React, { useState } from "react";
import axios from "axios";
import logo1234 from "../Assets/logo1234.png";
import { selectNoOfItemsFromCart } from "../Redux/features/cart/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ isSidebarOpen }) {
  const navigate = useNavigate();
  const noOfItemsInCart = useSelector(selectNoOfItemsFromCart);
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const { cartList } = useSelector((state) => state.list);
  console.log(cartList, "cartlist");
  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/subcategories/search/${searchQuery}`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setSubcategories([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");

    window.location.href = "/login";
  };

  return (
    <div
      className={`bg-gray-50 transition-all ${
        isSidebarOpen ? "backdrop-blur-lg" : ""
      }`}
    >
      <header
        className={`bg-gray-900 text-white sticky top-0 z-50 transition-all`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCXhStgjHpRhhy0qJExlozw6lc7Lqr5yMEKCLcSp05-1iutpQT8dtOyuV-HsIqaokL0Dg&usqp=CAU"
                alt="Logo"
                className="h-10 w-15"
              />
              <button className="lg:hidden">
                <span className="text-white">Menu</span>
              </button>
            </div>
            <div className="flex-1 mx-4 flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search categories"
                  className="w-full py-2 px-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleSearch}
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 relative">
              <p className="justify-around" style={{ display: "flex" }}>
                <button className="hidden lg:flex items-center space-x-1 hover:text-blue-400 transition mr-5">
                  <span className="text-sm">🔔 Notifications</span>
                </button>
                <button
                  className="flex items-center space-x-1 hover:text-blue-400 transition mr-5"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <span className="text-sm font-semibold">
                    🛒 Cart {cartList?.items?.length}
                  </span>
                </button>
                <button onClick={logout}>logout</button>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
