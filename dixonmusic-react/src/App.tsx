import { useState } from "react";

import Navbar from "./components/NavbarComponents/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AlbumGrid from "./components/AlbumGrid/AlbumGrid";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <AlbumGrid />
      <About></About>
      <Footer />
    </div>
  );
}

export default App;
