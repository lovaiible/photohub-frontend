"use strict";

import React from 'react';

import UserSignup from '../components/header/UserSignup';
import UserService from '../services/UserService';
import CategoryService from "../services/CategoryService";
import LocationService from "../services/LocationService";
import PhotographerSignUp from "../components/header/PhotographerSignUp";
import ProfileService from "../services/ProfileService";


export class PhotographerSignUpView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
            locations: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
    }

    signup(photographer) {
        const newProfile = {
            title: photographer.name,
            description: photographer.description,
            location: photographer.city,
            user: UserService.getCurrentUser(),
            category: photographer.category,
            serviceDescription: photographer.serviceDescription,
            price: photographer.price
        }
        ProfileService.createProfile(newProfile).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        })
    }

    componentDidMount() {
        var categories = [];
        var locations = [];

        CategoryService.getCategories().then((data) => {
            for(var index in data) {
                categories.push(data[index].title);
            }
        }).catch((e) => {
            console.error(e);
        });

        LocationService.getLocations().then((data) => {
            for(var index in data) {
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
            <PhotographerSignUp categories={this.state.categories} locations={this.state.locations} onSubmit={(photographer) => this.signup(photographer)}> </PhotographerSignUp>
        );
    }
}