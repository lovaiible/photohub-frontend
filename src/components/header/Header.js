"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Toolbar } from 'react-md';
import Nav from "./Nav";

class Header extends React.Component {

    render() {
        return (
            <Toolbar
                nav={<Nav />}
                fixed={true}
            />
        );
    }
};

export default withRouter(Header);