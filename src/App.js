"use strict";

import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";
import SearchResultView from "./views/SearchResultView";
import {ConfirmView} from "./views/ConfirmView";
import {CategoryListView} from "./views/CategoryListView";
import {ReviewItemListView} from './views/ReviewItemListView';
import {ReviewFormView} from "./views/ReviewFormView";
import {SummaryView} from "./views/SummaryView";
import UserService from "./services/UserService";
import Error from "./components/page/Error";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Photohub',
            routes: [
<<<<<<< HEAD
                { component: CategoryListView, path: '/', exact: true },
                { component: SearchResultView, path: '/results',},
                { component: MovieDetailView , path: '/show/:id'},
                { component: ConfirmView , path: '/showConfirm/:id'},
                { component: SummaryView, path: '/showSummary/:bookingID'},
                { component: UserLoginView, path: '/login'},
                { component: UserSignupView, path: '/register'}
=======
                {component: CategoryListView, path: '/', exact: true},
                {component: SearchResultView, path: '/results'},
                {component: ReviewItemListView, path: '/viewReviews/:id', name: "ReviewList"},
                {component: ReviewItemListView, path: '/viewReviews/:id/notification', name: "ReviewList"},
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<ReviewFormView {...props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/addReview/:id',
                },
                {component: ConfirmView, path: '/showConfirm/:id'},
                {component: SummaryView, path: '/showSummary/:bookingID/:pId/:date/:payment/:addInfo'},
                {component: UserLoginView, path: '/login'},
                {component: UserSignupView, path: '/register'},
                {component: Error, path: '*'}
>>>>>>> 616cab8b43dcabe6be1ad442248aa921cdc7b022
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}
