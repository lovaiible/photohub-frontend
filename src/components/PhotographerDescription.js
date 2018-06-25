"use strict";
import React from 'react';
import {Avatar, Grid, Cell} from 'react-md';
import Link from "react-router-dom";
import ava from '../img/avatar/ava.png';
import ReviewAverageValueSmall from './ReviewAverageValueSmall';
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
                    //this.setState(Object.assign({}, this.state, {error: 'Error while creating review'}));
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
        if(this.props.profile.avatar) {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)} src={this.props.profile.avatar}/>;
        } else {
            avatar = <Avatar onClick={this.uploadWidget.bind(this)} suffix="pink">{(this.props.title).substr(0, 1).toUpperCase()}</Avatar>;
        }
        console.log(this.props.profile.avatar);
        console.log(this.props.noReviews);

        if(this.props.noReviews == false ) {
          return (
              <div className="w3-container w3-row" style={marginTop}>
                  <div className="w3-col m2 avatar float-left">{avatar}</div>
                  <div className="w3-col m10"><h1 className="w3-left"> {this.props.title} <span
                      className="w3-tag w3-small" style={tagStyle}>Premium</span></h1>
                      <div className="w3-cell-row photographerAttr">
                          <p className="w3-cell w3-center w3-border-right"><i className="material-icons">place</i>
                              Location: {this.props.city} </p>
                          <p className="w3-cell w3-center w3-border-right">100 successful order</p>

                          <div>
                              {this.props.avg.map((avg) => <ReviewAverageValueSmall avg={avg} key={avg._id} pId={this.props.pID} noReviews={this.props.noReviews}/>)}
                          </div>

                          {/*//<Link to={`/reviews/${this.props.pID}`}>*/}
                      </div>
                      <div className="descriptionText w3-opacity">{this.props.description}</div>
                  </div>
              </div>
          );
        } else {
          return(
            <div className="w3-container w3-row" style={marginTop}>
                <div className="w3-col m2 avatar float-left">{avatar}</div>
                <div className="w3-col m10"><h1 className="w3-left"> {this.props.title} <span
                    className="w3-tag w3-small" style={tagStyle}>Premium</span></h1>
                    <div className="w3-cell-row photographerAttr">
                        <p className="w3-cell w3-center w3-border-right"><i className="material-icons">place</i>
                            Location: {this.props.city}</p>
                        <p className="w3-cell w3-center w3-border-right">100 successful order</p>

                        <div>
                          <ReviewAverageValueSmall  pId={this.props.pID} noReviews={this.props.noReviews}/>
                        </div>

                        {/*//<Link to={`/reviews/${this.props.pID}`}>*/}
                    </div>
                    <div className="descriptionText w3-opacity">{this.props.description}</div>
                </div>
            </div>
          );
        }
    }


};

export default PhotographerDescription;
