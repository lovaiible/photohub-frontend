"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField, FontIcon, Grid, Cell} from 'react-md';

import Page from './Page'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactStars from 'react-stars'

const itemWrapperStyle = {
    margin: 'auto',
    width: '80%',
    border: '1px solid black',
    marginTop: '10px',
    padding: '5px'
};

export default class ReviewListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
        <div className="reviewItemWrapper" style={itemWrapperStyle}>
          <Grid className="grid-example">
            <Cell size={1}>
                <FontIcon>image</FontIcon>
            </Cell>
            <Cell size={11}>
                <div className="reviewHeader">
                  <ReactStars count={5} size={20} value={this.props.review.rating} edit={false} color2={'#ffd700'} />
                </div>
                <div className="reviewDateAndStars">
                  By <b>{this.props.review.name}</b> in <b>{this.props.review.date}</b>
                </div>
              </Cell>
          </Grid>
          <div className="reviewText">
            {this.props.review.text}
          </div>
        </div>
    )
  }

}
