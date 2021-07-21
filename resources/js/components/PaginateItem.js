import React from 'react'

export default function PaginateItem(props) {
    const {active, disabled, page, text, setPage} = props;

    return (
        <li className={`page-item ${active? "active" : ""} ${disabled? "disabled" : ""}`} style={{ cursor: "pointer" }}>
            <a className="page-link" onClick={() => setPage(page)}>{text}</a>
        </li>
    )
}
