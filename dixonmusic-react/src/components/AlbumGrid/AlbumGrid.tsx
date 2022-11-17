import { React, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./AlbumGrid.css";

// import Discogs from "../../../node_modules/disconnect";

// const dis = new Discogs({ userToken: import.meta.env["DISCOGS_API_TOKEN"] });

function AlbumGrid() {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    const userName = "dixonmusic";
    const apiToken = import.meta.env.VITE_DISCOGS_API_TOKEN;

    fetch(
      `https://api.discogs.com/users/${userName}/inventory?token=${apiToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setListings(data.listings);
      });
  };

  console.log(listings[0]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const listingsItems = listings.map((listing) => (
    // TODO: Cleanup these styles in a stylesheet
    <Col style={{ padding: 0 }}>
      <Card
        style={{ height: "200px", width: "200px" }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Card.Img variant="bottom" src={listing["release"]["thumbnail"]} />
        <Card.ImgOverlay>
          {/* TODO: Fix the overlay to only show on individual cards */}
          {isHovering && (
            <Card.Link href={listing["uri"]} style={{ color: "yellow" }}>
              {listing["release"]["description"]}
            </Card.Link>
          )}
        </Card.ImgOverlay>
      </Card>
      {/* <img
        src={listing["release"]["thumbnail"]}
        alt={listing["release"]["description"]}
      /> */}
    </Col>
  ));

  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>;
      </Container>
    );
  }

  return (
    <Container className="album-container">
      <h2>Listings: </h2>
      <Row>{listingsItems}</Row>
    </Container>
  );
}

export default AlbumGrid;
