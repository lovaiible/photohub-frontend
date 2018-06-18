"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField } from 'react-md';

import Page from './Page'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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
