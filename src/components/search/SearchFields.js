"use strict"

import React from 'react';
import {Autocomplete, Button, DatePicker, SelectField} from 'react-md';
import NodeGeocoder from 'node-geocoder';
import {withRouter} from "react-router-dom";

class SearchFields extends React.Component {

    constructor(props) {
        super(props);

        let city = '';
        let category = 'All';
        let date = '';

        if (this.props.location.search !== '') {
            let params = new URLSearchParams(this.props.location.search);
            city = params.get('city');
            category = params.get('category');
            date = params.get('date');
        }

        this.state = {
            city: city,
            category: category,
            date: date,
            categories: this.props.categories,
            cities: this.props.locations
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleDate = this.handleDate.bind(this);

    }

    handleCity(input) {
        this.setState({city: input});
        console.log(this.getCurrentPosition);
    }

    handleCategory(input) {
        this.setState({category: input});
    }

    handleDate(input) {
        // TODO format date
        this.setState({date: encodeURI(input)});
    }

    handleSearch() {
        window.location.reload();
        window.location = '#/results?city=' + this.state.city + '&category=' + this.state.category + '&date=' + this.state.date;

    }

    render() {
        return (
            <div>
                <form>
                    <div className="md-grid">
                        <Autocomplete
                            name="city"
                            onAutocomplete={this.handleCity}
                            id="location-input"
                            className="col-3"
                            label="Location"
                            placeholder="Choose your location"
                            data={this.state.cities}
                            sameWidth={true}
                            defaultValue={this.state.city}
                            required={true}
                            errorText="Location is required"
                        />
                        <SelectField
                            name="category"
                            onChange={this.handleCategory}
                            id="category-input"
                            className="col-3"
                            label="Category"
                            placeholder="Choose your category"
                            anchor={{
                                x: SelectField.HorizontalAnchors.INNER_LEFT,
                                y: SelectField.VerticalAnchors.BOTTOM
                            }}
                            menuItems={this.state.categories}
                            sameWidth={true}
                            simplifiedMenu={false}
                            defaultValue={this.state.category}
                            required={true}
                            errorText="Category is required"
                        />
                        <DatePicker
                            name="date"
                            id="date-input"
                            label="Date"
                            firstDayOfWeek={1}
                            disableOuterDates={true}
                            disabledDays={{before: Date.now()}}
                            placeholder="Choose your date"
                            className="col-3"
                            displayMode="portrait"
                            defaultValue={this.state.date}
                            onChange={this.handleDate}
                            autoOk={true}
                            required={true}
                            errorText="Date is required"
                        />
                        <Button raised primary className='search-button md-cell--3 margin-5'
                                disabled={this.state.city === '' || this.state.date === ''}
                                onClick={() => this.handleSearch()}>Search</Button>
                    </div>
                </form>
            </div>
        );
    }

    getCity(latitude, longitude) {
        var options = {
            provider: 'google',
            httpAdapter: 'https',
            apiKey: 'AIzaSyDzaBHh_mvkm7yWv60Kx2VkX1aSAwhhsB4',
            formatter: 'string',
            formatterPattern: '%c'
        };

        var geocoder = NodeGeocoder(options);
        geocoder.reverse({lat: latitude, lon: longitude}, function (err, res) {
            return res;
        });
    }

    getCurrentPosition() {
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    return this.getCity(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.log(error)
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
            );
        }
    }

}

export default withRouter(SearchFields);