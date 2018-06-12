"use strict";

import React from 'react';
import {withRouter} from "react-router-dom";

import {
    Card,
    CardTitle,
    CardText,
} from 'react-md';
import {Confirm} from "./Confirm";

const style = {maxWidth: 1000};

export class Summary extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Page>
            <Card style={style} className="md-block-centered">
                <CardTitle title="Thank you for using Photohub. "
                           subtitle="This is the summary of your order:"/>

                <CardText>
                    Photographer:
                </CardText>
                <CardText>
                    Category:
                </CardText>
                <CardText>
                    Date:
                </CardText>
                <CardText>
                    Price:
                </CardText>
                <CardText>
                    Used Payment Method:
                </CardText>
                <CardText>
                    Additional Information:
                </CardText>

            </Card>
        </Page>
            ;
    }
}
export default withRouter(Summary);