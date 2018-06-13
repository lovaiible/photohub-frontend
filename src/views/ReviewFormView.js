"use strict";

import React from 'react';

import ReviewForm from './../components/ReviewForm';

import ReviewService from '../services/ReviewService';


export class ReviewFormView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            review: undefined,
            error: undefined,
            uName: 'Max Mustermann'
        }
    }

    createReview(review) {
      ReviewService.createReview(review).then((data) => {
          this.props.history.push('/reviewItemList/' + review.photographerId);
      }).catch((e) => {
          console.error(e);
          this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
      });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<ReviewForm review={this.state.review} onSubmit={(review) => this.createReview(review)} error={this.state.error} uName={this.state.uName}/>);
    }
}
