'use strict';
import React from "react";
import {Button, DialogContainer, Toolbar} from "react-md";
import ProfileService from "../services/ProfileService";

export default class PhotoEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            gallery: this.props.gallery,
        }
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    show() {
        this.setState({visible: true});
    }

    hide() {
        this.setState({visible: false});
    }

    deletePhoto(index){
        console.log("photo was deleted at position: " + index);
        let newGallery = this.state.gallery;
        newGallery.splice(index, 1);
        this.setState({gallery: newGallery});
    }
    handleConfirm(){
        event.preventDefault();
        let newProfile= this.props.profile;
        newProfile.gallery = this.state.gallery;
        console.log(newProfile);
        ProfileService.updateProfile(newProfile).then(() => {
            localStorage.setItem('notification', 'successUpdated');
            this.setState({visible: false});
            window.location.reload();
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        const visbible = this.state.visible;
        const actions = [];
        actions.push({secondary: true, children: "Cancel", onClick: this.hide});
        actions.push(<Button flat primary onClick={this.handleConfirm} >Confirm</Button>);
        let photoArea;
        if (this.state.gallery.length == 0) {
            photoArea = <h2>You don't have any photo yet!</h2>;
        } else {
            photoArea = <div className="wrapper" id="photo-edit">
                {(this.state.gallery).map((photoItem, index) => {return(
                    <div className="gallery-pic" key={index}>
                    <img className="card-img-top" src={photoItem.original}/>
                    <button className="edit" onClick={this.deletePhoto.bind(this, index)}>delete photo</button>
                    </div>)}
                )}
            </div>;
        }
        return (
            <div>
                <div><Button icon onClick={this.show}>mode_edit</Button></div>
                <div>
                    <DialogContainer
                        id="edit-photo-diaglog"
                        visible={visbible}
                        height={"700px"}
                        width={"1200px"}
                        onHide={this.hide}
                        actions={actions}
                        modal
                        title="Edit your gallery">
                        {photoArea}
                    </DialogContainer>
                </div>
            </div>

        );
    };
}