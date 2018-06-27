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
        window.cloudinary.openUploadWidget({
                cloud_name: 'dn0x8apyr',
                upload_preset: 'qyoaprdm',
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
    }


    render() {
        let avatar;

        if (this.props.profile.avatar === "") {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)}
                             suffix="pink">{(this.props.title).substr(0, 1).toUpperCase()}</Avatar>;
        } else {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)} src={this.props.profile.avatar}/>;
        }

        let editLocationButton = <ProfileEdit profile={this.props.profile} type="editLocation"
                                              disabledEdit={this.props.disabledEdit}/>;
        let editDescriptionButton = <ProfileEdit profile={this.props.profile} type="editDescription"
                                                 disabledEdit={this.props.disabledEdit}/>;

        return (
            <div className="md-grid">
                <div className="md-cell md-cell--2">{avatar}</div>
                <div className="md-cell md-cell--10">
                    <h1>{this.props.title}</h1>
                    <div className="md-grid photographerAttr">
                        <div className="md-cell md-cell--4 w3-border-right">
                            <div className="location">
                                <i className="fas fa-map-marker-alt"> </i>Location: {this.props.city} {editLocationButton}
                            </div>
                        </div>
                        <div className="md-cell md-cell--4 w3-border-right">
                            <div className="orders">100 successful orders</div>
                        </div>
                        <div className="md-cell md-cell--4 review">
                            <ReviewAverageValue size={'small'} avgRating={this.props.avgRating} pId={this.props.pID}
                                                noReviews={this.props.noReviews}/>
                        </div>
                    </div>
                    <div className="md-grid">
                        <div className="md-cell md-cell--10">{this.props.description}</div>
                        <div className="md-cell md-cell--2">{editDescriptionButton}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PhotographerDescription;
