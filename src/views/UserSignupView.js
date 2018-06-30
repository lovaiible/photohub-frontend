"use strict";

import React from 'react';

import UserSignup from '../components/header/UserSignup';
import UserService from '../services/UserService';


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    signup(user) {
        if(user.error === '') {
            UserService.register(user.mail, user.username, user.password).then(() => {
                this.props.history.push('/');
            }).catch((e) => {
                console.error(e);
                this.setState({
                    error: e
                });
            })
        } else {
            this.setState({error: user.error});
        }
    }

    render() {
        return (
            <UserSignup onSubmit={(user) => this.signup(user)} error={this.state.error}> </UserSignup>
        );
    }
}