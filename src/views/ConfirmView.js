"use strict";

import React from 'react';

import Confirm from './../components/Confirm';
import ConfirmService from '../services/ConfirmService';

export class ConfirmView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                booking: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.booking != undefined) {
            this.setState({
                loading: false,
                booking: this.props.location.state.booking,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let bookingId = this.props.match.params.bookingID;

            ConfirmService.getBooking(bookingId).then((data) => {
                this.setState({
                    booking: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    updateBooking(booking) {
        if(this.state.bookingID == undefined) {
            ConfirmService.createBooking(bookingID).then((data) => {
                this.props.history.push('/');
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
            });
        } else {
            ConfirmService.updateBooking(bookingID).then((data) => {
                this.props.history.goBack();
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<Confirm bookingID={this.state.bookingID} onSubmit={(bookingID) => this.updateBooking(bookingID)} error={this.state.error} />);
    }
}