"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom';

class Breadcrumb extends React.Component {

    render() {
        return (
            <div id='breadcrumb'>'Home > Search Result (tbd.)'</div>
        );
    }
};

export default withRouter(Breadcrumb);