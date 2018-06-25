"use strict";

import HttpService from './HttpService';

export default class SummaryService {

    constructor() {
    }

    static baseURL() {return "http://localhost:3000/bookings"}

    static getBooking(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SummaryService.baseURL()}/${id}`, function (data) {
                //console.log(Object.keys(data).length);
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving booking');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}