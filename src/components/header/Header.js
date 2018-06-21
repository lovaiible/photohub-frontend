"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Toolbar } from 'react-md';
import Nav from "./Nav";
import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom'
import Nav from "./Nav";
import KebabMenu from './KebabMenu';


class Header extends React.Component {

    render() {
        return (
            <Toolbar
                nav={<Nav />}
                fixed={true}
            />
                nav={<Nav />}
                title={this.props.title}
                //actions={<KebabMenu id="toolbar-colored-kebab-menu" />}
            >
            </Toolbar>
        );
    }
};

export default withRouter(Header);