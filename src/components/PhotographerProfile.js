import React, {Component} from 'react';
import Page from './page/Page.js';
import { Button } from 'react-md';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import PhotographerDescription from './PhotographerDescription';
import format from 'date-fns/format';
import axios from "axios";
import ImageGallery from "react-image-gallery";
import UserService from "../services/UserService";
import ProfileEdit from "./ProfileEdit";

export class PhotographerProfile extends Component {

    constructor(props) {
        const currentUser = UserService.getCurrentUser().id;
        super(props);
        this.state = {
            date: '',
            gallery: [],
            currentUser: currentUser,
            dialogVisible: false
        };
        this.handleDate = this.handleDate.bind(this);
    }

    handleDate(e) {
        const newDate = format(e, 'MM/DD/YYYY');
        this.setState({date: newDate});
    }


    // use profileID in order to call image.
    componentWillMount() {
        // Request for images tagged with profile (show be changed to pID)
        axios.get('https://res.cloudinary.com/dn0x8apyr/image/list/' + this.props.pID + '.json')
            .then(res => {
                const imageSet = res.data.resources.map(data => {
                    var obj = {};
                    obj.original = `https://res.cloudinary.com/dn0x8apyr/image/upload/s--yn3N40Sf--/c_fit,e_improve,h_600,r_0,w_900/${data.public_id}.jpg`;
                    obj.thumbnail = `https://res.cloudinary.com/dn0x8apyr/image/upload/s--i-yjKOLx--/c_scale,e_improve,h_150,r_0,w_250/${data.public_id}.jpg`;
                    return obj;
                });
                console.log(imageSet);
                this.setState({gallery: imageSet});
            });

    }

    //upload image with photographer ID as tag
    uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'dn0x8apyr', upload_preset: 'qyoaprdm', tags:[this.props.pID], theme: "white", sign_url: false},
            (error, result) => {
                //Update gallery
                console.log(result);
                const currentGallery = this.state.gallery;
                const newImage = result.map(data => {
                    console.log(data);
                    var obj = {};
                    obj.original = `${data.url}`;
                    obj.thumbnail = `${data.thumbnail_url}`;
                    return obj;
                });
                currentGallery.concat(newImage);
                this.setState({gallery: currentGallery});
                window.location.reload();
            });
    }

    render() {
        const styles = {
            tagStyle : {
                transform: "rotate(-5deg)"
            },
            galleryStyle : {
                height: "50%",
                width: "70%",
                display: 'flex',
                justifyContent: 'center',

            }
        }
        const currentUser = UserService.getCurrentUser().id;
        let editButton;

            editButton = <ProfileEdit profile={this.props.profile}/> ;


        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);


        return (
            <Page>
                <div id="photographer-profile">
                    <div> <PhotographerDescription  profile={this.props.profile}  pID={this.props.pID} avg={this.props.avg} avgRating={this.props.avgRating}
                    title={this.props.title} city={this.props.city} description={this.props.description} size={'small'} noReviews={this.props.noReviews}/>
                    </div> <div> {editButton} </div>
                    <div className="w3-container w3-mobile w3-center w3-padding-48">
                        <ImageGallery items={this.state.gallery}/>
                    </div>


                    <div className="upload w3-container w3-center">
                        <Button flat primary onClick={this.uploadWidget.bind(this)} className="upload-button">
                            Add more images
                        </Button>

                    </div>

                    <div className="w3-container w3-row">
                        <div className="w3-col m6">

                            <div className="w3-container" >
                                <h2>Choose date </h2>
                                <InfiniteCalendar
                                    width={400}
                                    height={400}
                                    selected={today}
                                    disabledDays={[0,6]}
                                    minDate={new Date(this.props.minDate)}
                                    maxDate={new Date(this.props.maxDate)}

                                    onSelect={this.handleDate}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-col m6"><h2>Process to check out: </h2>
                            <div className="w3-container">
                                <div className="w3-cell w3-container">
                                <form >
                                    <label>
                                        Selected date:
                                        <input
                                            className="w3-opacity"
                                            type="text"
                                            value={this.state.date}
                                        />
                                    </label>
                                </form>
                                </div>
                                <div className="w3-container w3-margin-top w3-cell-row">
                                    <Button flat primary swapTheming onClick={() => this.props.history.push('/showConfirm/' + this.props.pID)}>Confirm</Button>
                                    <Button flat secondary swapTheming>Cancel</Button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </Page>

        );
    }
}
