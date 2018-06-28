"use strict";

import React from 'react';

import ReviewForm from '../components/ReviewForm';
import Page from '../components/page/Page';
import ReviewService from '../services/ReviewService';
import UserService from '../services/UserService';
import ProfileService from '../services/ProfileService';
import { Link } from 'react-router-dom';

import Button from 'react-md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ReviewFormView extends React.Component {

    constructor(props) {
        super(props);
        let pId = this.props.match.params.id;

        this.state = {
            loading: true,
            review: undefined,
            error: undefined,
            pId: pId,
            user: UserService.getCurrentUser(),
            searchLink: ''
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
      ProfileService.getProfile(this.state.pId).then((data) => {
          this.setState({
              profile: data,
              city: data.location.city,
              description: data.description,
              title: data.title,
              loading: false,
              pUserId: data.user._id
          });
      }).catch((e) => {
          console.error(e);
      });

      ReviewService.getReviews(this.state.pId).then((data) => {
          this.setState({
              reviewsCheck: [...data],
              reviewsCheckLength: data.length,
              loading: false
          });
      }).catch((e) => {
          console.error(e);
      });

      ReviewService.checkAlreadyRated(this.state.pId, this.state.user.id).then((data) => {
          this.setState({
              alreadyRatedArray: [...data],
              checkAlreadyRatedLength: data.length,
              loading: false
          });
      }).catch((e) => {
          console.error(e);
      });

      if(localStorage.getItem('city') == null){
        this.setState({
          searchLink: '/'
        });
      } else {
        this.setState({
          searchLink: '/results?city=' + localStorage.getItem('city') + '&category=' + localStorage.getItem('category') + '&date=' + localStorage.getItem('date')
        });
      }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (
          <Page>
            <div className="breadcrumbs">
              <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink} className="breadcrumbLink">Search</Link> > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">Profile</Link> > <Link to={'/viewReviews/' + this.state.pId}
              className="breadcrumbLink">Reviews</Link> > <b>Create</b>
            </div>
            <ReviewForm review={this.state.review} onSubmit={(review) => this.createReview(review)} checkAlreadyRatedLength={this.state.checkAlreadyRatedLength}
            error={this.state.error} userId={this.state.user.id} pUserId={this.state.pUserId} userName={this.state.user.username} pId={this.state.pId} />
          </Page>
        );
    }
}
