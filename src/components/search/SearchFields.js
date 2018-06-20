"use strict"

import React from 'react';
import {Autocomplete, Button, DatePicker, SelectField} from 'react-md';
import NodeGeocoder from 'node-geocoder';

class SearchFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            category: 'All',
            date: '',
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
        this.setState({date: input});
    }


    handleSearch() {
        // TODO filter search results
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
                        />
                        <Button raised primary className='search-button md-cell--3 margin-5'
                                disabled={this.state.city === '' || this.state.date === ''}
                                onClick={this.handleSearch()}>Search</Button>
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
            console.log('location: ' + res);
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

export default SearchFields;