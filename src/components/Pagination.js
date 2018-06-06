"use strict"

import React from 'react';
import {Pagination} from "react-bootstrap";

var items = [];
for (let number = 1; number <= 10; number++) {
    items.push(
        <Pagination.Item key={number} active={number === 1}>{number}</Pagination.Item>
    );
}

class PaginationNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    render() {
        return (
            <div>
                <Pagination bsSize="medium">{items}</Pagination>
            </div>
        )
    }
};

export default PaginationNav;
