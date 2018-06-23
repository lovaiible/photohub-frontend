"use strict";
import React from 'react';
import {Avatar, Grid, Cell} from 'react-md';
import Link from "react-router-dom";
import ava from '../img/avatar/ava.png';
import ReviewAverageValueOnlyStars from './ReviewAverageValueOnlyStars';

class PhotographerDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const tagStyle = {
            transform: "rotate(-5deg)"
        }
        const marginTop = {
          marginTop: '20px'
        }

        return (
            <div className="w3-container w3-row" style={marginTop}>
                <div className="w3-col m2"><Avatar src={ava} className="avatar float-left"/></div>
                <div className="w3-col m10"><h1 className="w3-left"> {this.props.title} <span
                    className="w3-tag w3-small" style={tagStyle}>Premium</span></h1>
                    <div className="w3-cell-row photographerAttr">
                        <p className="w3-cell w3-center w3-border-right"><i className="material-icons">place</i>
                            Location: {this.props.city}</p>
                        <p className="w3-cell w3-center w3-border-right">100 successful order</p>

                        <div>
                            {this.props.avg.map((avg) => <ReviewAverageValueOnlyStars avg={avg} key={avg._id} pId={this.props.pID}/>)}
                        </div>

                        {/*//<Link to={`/reviews/${this.props.pID}`}>*/}
                    </div>
                    <div className="descriptionText w3-opacity">{this.props.description}</div>
                </div>
            </div>
        );
    }


};

export default PhotographerDescription;
