"use strict";

import React from 'react';
import {Grid, Cell, Avatar, FontIcon, Button, DialogContainer, TextField} from 'react-md';
import ReactStars from 'react-stars'
import ReviewService from '../services/ReviewService';

export default class ReviewEditAndDelete extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dialogVisible: false,
      text: this.props.review.text,
      rating: this.props.review.rating
    };
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  };

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
  };

  show() {
    this.setState({ dialogVisible: true });
  };

  hide(){
    this.setState({ dialogVisible: false });
  };

  handleEdit() {
      event.preventDefault();

      let review = this.props.review;
      if(review == undefined) {
          review = {};
      }

      review.name = this.props.review.name;
      review.rating = this.state.rating;
      review.date = this.props.review.date;
      review.text = this.state.text;
      review.photographerId = this.props.review.photographerId;
      review.userId = this.props.review.userId;

      console.log(review.rating)
      ReviewService.updateReview(review).then((data) => {
          localStorage.setItem('notification', 'successUpdated');
          window.location.reload();
      }).catch((e) => {
          console.error(e);
          this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
      });
  }


  handleChangeRating(value) {
      this.setState(Object.assign({}, this.state, {rating: value}));
  }
  handleChangeText(value) {
      this.setState(Object.assign({}, this.state, {text: value}));
  }

  render(){
    const dialogVisible = this.state.dialogVisible;
    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide});
    actions.push(<Button flat primary onClick={this.handleEdit}>Confirm</Button>);

    if(this.props.userId == this.props.reviewUserId){
      return(
        <div>
          <div>
            <Button icon onClick={this.show}>mode_edit</Button>
            <Button icon onClick={() => {if (window.confirm('Are you sure you wish to delete this review?')) this.deleteReview(this.props.reviewId)}}>delete</Button>
          </div>
          <div>
            <DialogContainer
            id="simple-action-dialog"
            visible={dialogVisible}
            onHide={this.hide}
            actions={actions}
            height={'300px'}
            width={'700px'}
            title={"Edit review of " + this.props.review.name}>
            <ReactStars count={5} size={24} value={this.state.rating} edit={true}
            color2={'#ffd700'} onChange={this.handleChangeRating}/>
            <TextField
                label="Rating text"
                id="TextField"
                type="text"
                rows={5}
                required={true}
                value={this.state.text}
                onChange={this.handleChangeText}
                errorText="Text is required"/>
          </DialogContainer>
          </div>
        </div>
      );
    } else {
      return(null);
    }
  }
}
