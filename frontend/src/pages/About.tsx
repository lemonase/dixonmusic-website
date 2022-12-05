import React from "react";
import { Container } from "react-bootstrap";

function About() {
  return (
    <Container>
      <h2 className="body-heading">About Us</h2>
      <div className="main-body-text">
        <h3>
          What is Dixon Music?
        </h3>
        <p>
          Dixon Music is an online Record/CD/Vinyl seller and distributor.
        </p>

        <h3>
          Where is Dixon Music?
        </h3>
        <p>
          We are located directly out of Summerville, SC and have been in business for 30+ years.
        </p>

        <h3>What We're About</h3>
        <p>
          We take pride in what we have and value our customer experience, so
          naturally, we would love if you take a look at our stock (on this site
          and on other platforms).
        </p>
      </div>
    </Container>
  );
}

export default About;
