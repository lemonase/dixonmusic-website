import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Outlet, Link } from "react-router-dom";

import NavbarBrandLogo from "./NavbarBrandLogo";
import BrandText from "./BrandText";
import ExternalLinkButton from "./ExternalLinkButton";
import "./Navbar.css";
import InternalLinkButtons from "./InternalLinkButtons";

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
              {/* <NavbarBrandLogo /> */}
              <BrandText />
            </Navbar.Brand>
          </Link>
          <InternalLinkButtons />
        </Container>
      </Navbar>

      <div className="navbar-spacer"></div>

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
              href="https://www.ebay.com/usr/damon"
              variant="warning"
              buttonText="Ebay"
              iconType="ebay"
            />
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MainNavbar;
