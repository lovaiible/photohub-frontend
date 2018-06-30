"use strict";

import React from 'react';
import {Autocomplete, Button, Card, TextField} from 'react-md';
import {withRouter} from 'react-router-dom';
import Page from '../page/Page';
import {SelectField} from "react-md/es/index";

class PhotographerSignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            city: '',
            category: '',
            serviceDescription: '',
            price: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeServiceDescription = this.handleChangeServiceDescription.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(value) {
        this.setState({name: value});
    }

    handleChangeDescription(value) {
        this.setState({description: value});
    }

    handleChangeLocation(value) {
        this.setState({city: value});
    }

    handleChangeCategory(value) {
        this.setState({category: value});
    }

    handleChangeServiceDescription(value) {
        this.setState({serviceDescription: value});
    }

    handleChangePrice(value) {
        this.setState({price: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let photographer = {
            name: this.state.name,
            description: this.state.description,
            city: this.state.city,
            category: this.state.category,
            serviceDescription: this.state.serviceDescription,
            price: this.state.price
        };

        this.props.onSubmit(photographer);
    }

    render() {
        return (
            <Page>
                <Card className="md-block-centered photo">
                    <form className="md-grid--stacked" onSubmit={this.handleSubmit}
                          onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Name"
                            id="register-name"
                            className="md-row"
                            required={true}
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            errorText="Please enter your name"
                        />
                        <TextField
                            label="Photographer description"
                            id="register-desc"
                            onChange={this.handleChangeDescription}
                            className="md-row"
                            lineDirection="right"
                            rows={2}
                            required={true}
                            placeholder="Please enter your photographer description"
                            errorText="Please enter your photographer description"
                        />
                        <Autocomplete
                            name="city"
                            id="register-city"
                            onAutocomplete={this.handleChangeLocation}
                            onChange={this.handleChangeLocation}
                            className="md-row"
                            label="Location"
                            placeholder="Choose your location"
                            data={this.props.locations}
                            sameWidth={true}
                            defaultValue={this.state.city}
                            required={false}
                            focusInputOnAutocomplete={true}
                        />
                        <SelectField
                            name="category"
                            id="register-category"
                            onChange={this.handleChangeCategory}
                            className="md-row"
                            label="Service category"
                            placeholder="Choose your category"
                            anchor={{
                                x: SelectField.HorizontalAnchors.INNER_LEFT,
                                y: SelectField.VerticalAnchors.BOTTOM
                            }}
                            menuItems={this.props.categories}
                            sameWidth={true}
                            simplifiedMenu={false}
                            required={true}
                            errorText="Category is required"
                        />
                        <TextField
                            id="register-service-desc"
                            label="Service description"
                            onChange={this.handleChangeServiceDescription}
                            className="md-row"
                            lineDirection="right"
                            rows={2}
                            required={true}
                            errorText="Please enter your service description"
                        />
                        <TextField
                            label="Service price in Euro (€)"
                            id="register-price"
                            onChange={this.handleChangePrice}
                            type="number"
                            step={0.01}
                            min={0}
                            pattern="^d+(\.|\,)\d{2}"
                            className="md-row"
                            required={true}
                            errorText="Please enter the price of your service"
                        />
                        <div>
                            <Button id="submit" type="submit"
                                    disabled={this.state.username === '' || this.state.description === '' || this.state.category === '' || this.state.serviceDescription === '' || this.state.price === ''}
                                    raised primary className="md-cell md-cell--2 margin-5">Register</Button>
                            <Button id="reset" type="reset" raised secondary
                                    className="md-cell md-cell--2 margin-5">Dismiss</Button>
                        </div>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(PhotographerSignUp);