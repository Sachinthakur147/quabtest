import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/Store";
import Category from "./Compo/Category";
import DealsOfTheDay from "./Compo/DealsOfTheDay";
import Footer from "./Compo/Footer";
import Navigation from "./Compo/Navigation";
import Recommended from "./Compo/Recommended";
import Slides from "./Compo/Slides";
import { fetchCartList } from "./Redux/features/cart/listcart";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartList());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <Slides />
      <Category />
      <DealsOfTheDay />
      <Recommended />
      <Footer />
    </div>
  );
};

const Userapp = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default Userapp;
