"use strict";

import React from 'react';

import ReviewService from '../services/ReviewService';
import ProfileService from '../services/ProfileService';
import UserService from '../services/UserService';

import ReviewListItem from '../components/ReviewListItem';
import ReviewAverageValue from '../components/ReviewAverageValue';
import ReviewAverageValueOnlyStars from '../components/ReviewAverageValueOnlyStars';
import ReviewUpperBody from '../components/ReviewUpperBody';
import ReactStars from 'react-stars';
import PhotographerDescription from '../components/PhotographerDescription';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Table } from 'react-bootstrap';
import { TableRow, TableColumn, FontIcon, Button, Grid, Cell, SVGIcon } from 'react-md';

import Pagination from '../components/PaginationNew';

import { Link } from 'react-router-dom';
import Page from "../components/page/Page";

const countRowStyles = {
    margin: 'auto',
    width: '70%',
    border: '0px solid black',
    marginTop: '10px',
    padding: '5px'
};

const lineStyle = {
    width: '100%',
};

const fontStyleReviews = {
  fontSize: '18px'
};

const lineItemStyle = {
  listStyleType: 'none'
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
          count: 0,
          profile: [],
          title:'',
          description: '',
          city: ''
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
  notifyDeleted() {
    toast.success("Your review could successfully be deleted!");
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

      ProfileService.getProfile(this.state.pId).then((data)=> {
          this.setState({
              loading: false,
              profile: data,
              city: data.location.city
          });
      }).catch((e) => {
          console.error(e);
      });

      this.setState({user: UserService.getCurrentUser()});
  }

componentDidUpdate() {
  if(this.state.count == 0){
    if (localStorage.getItem('notification') == 'success') {
      this.notifySuccess();
      localStorage.removeItem('notification');
    } else if (localStorage.getItem('notification') == 'error') {
      this.notifyError();
      localStorage.removeItem('notification');
    } else if (localStorage.getItem('notification') == 'deleted') {
      this.notifyDeleted();
      localStorage.removeItem('notification');
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
          <Link to={'/'} className="breadcrumbLink">Home</Link> > Search > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">Profile</Link> > <b>Reviews</b>
        </div>
        <div>
          <div>
            <PhotographerDescription  profile={this.state.profile} title={this.state.profile.title} city={this.state.city}
            description={this.state.profile.description} pID={this.state.pId} avg={this.state.avg}/>
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
          <hr className="horizontalLine" style={lineStyle}/>
        </div>
        <ul id="review-list">
          {
            this.state.renderedReviews.map((review) =>
            <li key={review._id} id="review-list" style={lineItemStyle}>
              <ReviewListItem review={review} user={this.state.user} pId={this.state.pId} history={this.props.history}/>
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
