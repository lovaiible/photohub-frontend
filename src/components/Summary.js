"use strict";

import React from 'react';
import {withRouter} from "react-router-dom";
import Page from './Page';

import {
    Card,
    CardTitle,
    CardText,
} from 'react-md';

const style = {maxWidth: 1000};

export class Summary extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <CardTitle title="Thank you for using Photohub. "
                               subtitle="This is the summary of your order:"/>

                    <CardText>
                        Bookingnumber: {this.props.bookingID}
                    </CardText>
                    <CardText>
                        Photographer: {this.props.pId}
                    </CardText>
                    <CardText>
                        Category:
                    </CardText>
                    <CardText>
                        Date: {this.props.date}
                    </CardText>
                    <CardText>
                        Price:
                    </CardText>
                    <CardText>
                        Used Payment Method: {this.props.payment}
                    </CardText>
                    <CardText>
                        Additional Information:
                    </CardText>

                </Card>
            </Page>
        );
    }
}

export default withRouter(Summary);