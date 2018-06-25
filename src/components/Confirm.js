"use strict";

import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
    Media,
    Grid,
    Cell,
    Button,
    DatePicker,
    TextField
} from 'react-md';
import {RadioGroup, RadioButton} from 'react-radio-buttons';
import Page from './page/Page';
import ReviewAverageValue from './ReviewAverageValue';
import ReactStars from 'react-stars';
import {withRouter, Link} from "react-router-dom";
import moment from "moment/moment";

const style = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '15px'
    },
    gridList: {
        overflowY: 'auto',
        width: '100%'
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

window.localStorage;

export class Confirm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            payment: '',
            date: '',
            addInfo: '',
            pId: this.props.pId,
            avatar: this.props.pAvatar,
            description: this.props.sDescription,
            pName: this.props.pName,
            category: this.props.category


        };

        this.handleChangePayment = this.handleChangePayment.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeAddInfo = this.handleChangeAddInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChangePayment(event) {
        this.setState({payment: event});
    }

    handleChangeDate(event) {
        this.setState({date: event});
    }

    handleChangeAddInfo(event) {
        this.setState({addInfo: event});
    }

    handleSubmit(event) {
        event.preventDefault();

        let booking = this.props.booking;
        if (booking == undefined) {
            booking = {};
        }

        booking.bookingID = Math.floor((Math.random() * 100000000) + 1).toString();
        booking.date = this.state.date;
        booking.payment = this.state.payment;
        booking.addInfo = this.state.addInfo;
        booking.pId = this.state.pId;
        booking.pName = this.props.pName;
        booking.price = this.props.price;
        booking.category = this.state.category;


        localStorage.setItem("payment", this.state.payment);
        localStorage.setItem("date", this.state.date);
        localStorage.setItem("addInfo", this.state.addInfo);
        localStorage.setItem("bookingID", booking.bookingID);
        localStorage.setItem("pId", this.props.pId);
        localStorage.setItem("pName", this.props.pName);
        localStorage.setItem("price", this.props.price);
        localStorage.setItem("category", this.props.category);

        this.props.onSubmit(booking);


    }

    render() {
        return <Page>
            <Card style={style} className="md-block-centered">
                <form onSubmit={this.handleSubmit} onReset={() => this.props.history.push("/profile/:id")} >
                    <CardTitle title="Confirm and Pay"
                               subtitle="Please confirm your booking details and select a payment method below."/>

                    <Grid className="grid-example">
                        <Cell size={3}>
                            <Media aspectRatio="1-1" >
                                <img src={this.props.pAvatar}/>
                            </Media>
                        </Cell>
                        <Cell size={7}>
                            <h1>{this.props.category}</h1>
                            <p>{this.props.pName} </p>
                            <ReviewAverageValue length={this.props.numberReviews} avgRating={this.props.avgRating}/>
                            <ReactStars count={5} size={24} value={parseFloat(this.props.avgRating.toFixed(1))} edit={false} color2={'#ffd700'} />
                            <div id="showRating"/>
                            <p>{this.props.sDescription}</p>

                        </Cell>
                        <Cell size={2}>
                            <h2>{this.props.price} Euro</h2>
                        </Cell>
                    </Grid>

                    <CardText>
                        <h3>Please provide information below</h3>
                        <DatePicker
                            onChange={this.handleChangeDate}
                            id="appointment-date"
                            required
                            label="Select an appointment date"
                            className="md-cell"
                            disableOuterDates={true}
                            displayMode="landscape"
                            minDate={moment().toDate()}
                            locales="en-US"
                            disableWeekEnds={true}
                            showAllDays={false}
                            //disabled={true}
                            //defaultValue={}
                        />
                        <TextField
                            onChange={this.handleChangeAddInfo}
                            id="Additional Information"
                            label="Additional Information"
                            maxLength={300}
                            placeholder="What should the photographer need to know?"
                            className="insertAddress"
                        />
                    </CardText>

                    <CardText>
                        <h3>Please select your preferred payment method</h3>
                    </CardText>

                    <Grid>
                        <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                            <img src="https://i.imgur.com/yLN9Xp5.jpg"
                                 alt="Visa"
                                 width={150}
                                 height={100}
                                 align="middle"
                            />
                        </Cell>
                        <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                            <img src="https://i.imgur.com/LtMahs7.png"
                                 alt="MasterCard"
                                 width={150}
                                 height={100}
                            />
                        </Cell>
                        <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                            <img src="https://i.imgur.com/Hu8ZzsL.jpg"
                                 alt="PayPal"
                                 width={150}
                                 height={100}
                            />
                        </Cell>
                        <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                            <img src="https://i.imgur.com/mgDfTFh.png"
                                 alt="Sofortueberweisung"
                                 width={150}
                                 height={100}
                            />
                        </Cell>
                    </Grid>
                    <RadioGroup horizontal onChange={this.handleChangePayment} required>
                        <RadioButton value="Visa" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                            <b>Visa</b>
                        </RadioButton>
                        <RadioButton value="Mastercard" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                            <b>Mastercard</b>
                        </RadioButton>
                        <RadioButton value="Paypal" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                            <b>Paypal</b>
                        </RadioButton>
                        <RadioButton value="Sofort" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                            <b>Sofortüberweisung</b>
                        </RadioButton>
                    </RadioGroup>

                    <CardText>
                        <h3>Cancellation Policy</h3>
                        <div>It isn't possible to cancel an already created booking.
                            You won't get the money back you already payed unless you don't make an agreement with the
                            photographer.
                        </div>

                    </CardText>

                    <Grid style={{display: 'flex', justifyContent: 'center'}}>
                        <Cell size={2}>
                            <Button id="submit" type="submit"
                                    className="md-cell md-cell--2"
                                    flat primary swapTheming>
                                Submit
                                <Link to={'/showSummary/'}/>
                            </Button>

                        </Cell>
                        <Cell size={2}>
                            <div>
                                <Button flat secondary swapTheming type="reset" id="reset">
                                    Cancel
                                </Button>
                            </div>
                        </Cell>
                    </Grid>
                </form>
            </Card>
        </Page>
            ;
    }
}

export default withRouter(Confirm);
