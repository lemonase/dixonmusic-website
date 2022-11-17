import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { HiOutlineExternalLink } from "react-icons/hi";
import { SiDiscogs, SiEbay } from "react-icons/si";
import { FiMusic } from "react-icons/fi";

function IconSwitch(props: any) {
  if (props.iconType == "discogs") {
    return <SiDiscogs />;
  }
  if (props.iconType == "ebay") {
    return <SiEbay />;
  }
  if (props.iconType == "musicstack") {
    return <FiMusic />;
  }
  return <></>;
}

function ExternalLinkButton(props: any) {
  return (
    <Nav.Link href={props.href}>
      <Button variant={props.variant}>
        <IconSwitch iconType={props.iconType} /> {props.buttonText}{" "}
        <HiOutlineExternalLink />
      </Button>
    </Nav.Link>
  );
}

export default ExternalLinkButton;
