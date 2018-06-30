"use strict";

import React from 'react';
import UserService from '../services/UserService';
import CategoryService from "../services/CategoryService";
import LocationService from "../services/LocationService";
import PhotographerSignUp from "../components/header/PhotographerSignUp";
import ProfileService from "../services/ProfileService";
import 'babel-polyfill';


export class PhotographerSignUpView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
            locations: []
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
    }

    async signup(photographer) {
        let selectedCity;

        if(this.state.locations.includes(photographer.city)) {
            selectedCity = await LocationService.getLocationByName(photographer.city);
            selectedCity = selectedCity[0];
        } else {
            selectedCity = {
                city: photographer.city,
                country: ''
            };
        }

        let selectedUser = await UserService.getUserObject(UserService.getCurrentUser().id);
        let selectedCategory = await CategoryService.getCategoryByName(photographer.category);

        const profile = {
            title: photographer.name,
            description: photographer.description,
            location: selectedCity,
            user: selectedUser,
            category: selectedCategory,
            serviceDescription: photographer.serviceDescription,
            price: photographer.price
        }

        ProfileService.createProfile(profile).then(() => {
            window.localStorage['notify'] = 'You have successfully created your photographer profile.';
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        })
    }

    componentDidMount() {
        let categories = [];
        let locations = [];

        CategoryService.getCategories().then((data) => {
            for (var index in data) {
                categories.push(data[index].title);
            }
        }).catch((e) => {
            console.error(e);
        });

        LocationService.getLocations().then((data) => {
            for (var index in data) {
                locations.push(data[index].city);
            }
        }).catch((e) => {
            console.error(e);
        });

        this.setState({
            categories: categories.sort(),
            locations: locations.sort(),
            loading: false
        });
    }

    render() {
        return (
            <PhotographerSignUp categories={this.state.categories}
                                locations={this.state.locations}
                                onSubmit={(photographer) => this.signup(photographer)}> </PhotographerSignUp>
        );
    }
}