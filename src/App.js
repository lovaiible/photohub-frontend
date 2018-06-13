"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { MovieDetailView }   from './views/MovieDetailView';
import { MovieFormView }   from './views/MovieFormView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";

import UserService from "./services/UserService";
import {SearchResultView} from "./views/SearchResultView";
import {CategoryListView} from "./views/CategoryListView";
import { ReviewItemListView }   from './views/ReviewItemListView';
import { ReviewFormView } from "./views/ReviewFormView";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Photohub',
            routes: [
                {
                    component: CategoryListView,
                    path: '/',
                    exact: true
                },
                {
                    component: SearchResultView,
                    path: '/results',
                },
                { component: ReviewItemListView , path: '/viewReviews/:id'},
                // TODO
                { component: MovieDetailView , path: '/show/:id'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<MovieFormView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/edit/:id'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<MovieFormView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/add',},
                  { render: (props) => {
                          if(UserService.isAuthenticated()) {
                              return (<ReviewFormView {... props} />)
                          }
                          else {
                              return (<Redirect to={'/login'}/>)
                          }}, path: '/addReview/:id',},
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
