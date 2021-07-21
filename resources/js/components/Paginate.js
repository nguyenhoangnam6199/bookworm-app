import React from 'react';
import PaginateItem from './PaginateItem';
import "./Paginate.css";

export default function Paginate(props) {
    function renderItem(page_count, current_page) {
        let items = [];
        for (let number = 1; number <= page_count; number++) {
            items.push(
                <PaginateItem key={number} active={number === current_page} page={number} text={number} setPage={props.setPage} />
            );
        }
        return items;
    }
    return (
        <nav className="mt-4">
            <ul className="pagination">
                <PaginateItem disabled={props.current_page === 1} page={props.current_page-1} text="Previous" setPage={props.setPage} />

                {renderItem(props.page_count, props.current_page)}

                <PaginateItem disabled={props.current_page === props.page_count} page={props.current_page+1} text="Next" setPage={props.setPage} />
            </ul>
        </nav>
    )
}
