"use strict";

import React from 'react';
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom';

export default class ReviewAverageValue extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <ReactStars count={5} size={20} value={parseFloat(this.props.avg.avgRating.toFixed(1))} edit={false} color2={'#ffd700'} />
        <Link to={'/viewReviews/' +this.props.pId} ><b>{this.props.avg.avgRating.toFixed(1)}</b> of 5 stars</Link>
      </div>
  )};
};
