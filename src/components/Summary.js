"use strict";

import React from 'react';
import {withRouter} from "react-router-dom";
import Page from './page/Page';

import {Link} from 'react-router-dom';
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
    marginTop: '15px'
};

export class Summary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            payment: localStorage.getItem("payment"),
            date: localStorage.getItem("date"),
            addInfo: localStorage.getItem("addInfo"),
            pId: localStorage.getItem("pId"),
            pName: localStorage.getItem("pName"),
            category: localStorage.getItem("category"),
            price: localStorage.getItem("price"),
            bookingID: localStorage.getItem("bookingID"),
            searchLink: ''
        };
    }

    componentDidMount(){

        localStorage.removeItem("payment");
        localStorage.removeItem("date");
        localStorage.removeItem("addInfo");
        localStorage.removeItem("pId");
        localStorage.removeItem("pName");
        localStorage.removeItem("category");
        localStorage.removeItem("price");
        localStorage.removeItem("bookingID");
    }

    componentWillMount(){
      if(localStorage.getItem('city') == null){
        this.setState({
          searchLink: '/'
        });
      } else {
        this.setState({
          searchLink: '/results?city=' + localStorage.getItem('city') + '&category=' + localStorage.getItem('category') + '&date=' + localStorage.getItem('date')
        });
      }
    }

    render() {
        return (
            <Page>
              <div className="breadcrumbs">
                <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink} className="breadcrumbLink">Search</Link> > <Link to={'/profile/' + this.state.pId} className="breadcrumbLink">{this.state.pName}</Link> > <Link to={'/showConfirm/' + this.state.pId} className="breadcrumbLink">Payment and confirmation</Link> > <b>Booking summary</b>
              </div>
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
                                {this.state.bookingID}
                            </CardText>
                            <CardText>
                                {this.state.pName}
                            </CardText>
                            <CardText>
                                {this.state.category}
                            </CardText>
                            <CardText>
                                {this.state.date}
                            </CardText>
                            <CardText>
                                {this.state.price} Euro
                            </CardText>
                            <CardText>
                                {this.state.payment}
                            </CardText>
                            <CardText>
                                {this.state.addInfo}
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
