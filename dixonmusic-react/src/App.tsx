import { useState } from "react";

import MainNavbar from "./components/NavbarComponents/MainNavbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AlbumGrid from "./components/AlbumGrid/AlbumGrid";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <HeroSection />
      <AlbumGrid />
      <Footer />
    </div>
  );
}

export default App;
