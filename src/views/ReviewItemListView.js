"use strict";

import React from 'react';


import ReviewService from '../services/ReviewService';
import ReviewItemList from '../components/ReviewItemList';
import ReviewListItem from '../components/ReviewListItem';
import Page from '../components/Page'
import ReactPaginate from 'react-paginate';

import { Table, Pagination } from 'react-bootstrap';

const countRowStyles = {
    margin: 'auto',
    width: '80%',
    border: '1px solid black',
    marginTop: '10px',
    padding: '5px'
};

export class ReviewItemListView extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          loading: false,
          data: [],
          activePage: 1,
          count: 0,
          mean: 0
      };
  }

  componentWillMount(){
      this.setState({
          loading: true
      });

      ReviewService.getReviews().then((data) => {
          this.setState({
              data: [...data],
              loading: false
          });
      }).catch((e) => {
          console.error(e);
      });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);

    this.state = {
      activePage: pageNumber
    };
  }

  render(){
    if (this.state.loading) {
        return (<h2>Loading...</h2>);
    }

    return(
      <Page>
        <ul>
          <div style={countRowStyles}>
            <b>{this.state.data.length}</b> Reviews
          </div>
        </ul>
        <ul>
          {this.state.data.map((review) => <ReviewListItem review={review} key={review._id}/>)}
        </ul>
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
         <Pagination
           activePage={this.state.activePage}
           itemsCountPerPage={5}
           totalItemsCount={450}
           pageRangeDisplayed={5}
           onChange={this.handlePageChange}
         />
      </Page>
    );
  }
  changePage(page) {
    this.props.dispatch(push('/?page=' + page));
  }

}
