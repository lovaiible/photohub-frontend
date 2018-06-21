import React from 'react';
import {PhotographerProfile} from '../components/PhotographerProfile';
import ProfileService from "../services/ProfileService";


export class PhotographerProfileView extends React.Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        this.state = {
            loading: true,
            pID:id
        };
    }

    componentWillMount() {
        ProfileService.getProfile(this.state.pID).then((data)=> {
            this.setState({
                loading: false,
                profile: data
            });
        }).catch((e) => {
            console.error(e);
        });


    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <PhotographerProfile  profile={this.state.profile} pID={this.state.pID} />
        );
    }
}