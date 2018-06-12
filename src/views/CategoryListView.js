"use strict";

import React from 'react';

import {CategoryList} from '../components/CategoryList';
import CategoryService from '../services/CategoryService';


export class CategoryListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        CategoryService.getCategories().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    /*
    deleteMovie(id) {

        this.setState({
            data: [...this.state.data],
            loading: true
        });
        MovieService.deleteMovie(id).then((message) => {

            let movieIndex = this.state.data.map(movie => movie['_id']).indexOf(id);
            let movies = this.state.data;
            movies.splice(movieIndex, 1);
            this.setState({
               data: [...movies],
               loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }
    */

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <CategoryList data={this.state.data} /* onDelete={(id) => this.deleteMovie(id)}*//>
        );
    }
}
