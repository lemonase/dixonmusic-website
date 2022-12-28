import React, { useEffect } from 'react'
import { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(props.pagination["page"]);
    const [lastPage, setLastPage] = useState(props.pagination["pages"]);

    useEffect(() => {
        return () => {

        }
    }, [currentPage])


    const handlePageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        // console.log(event.target.id)
        setCurrentPage(event.target.id);
    }

    const PageButtons = () => {
        let btns = [];
        for (let i = 0; i < lastPage; i++) {
            btns.push(<Button key={i} id={"button-" + i.toString()} className="page-button" onClick={handlePageButtonClick} > {i + 1}</Button >)
        }
        return btns;
    }

    return (
        <>
            <div>Pagination</div>
            <ul>

            </ul>
            <li> Page: {props.pagination["page"]} </li>
            <li> All Pages: {props.pagination["pages"]} </li>
            <li> Per Pages: {props.pagination["per_page"]} </li>
            <li> Total Items: {props.pagination["items"]}</li>
            <li> Next Page: {props.pagination.urls["next"]}</li>
            <li> Last Page: {props.pagination.urls["last"]}</li>

            <ButtonGroup>
                <PageButtons></PageButtons>
            </ButtonGroup>
        </>
    )
}

export default Pagination
