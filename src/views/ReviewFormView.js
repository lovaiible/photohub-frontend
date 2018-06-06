"use strict";

import React from 'react';

import ReviewForm from './../components/ReviewForm';

import ReviewService from '../services/ReviewService';


export class ReviewFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/addReview') {
            this.setState({
                loading: false,
                review: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.review != undefined) {
            this.setState({
                loading: false,
                review: this.props.location.state.review,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            ReviewService.getReview(id).then((data) => {
                this.setState({
                    review: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    updateReview(review) {
        if(this.state.review == undefined) {
            ReviewService.createReview(review).then((data) => {
                this.props.history.push('/');
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
            });
        } else {
            ReviewService.updateReview(review).then((data) => {
                this.props.history.goBack();
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<ReviewForm review={this.state.review} onSubmit={(review) => this.updateReview(review)} error={this.state.error} />);
    }
}
