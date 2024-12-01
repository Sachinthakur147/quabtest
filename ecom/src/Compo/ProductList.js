import React from "react";
import { useSelector } from "react-redux";

const ProductList = () => {
  // Get cartList from the Redux state
  const { cartList } = useSelector((state) => state.list);

  // Check if cartList.items exists and is an array
  const normalizedCartList = cartList?.items?.reduce((acc, item, index) => {
    acc[index] = {
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.productId.stock,
      description: item.productId.description,
    };
    return acc;
  }, {});

  console.log(normalizedCartList, "Normalized Data");

  return (
    <div className="d-flex">
      <h2 className="text-4xl font-bold text-blue-600 mb-10">Products List</h2>
      <ul style={{ display: "flex" }}>
        {normalizedCartList && Object.keys(normalizedCartList).length > 0 ? (
          Object.values(normalizedCartList).map((product, index) => (
            <div
              key={index}
              className="w-1/4 flex-shrink-0 p-2 d-flex" // Width set to 1/4 (4 cards visible)
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="overflow-hidden">
                  {" "}
                  {/* Wrapper for zoom effect */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>

                  <div className="text-lg font-bold">{product.price}</div>
                  <div className="text-lg font-bold">{product.description}</div>
                  <button className="mt-4 w-full bg-red-600 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                    Remove Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available in the cart.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
