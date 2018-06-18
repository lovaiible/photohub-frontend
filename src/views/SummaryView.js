"use strict";

import React from 'react';

import Summary from './../components/Summary';
import SummaryService from '../services/SummaryService';

export class ConfirmView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount() {
        SummaryService.getBooking(id).then((data) => {
            this.setState({
                data: id,
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

        return (<Summary data={this.state.data}/>);
    }
}