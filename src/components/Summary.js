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
                    Bookingnumber: {this.props.booking._id}
                </CardText>
                <CardText>
                    Photographer: {this.props.booking.pId}
                </CardText>
                <CardText>
                    Category:
                </CardText>
                <CardText>
                    Date: {this.props.booking.date}
                </CardText>
                <CardText>
                    Price: {this.props.booking.price}
                </CardText>
                <CardText>
                    Used Payment Method: {this.props.booking.payment}
                </CardText>
                <CardText>
                    Additional Information: {this.props.booking.addInfo}
                </CardText>

            </Card>
        </Page>
            ;
    }
}
export default withRouter(Summary);