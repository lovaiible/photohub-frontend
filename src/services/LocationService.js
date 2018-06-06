"use strict";

import HttpService from './HttpService';

export default class LocationService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/movies" }

    static getLocations(){
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}