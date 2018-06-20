"use strict";

import React from 'react';
import ReactStars from 'react-stars'

export default class ReviewAverageValue extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="avgRatingValue">
        <ReactStars count={5} size={30} value={parseFloat(this.props.avg.avgRating.toFixed(1))} edit={false} color2={'#ffd700'} />
      </div>
  )};
};
