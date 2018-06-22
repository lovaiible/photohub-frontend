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
            username: '',
            password: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card className="md-block-centered signup">
                    <form className="md-grid--stacked" onSubmit={this.handleSubmit}
                          onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Username"
                            id="UsernameField"
                            className="md-row"
                            defaultValue=""
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Username is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            defaultValue=""
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>
                        <div>
                            <Button id="submit" type="submit"
                                    disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}
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