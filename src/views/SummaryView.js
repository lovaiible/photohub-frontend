"use strict";

import React from 'react';

import Summary from './../components/Summary';
import SummaryService from '../services/SummaryService';

export class SummaryView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            id: '',
            bookingID: this.props.match.params.bookingID,
            pId: this.props.match.params.pId,
            payment: this.props.match.params.payment,
            date: this.props.match.params.date
        };
    }

    componentWillMount() {
        SummaryService.getBooking(this.state.id).then((data) => {
            this.setState({
                data: data,
                loading: false,
                error: undefined
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<Summary data={this.state.data} pId={this.state.pId} date={this.state.date}  payment={this.state.payment} bookingID={this.state.bookingID} />);
    }
}