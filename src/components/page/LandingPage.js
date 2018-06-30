"use strict";

import React from 'react';

import Header from '../header/Header';
import {Footer} from '../Footer';
import {Slider} from "../Slider";


export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notification: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });

        if(window.localStorage['notify'] !== undefined) {
            this.state.notification = window.localStorage['notify'];
            window.localStorage.removeItem("notify");
        }
    }

    render() {
        return (
            <section>
                { this.state.notification !== ' ' ?
                    <div className="notification success">{this.state.notification}</div> : ''
                }
                <Header title={this.state.title}/>
                <Slider/>
                <main id='content' className="container">
                    {this.props.children}
                </main>
                <Footer/>
            </section>
        );
    }
}