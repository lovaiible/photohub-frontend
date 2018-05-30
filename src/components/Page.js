"use strict";

import React from 'react';

import Header from './Header';
import { Footer } from './Footer';
import { PhotographerProfile } from "./PhotographerProfile";
import {PhotographerProfileView} from "../views/PhotographerProfileView";

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }

    render() {
        return (
            <section>
                <Header title={this.state.title} />
                {this.props.children}
                <Footer />
            </section>
        );
    }
}