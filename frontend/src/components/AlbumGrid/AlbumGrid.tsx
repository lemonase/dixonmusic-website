import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import AlbumCard from "./AlbumCard";

import "./AlbumGrid.css";
import { SiJest } from "react-icons/si";

function AlbumGrid() {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    fetch('https://api.dixonmusic.net/inventory')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setListings(data.listings);
      });
  };

  const listingsItems = listings.map((listing) => (
    listing["release"]["images"][0] !== undefined ?
      <AlbumCard
        key={listing["id"]}
        imageSrc={listing["release"]["images"][0]["uri"]}
        cardLink={listing["uri"]}
        cardDescription={listing["release"]["description"]}
        loading={isLoading}
        width="250px"
        height="250px"
      /> : null
  ));

  // TODO: Improve loading state for this component
  if (isLoading) {
    return (
      <Container className="loading-spinner">
        <Container>
          <h4>Loading Album Images... </h4>
        </Container>
        <Container>
          <Spinner variant="warning" animation="grow" style={{ width: "3rem", height: "3rem" }} />
        </Container>
      </Container>
    );
  }

  return (
    <Container className="album-container">
      <Row>{listingsItems}</Row>
    </Container>
  );
}

export default AlbumGrid;
