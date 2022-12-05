import React from 'react'
import { Container } from 'react-bootstrap'
import { MdEmail } from 'react-icons/md'

function ContactUs() {
    return (
        <>
            <Container>
                <h2 className="body-heading">Contact Us</h2>
                <div className="main-body-text">
                    <MdEmail></MdEmail>  Email:  <a href="mailto:itsdamondixon@gmail.com?subject=EMail from website"> itsdamondixon@gmail.com</a></div>
            </Container>
        </>
    )
}

export default ContactUs
