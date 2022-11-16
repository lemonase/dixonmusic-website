import React from "react";
import logo from "../../assets/record.svg";
// import logo from "../assets/old_dixon_music.jpg";

function NavbarBrandLogo() {
  return (
    <img
      src={logo}
      width="30"
      style={{ marginRight: "10%" }}
      alt="record svg"
    />
  );
}

export default NavbarBrandLogo;
