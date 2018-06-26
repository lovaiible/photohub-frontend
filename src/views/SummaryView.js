"use strict";

import React from 'react';

import Summary from './../components/Summary';
import SummaryService from '../services/SummaryService';
import {Link} from 'react-router-dom';

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
            date: this.props.match.params.date,
            addInfo: this.props.match.params.addInfo,
            searchLink: ''
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

        if(localStorage.getItem('city') == null){
          this.setState({
            searchLink: '/'
          });
        } else {
          this.setState({
            searchLink: '/results?city=' + localStorage.getItem('city') + '&category=' + localStorage.getItem('category') + '&date=' + localStorage.getItem('date')
          });
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
          <div>

            <Summary data={this.state.data} pId={this.state.pId} date={this.state.date}  payment={this.state.payment} bookingID={this.state.bookingID} addInfo={this.state.addInfo} />
          </div>
        );
    }
}
