"use strict";

import React from 'react';

import { ReviewList } from '../components/ReviewList';

import ReviewService from '../services/ReviewService';
import { TablePagination } from 'react-pagination-table';

export class ReviewListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
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

    deleteReview(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        ReviewService.deleteReview(id).then((message) => {

            let reviewIndex = this.state.data.map(review => review['_id']).indexOf(id);
            let reviews = this.state.data;
            reviews.splice(reviewIndex, 1);
            this.setState({
               data: [...reviews],
               loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (

            <TablePagination
              title="TablePagination"
              subTitle="Sub Title"
              headers={ ["Name", "Date", "Text", "Rating" ] }
              data={ this.state.data }
              columns="name.date.text.rating"
              perPageItemCount={ 5 }
              totalCount={ this.state.data.length }
              arrayOption={ [["size", 'all', ' ']] }
          />
        );
    }
}
