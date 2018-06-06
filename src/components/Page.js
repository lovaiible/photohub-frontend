"use strict";

import React from 'react';

import Header from './Header';
import {Footer} from './Footer';
import Breadcrumb from "./Breadcrumb";


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
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
                <main id='content' className="container">
                    <Breadcrumb />
                    {this.props.children}
                </main>
                <Footer/>
            </section>
        );
    }
}