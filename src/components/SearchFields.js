"use strict"

import React from 'react';
import {Autocomplete, Button, DatePicker, SelectField, TextField} from 'react-md';
import {geolocated, geoPropTypes} from 'react-geolocated';

const cities = ['Berlin', 'Munich', 'Paris'];
const categories = ['Wedding Photography', 'Portrait Photography', 'Event Photography'];

class SearchFields extends React.Component {

    constructor(props) {
        super(props);
    }

    browserLocation() {
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
            console.log('console: ' + this.props.isGeolocationEnabled + " " + this.props.isGeolocationAvailable)
            // TODO: return current browser location for default value
            console.log('Date: ' + Date.now());
        } else {
            return "No browser location"
        }
    }

    handleAutocomplete() {
        // TODO: implement autocomplete
        let url = 'http://gd.geobytes.com/AutoCompleteCity?callback=?&q=Mun';
        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'content-type' : 'application/javascript',
            }
        }).then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <h2>60 results</h2>
                </div>
                <div className="md-grid bottom-30">
                    <Autocomplete
                        id="select-loc"
                        className="md-cell--3 margin-5"
                        label="Location"
                        placeholder="Choose your location"
                        filter={Autocomplete.caseInsensitiveFilter}
                        data={cities}
                        sameWidth={true}
                        defaultValue={this.browserLocation()}
                    />
                    <SelectField
                        id="select-cat"
                        className="md-cell--3 margin-5"
                        label="Category"
                        placeholder="Choose your category"
                        anchor={{x: SelectField.HorizontalAnchors.INNER_LEFT, y: SelectField.VerticalAnchors.BOTTOM}}
                        menuItems={categories}
                        sameWidth={true}
                        simplifiedMenu={false}
                    />
                    <DatePicker
                        id="select-date"
                        label="Date"
                        disableOuterDates={true}
                        disabledDays={{before: Date.now()}}
                        placeholder="Choose your date"
                        className="md-cell--3 margin-5"
                        displayMode="portrait"
                    />
                    <Button flat primary swapTheming className='search-button md-cell--3' onClick={this.handleAutocomplete()}>Search</Button>
                </div>
            </div>
        );
    }

}

SearchFields.propTypes = Object.assign({}, SearchFields.propTypes, geoPropTypes);

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    watchPosition: false,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation
})(SearchFields);