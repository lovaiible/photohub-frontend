"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

import UserService from '../services/UserService';
import StarsRating from 'react-stars-rating';
import ReactStars from 'react-stars'

export class ReviewListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn><Link to={`/showReview/${this.props.review._id}`}><FontIcon>image</FontIcon></Link></TableColumn>
                <TableColumn><SimpleLink to={`/showReview/${this.props.review._id}`}>{this.props.review.name}</SimpleLink></TableColumn>
                <TableColumn><SimpleLink to={`/showReview/${this.props.review._id}`}>{this.props.review.date}</SimpleLink></TableColumn>
                <TableColumn><SimpleLink to={`/showReview/${this.props.review._id}`}>{this.props.review.text}</SimpleLink></TableColumn>
                <TableColumn>{this.props.review.rating}</TableColumn>
                <TableColumn>{this.props.review.photographerId}</TableColumn>

                {UserService.isAuthenticated() ?
                    <TableColumn><Link to={`/edit/${this.props.review._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                }
                {UserService.isAuthenticated() ?
                    <TableColumn><Button onClick={() => this.props.onDelete(this.props.review._id)} icon>delete</Button></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>delete</FontIcon></Link></TableColumn>
                }

            </TableRow>
        );
    }
}
