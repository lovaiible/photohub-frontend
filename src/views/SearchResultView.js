"use strict"

import React from 'react';
import SearchResult from '../components/search/SearchResult'
import SearchService from "../services/SearchService";
import {withRouter} from "react-router-dom";

class SearchResultView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
    }

    componentDidMount() {
        SearchService.getSearchResults(this.props.location.search).then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <SearchResult results={this.state.data} />
        );
    }
}

export default withRouter(SearchResultView);