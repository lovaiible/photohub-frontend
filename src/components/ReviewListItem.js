"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField, FontIcon, Grid, Cell, Avatar} from 'react-md';

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactStars from 'react-stars'

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

  render(){
    return(
        <div className="reviewItemWrapper" style={itemWrapperStyle}>
          <Grid className="grid-example">
            <Cell size={1}>
                <Avatar random>{this.state.firstLetter}</Avatar>
            </Cell>
            <Cell size={11}>
                <div className="reviewHeader">
                  <ReactStars count={5} size={20} value={this.props.review.rating} edit={false} color2={'#ffd700'} />
                </div>
                <div className="reviewDateAndStars">
                  By <b>{this.props.review.name}</b> on <b>{this.props.review.date}</b> (Photographer: {this.props.review.photographerId})
                </div>
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
