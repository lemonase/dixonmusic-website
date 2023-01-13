import React from "react";
import { Container } from "react-bootstrap";

function About() {
  return (
    <Container>
      <h2 className="body-heading">About Us</h2>
      <div className="main-body-text">
        <Container>
          <h3>
            What is Dixon Music?
          </h3>
          <p>
            Dixon Music is an online Record/CD/Vinyl seller and distributor.
          </p>
        </Container>

        <Container>
          <h3>
            Where is Dixon Music?
          </h3>
          <p>
            We are located directly out of the state of South Carolina in the United States and have been in business for 40+ years.
          </p>
        </Container>

        <Container>
          <h3>What We're About</h3>
          <p>
            We take pride in what we have and value our customer experience, so
            naturally, we would love if you take a look at our stock (on this site
            and on other platforms).
          </p>
        </Container>
      </div>

    </Container >
  );
}

export default About;
