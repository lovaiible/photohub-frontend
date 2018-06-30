"use strict";

import React from 'react';
import {Button, Card, TextField} from 'react-md';
import {withRouter} from 'react-router-dom';
import {AlertMessage} from '../AlertMessage';
import Page from '../page/Page';


class UserSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            errorText: '',
            username: '',
            password: ''
        };

        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMail(value) {
        this.setState(Object.assign({}, this.state, {mail: value}));
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (this.state.mail.match(regex) === null) {
            this.state.errorText = 'Invalid email format';
        } else {
            this.state.errorText = '';
        }

        let user = {
            mail: this.state.mail,
            error: this.state.errorText,
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <h1>User Registration</h1>
                <Card className="md-block-centered signup">
                    <form className="md-grid--stacked" onSubmit={this.handleSubmit}
                          onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Email"
                            id="email"
                            className="md-row"
                            required={true}
                            value={this.state.mail}
                            onChange={this.handleChangeMail}
                            errorText="Email is required"/>
                        <TextField
                            label="Username"
                            id="UsernameField"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Username is required"/>
                        <TextField
                            label="Password"
                            id="password"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>
                        <div>
                            <Button id="submit" type="submit"
                                    disabled={this.state.mail === undefined || this.state.mail === '' || this.state.username === undefined || this.state.username === '' || this.state.password === undefined || this.state.password === ''}
                                    raised primary className="md-cell md-cell--2 margin-5">Register</Button>
                            <Button id="reset" type="reset" raised secondary
                                    className="md-cell md-cell--2 margin-5">Dismiss</Button>
                        </div>
                        <AlertMessage
                            className="md-row md-full-width">{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);