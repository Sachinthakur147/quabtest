import React, { useEffect, useState } from "react";
import axios from "axios";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [role, setRole] = useState(""); // Role state to manage user role
  const [authError, setAuthError] = useState(false); // For showing 403 error
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [showAddProductModal, setShowAddProductModal] = useState(false); // Modal visibility for adding
  const [showEditProductModal, setShowEditProductModal] = useState(false); // Modal visibility for editing
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Confirm deletion modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Product to delete

  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/user-role");
  //       setRole(response.data.role); // Expecting "admin" or "user"
  //     } catch (err) {
  //       console.error("Error fetching user role");
  //       setAuthError(true);
  //     }
  //   };

  //   fetchUserRole();
  // }, []);

  useEffect(() => {
    if (auth.role === "admin") {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/products",
            {
              headers: {
                Authorization: `Bearer ${auth.token}`, // Add the token with the Bearer prefix
              },
            }
          );
          setProducts(response.data);
        } catch (err) {
          setError("Failed to fetch products");
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [auth.role]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = auth?.token;

    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setNewProduct({ name: "", price: "", stock: "", description: "" });
      setShowAddProductModal(false);
    } catch (err) {
      setError("Failed to add product");
    }
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const token = auth?.token;

    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/products/${newProduct._id}`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.pid === newProduct.pid ? newProduct : product
        )
      );
      setIsEditing(false);
      setNewProduct({ name: "", price: "", stock: "", description: "" });
      setShowEditProductModal(false); // Close the modal after editing
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = auth?.token;

    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      setShowDeleteConfirmation(false); // Close the delete confirmation modal
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  // Open the delete confirmation modal
  const handleOpenDeleteConfirmation = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  // Render 403 error for non-admin users
  if (auth.role === "user") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
        <p className="text-gray-700 text-lg">
          Forbidden: You don't have access to this page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 mb-8 mx-auto rounded-lg shadow-lg bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Products List</h1>

      {/* Loading state */}
      {loading && <p className="text-blue-500">Loading products...</p>}

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add Product Button (only for admins) */}
      {auth.role === "admin" && (
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Product
        </button>
      )}

      {/* Add Product Form Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative mx-4 sm:mx-0">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Add New Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleAddProductChange}
                placeholder="Product Name"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleAddProductChange}
                placeholder="Price"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleAddProductChange}
                placeholder="Stock Quantity"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleAddProductChange}
                placeholder="Product Description"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Product
              </button>
            </form>
            <button
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-red-500 focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Form Modal */}
      {showEditProductModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative mx-4 sm:mx-0">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Edit Product
            </h2>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleEditProductChange}
                placeholder="Product Name"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleEditProductChange}
                placeholder="Price"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleEditProductChange}
                placeholder="Stock Quantity"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleEditProductChange}
                placeholder="Product Description"
                className="p-2 w-full border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setShowEditProductModal(false)}
              className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-red-500 focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Delete Product Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-lg w-80 p-8 relative">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteProduct(productToDelete._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Table */}
      {!loading && products.length === 0 && <p>No products available</p>}

      {products.length > 0 && (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">
                  {auth.role === "admin" && (
                    <>
                      <button
                        onClick={() => {
                          setNewProduct(product);
                          setShowEditProductModal(true);
                        }}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDeleteConfirmation(product)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetProducts;
