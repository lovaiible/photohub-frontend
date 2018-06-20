"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { MovieDetailView }   from './views/MovieDetailView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import {SearchResultView} from "./views/SearchResultView";
import {CategoryListView} from "./views/CategoryListView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Photohub',
            routes: [
                { component: CategoryListView, path: '/', exact: true },
                { component: SearchResultView, path: '/results',},
                { component: MovieDetailView , path: '/show/:id'},
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

