"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import {SearchResultView} from "./views/SearchResultView";
import {ConfirmView} from "./views/ConfirmView";
import {CategoryListView} from "./views/CategoryListView";
import {SummaryView} from "./views/SummaryView";



export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Photohub',
            routes: [
                { component: CategoryListView, path: '/', exact: true },
                { component: SearchResultView, path: '/results',},
                { component: ConfirmView , path: '/showConfirm/:id'},
                { component: SummaryView, path: '/showSummary/:bookingID/:pId/:date/:payment/:addInfo'},
                { component: UserLoginView, path: '/login'},
                { component: UserSignupView, path: '/register'}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <MuiThemeProvider>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

