"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Toolbar } from 'react-md';
import Nav from "./Nav";
import Breadcrumb from "./Breadcrumb";

class Header extends React.Component {

    render() {
        return (
            <Toolbar
                nav={<Nav/>}
                fixed={false}
                /*actions={<KebabMenu id="toolbar-transparent-kebab-menu" />}*/
            />
        );
    }
};

export default withRouter(Header);