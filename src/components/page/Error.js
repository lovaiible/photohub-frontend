"use strict";

import React from 'react';

import Header from '../header/Header';
import {Footer} from '../Footer';
import {Button, Card} from "react-md";
import {withRouter} from "react-router-dom";

class Error extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    render() {
        return (
            <section id="error">
                <Header title={this.state.title}/>
                <main className="container">
                    <Card>
                        <h1>Error 404</h1>
                        <h2>Sorry! The page you were looking for could not be found </h2>
                        <p>Either something went wrong or the page doesn't exist anymore.</p>
                        <Button raised secondary className="md-cell md-cell--2 margin-5" onClick={() => this.props.history.push("/")}>Back to home</Button>
                    </Card>
                </main>
                <Footer/>
            </section>
        );
    }
}

export default withRouter(Error)
