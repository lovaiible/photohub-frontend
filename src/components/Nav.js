"use strict"

import React from 'react';
import {Avatar, List, ListItem} from "react-md";
import img from '../img/logo/logo.png';

const flexContainer = {
    display: 'inline-flex',
    float: 'right',
    flexDirection: 'row',
    height: '50px'
};

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div>
                    <img src={img} className='logo float-left'/>
                </div>
                <div>
                    <List style={flexContainer}>
                        <ListItem
                            primaryText="About"
                        />
                        <ListItem
                            primaryText="Become a photographer"
                        />
                        <ListItem
                            primaryText="Help"
                        />
                        <ListItem primaryText="">
                            <Avatar>M</Avatar>
                        </ListItem>
                    </List>
                </div>
            </nav>
        );
    }
};

export default Nav;
