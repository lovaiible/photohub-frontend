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

    /*componentDidMount(){
        localStorage.removeItem("bookingID");
        localStorage.removeItem("pId");
        localStorage.removeItem("date");
        localStorage.removeItem("payment");
        localStorage.removeItem("addInfo");
    }*/



    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form onSubmit={this.handleSubmit}>
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
                                    {localStorage.getItem("pId")}
                                </CardText>
                                <CardText>
                                    Category
                                </CardText>
                                <CardText>
                                    {localStorage.getItem("date")}
                                </CardText>
                                <CardText>
                                    100.000.000.000.000.000.000.000 Euro
                                </CardText>
                                <CardText>
                                    {localStorage.getItem("payment")}
                                </CardText>
                                <CardText>
                                    {localStorage.getItem("addInfo")}
                                </CardText>
                            </Cell>
                        </Grid>
                        <Button flat primary swapTheming type="submit" id="submit">
                            Back
                        </Button>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(Summary);