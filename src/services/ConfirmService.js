"use strict";

import HttpService from './HttpService';

export default class ConfirmService {

    constructor() {
    }

    static baseURL() {return "http://localhost:3000/bookings"}

    static getBookings() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getBooking(bookingId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ConfirmService.baseURL()}/${bookingId}`, function (data) {
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

    static createBooking(booking) {
        /* var randomstring2 = randomString({
            length: 18,
            numeric: true
        });
        booking.bookingId = randomstring2; */

        return new Promise((resolve, reject) => {
            HttpService.post(ConfirmService.baseURL(), booking, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    };
}