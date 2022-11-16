import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import "./Navbar.css";
import NavbarBrandLogo from "./NavbarBrandLogo";
import BrandText from "./BrandText";

const MainNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <NavbarBrandLogo />
          <BrandText />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Collapse className="justify-content-end">
            <Nav className="link-text">
              <Nav.Link href="#">Discogs</Nav.Link>
              <Nav.Link href="#">Ebay</Nav.Link>
              <Nav.Link href="#">MusicStack</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
