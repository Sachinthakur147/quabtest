import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Login";
import ProductList from "./Compo/ProductList";
import UserProfile from "./Components/Pages/Profile";
import Signup from "./Admin/Signup";

import Userapp from "./Userapp";
import GetProducts from "./Components/Pages/ProductList1";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const auth = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    const token = Cookies.get("access_token") || localStorage.getItem("auth");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // decode JWT token
      setRole(decodedToken.role); // set role based on token
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove("access_token");
    localStorage.removeItem("accessToken");
    console.log("User logged out and tokens removed.");
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup onSignupSuccess={handleSignupSuccess} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {isAuthenticated ? (
          <>
            <Route
              path="/"
              element={
                <Layout onLogout={handleLogout}>
                  {auth.role === "admin" ? <Dashboard /> : <Userapp />}
                </Layout>
              }
            />

            <Route
              path="/products"
              element={
                <Layout onLogout={handleLogout}>
                  <ProductList />
                </Layout>
              }
            />
            <Route
              path="/productlist"
              element={
                <Layout onLogout={handleLogout}>
                  <GetProducts />
                </Layout>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
