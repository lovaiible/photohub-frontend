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
            categories: ['All'],
            locations: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
    }

    componentDidMount() {
        var categories = ['All'];
        var locations = [];
        
        CategoryService.getCategories().then((data) => {
            for(var index in data) {
                categories.push(data[index].title);
            }
        }).catch((e) => {
            console.error(e);
        });

        LocationService.getLocations().then((data) => {
            for(var index in data) {
                locations.push(data[index].city);
            }
        }).catch((e) => {
            console.error(e);
        });

        this.setState({
            categories: categories.sort(),
            locations: locations.sort(),
            loading: false
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

