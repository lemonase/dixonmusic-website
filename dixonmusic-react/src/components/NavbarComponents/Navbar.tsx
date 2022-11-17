import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Outlet, Link } from "react-router-dom";

import "./Navbar.css";
import NavbarBrandLogo from "./NavbarBrandLogo";
import BrandText from "./BrandText";
import ExternalLinkButton from "./ExternalLinkButton";

const MainNavbar = () => {
  return (
    <>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="primary-nav"
      >
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <NavbarBrandLogo />
              <BrandText />
              <NavbarBrandLogo />
            </Navbar.Brand>
          </Link>
          <Link to="/about">About</Link>
          <Link to="/shipping-info">Shipping Info</Link>
        </Container>
      </Navbar>

      <div
        className="navbar-spacer"
        style={{ paddingTop: "10px", backgroundColor: "#38ec20" }}
      ></div>

      <Navbar sticky="top" bg="dark" variant="dark" className="second-nav">
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
              disabled={true}
            />
            <ExternalLinkButton
              href="#"
              variant="info"
              buttonText="MusicStack"
              iconType="musicstack"
              disabled={true}
            />
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MainNavbar;
