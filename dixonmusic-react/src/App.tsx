import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ShippingInfo from "./pages/ShippingInfo";

import Navbar from "./components/NavbarComponents/Navbar";
// import About from "./components/About/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="shipping-info" element={<ShippingInfo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    //   <About></About>
  );
}
