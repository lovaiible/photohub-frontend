"use strict";

import React from 'react';


export default class CategoryListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <a href={this.props.category.slug} className="card-link"> </a>
                <img className="card-img-top" src={this.props.category.picture} alt={this.props.category.title}/>
                <div className="card-footer">
                    <small className="text-muted">{this.props.category.title}</small>
                </div>
            </div>
        );
    }
}