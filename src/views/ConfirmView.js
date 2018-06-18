"use strict";

import React from 'react';

import {Confirm} from './../components/Confirm';
import ConfirmService from '../services/ConfirmService';

export class ConfirmView extends React.Component {

    constructor(props) {
        super(props);

        let pId = this.props.match.params.id;
        let price = this.props.match.params.price;

        this.state = {
            loading: false,
            data: [],
            booking: undefined,
            pId: pId,
            price: price
        };
    }

    componentWillMount() {

        this.setState({
            loading: true
        });

        ConfirmService.getBookings().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    createBooking(booking) {
        if (this.state.date !== undefined) {
            ConfirmService.createBooking(booking).then((data) => {
                this.props.history.push('/showSummary/:_id');
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            });
        }

    }

    updateBooking(booking) {

        ConfirmService.createBooking(booking).then((data) => {
            this.props.history.push('/showSummary/'+ booking._id);
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
        });
        console.log(booking._id);
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<Confirm booking={this.state.booking} onSubmit={(booking) => this.updateBooking(booking)} error={this.state.error}
                         pId={this.state.pId} price={this.state.price} />);
    }
}