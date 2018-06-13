"use strict";

import React from 'react';

import CategoryService from '../services/CategoryService';
import SearchFields from "../components/search/SearchFields";
import LocationService from "../services/LocationService";


export class SearchFieldView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            categories: [],
            locations: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        LocationService.getLocations().then((data) => {
            var locations = [];
            for(var index in data) {
                locations.push(data[index].city);
            }

            this.setState({
                locations: locations.sort(),
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        CategoryService.getCategories().then((data) => {
            var categories = [];
            for(var index in data) {
                categories.push(data[index].title);
            }

            this.setState({
                categories: categories.sort(),
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
            <SearchFields categories={this.state.categories} locations={this.state.locations}/>
        );
    }
}
