import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNoOfItemsToCart } from "../Redux/features/cart/cartSlice";
import { fetchCartList } from "../Redux/features/cart/listcart";

function Recommended() {
  const dispatch = useDispatch();
  const [products1, setProducts1] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchproduct = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `bearer ${auth.token}`,
          },
        });

        setProducts1(response.data);
      } catch (err) {
        console.error("Error fetching user role");
      }
    };

    fetchproduct();
  }, []);

  useEffect(() => {
    const fetcartItems = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `bearer ${auth.token}`,
          },
        });

        const simplifiedCartItems = response.data.items.map(
          (item) => item.productId._id
        );
        // console.log(66, simplifiedCartItems, "sdf");
        setCartItems(simplifiedCartItems);
      } catch (err) {
        console.error("Error fetching user role");
      }
    };

    fetcartItems();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move the slide
  const handleSlide = (direction) => {
    if (direction === "next") {
      setCurrentSlide((prev) => Math.min(prev + 1, products1.length - 4));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const submitHandler = async (product) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: product._id,
          quantity: 2,
        },
        {
          headers: {
            Authorization: `bearer ${auth.token}`,
          },
        }
      );
      console.log(res.data);
      dispatch(fetchCartList());
      dispatch(setNoOfItemsToCart(res.data.items.length));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container mx-auto py-12 px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }} // Move one card (25% width)
        >
          {products1.map((product, index) => (
            <div
              key={index}
              className="w-1/4 flex-shrink-0 p-2" // Width set to 1/4 (4 cards visible)
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
                  <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current text-yellow-500"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">
                      ({product.description})
                    </span>
                  </div>
                  <div className="text-lg font-bold">{product.price}</div>

                  {cartItems.includes(product._id) ? (
                    <button
                      onClick={() => {
                        submitHandler(product);
                        // console.log(product, cartItems, "y");
                      }}
                      className="mt-4 w-full bg-red-600 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
                    >
                      Remove Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        submitHandler(product);
                        // console.log(product, cartItems, "y");
                      }}
                      className="mt-4 w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSlide("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleSlide("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}

export default Recommended;
