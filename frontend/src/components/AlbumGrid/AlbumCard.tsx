import { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./AlbumCard.css";

function AlbumCard(props: any) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <Col style={{ padding: 0 }}>
        <a href={props.cardLink}>
          <Card
            className="album-card"
            style={{ height: props.height, width: props.width }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <Card.Img
              src={props.imageSrc}
              className={`card-image${isHovering ? "-hovering" : ""}`}
            />
            <Card.ImgOverlay>
              {/* TODO: Fix the overlay to only show on individual cards */}
              {isHovering && <Card.Text>{props.cardDescription}</Card.Text>}
            </Card.ImgOverlay>
          </Card>
        </a>
      </Col>
    </>
  );
}
AlbumCard.defaultProps = {
  height: "150px",
  width: "150px",
};

export default AlbumCard;
