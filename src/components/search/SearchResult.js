"use strict"

import React from 'react';
import Page from '../page/Page';
import PaginationNav from "../Pagination";
import {SearchResultItem} from "./SearchResultItem";
import {SearchFieldView} from "../../views/SearchFieldView";

class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.results
        };
    }

    render() {
        return (
            <Page>
                <SearchFieldView/>
                <div className="search-container">
                    <div className="row">
                        {(this.state.data).map((item, i) => <SearchResultItem {...item} key={i}/>)}
                    </div>
                    <PaginationNav/>
                </div>
            </Page>
        )
    }
};

export default SearchResult;