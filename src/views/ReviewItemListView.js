"use strict";

import React from 'react';

import ReviewService from '../services/ReviewService';

import ReviewListItem from '../components/ReviewListItem';
import ReviewAverageValue from '../components/ReviewAverageValue';
import ReviewAverageValueOnlyStars from '../components/ReviewAverageValueOnlyStars';
import ReviewUpperBody from '../components/ReviewUpperBody';
import Page from '../components/Page';
import ReactStars from 'react-stars';

import { Table } from 'react-bootstrap';
import { TableRow, TableColumn, FontIcon, Button, Grid, Cell, SVGIcon } from 'react-md';

import Pagination from '../components/PaginationNew';

import { Link } from 'react-router-dom';

const countRowStyles = {
    margin: 'auto',
    width: '70%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};

const lineStyle = {
    width: '75%',
    size: '2px'
};

const fontStyleReviews = {
  fontSize: '18px'
};

const lineItemStyle = {
  listStyleType: 'none'
};

const breadcrumbStyle ={
  fontSize: '14px',
  marginTop: '10px'
};
const linkStyle = {
  color: 'black'
};

const pId = `2z`;
const itemsPerPage = 5;
var avgValue = 0;
const baseURL = '';

export class ReviewItemListView extends React.Component {
  constructor(props) {
      super(props);
      let pId = this.props.match.params.id;
      this.state = {
          loading: false,
          avg: [],
          data: [],
          renderedReviews: [],
          pId: pId,
          page: 1,
          total: 0
      };
      this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    const renderedReviews = this.state.data.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);
    this.setState({ page, renderedReviews });
  }

  componentWillMount(){
      this.setState({
          loading: true
      });

      ReviewService.getReviews(this.state.pId).then((data) => {
          this.setState({
              data: [...data],
              renderedReviews: data.slice(0, itemsPerPage),
              total: data.length,
              loading: false
          });
      }).catch((e) => {
          console.error(e);
      });

      ReviewService.getAvgRating(this.state.pId).then((data) => {
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
        <div style={breadcrumbStyle}>
          Home > Search > Profile > <b>Reviews</b>
        </div>
        <ul>
          <div>
            <ReviewUpperBody pId={this.state.pId} location={'Munich, Germany'} pName={'Max Mustermann'} pInfoText={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At'}></ReviewUpperBody>
          </div>
          <div style={countRowStyles}>
            <Grid>
              <Cell size={11} style={fontStyleReviews}>
                {this.state.avg.map((avg) => <ReviewAverageValue avg={avg} key={avg._id} length={this.state.data.length}/>)}
              </Cell>
              <Cell size={1}>
                <Button floating primary swapTheming onClick={() => this.props.history.push('/addReview/' + this.state.pId)} disabled={false}>add</Button>
              </Cell>
            </Grid>
          </div>
          <hr style={lineStyle}/>
        </ul>
        <ul id="review-list">
          {
            this.state.renderedReviews.map((review) =>
            <li key={review._id} id="review-list" style={lineItemStyle}>
              <ReviewListItem review={review}/>
            </li>)
          }
        </ul>
        <Pagination
          margin={2}
          page={this.state.page}
          count={Math.ceil(this.state.total / itemsPerPage)}
          onPageChange={this.handlePageChange}x
        />
      </Page>
    );
  }
}
