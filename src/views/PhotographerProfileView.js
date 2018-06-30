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
            maxDate: '',
            gallery: [],
            user: {}
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
                maxDate: data.maxDate,
                searchLink: '',
                gallery: data.gallery,
                user: data.user
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
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        } else {
          if(this.state.length <= 0){
            return (
              <div>
                <PhotographerProfile  profile={this.state.profile} pID={this.state.pID} avg={this.state.avg} avgRating={0} noReviews={true}
                title={this.state.title} city={this.state.city} description={this.state.description} history={this.props.history} size={'small'} gallery={this.state.gallery}
                minDate={this.state.minDate} maxDate={this.state.maxDate} user={this.state.user}
                />
              </div>
            );
          } else {
            return (
              <div>
                <PhotographerProfile  profile={this.state.profile} pID={this.state.pID} noReviews={false} avg={this.state.avg} avgRating={this.state.avgRating} size={'small'}
                title={this.state.title} city={this.state.city} description={this.state.description} history={this.props.history} gallery={this.state.gallery}
                                      minDate={this.state.minDate} maxDate={this.state.maxDate} user={this.state.user}/>
              </div>
          );
          }
        }
    }
}
