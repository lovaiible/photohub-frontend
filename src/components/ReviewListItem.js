"use strict";

import React from 'react';
import {Grid, Cell, Avatar, FontIcon} from 'react-md';
import ReactStars from 'react-stars'
import ReviewEditAndDelete from './ReviewEditAndDelete';

const itemWrapperStyle = {
    margin: 'auto',
    width: '75%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};


export default class ReviewListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstLetter: (this.props.review.name.slice(0,1))
    };
  }
  EditAndDelete(id){
    if(id == this.props.review.userId){
      return(
        <Cell size={1}>
          <FontIcon>mode_edit</FontIcon>
          <FontIcon>delete</FontIcon>
        </Cell>
      );
    }
  }

  render(){
    return(
        <div className="reviewItemWrapper" style={itemWrapperStyle}>
          <Grid className="grid-example">
            <Cell size={1}>
                <Avatar random>{this.state.firstLetter}</Avatar>
            </Cell>
            <Cell size={10}>
              <div className="reviewHeader">
                <ReactStars count={5} size={20} value={this.props.review.rating} edit={false} color2={'#ffd700'} />
              </div>
              <div className="reviewDateAndStars">
                By <b>{this.props.review.name}</b> on <b>{this.props.review.date}</b>
              </div>
            </Cell>
            <Cell size={1}>
              <ReviewEditAndDelete userId={this.props.user.id} reviewUserId={this.props.review.userId}/>
            </Cell>
          </Grid>
          <div className="reviewText">
            {this.props.review.text}
            {this.props.review.avgRating}
          </div>
        </div>
    )
  }
}
