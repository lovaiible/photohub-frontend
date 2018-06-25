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
import {PhotographerProfileView} from './views/PhotographerProfileView';

import UserService from "./services/UserService";
import Error from "./components/page/Error";
import {PhotographerSignUpView} from "./views/PhotographerSignUpView";


export default class App extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            title: 'Photohub',
            routes: [
                {component: CategoryListView, path: '/', exact: true},
                {component: SearchResultView, path: '/results'},
                {component: ConfirmView, path: '/showConfirm/:id'},
                {component: SummaryView, path: '/showSummary/:bookingID'},
                {component: UserLoginView, path: '/login'},
                {component: UserSignupView, path: '/register'},
                {component: CategoryListView, path: '/', exact: true},
                {component: ReviewItemListView, path: '/viewReviews/:id', name: "ReviewList"},
                {component: PhotographerProfileView, path: '/profile/:id', exact: true},
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
                {component: PhotographerSignUpView, path: '/photographerSignup'},
                {component: Error, path: '*'}
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
