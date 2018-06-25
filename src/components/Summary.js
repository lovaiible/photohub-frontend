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
    Button
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
                                {localStorage.getItem("bookingID")}
                            </CardText>
                            <CardText>
                                {localStorage.getItem("pName")}
                            </CardText>
                            <CardText>
                                {localStorage.getItem("category")}
                            </CardText>
                            <CardText>
                                {localStorage.getItem("date")}
                            </CardText>
                            <CardText>
                                {localStorage.getItem("price")} Euro
                            </CardText>
                            <CardText>
                                {localStorage.getItem("payment")}
                            </CardText>
                            <CardText>
                                {localStorage.getItem("addInfo")}
                            </CardText>
                        </Cell>
                    </Grid>
                    <Button flat primary swapTheming className="md-cell md-cell--2 margin-5" onClick={() => this.props.history.push("/")}
                            style={{display: 'flex', justifyContent: 'center'}}>
                        Back to main menu
                    </Button>
                </Card>
            </Page>
        );
    }
}

export default withRouter(Summary);