"use strict";

import React from 'react';
import Page from './Page';
import {
    Card,
    CardTitle,
    CardText,
    Button
} from 'react-md'
import {randomString} from 'randomstring';

const style = {maxWidth: 1000};

export class Booking extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            discountCode: ''
        };

        this.handleChangeDiscount = this.handleChangeDiscount.bind(this);
    }

    handleChangeDiscount(event) {

        const randomString = require("randomstring");

        randomString.generate({
            length: 12,
            charset: 'hex'
        });
        this.setState({discountCode: event});
    }

    render() {
        return <Page>
            <Card style={style}>
                <CardTitle title="Booking confirmation"
                           subtitle="Thank you for using PhotoHub!"/>

                <CardText>Your bookingID is: ++BookingID++</CardText>

                <h2>Summary</h2>
                <CardText>Photographer: </CardText>
                <CardText>Title: {this.props.movie.title} </CardText>
                <CardText>Service Description: </CardText>
                <CardText>Date: </CardText>
                <CardText>Additional information: </CardText>
                <CardText>Price: </CardText>
                <CardText>Payment Method: </CardText>

                <Button flat primary swapTheming onClick={this.handleChangeDiscount}>
                    Generate Discount Code
                </Button>


            </Card>


        </Page>
    };
}