"use strict";

import React from 'react';
// import UserService from '../services/UserService';


export class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card" key={this.key}>
                <img className="card-img-top" src={this.props.tile.img} alt={this.props.tile.title}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.tile.title}</h5>
                    <p className="card-text">{this.props.tile.description}</p>
                    <p className="card-text">
                        <small className="text-muted">{this.props.tile.category}</small>
                    </p>
                </div>
            </div>
        );
    }
}