"use strict";

import React from 'react';

import ReviewService from '../services/ReviewService';

import ReviewListItem from '../components/ReviewListItem';
import ReviewAverageValue from '../components/ReviewAverageValue';
import ReviewUpperBody from '../components/ReviewUpperBody';
import Page from '../components/Page';
import ReactPaginate from 'react-paginate';
import ReactStars from 'react-stars';

import { Table, Pagination } from 'react-bootstrap';
import { TableRow, TableColumn, FontIcon, Button, Grid, Cell, SVGIcon } from 'react-md';


const countRowStyles = {
    margin: 'auto',
    width: '70%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};

const lineStyle = {
    width: '70%'
};

const fontStyleReviews = {
  fontSize: '18px'
};

const pId = `1z`;
var avgValue = 0;

export class ReviewItemListView extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          loading: false,
          avg: [],
          data: []
      };
  }

  componentWillMount(){
      this.setState({
          loading: true
      });

      ReviewService.getReviews(pId).then((data) => {
          this.setState({
              data: [...data],
              loading: false
          });
      }).catch((e) => {
          console.error(e);
      });

      ReviewService.getAvgRating(pId).then((data) => {
          this.setState({
              avg: [...data],
              loading: false
          });
          avgValue = data[0].avgRating;

      }).catch((e) => {
          console.error(e);
      });
  }

  render(){
    if (this.state.loading) {
        return (<h2>Loading...</h2>);
    }

    return(
      <Page>
        <ul>
          <div>
            <ReviewUpperBody pId={pId}></ReviewUpperBody>
          </div>
          <div style={countRowStyles}>
            <Grid>
              <Cell size={2} style={fontStyleReviews}>
                <b>{this.state.data.length}</b> Reviews with
              </Cell>
              <Cell size={9} style={fontStyleReviews}>
                {this.state.avg.map((avg) => <ReviewAverageValue avg={avg} key={avg._id}/>)}
              </Cell>
              <Cell size={1}>
                <Button floating primary swapTheming onClick={() => this.props.history.push('/addReview/' + pId)} disabled={false}>add</Button>
              </Cell>
            </Grid>
          </div>
          <hr style={lineStyle}/>
        </ul>
        <ul>
          {this.state.data.map((review) => <ReviewListItem review={review} key={review._id}/>)}
        </ul>
      </Page>
    );
  }
}
