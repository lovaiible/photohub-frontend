import React from 'react';
import {PhotographerProfile} from '../components/PhotographerProfile'

export class PhotographerProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <PhotographerProfile data={this.state.data} />
        );
    }
}