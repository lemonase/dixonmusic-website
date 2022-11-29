import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function InternalLinkButtons() {
    return (
        <>
            <Container className="internal-links">
                <Link to="/about">About</Link>
                <Link to="/shipping-info">Shipping Info</Link>
            </Container>
        </>
    )
}

export default InternalLinkButtons
