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

    static updateBooking(booking) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${booking._id}`, booking, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createBooking(booking) {

        return new Promise((resolve, reject) => {
            HttpService.post(ConfirmService.baseURL(), booking, function(data) {
                resolve(data);
                console.log(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    };
}