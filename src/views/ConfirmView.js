"use strict";

import React from 'react';

import {Confirm} from './../components/Confirm';
import ConfirmService from '../services/ConfirmService';
import ReviewService from '../services/ReviewService';
import ProfileService from "../services/ProfileService";
import {Link} from 'react-router-dom';

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
            numberReviews: 0,
            searchLink: ''
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
          <div className="breadcrumbs">
            <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink} className="breadcrumbLink">Search</Link> > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">{this.state.profile.title}</Link> > <b>Payment and confirmation</b>
          </div>

            <Confirm booking={this.state.booking} onSubmit={(booking) => this.updateBooking(booking)} error={this.state.error}
                           pId={this.state.profile._id} avgRating={this.state.avgRating} numberReviews={this.state.numberReviews} pName={this.state.profile.title}
                            sDescription={this.state.profile.serviceDescription} pAvatar={this.state.profile.avatar} price={this.state.profile.price}
                             category={this.state.profile.category}/>
          </div>
        );
    }
}
