"use strict";

import React from 'react';
import StarsRating from 'react-stars-rating';


export class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.props.picture[0] ? this.props.picture[0].thumbnail : ''}
                     alt={this.props.title}/>
                <div className="card-block">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span>{this.props.description ? this.props.description : ''}</span>
                            <span className="float-right">{this.props.price} €</span>
                        </h5>
                        <p className="card-text">
                            <span>{this.props.title}</span>
                            <StarsRating rating={4.5}/>
                        </p>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{this.props.category ? this.props.category.title : ''}</small>
                </div>
            </div>
        );
    }
}