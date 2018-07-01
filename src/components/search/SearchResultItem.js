"use strict";

import React from 'react';
import ReviewService from "../../services/ReviewService";
import 'babel-polyfill';
import ReactStars from 'react-stars'

export class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avg: [],
            rating : 0,
        }
    }

    async componentDidMount() {
        await this.getRating(this.props._id);
    }

    getRating(id) {
        ReviewService.getAvgRating(id).then((data) => {
            this.setState({
                avg: [...data]
            });
            if(this.state.avg.length !== 0){
                this.setState({
                    rating: data[0].avgRating
                });
            }
        }).catch((e) => {
            console.error(e);
            return false;
        });
    }


    render() {
        return (
            <div className="card">
                <a href={'/#/profile/' + this.props._id} className="card-link"> </a>
                <img className="card-img-top" src={this.props.gallery && this.props.gallery[0] && this.props.gallery[0].original ? this.props.gallery[0].original : 'https://i.imgur.com/e1tQLM6.png'}
                     alt={this.props.title}/>
                <div className="card-block">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span>{this.props.description ? this.props.description : ''}</span>
                            <span className="float-right">{this.props.price} €</span>
                        </h5>
                        <div className="card-text">
                            <span>{this.props.title}</span>
                            <ReactStars count={5} size={20} value={parseFloat(this.state.rating.toFixed(1))} edit={false} color2={'#ffd700'} />
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{this.props.category ? this.props.category.title : ''}</small>
                </div>
            </div>
        );
    }
}