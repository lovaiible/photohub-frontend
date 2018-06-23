"use strict";

import React from 'react';
import {Grid, Cell, Avatar, FontIcon} from 'react-md';
import ReactStars from 'react-stars'

export default class ReviewEditAndDelete extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.userId == this.props.reviewUserId){
      return(
        <div>
          <FontIcon>mode_edit</FontIcon>
          <FontIcon>delete</FontIcon>
        </div>
      );
    } else {
      return(null);
    }
  }
}
