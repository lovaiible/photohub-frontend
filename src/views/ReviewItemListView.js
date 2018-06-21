"use strict";

import React from 'react';

import ReviewService from '../services/ReviewService';

import ReviewListItem from '../components/ReviewListItem';
import ReviewAverageValue from '../components/ReviewAverageValue';
import ReviewAverageValueOnlyStars from '../components/ReviewAverageValueOnlyStars';
import ReviewUpperBody from '../components/ReviewUpperBody';
import Page from '../components/page/Page';
import ReactStars from 'react-stars';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const linkStyle = {
  color: 'black'
};

const itemsPerPage = 5;
var avgValue = 0;

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
          total: 0,
          count: 0
      };
      this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    const renderedReviews = this.state.data.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);
    this.setState({ page, renderedReviews });
    this.notify();
  }

  notifySuccess() {
    toast.success("Thank you! Your review could successfully be added!");
  }
  notifyError() {
    toast.error("Something went wrong! Your review couldn't be added!");
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

componentDidUpdate() {
  if(this.state.count == 0){
    if (window.location.href.indexOf('success') > -1) {
      this.notifySuccess();
    } else if (window.location.href.indexOf('error') > -1) {
      this.notifyError();
    }
    this.setState({count: 1});
  }
}

  render(){
    if (this.state.loading) {
        return (<h2>Loading...</h2>);
    }

    return(
      <Page>
        <div className="breadcrumbs">
          Home > Search > Profile > <b>Reviews</b>
        </div>
        <div>
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
        </div>
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
