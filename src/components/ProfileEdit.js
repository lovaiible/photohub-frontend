'use strict';
import React from "react";
import {Button, DialogContainer, TextField} from "react-md";
import ProfileService from "../services/ProfileService";

export default class ProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dialogVisible: false,
            profile: this.props.profile
        };
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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

    handleEdit(){
        event.preventDefault();
        let newProfile = this.props.profile;
        newProfile.description = this.state.textChanged;
        ProfileService.updateProfile(newProfile).then((data) => {
            localStorage.setItem('notification', 'successUpdated');
            window.location.reload();
        }).catch((e) => {
            console.error(e);
        });
    }

    render(){
        const dialogVisible = this.state.dialogVisible;
        const actions = [];
        actions.push({ secondary: true, children: 'Cancel', onClick: this.hide});
        actions.push(<Button flat primary onClick={this.handleEdit}>Confirm</Button>);
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
                           value={this.state.profile.description}
                           onChange={this.handleChangeText}
                           errorText="Text is required"
                       />
                   </DialogContainer>
                </div>
            </div>
        );
    };
}