"use strict";

import React from 'react';
import {Link} from 'react-router-dom'
import {
    Card,
    CardTitle,
    CardText,
    Media,
    MediaOverlay,
    Grid,
    Cell,
    Button,
    FontIcon,
    DatePicker,
    TextField
} from 'react-md';


import Page from './Page';

import UserService from '../services/UserService';


const style = {maxWidth: 1000};


export class Confirm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Page>
            <Card style={style} className="md-block-centered">
                <CardTitle title="Confirm and Pay"
                           subtitle="Please confirm your booking details and select a payment method below."/>

                <Grid className="grid-example">
                    <Cell size={3}>
                        <Media aspectRatio="1-1">
                            <img src={this.props.movie.posters.detailed} alt={this.props.movie.title}/>
                        </Media>
                    </Cell>
                    <Cell size={7}>
                        <h1>Portrait Photography</h1>
                        <p>Max Mustermann: Rating: <b>8.0</b>/10</p>
                        <div id="showRating"/>
                        <p>Date: May 18th, 2018</p>
                        <p>Servicebeschreibung</p>

                    </Cell>
                    <Cell size={2}>
                        <h2>100.00 Euro</h2>
                    </Cell>
                </Grid>

                <CardText>
                    <h3>Please provide information below</h3>
                    <DatePicker
                        id="appointment-date-auto"
                        required
                        label="Select an appointment date"
                        className="md-cell"
                    />
                    <TextField
                        id="Additional Information"
                        label="Additional Information"
                        rows={2}
                        maxLength={300}
                        placeholder="What should the photographer need to know?"
                        className="insertAddress"
                    />
                </CardText>

                <CardText>
                    <h3>Please select your preferred payment method</h3>
                </CardText>

                <Grid>
                    <Cell size={3}>
                        <a href="https://www.visa.com"
                           title="Select Visa as your payment method">
                            <img src="https://www.designtagebuch.de/wp-content/uploads/mediathek//2014/01/visa_2014-700x455.jpg"
                                 border={1}
                                 alt="Visa"
                                 width={150}
                                 height={94}/>
                        </a>
                    </Cell>
                    <Cell size={3}>
                        <a href="https://www.mastercard.com"
                           title="Select MasterCard as your payment method">
                            <img src="https://www.designtagebuch.de/wp-content/uploads/mediathek//2016/07/mastercard_logo-700x490.png"
                                 border={1}
                                 alt="MasterCard"
                                 width={150}
                                 height={94}/>
                        </a>
                    </Cell>
                    <Cell size={3}>
                        <a href="https://www.paypal.com/webapps/mpp/paypal-popup"
                           title="Select PayPal as your payment method">
                            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg"
                                            border={1} alt="PayPal"/>
                        </a>
                    </Cell>
                    <Cell size={3}>
                        <a href={"https://www.klarna.com/sofort/"}
                           title="Select 'Sofortueberweisung' as your payment method">
                            <img src="http://www.paydirect-casinos.com/wp-content/uploads/2016/04/sofortueberweisung-logo.jpg"
                                 border={1}
                                 alt="Sofortueberweisung"
                                 width={150}
                                 height={94}
                            />
                        </a>
                    </Cell>
                </Grid>

                <CardText>
                    <h3>Cancellation Policy</h3>
                    <div>Here stands the cancellation policy of PhotoHub</div>
                </CardText>

                <Grid>
                    <Cell size={2}>
                        <div>
                            <Button flat primary swapTheming>
                                Confirm
                            </Button>
                        </div>
                    </Cell>
                    <Cell size={2}>
                        <div>
                            <Button flat secondary swapTheming>
                                Cancel
                            </Button>
                        </div>
                    </Cell>
                </Grid>


            </Card>
        </Page>
    ;
    }
    }