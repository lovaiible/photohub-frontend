"use strict"

import React from 'react';
import {AccessibleFakeButton, Avatar, FontIcon, List, ListItem} from "react-md";
import img from '../img/logo/logo.png';
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import {withRouter} from "react-router-dom";
import {DropdownMenu, IconSeparator} from "react-md/es/index";

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
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if(this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    render() {
        return (
            <nav>
                <div>
                    <Link to="/"><img src={img} className='logo float-left'/></Link>
                </div>
                <div>
                    <List style={flexContainer}>
                        <ListItem key={1} primaryText="About" />
                        <ListItem key={2} primaryText="Become a photographer" />
                        <ListItem key={3} primaryText="Help" />
                        { this.state.user ? [
                            <ListItem key={4} primaryText="">
                                <DropdownMenu
                                    id="user-account"
                                    menuItems={<ListItem key="account" primaryText="Logout" onClick={this.logout()}/>}
                                    anchor={{
                                        x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
                                        y: DropdownMenu.VerticalAnchors.BOTTOM,
                                    }}
                                    position={DropdownMenu.Positions.BELOW}
                                >
                                    <AccessibleFakeButton
                                        component={IconSeparator}
                                        iconBefore
                                        label={
                                            <IconSeparator label={this.state.user.username}>
                                                <FontIcon>arrow_drop_down</FontIcon>
                                            </IconSeparator>
                                        }
                                    >
                                        <Avatar suffix="pink">{(this.state.user.username).substr(0, 1)}</Avatar>
                                    </AccessibleFakeButton>
                                </DropdownMenu>
                            </ListItem>
                        ] : [
                            <ListItem key={4} primaryText="Register" onClick={() => this.props.history.push('/register')}/>,
                            <ListItem key={5} primaryText="Login" onClick={() => this.props.history.push('/login')}/>
                        ]}
                    </List>
                </div>
            </nav>
        );
    }
};

export default withRouter(Nav);
