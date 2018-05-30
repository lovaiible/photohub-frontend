"use strict";

import React from 'react';
import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom'
import Nav from "./Nav";
import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar
                nav={<Nav />}
                title={this.props.title}
                //actions={<KebabMenu id="toolbar-colored-kebab-menu" />}
            >
            </Toolbar>
        );
    }
};

export default withRouter(Header);