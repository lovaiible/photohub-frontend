"use strict";

import React from 'react';
import {withRouter} from "react-router-dom";
import Page from './page/Page';

import {
    Card,
    CardTitle,
    CardText,
    Cell,
    Grid,
    DatePicker
} from 'react-md';

const style = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '15px'
    },
    gridList: {
        overflowY: 'auto',
        width: '100%'
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

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
                    <Grid>
                        <Cell size={3}>
                            <CardText>
                                <b>Bookingnumber:</b>
                            </CardText>
                            <CardText>
                                <b>Photographer:</b>
                            </CardText>
                            <CardText>
                                <b>Category:</b>
                            </CardText>
                            <CardText>
                                <b>Date:</b>
                            </CardText>
                            <CardText>
                                <b>Price:</b>
                            </CardText>
                            <CardText>
                                <b>Used Payment Method:</b>
                            </CardText>
                            <CardText>
                                <b>Additional Information:</b>
                            </CardText>
                        </Cell>
                        <Cell>
                            <CardText>
                                {this.props.bookingID}
                            </CardText>
                            <CardText>
                                {this.props.pId}
                            </CardText>
                            <CardText>
                                Du Sackgesicht
                            </CardText>
                            <CardText>
                                {this.props.date}
                            </CardText>
                            <CardText>
                                100.000.000.000.000.000.000.000 Euro
                            </CardText>
                            <CardText>
                                {this.props.payment}
                            </CardText>
                            <CardText>
                                {this.props.addInfo}
                            </CardText>
                        </Cell>
                    </Grid>
                </Card>
            </Page>
        );
    }
}

export default withRouter(Summary);