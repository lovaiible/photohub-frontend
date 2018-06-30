import React from 'react';
import {Avatar} from 'react-md';
import ReviewAverageValue from './ReviewAverageValue';
import ProfileService from "../services/ProfileService";
import ProfileEdit from "./ProfileEdit";

class PhotographerDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.profile.avatar
        }
    }

    uploadWidget() {
        if(!this.props.disabledEdit){
            window.cloudinary.openUploadWidget({
                    cloud_name: 'dn0x8apyr',
                    upload_preset: 'avatarUpload',
                    tags: ["avatar"],
                    theme: "white",
                    sign_url: false
                },
                (error, result) => {
                    //Update gallery
                    console.log(result);
                    const newAvatar = result[0].url;
                    this.setState({avatar: newAvatar});
                    const newProfile = this.props.profile;
                    newProfile.avatar = newAvatar;
                    ProfileService.updateProfile(newProfile).then(() => {
                        localStorage.setItem('notification', 'successUpdated');
                        window.location.reload();
                    }).catch((e) => {
                        console.error(e);
                    });
                });
        } else {
            //Do nothing if edit is disabled.
        }
    }

    render() {
        const styles = {
            tagStyle: {
                transform: "rotate(-5deg)"
            },
            galleryStyle: {
                height: "50%",
                width: "70%",
                display: 'flex',
                justifyContent: 'center',

            }
        }
        let avatar;

        if (this.props.profile.avatar === "") {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)}
                             suffix="pink">{(this.props.title).substr(0, 1).toUpperCase()}</Avatar>;
        } else {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)} src={this.props.profile.avatar}/>;
        }

        let editLocationButton = (!this.props.disabledEdit) ? <ProfileEdit profile={this.props.profile} type="editLocation"/> : '';
        let editDescriptionButton = (!this.props.disabledEdit) ? <ProfileEdit profile={this.props.profile} type="editDescription"/> : '';

        return (
            <div className="w3-panel w3-cell-row w3-padding-48">
                <div className="w3-cell-middle w3-container l4 avatar">{avatar}</div>
                <div className="w3-cell l8 w3-container">
                    <h1 className="w3-margin-right">{this.props.title}</h1>
                    <div className="w3-row photographerAttr">
                        <div className="w3-col m6 w3-border-right w3-center">
                            <div className="location">
                                <i className="fas fa-map-marker-alt"> </i>Location: {this.props.city} {editLocationButton}
                            </div>
                        </div>
                        <div className="w3-col m6 w3-container w3-center review" id="profileReview">
                            <div id="profileReview"><ReviewAverageValue size={'small'} avgRating={this.props.avgRating} pId={this.props.pID}
                                                     noReviews={this.props.noReviews}/></div>
                        </div>
                    </div>
                    <div className="w3-cell-row">
                        <div className="w3-cell ">{this.props.description}</div>
                        <div className="w3-cell ">{editDescriptionButton}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PhotographerDescription;
