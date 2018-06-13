"use strict"

import React from 'react';
import SearchResult from '../components/search/SearchResult'
import {SearchFieldView} from "./SearchFieldView";
import Page from "../components/Page";

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
            <Page>
                <SearchFieldView />
                <SearchResult data={this.state.data} />
            </Page>
        );
    }
}