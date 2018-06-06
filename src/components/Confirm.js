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
import ReactStars from 'react-stars'
import { RadioGroup, RadioButton } from 'react-radio-buttons';


import Page from './Page';
import Visa from '../../src/img/payments/Visa Logo.jpg'
import MasterCard from '../../src/img/payments/MasterCard Logo.png'
import PayPal from '../../src/img/payments/Paypal Logo.jpg'
import Sofort from '../../src/img/payments/Sofort.png'


import UserService from '../services/UserService';


const style = {maxWidth: 1000};


export class Confirm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            payment: '',
            date:'',
            addInfo:''
        };

        this.handleChangePayment = this.handleChangePayment.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeAddInfo = this.handleChangeAddInfo.bind(this);
    //    this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleChangePayment(event){
        this.setState({payment: event});
    }

    handleChangeDate(event){
        this.setState({date: event});
    }

    handleChangeAddInfo(event){
        this.setState({addInfo: event});
    }

    //handleSubmit(event){
        //event.preventDefault();

     //   booking.payment = this.state.payment;

     //   this.props.onSubmit(booking)
   // }




    render() {
        return <Page>
            <Card style={style} className="md-block-centered">
                <CardTitle title="Confirm and Pay"
                           subtitle="Please confirm your booking details and select a payment method below."/>

                <Grid className="grid-example"
                      //onSubmit={this.handleSubmit()}
                >
                    <Cell size={3}>
                        <Media aspectRatio="1-1">
                            <img src={this.props.movie.posters.detailed} alt={this.props.movie.title}/>
                        </Media>
                    </Cell>
                    <Cell size={7}>
<<<<<<< HEAD
                        <h1>Portrait Photography</h1>
                        <p>Max Mustermann: </p>
                        <ReactStars count={5} size={24} color2={'#ffd700'} value={4} edit={false}/>
=======
                        <h1>{this.props.movie.title}</h1>
                        <p>Max Mustermann: Rating: <b>8.0</b>/10</p>
>>>>>>> f508bbdc659ca757652e0726fe57fcb63d1e8d72
                        <div id="showRating"/>
                        <p>Servicebeschreibung</p>

                    </Cell>
                    <Cell size={2}>
                        <h2>{this.props.service.title}</h2>
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
                        disabledDays={{before: Date.now()}}
                        displayMode="landscape"
                        disableWeekEnds={true}
                        showAllDays={false}
                        cancelLabel={"Cancel"}
                        okLabel={"Confirm"}/>
                    <TextField
                        onChange={this.handleChangeAddInfo}
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
                    <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                        <a href="https://www.visa.com"
                           title="Select Visa as your payment method">
                            <img src={Visa}
                                 alt="Visa"
                                 width={150}
                                 height={100}
                                 align="middle"
                                 />
                        </a>
                    </Cell>
                    <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                        <a href="https://www.mastercard.com"
                           title="Select MasterCard as your payment method">
                            <img src={MasterCard}
                                 alt="MasterCard"
                                 width={150}
                                 height={100}
                            />
                        </a>
                    </Cell>
                    <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                        <a href="https://www.paypal.com"
                           title="Select PayPal as your payment method">
                            <img src={PayPal}
                                 alt="PayPal"
                                 width={150}
                                 height={100}
                            />
                        </a>
                    </Cell>
                    <Cell size={3} style={{display: 'flex', justifyContent: 'center'}}>
                        <a href={"https://www.klarna.com/sofort/"}
                           title="Select 'Sofortueberweisung' as your payment method">
                            <img src={Sofort}
                                 alt="Sofortueberweisung"
                                 width={150}
                                 height={100}
                            />
                        </a>
                    </Cell>
                </Grid>
                <RadioGroup horizontal onChange={this.handleChangePayment}>
                    <RadioButton value="Visa" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                        <b>Visa</b>
                    </RadioButton>
                    <RadioButton value="Mastercard" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                        <b>Mastercard</b>
                    </RadioButton>
                    <RadioButton value="Paypal" rootColor={'#000000'} pointColor={'#000000'} iconSize={5}>
                        <b>Paypal</b>
                    </RadioButton>
                    <RadioButton value="Sofort" rootColor={'#000000'} pointColor={'#000000'}iconSize={5}>
                        <b>Sofortüberweisung</b>
                    </RadioButton>
                </RadioGroup>

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