"use strict"

import React from 'react';
import SearchResult from '../components/SearchResult'

export class SearchResultView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <SearchResult data={this.state.data} />
        );
    }
}