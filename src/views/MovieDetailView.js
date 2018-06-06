"use strict";

import React from 'react';

import { Confirm } from '../components/Confirm';

import MovieService from '../services/MovieService';


export class MovieDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        MovieService.getMovie(id).then((data) => {
            this.setState({
                movie: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    deleteMovie(id) {
        MovieService.deleteMovie(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <Confirm movie={this.state.service} onDelete={(id) => this.deleteMovie(id)}/>
        );
    }
}
