"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField, FontIcon, Grid, Cell} from 'react-md';

import Page from './Page'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactStars from 'react-stars'

const itemUpperBodyWrapperStyle = {
    margin: 'auto',
    width: '70%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};

const photographerNameStyle = {
  fontSize: '30px',
  marginBottom: '5px'
};

const reviewUpperBodyTextStyle = {
  marginTop: '25px',
  marginBottom: '50px',
};

export default class ReviewUpperBody extends React.Component {
  constructor(props){
    super(props);
    console.log('PhotographerID in upper body: ' + this.props.pId);
  }

  render(){
    return(
        <div className="reviewUpperBodyWrapper" style={itemUpperBodyWrapperStyle}>
          Breadcrumbs
          <Grid className="grid-example">
            <Cell size={2}>
  
            </Cell>
            <Cell size={10}>
                <div style={photographerNameStyle}>
                  <b>{this.props.pName}</b>
                </div>
                <div>
                  <FontIcon>location_on</FontIcon>
                  {this.props.location}
                </div>
                <div style={reviewUpperBodyTextStyle}>
                  {this.props.pInfoText}
                </div>
              </Cell>
          </Grid>
        </div>
    )
  }
}
