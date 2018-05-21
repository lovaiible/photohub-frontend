"use strict"

import React from 'react';
import {Autocomplete, Button, DatePicker, SelectField} from 'react-md';
import PropTypes from 'prop-types';

const categories = ['Wedding Photography', 'Portrait Photography', 'Event Photography'];

class SearchFields extends React.Component {

    handleAutocomplete(value) {
        return fetch('http://gd.geobytes.com/AutoCompleteCity?callback=?&q=' + value)
            .then((response) => {
                this.props.results = response.toArray();
                return response.toArray();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        /*const data = this.props.results.map(({ value }) => ({
            primaryText: value
        }));*/

        return (
            <div className="md-grid">
                <Autocomplete
                    id="select-loc"
                    className="md-cell"
                    label="Location"
                    placeholder="Choose your location"
                    filter={Autocomplete.caseInsensitiveFilter}
                    onAutocomplete={this.handleAutocomplete}
                    data={categories}
                    sameWidth={true}
                />
                <SelectField
                    id="select-cat"
                    className="md-cell"
                    label="Category"
                    placeholder="Choose your category"
                    anchor={{x: SelectField.HorizontalAnchors.INNER_LEFT, y: SelectField.VerticalAnchors.TOP}}
                    menuItems={categories}
                    sameWidth={true}
                    simplifiedMenu={false}
                />
                <DatePicker
                    id="select-date"
                    label="Date"
                    placeholder="Choose your date"
                    className="md-cell"
                    displayMode="portrait"
                />
                <Button flat primary swapTheming>Search</Button>
            </div>
        );
    }

}

SearchFields.propTypes = {
    results: PropTypes.array
}

export default SearchFields;