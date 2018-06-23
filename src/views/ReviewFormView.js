"use strict";

import React from 'react';

import ReviewForm from '../components/ReviewForm';
import Page from '../components/page/Page';
import ReviewService from '../services/ReviewService';
import UserService from '../services/UserService';

import { Link } from 'react-router-dom';

import Button from 'react-md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ReviewFormView extends React.Component {

    constructor(props) {
        super(props);
        let pId = this.props.match.params.id;

        this.state = {
            loading: false,
            review: undefined,
            error: undefined,
            pId: pId
        }
    }

    createReview(review) {
      ReviewService.createReview(review).then((data) => {
          this.props.history.push('/viewReviews/' + review.photographerId);
          localStorage.setItem('notification', 'success');
      }).catch((e) => {
          console.error(e);
          this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
      });
    }
    componentWillMount() {
      this.setState({user: UserService.getCurrentUser()});
    }
    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
          <Page>
            <div className="breadcrumbs">
              <Link to={'/'} className="breadcrumbLink">Home</Link> > Search > Profile > <Link to={'/viewReviews/' + this.state.photographerId} className="breadcrumbLink">Reviews</Link> > <b>Create</b>
            </div>
            <ReviewForm review={this.state.review} onSubmit={(review) => this.createReview(review)} error={this.state.error} userId={this.state.user.id} userName={this.state.user.username} pId={this.state.pId}/>
          </Page>
        );
    }
}
