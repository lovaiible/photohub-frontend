import React from 'react';
import {Avatar, Grid, Cell} from 'react-md';
import Link from "react-router-dom";
import ava from '../img/avatar/ava.png';
import ReviewAverageValue from './ReviewAverageValue';
import ProfileService from "../services/ProfileService";
import ProfileEdit from "./ProfileEdit";
import ReviewService from "../services/ReviewService";
import ReactStars from 'react-stars'

class PhotographerDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.profile.avatar
        }
    }

    uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'dn0x8apyr', upload_preset: 'qyoaprdm', tags:["avatar"], theme: "white", sign_url: false},
            (error, result) => {
                //Update gallery
                console.log(result);
                const newAvatar = result[0].url;
                this.setState({avatar: newAvatar});
                const newProfile = this.props.profile;
                newProfile.avatar = newAvatar;
                ProfileService.updateProfile(newProfile).then((data) => {
                    localStorage.setItem('notification', 'successUpdated');
                    window.location.reload();
                }).catch((e) => {
                    console.error(e);
                });
            });
    }


    render() {

        const tagStyle = {
            transform: "rotate(-5deg)"
        }
        const marginTop = {
          marginTop: '20px'
        }

        let avatar;
        if(this.props.profile.avatar == "") {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)} suffix="pink">{(this.props.title).substr(0, 1).toUpperCase()}</Avatar>;
        } else {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)} src={this.props.profile.avatar}/>;
        }
        console.log(this.props.profile.avatar);
        console.log(this.props.noReviews);
        let editLocationButton = <ProfileEdit profile={this.props.profile} type="editLocation" disabledEdit={this.props.disabledEdit}/>;
        let editDescriptionButton = <ProfileEdit profile={this.props.profile} type="editDescription" disabledEdit={this.props.disabledEdit}/>;
        return (
          <div className="w3-container w3-row" style={marginTop}>
              <div className="w3-col m2 avatar float-left">{avatar}</div>
              <div className="w3-col m10"><h1 className="w3-left"> {this.props.title} <span
                  className="w3-tag w3-small" style={tagStyle}>Premium</span></h1>
                  <div className="w3-cell-row photographerAttr">
                      <div className="w3-cell w3-center w3-border-right"><i className="material-icons">place</i>
                          Location: {this.props.city} {editLocationButton}</div>
                      <div className="w3-cell w3-center w3-border-right">100 successful order</div>

                      <div>
                          <ReviewAverageValue size={'small'} avgRating={this.props.avgRating} pId={this.props.pID} noReviews={this.props.noReviews}/>
                      </div>
                  </div>
                  <div className="descriptionText w3-opacity">{this.props.description} </div> <div>{editDescriptionButton}</div>
              </div>
          </div>
        );
    }
};

export default PhotographerDescription;
