"use strict";

import React from 'react';

import Header from '../header/Header';
import {Footer} from '../Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <ToastContainer />
                <main id='content' className="container">
                    {this.props.children}
                </main>
                <Footer/>
            </section>
        );
    }
}
