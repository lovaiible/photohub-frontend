"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField } from 'react-md';
import { withRouter } from 'react-router-dom'

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class ReviewForm extends React.Component {

    constructor(props) {
        super(props);

        if(this.props.review != undefined) {
            this.state = {
                name : props.review.name,
                date : props.review.date,
                rating : props.review.rating,
                text: props.review.text
            };
        } else {
            this.state = {
                name : '',
                date : '',
                rating : '',
                text: ''
            };
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(value) {
        this.setState(Object.assign({}, this.state, {name: value}));
    }

    handleChangeDate(value) {
        this.setState(Object.assign({}, this.state, {date: value}));
    }

    handleChangeRating(value) {
        this.setState(Object.assign({}, this.state, {rating: value}));
    }

    handleChangeText(value) {
        this.setState(Object.assign({}, this.state, {text: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let review = this.props.review;
        if(review == undefined) {
            review = {};
        }

        review.name = this.state.name;
        review.rating = this.state.rating;
        review.date = this.state.date;
        review.text = this.state.text;

        this.props.onSubmit(review);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Name"
                            id="NameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            errorText="Name is required"/>
                        <TextField
                            label="Date"
                            id="DateField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.date}
                            onChange={this.handleChangeDate}
                            errorText="Date is required"/>
                        <TextField
                            label="Rating"
                            id="RatingField"
                            type="Number"
                            className="md-row"
                            required={false}
                            value={this.state.rating}
                            onChange={this.handleChangeRating}/>
                        <TextField
                            label="Text"
                            id="TextField"
                            type="text"
                            className="md-row"
                            rows={5}
                            required={true}
                            value={this.state.text}
                            onChange={this.handleChangeText}
                            errorText="Text is required"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.date.toString().length < 5 || this.state.name == undefined || this.state.name == '' || this.state.date == undefined || this.state.date == '' || this.state.text == undefined || this.state.text == ''}
                                raised primary className="md-cell md-cell--2">Save</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(ReviewForm);
