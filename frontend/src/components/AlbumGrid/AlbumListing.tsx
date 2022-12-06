import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import "./AlbumCard.css";

function AlbumListing(props: any) {
    return (
        <>
            <a href={props.listing["uri"]} className="href">
                <Row style={{}}>
                    <Col>
                        <img
                            src={props.listing["release"]["images"][0]["uri"]}
                            alt={props.listing["release"]["description"]}
                            width="200px"
                            height="200px"
                        />
                    </Col>

                    <Col>
                        <p>{props.listing["release"]["description"]}</p>
                    </Col>
                    <Col>
                        <p>{props.listing["condition"]}</p>
                    </Col>
                    <Col>
                        <p>{props.listing["sleeve_condition"]}</p>
                    </Col>
                    <Col>
                        <p>{props.listing["status"]}</p>
                    </Col>
                    <Col>
                        <p> Want: {props.listing["release"]["stats"]["community"]["in_wantlist"]} </p>
                        <p> Have: {props.listing["release"]["stats"]["community"]["in_collection"]} </p>
                    </Col>
                    <Col>
                        <p>${props.listing["price"]["value"]} {props.listing["price"]["currency"]}</p>
                    </Col>


                </Row>
            </a>
        </>
    );
}

export default AlbumListing;
