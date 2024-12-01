import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchCartList } from "../Redux/features/cart/listcart";
import { useDispatch } from "react-redux";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [screen, setScreen] = useState("welcome"); // 'welcome' or 'login'
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("auth", JSON.stringify(response.data));
        onLoginSuccess(); // Call success handler
        dispatch(fetchCartList());
      } else {
        setErrorMessage("Login failed: No access token found in response");
      }
    } catch (error) {
      console.error("Login error:", error);
      console.log("Error response data:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("auth");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const startLogin = () => setScreen("login");

  // Welcome screen
  if (screen === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <img
          aria-hidden="true"
          alt="welcome"
          src="https://openui.fly.dev/openui/100x100.svg?text=🗝️"
          className="mb-4"
        />
        <h1 className="text-3xl font-serif text-blue-600 mb-4">Welcome</h1>
        <p className="text-gray-600 mb-4">Please log in to continue.</p>
        <button
          onClick={startLogin}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          Log In
        </button>
      </div>
    );
  }

  // Login screen
  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.themaark.com/image/cache/catalog/MAARK%20FABRIC%20SINGLE%20SOFA%20WITH%20PUFFY%20HALF%20WHITE%20COLOUR/5-1000x1000.jpg')",
        }}
      ></div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <div className="flex-1 bg-white shadow-md rounded-lg p-4">
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-50 mt-[5%] py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
                <Link
                  to="/signup"
                  className="  text-gray-600 rounded-md hover:text-blue-700 ml-[35%]"
                >
                  Create account here?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
