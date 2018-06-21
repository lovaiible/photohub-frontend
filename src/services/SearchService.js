"use strict";

import HttpService from './HttpService';

export default class SearchService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/profile/search" }

    static getSearchResults(query) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SearchService.baseURL()}${query}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving search results');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}