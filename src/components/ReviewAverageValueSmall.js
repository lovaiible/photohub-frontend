"use strict";

import React from 'react';
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom';

export default class ReviewAverageValueSmall extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.noReviews == false) {
      return(
        <div>
          <ReactStars count={5} size={20} value={parseFloat(this.props.avg.avgRating.toFixed(1))} edit={false} color2={'#ffd700'} />
          <Link to={'/viewReviews/' +this.props.pId} ><b>{this.props.avg.avgRating.toFixed(1)}</b> of 5 stars</Link>
        </div>
    )} else {
      return(
        <div>
          <ReactStars count={5} size={20} value={0} edit={false} color2={'#ffd700'} />
          <Link to={'/addReview/' + this.props.pId} >Add first review</Link>
        </div>
      );
    }
  }
};
