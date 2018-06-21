"use strict";

import React from 'react';

import { ReviewDetail } from '../components/ReviewDetail';

import ReviewService from '../services/ReviewService';


export class ReviewDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        ReviewService.getReview(id).then((data) => {
            this.setState({
                review: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    deleteReview(id) {
        ReviewService.deleteReview(id).then((message) => {
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
            <ReviewDetail review={this.state.review} onDelete={(id) => this.deleteReview(id)}/>
        );
    }
}
