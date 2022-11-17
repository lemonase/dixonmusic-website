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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <NavbarBrandLogo />
          <BrandText />
          <NavbarBrandLogo />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-left">
          <Nav style={{ color: "white" }}>Find us on these platforms:</Nav>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
