"use strict";

import React from 'react';
import StarsRating from 'react-stars-rating';

// import UserService from '../services/UserService';


export class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="card">
                    <img className="card-img-top" src={this.props.tile.img} alt={this.props.tile.title}/>
                    <div className="card-block">
                        <div className="card-body">
                            <h5 className="card-title">
                                <span>{this.props.tile.title}</span>
                                <span className="float-right">{this.props.tile.price}</span>
                            </h5>
                            <p className="card-text">
                                <span>{this.props.tile.photographer}</span>
                                <StarsRating rating={4.5}/>
                            </p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">{this.props.tile.category}</small>
                    </div>
                </div>
        );
    }
}