import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import "./Navbar.css";
import NavbarBrandLogo from "./NavbarBrandLogo";
import BrandText from "./BrandText";
import ExternalLinkButton from "./ExternalLinkButton";

const MainNavbar = () => {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="justify-content-center"
      >
        <Container>
          <Navbar.Brand href="#home">
            <NavbarBrandLogo />
            <BrandText />
            <NavbarBrandLogo />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div
        style={{ paddingTop: "10px", backgroundColor: "#38ec20" }}
        className="color-space"
      ></div>

      <Navbar bg="dark" variant="dark" className="second-nav">
        <Container>
          <Nav className="nav-text">Find us on these platforms:</Nav>
          <Nav className="link-text">
            <ExternalLinkButton
              href="https://www.discogs.com/seller/dixonmusic/profile"
              variant="primary"
              buttonText="Discogs"
              iconType="discogs"
            />
            <ExternalLinkButton
              href="#"
              variant="warning"
              buttonText="Ebay"
              iconType="ebay"
            />
            <ExternalLinkButton
              href="#"
              variant="info"
              buttonText="MusicStack"
              iconType="musicstack"
            />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;
