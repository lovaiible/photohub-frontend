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
          numberReviews: 0,
          title:'',
          description: '',
          city: '',
          price: '',
          avatar:'',
          category:'',
          date: ""
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

        ReviewService.getAvgRating(this.state.pID).then((data) => {
            this.setState({
                avg: [...data],
                length: data.length
            });
            if(this.state.length != 0){
             this.setState({
                 avgRating: data[0].avgRating
             });
           }
           this.setState({
               loading: false
           });
        }).catch((e) => {
            console.error(e);
        });

        ProfileService.getProfile(this.state.pId).then((data)=> {
            this.setState({
                profile: data,
                city: data.location.city,
                description: data.serviceDescription,
                title: data.title,
                price: data.price,
                //avatar: data.avatar,
                avatar: data.picture[0].original,
                category: data.category
            });
        }).catch((e) => {
            console.error(e);
        });
        this.setState({date: this.props.location.state.selectedDate})

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
                         pId={this.state.pId} avgRating={this.state.avgRating} numberReviews={this.state.numberReviews} pName={this.state.title}
                          sDescription={this.state.description} pAvatar={this.state.avatar} price={this.state.price}
                           category={this.state.category.title} date={this.state.date}/>
          </div>
        );
    }
}
