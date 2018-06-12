"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField, FontIcon, Grid, Cell} from 'react-md';

import Page from './Page'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactStars from 'react-stars'
//import PhotographerPicture from  '../img/PhotographerPicture.jpg'

const itemUpperBodyWrapperStyle = {
    margin: 'auto',
    width: '70%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};

const photographerNameStyle = {
  fontSize: '20px',
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
                  <b>Max Mustermann</b>
                </div>
                <div>
                  <FontIcon>location_on</FontIcon>
                  Munich, Germany
                </div>
                <div style={reviewUpperBodyTextStyle}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                </div>
              </Cell>
          </Grid>
        </div>
    )
  }
}
