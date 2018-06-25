"use strict";

import React from 'react';

import {Confirm} from './../components/Confirm';
import ConfirmService from '../services/ConfirmService';
import ReviewService from '../services/ReviewService';
import ProfileService from "../services/ProfileService";

export class ConfirmView extends React.Component {

    constructor(props) {
        super(props);

        let pId = this.props.match.params.id;

        this.state = {
            loading: false,
            data: [],
            booking: undefined,
            pId: pId,
            avgRating: 0,
            numberReviews: 0
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

        ReviewService.getAvgRating(this.state.pId).then((data) => {
            this.setState({
                avg: [...data],
                avgRating: data[0].avgRating,
                loading: false,
                noReviews: false,
                numberReviews: data.length
            });
        }).catch((e) => {
            console.error(e);
        });

        ProfileService.getProfile(this.state.pID).then((data)=> {
            this.setState({
                profile: data,
                city: data.location.city,
                description: data.description,
                title: data.title,
                minDate: data.minDate,
                maxDate: data.maxDate
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
                this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
            });
        }
    }

    updateBooking(booking) {

        ConfirmService.createBooking(booking).then((data) => {
            this.props.history.push('/showSummary/' + booking.bookingID );
        }).catch((e) => {
            console.error(e);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating booking'}));
        });

    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
          <div>


            <Confirm booking={this.state.booking} onSubmit={(booking) => this.updateBooking(booking)} error={this.state.error}
                           pId={this.state.profile._id} avgRating={this.state.avgRating} numberReviews={this.state.numberReviews} pName={this.state.profile.title}
                            sDescription={this.state.profile.serviceDescription} pAvatar={this.state.profile.avatar} price={this.state.profile.price}
                             category={this.state.profile.category}/>
          </div>
        );
    }
}
