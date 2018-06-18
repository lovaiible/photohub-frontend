"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField, DatePicker, Grid, Cell } from 'react-md';
import { withRouter } from 'react-router-dom'

import { AlertMessage } from './AlertMessage';

import ReactStars from 'react-stars'

const style = { maxWidth: 700, marginTop: '20px' };

const textBoxStyle = {
  marginLeft: '15px'
};

const bottomStyle = {
  display: 'flex',
  justifyContent: 'center',
   alignItems: 'center'
};

class ReviewForm extends React.Component {

    constructor(props) {
        super(props);

        var MyDate = new Date();
        var MyDateString = MyDate.getFullYear()+ '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
        let id = this.props.match.params.id;

        this.state = {
            name : this.props.uName,
            date : MyDateString,
            rating : 0,
            text: '',
            photographerId: id
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangephotographerId = this.handleChangephotographerId.bind(this);

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
    handleChangephotographerId(value) {
        this.setState(Object.assign({}, this.state, {photographerId: value}));
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
        review.photographerId = this.state.photographerId;

        this.props.onSubmit(review);
    }

    render() {
        return (
                <Card style={style} className="md-block-centered">
                    <form onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                    <h3 style={textBoxStyle}> Create a new Review</h3>
                      <Grid>
                        <Cell size={1}>
                          <label>Rating:</label>
                        </Cell>
                        <Cell size={3}>
                          <ReactStars count={5} size={24} value={this.state.rating} edit={true}
                          color2={'#ffd700'} onChange={this.handleChangeRating}/>
                        </Cell>
                      </Grid>
                        <TextField
                            label="Name"
                            id="NameField"
                            type="text"
                            required={true}
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            errorText="Name is required"
                            style={textBoxStyle}/>
                        <TextField
                            label="Date"
                            id="DateField"
                            type="text"
                            required={false}
                            value={this.state.date}
                            onChange={this.handleChangeDate}
                            errorText="Date is required"
                            disabled={false}
                            style={textBoxStyle}/>
                        <TextField
                            label="Text"
                            id="TextField"
                            type="text"
                            rows={5}
                            required={true}
                            value={this.state.text}
                            onChange={this.handleChangeText}
                            errorText="Text is required"
                            style={textBoxStyle}/>
                        <TextField
                            label="Photographer"
                            id="photographerIdField"
                            type="text"
                            required={false}
                            value={this.state.photographerId}
                            onChange={this.handleChangephotographerId}
                            style={textBoxStyle}/>
                        <Grid>
                          <Cell size={4}></Cell>
                          <Cell size={1}>
                          <Button id="submit" type="submit"
                                  disabled={this.state.date.toString().length < 5 || this.state.name == undefined || this.state.name == '' || this.state.date == undefined || this.state.date == '' || this.state.text == undefined || this.state.text == '' || this.state.photographerId == undefined || this.state.photographerId == '' || this.state.rating > 5 || this.state.rating <= 0}
                                  raised primary className="md-cell md-cell--2">Save</Button>
                          </Cell>
                          <Cell size={1}></Cell>
                          <Cell size={1}>
                            <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                          </Cell>
                        </Grid>
                        <Grid>
                          <Cell size={4}></Cell>
                          <Cell size={3}>
                            <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                          </Cell>
                        </Grid>
                    </form>
                </Card>
        );
    }
}

export default withRouter(ReviewForm);
