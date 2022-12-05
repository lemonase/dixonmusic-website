import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function InternalLinkButtons() {
    return (
        <>
            <Container className="internal-links">
                <Link to="/listings">See Listings</Link>
                <Link to="/about">About</Link>
                <Link to="/shipping-info">Shipping Info</Link>
                <Link to="/contact-us">Contact Us</Link>
            </Container>
        </>
    )
}

export default InternalLinkButtons
