import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { HiOutlineExternalLink } from "react-icons/hi";
import { SiDiscogs, SiEbay } from "react-icons/si";
import { FiMusic } from "react-icons/fi";
import { MdFiberSmartRecord } from "react-icons/md";

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
  if (props.iconType == "cdandlp") {
    return <MdFiberSmartRecord />;
  }
  return <></>;
}

function ExternalLinkButton(props: any) {
  return (
    <Nav.Link href={props.href} target="_blank" rel="noreferrer noopener">
      <Button disabled={props.disabled} variant={props.variant}>
        <IconSwitch iconType={props.iconType} /> {props.buttonText}{" "}
        <HiOutlineExternalLink />
      </Button>
    </Nav.Link>
  );
}

export default ExternalLinkButton;
