import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Stack } from "react-bootstrap";

import AlbumCard from "./AlbumCard";

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
    fetch('https://api.dixonmusic.net/inventory')
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

  let listingView;
  if (viewState.view === "grid") {
    listingView = (<><h1>Grid </h1> <Row>{listingsItems}</Row></>)
  }
  if (viewState.view === "list") {
    listingView = (<><h1>List </h1> <Stack>{listingsItems}</Stack></>)
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
      <Row>
        <ButtonGroup>
          <ToggleButton key="0"
            id="radio-0"
            name="radio"
            type="radio"
            value="grid"
            onChange={handleRadio}
            style={{ padding: "5px" }}
            checked={viewState.view === "grid"}
          >
            <BsFillGrid3X3GapFill />
          </ToggleButton>

          <ToggleButton key="1"
            id="radio-1"
            name="radio"
            type="radio"
            value="list"
            onChange={handleRadio}
            checked={viewState.view === "list"}
            style={{ padding: "5px" }}>
            <HiViewList />
          </ToggleButton>
        </ButtonGroup>
      </Row>
      {listingView}
    </Container>
  );
}

export default AlbumGrid;
