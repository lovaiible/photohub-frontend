import React from 'react';
import {PhotographerProfile} from '../components/PhotographerProfile';
import ProfileService from "../services/ProfileService";
import ReviewService from '../services/ReviewService';

export class PhotographerProfileView extends React.Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        this.state = {
            loading: true,
            pID:id,
            avg: [],
            title:'',
            description: '',
            city: '',
            minDate: '',
            maxDate: ''
        };
    }

    componentWillMount() {
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

        ReviewService.getAvgRating(this.state.pID).then((data) => {
            this.setState({
                avg: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        } else {
          if(this.state.avg.length > 0){
            return (
                <PhotographerProfile  profile={this.state.profile} pID={this.state.pID} avg={this.state.avg} noReviews={false}
                title={this.state.title} city={this.state.city} description={this.state.description}/>
            );
          } else {
            return (
                <PhotographerProfile  profile={this.state.profile} pID={this.state.pID} noReviews={true}
                title={this.state.title} city={this.state.city} description={this.state.description}/>
            );
          }
        }
    }
}
