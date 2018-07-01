'use strict';
import React from "react";
import {Button, DialogContainer, TextField} from "react-md";
import ProfileService from "../services/ProfileService";

export default class ProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dialogVisible: false,
            profile: this.props.profile,
            city: this.props.profile.location.city,
            country: this.props.profile.location.country,
        };
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleDescriptionEdit = this.handleDescriptionEdit.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleLocationEdit = this.handleLocationEdit.bind(this);
    }
    show(){
        this.setState({dialogVisible: true });
    }

    hide(){
        this.setState({dialogVisible: false});
    }

    handleChangeText(value){
        this.setState(Object.assign({}, this.state, {textChanged: value}));
    }
    handleChangeCity(value){
        this.setState({city: value});
    }
    handleChangeCountry(value){
        this.setState({country: value});
    }

    handleDescriptionEdit(){
        event.preventDefault();
        let newProfile = this.props.profile;
        newProfile.description = this.state.textChanged;
        ProfileService.updateProfile(newProfile).then((data) => {
            window.localStorage['notify'] = 'You have successfully update your description.';
            window.location.reload();
        }).catch((e) => {
            console.error(e);
        });
    }

    handleLocationEdit(){
        event.preventDefault();
        let newProfile = this.props.profile;
        newProfile.location.city = this.state.city;
        newProfile.location.country = this.state.country;
        ProfileService.updateProfile(newProfile).then((data) => {
            window.localStorage['notify'] = 'You have successfully update your location.';
            window.location.reload();
        }).catch((e) => {
            console.error(e);
        });
    }


    render(){
        const dialogVisible = this.state.dialogVisible;
        const actions = [];
        actions.push({ secondary: true, children: 'Cancel', onClick: this.hide});
        if(this.props.type === "editLocation"){
            actions.push(<Button flat primary onClick={this.handleLocationEdit}>Confirm</Button>);
            return(
                <div>
                    <div><Button  icon onClick={this.show}>mode_edit</Button> </div>
                    <div>
                        <DialogContainer
                            id="simple-action-dialog"
                            visible={dialogVisible}
                            onHide={this.hide.bind(this)}
                            actions={actions}
                            height={"300px"}
                            width={"700px"}
                            title={"Edit your location"}>
                            <TextField
                                type="text"
                                label="city"
                                id="TextField"
                                rows={2}
                                required={true}
                                defaultValue={this.state.profile.location.city}
                                onChange={this.handleChangeCity}
                                errorText="City is required"
                            />
                            <TextField
                                type="text"
                                label="country"
                                id="TextField"
                                rows={2}
                                required={true}
                                defaultValue={this.state.profile.location.country}
                                onChange={this.handleChangeCountry}
                                errorText="Country is require"
                            />
                        </DialogContainer>
                    </div>
                </div>
            );
        } else if (this.props.type == "editDescription") {
            actions.push(<Button flat primary onClick={this.handleDescriptionEdit}>Confirm</Button>);
            return(
                <div>
                    <div><Button icon onClick={this.show}>mode_edit</Button> </div>
                    <div>
                        <DialogContainer
                            id="simple-action-dialog"
                            visible={dialogVisible}
                            onHide={this.hide.bind(this)}
                            actions={actions}
                            height={"300px"}
                            width={"700px"}
                            title={"Edit your description"}>
                            <TextField
                                type="text"
                                label="New description"
                                id="TextField"
                                rows={5}
                                required={true}
                                defaultValue={this.state.profile.description}
                                onChange={this.handleChangeText}
                                errorText="Text is required"
                            />
                        </DialogContainer>
                    </div>
                </div>
            );
        }


    };
}