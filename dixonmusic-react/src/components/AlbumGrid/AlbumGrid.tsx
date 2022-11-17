import { React, useEffect, useState } from "react";
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

  const listingsItems = listings.map((listing) => (
    <AlbumCard
      imageSrc={listing["release"]["thumbnail"]}
      cardLink={listing["uri"]}
      cardDescription={listing["release"]["description"]}
      loading={isLoading}
      width="150px"
      height="150px"
    />
  ));

  // TODO: Improve loading state for this component
  if (isLoading) {
    return (
      <Container className="loading-spinner">
        <div>Loading Album Images... </div>
        <Spinner animation="grow" />
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
