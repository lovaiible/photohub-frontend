"use strict";

import React from 'react';
import {Grid, Cell, Avatar, FontIcon, Button} from 'react-md';
import ReactStars from 'react-stars'
import ReviewService from '../services/ReviewService';

export default class ReviewEditAndDelete extends React.Component {
  constructor(props){
    super(props);
  }
  deleteReview(id){
    ReviewService.deleteReview(id).then(() => {
        this.setState({
            loading: false
        });
        localStorage.setItem('notification', 'deleted');
        window.location.reload();
    }).catch((e) => {
        console.error(e);
    });
  }

  render(){
    if(this.props.userId == this.props.reviewUserId){
      return(
        <div>
          <Button icon >mode_edit</Button>
          <Button icon onClick={() =>this.deleteReview(this.props.reviewId)}>delete</Button>
        </div>
      );
    } else {
      return(null);
    }
  }
}
