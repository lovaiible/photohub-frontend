"use strict";

import React from 'react';

import {Confirm} from './../components/Confirm';
import ConfirmService from '../services/ConfirmService';

export class ConfirmView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
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



        /* let bookingId = this.props.match.params.bookingID;

        ConfirmService.getBooking(bookingId).then((data) => {
            this.setState({
                data: bookingId,
                loading: false,
                error: undefined
            });
        }).catch((e) => {
            console.error(e);
        }); */
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<Confirm data={this.state.data} />);
    }
}