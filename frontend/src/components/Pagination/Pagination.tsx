import React from 'react'

const Pagination = (props) => {
    return (
        <>
            <div>Pagination</div>
            <ul>

            </ul>
            <li> Page: {props.pagination["page"]} </li>
            <li> All Pages: {props.pagination["pages"]} </li>
            <li> Per Pages: {props.pagination["per_page"]} </li>
        </>
    )
}

export default Pagination
