"use strict";

import HttpService from './HttpService';

export default class ReviewService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/reviews" }

    static getReviews(id){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ReviewService.baseURL()}/${id}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getReview(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ReviewService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving review');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteReview(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ReviewService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateReview(review) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${ReviewService.baseURL()}/${review._id}`, review, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createReview(review) {
        review.id = Math.floor((Math.random() * 100000000) + 1).toString();

        return new Promise((resolve, reject) => {
            HttpService.post(ReviewService.baseURL(), review, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAvgRating(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ReviewService.baseURL()}/getAvgRating/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving review');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}
