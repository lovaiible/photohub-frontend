"use strict"

import React from 'react';
import {List, ListItem} from "react-md";
import img from '../../img/logo/logo.png';
import {Link, withRouter} from "react-router-dom";
import UserService from "../../services/UserService";
import AccountMenu from "./AccountMenu";
import ProfileService from "../../services/ProfileService";
import 'babel-polyfill';

const flexContainer = {
    display: 'inline-flex',
    float: 'right',
    flexDirection: 'row',
    height: '50px'
};

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            hasProfile: false,
            profile: ''
        }
    }

    async componentDidMount() {
        let currentUserId = UserService.getCurrentUser().id;

        if(currentUserId !== undefined) {
            let hasProfile = await this.getPhotographerProfile(currentUserId);
            this.setState(Object.assign({}, this.state, {hasProfile: hasProfile}));
        } else {
            this.setState(Object.assign({}, this.state, {hasProfile: false}));
        }
    }

    getPhotographerProfile(id) {
        return ProfileService.getUserProfile(id).then((data) => {
            this.setState(Object.assign({}, this.state, {profile: data[0]}));
            return Object.keys(data).length !== 0;
        }).catch((e) => {
            console.error(e);
            return false;
        });
    }

    render() {
        return (
            <nav>
                <div>
                    <Link to="/"><img src={img} className='logo float-left'/></Link>
                </div>
                <div>
                    <List style={flexContainer}>
                        <ListItem key={1} primaryText="About" onClick={() => this.props.history.push('/about')}/>
                        {this.state.user && !this.state.hasProfile ?
                            <ListItem key={2} primaryText="Become a photographer"
                                      onClick={() => this.props.history.push('/photographerSignUp')}/>
                            : []}
                        <ListItem key={3} primaryText="Help" onClick={() => this.props.history.push('/help')}/>
                        {this.state.user ?
                            <ListItem key={4} primaryText="">
                                <AccountMenu hasProfile={this.state.user && this.state.hasProfile} profile={this.state.profile}/>
                            </ListItem>
                            : [
                                <ListItem key={4} primaryText="Register"
                                          onClick={() => this.props.history.push('/register')}/>,
                                <ListItem key={5} primaryText="Login"
                                          onClick={() => this.props.history.push('/login')}/>
                            ]
                        }
                    </List>
                </div>
            </nav>
        );
    }
};

export default withRouter(Nav);
