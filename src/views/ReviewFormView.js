"use strict";

import React from 'react';

import ReviewForm from './../components/ReviewForm';

import ReviewService from '../services/ReviewService';


export class ReviewFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
      this.setState({
          loading: false,
          review: undefined,
          error: undefined
      });
    }

    updateReview(review) {
      ReviewService.createReview(review).then((data) => {
          this.props.history.push('/reviewItemList');
      }).catch((e) => {
          console.error(e);
          this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
      });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<ReviewForm review={this.state.review} onSubmit={(review) => this.updateReview(review)} error={this.state.error} />);
    }
}
