"use strict";

import React from 'react';

import ReviewForm from '../components/ReviewForm';
import Page from '../components/Page';
import ReviewService from '../services/ReviewService';

import { Link } from 'react-router-dom';

const breadcrumbStyle ={
  fontSize: '14px',
  marginTop: '10px'
};
const linkStyle = {
  color: 'black'
};

export class ReviewFormView extends React.Component {

    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.state = {
            loading: false,
            review: undefined,
            error: undefined,
            uName: 'Max Mustermann',
            photographerId: id
        }
    }

    createReview(review) {
      ReviewService.createReview(review).then((data) => {
          this.props.history.push('/viewReviews/' + review.photographerId);
      }).catch((e) => {
          console.error(e);
          this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
      });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
          <Page>
            <div style={breadcrumbStyle}>
              Home > Search > Profile > <Link to={'/viewReviews/' + this.state.photographerId} style={linkStyle}>Reviews</Link> > <b>Create</b>
            </div>
            <ReviewForm review={this.state.review} onSubmit={(review) => this.createReview(review)} error={this.state.error} uName={this.state.uName}/>
          </Page>
        );
    }
}
