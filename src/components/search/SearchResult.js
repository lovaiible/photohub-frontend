"use strict"

import React from 'react';
import Page from '../page/Page';
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
                {this.state.data.length === 1 ?
                    <h1>{this.state.data.length} result</h1> :
                    <h1>{this.state.data.length} results</h1>
                }
                <SearchFieldView/>
                <div className="search-container">
                    {this.state.data.length !== 0 ?
                        <div className="row">
                            {(this.state.data).map((item) => <SearchResultItem {...item} key={item._id}/>)}
                        </div>
                        :
                        <h3 className="search-error">No results found. Please try another search.</h3>
                    }
                </div>
            </Page>
        )
    }
};

export default SearchResult;