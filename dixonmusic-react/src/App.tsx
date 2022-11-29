import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ShippingInfo from "./pages/ShippingInfo";

/* Styling */
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

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
  );
}
