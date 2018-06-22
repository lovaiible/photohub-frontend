"use strict";

import HttpService from './HttpService';

export default class ProfileService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/profile" }


    static getProfile(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ProfileService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving profile');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteProfile(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ProfileService.baseURL()}/${id}`, function(data) {
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

    static updateProfile(profile) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${profile._id}`, profile, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createProfile(profile) {
       /* movie.id = Math.floor((Math.random() * 100000000) + 1).toString();
        movie.posters = {
            thumbnail: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            profile: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            detailed: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            original: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"
        };*/
        return new Promise((resolve, reject) => {
            HttpService.post(ProfileService.baseURL(), profile, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}