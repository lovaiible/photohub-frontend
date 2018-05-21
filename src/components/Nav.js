"use strict"

import React from 'react';
import {Avatar, List, ListItem} from "react-md";
import img from '../../public/img/logo/logo.png';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    float: 'right'
};

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div>
                    <img src={img} className='logo'/>
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
