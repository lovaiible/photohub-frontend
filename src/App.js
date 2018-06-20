"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { MovieDetailView }   from './views/MovieDetailView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import {SearchResultView} from "./views/SearchResultView";
import {ConfirmView} from "./views/ConfirmView";
import {CategoryListView} from "./views/CategoryListView";
import { ReviewItemListView }   from './views/ReviewItemListView';
import { ReviewFormView } from "./views/ReviewFormView";


import {ThroughProvider} from 'react-through'
import {SummaryView} from "./views/SummaryView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Photohub',
            routes: [
                {
                    component: CategoryListView,
                    path: '/',
                    exact: true,
                    name: "Home"
                },
                {
                    component: SearchResultView,
                    path: '/results',
                    name: "Search results"
                },
                { component: ReviewItemListView , path: '/viewReviews/:id', name: "ReviewList"},
                { component: ReviewItemListView , path: '/viewReviews/:id/notification', name: "ReviewList"},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<ReviewFormView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/addReview/:id',},
                { component: CategoryListView, path: '/', exact: true },
                { component: SearchResultView, path: '/results',},
                { component: MovieDetailView , path: '/show/:id'},
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
