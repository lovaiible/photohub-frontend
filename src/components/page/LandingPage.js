"use strict";

import React from 'react';

import Header from '../header/Header';
import {Footer} from '../Footer';
import {Slider} from "../Slider";


export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });
    }

    render() {
        return (
            <section>
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