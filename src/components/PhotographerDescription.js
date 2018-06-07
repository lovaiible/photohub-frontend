"use strict";
import React from 'react';
import {Avatar} from 'react-md';
import ava from '../img/avatar/ava.png';
import Page from './Page';

class PhotographerDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const tagStyle = {
            transform: "rotate(-5deg)"
        }

        const descriptionText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

        return (
            <div className="w3-container w3-row">
                <div className="w3-col m2"><Avatar src={ava} className="avatar float-left"/></div>
                <div className="w3-col m10"><h1 className="w3-left"> MAX MUSTERMAN <span
                    className="w3-tag w3-small" style={tagStyle}>Premium</span></h1>
                    <div className="w3-cell-row photographerAttr">
                        <p className="w3-cell w3-center w3-border-right"><i className="material-icons">place</i>
                            Location: {location}</p>
                        <p className="w3-cell w3-center w3-border-right">100 successful order</p>
                        <p className="w3-cell w3-center"> 100 Reviews</p>
                    </div>
                    <div className="descriptionText w3-opacity">{descriptionText}</div>
                </div>
            </div>
        );
    }


};

export default PhotographerDescription;