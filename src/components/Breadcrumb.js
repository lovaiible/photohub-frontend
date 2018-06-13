"use strict";

import React from 'react';
import { withRouter } from 'react-router-dom';

class Breadcrumb extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='breadcrumb'>...</div>
        );
    }
};

export default withRouter(Breadcrumb);