import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { Stack } from "react-bootstrap";

import AlbumCard from "./AlbumCard";
import AlbumListing from "./AlbumListing";

import "./AlbumGrid.css";
import { SiJest } from "react-icons/si";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { HiViewList } from "react-icons/hi";


function AlbumGrid() {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [viewState, setViewState] = useState({ view: "grid" })

  const handleRadio = e => {
    e.persist();
    // console.log(e.target.value);

    setViewState(prevState => ({
      ...prevState,
      view: e.target.value
    }))
  }

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    fetch('https://api.dixonmusic.net/inventory', { cache: "force-cache" })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setListings(data.listings);
      });
  };

  const cardItems = listings.map((listing) => (
    <AlbumCard
      key={listing["id"]}
      imageSrc={listing["release"]["images"][0]["uri"]}
      cardLink={listing["uri"]}
      cardDescription={listing["release"]["description"]}
      loading={isLoading}
      width="150px"
      height="150px"
    />
  ));

  const rowItems = listings.map((listing) => (
    <AlbumListing
      key={listing["id"]}
      listing={listing}
    />
  ));

  let listingView;
  if (viewState.view === "grid") {
    listingView = (<><Row>{cardItems}</Row></>)
  }
  if (viewState.view === "list") {
    listingView = (
      <>
        <Row className="listings-heading">
          <Col>Album Image</Col>
          <Col>Description</Col>
          <Col>Sleeve Condition</Col>
          <Col>Condition</Col>
          <Col>Status</Col>
          <Col>Have/Want</Col>
          <Col>Price (ex. Shipping)</Col>
        </Row>

        {rowItems}
      </>)
  }

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
      <ButtonGroup className="view-button-group" style={{ position: "relative" }}>
        <ToggleButton
          key="0"
          id="radio-0"
          name="radio"
          type="radio"
          value="grid"
          onChange={handleRadio}
          checked={viewState.view === "grid"}
          variant="secondary"
          size="lg"
        >
          <BsFillGrid3X3GapFill />
        </ToggleButton>

        <ToggleButton
          key="1"
          id="radio-1"
          name="radio"
          type="radio"
          value="list"
          onChange={handleRadio}
          checked={viewState.view === "list"}
          variant="secondary"
          size="lg"
        >
          <HiViewList />
        </ToggleButton>
      </ButtonGroup>

      {listingView}
    </Container>
  );
}

export default AlbumGrid;
