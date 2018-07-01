import React, {Component} from 'react';
import Page from "../components/page/Page";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import PhotographerDescription from './PhotographerDescription';
import format from 'date-fns/format';
import ImageGallery from "react-image-gallery";
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';
import ProfileService from "../services/ProfileService";
import 'react-dates/lib/css/_datepicker.css';
import moment from "moment/moment";
import {Button, DatePicker} from "react-md";
import PhotoEdit from "./PhotoEdit";


export class PhotographerProfile extends Component {


    constructor(props) {
        const currentUser = UserService.getCurrentUser().id;
        super(props);
        this.state = {
            selectedDate: '',
            gallery: [],
            disabledEdit: true,
            searchLink: '',
            minDate: '',
            maxDate: '',
            profile: '',
            notification: ''
        };
        this.handleDate = this.handleDate.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleMinDate = this.handleMinDate.bind(this);
        this.handleMaxDate = this.handleMaxDate.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDate(e) {
        const newDate = format(e, "MM/DD/YYYY");
        this.setState({selectedDate: newDate});
    }

    handleConfirm() {
        this.props.history.push({
            pathname: '/showConfirm/' + this.props.pID,
            state: {selectedDate: this.state.selectedDate}
        });
    }

    handleMinDate(e) {
        this.setState({minDate: encodeURI(e)});
    }

    handleMaxDate(e) {
        this.setState({maxDate: encodeURI(e)});
    }

    handleDateChange() {
        let newProfile = this.props.profile;
        newProfile.minDate = this.state.minDate;
        newProfile.maxDate = this.state.maxDate;
        ProfileService.updateProfile(newProfile).then((data) => {
            window.localStorage['notify'] = 'You have successfully update your calendar.';
        }).catch((e) => {
            console.error(e);
        });
        window.location.reload();
    }

    async componentDidMount() {
        this.setState({
            gallery: this.props.gallery,
            currentUser: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            disabledEdit: true,
            minDate: this.props.minDate,
            maxDate: this.props.maxDate,
            profile: this.props.profile
        })
        if (localStorage.getItem('city') == null) {
            this.setState({
                searchLink: '/'
            });
        } else {
            this.setState({
                searchLink: '/results?city=' + localStorage.getItem('city') + '&category=' + localStorage.getItem('category') + '&date=' + localStorage.getItem('date')
            });
        }
        const currentUserID = UserService.getCurrentUser().id;
        if(currentUserID === this.props.profile.user._id){
            this.setState({disabledEdit : false});
        }

        if (this.props.gallery.length == 0) {
            let newGallery = [];
            newGallery.push({
                original: "http://res.cloudinary.com/dn0x8apyr/image/upload/c_scale,w_300/v1530195424/picture-not-available.jpg",
                thumbnail: "http://res.cloudinary.com/dn0x8apyr/image/upload/c_scale,w_300/v1530195424/picture-not-available.jpg"
            });
            this.setState({gallery: newGallery})
        }

        if(window.localStorage['notify'] !== undefined) {
            this.state.notification = window.localStorage['notify'];
            window.localStorage.removeItem("notify");
        }
    }

    uploadWidget() {
        window.cloudinary.openUploadWidget({
                cloud_name: 'dn0x8apyr',
                upload_preset: 'qyoaprdm',
                tags: [this.props.pID],
                theme: "white",
                sign_url: false
            }, (error, result) => {
                console.log(result);
                const currentGallery = this.props.gallery;
                const newImage = result.map(data => {
                    console.log(data);
                    var obj = {};
                    obj.original = `${data.url}`;
                    obj.thumbnail = `${data.thumbnail_url}`;
                    return obj;
                });
                console.log(newImage);
                currentGallery.unshift(...newImage);
                this.setState({gallery: currentGallery});

                //save gallery to backend
                let newProfile = this.state.profile;
                newProfile.gallery = currentGallery;
                ProfileService.updateProfile(newProfile).then(() => {
                    window.localStorage['notify'] = 'You have successfully update your gallery.';
                }).catch((e) => {
                    console.error(e);
                });
                window.location.reload();
            });
    }

    render() {
        const defaultImage = "http://res.cloudinary.com/dn0x8apyr/image/upload/c_scale,w_300/v1530195424/picture-not-available.jpg";
        const formatedMinDate = new Date(this.props.profile.minDate);
        const formatedMaxDate = new Date(this.props.profile.maxDate);
        let calendar;
        let checkout;
        let uploadButton = (!this.state.disabledEdit) ?
            <Button icon onClick={this.uploadWidget.bind(this)} iconClassName="fas fa-upload"/> : "";
        let editPhotoButton = (!this.state.disabledEdit) ?
            <PhotoEdit profile={this.state.profile} gallery={this.state.gallery}/> : "";
        if (this.state.disabledEdit) {
            calendar = <div>
                <h2 className="w3-left">Choose an appointment with photographer: </h2>
                <div className="w3-center">
                    <InfiniteCalendar
                        width={400}
                        height={400}
                        minDate={formatedMinDate}
                        maxDate={formatedMaxDate}
                        onSelect={this.handleDate}
                        selected={false}
                    />
                </div>
            </div>;
            checkout = <div className="w3-col m6 w3-center">
                <h2>Process to check out: </h2>
                <div>
                    <div>
                        <form>
                            <label>
                                Selected date:
                                <input
                                    className="w3-opacity"
                                    type="text"
                                    value={this.state.selectedDate}
                                />
                            </label>
                        </form>
                    </div>
                    <div className="w3-container w3-margin-top w3-cell-row">
                        <Button raised  primary id="submit" type="submit"
                                onClick={this.handleConfirm}
                                disabled={this.state.selectedDate === '' || this.state.currentUser === undefined}>Confirm</Button>
                        <Button raised secondary>Cancel</Button>
                    </div>
                </div>
            </div>;
        } else {
            calendar = <div className="w3-center"><DatePicker
                name="date"
                id="date-input"
                label="select your start date"
                firstDayOfWeek={1}
                disableOuterDates={true}
                placeholder="Choose your start date"
                className="col-3"
                displayMode="portrait"
                minDate={moment().toDate()}
                locales="en-US"
                defaultValue={this.props.profile.minDate}
                onChange={this.handleMinDate}
                autoOk={true}
                required={false}
                errorText="Date is required"
            />
                <DatePicker
                    name="date"
                    id="date-input"
                    label="Select your end date"
                    firstDayOfWeek={1}
                    disableOuterDates={true}
                    placeholder="Choose your end date"
                    className="col-3"
                    displayMode="portrait"
                    minDate={moment().toDate()}
                    locales="en-US"
                    defaultValue={this.props.profile.maxDate}
                    onChange={this.handleMaxDate}
                    autoOk={true}
                    required={false}
                    errorText="Date is required"
                />
                <Button flat primary swapTheming onClick={this.handleDateChange}>Confirm date change</Button>
            </div>;
            checkout = "";
        }
        let notification = (this.state.notification !== ' ') ?
            <div className="notification success"> {this.state.notification}</div> : '';

        return (

            <Page>
                {notification}
                <div className="breadcrumbs">
                    <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink}
                                                                                  className="breadcrumbLink">Search</Link> > <b>{this.props.title}</b>
                </div>
                <div id="photographer-profile">
                    <div>
                        <PhotographerDescription profile={this.props.profile} pID={this.props.pID} avg={this.props.avg}
                                                 avgRating={this.props.avgRating}
                                                 title={this.props.title} city={this.props.city}
                                                 description={this.props.description} size={'small'}
                                                 disabledEdit={this.state.disabledEdit}
                                                 noReviews={this.props.noReviews}/>
                    </div>
                    <div className="w3-container w3-cell-row">
                        <div className="w3-cell ">
                            <ImageGallery
                                items={this.state.gallery}
                                showBullets={true}
                                defaultImage={defaultImage}
                            />
                        </div>
                        <div className="w3-cell ">
                            {uploadButton}
                            {editPhotoButton}
                        </div>
                    </div>

                    <div className="w3-container w3-row w3-padding-24">
                        <div className="w3-col m6 w3-center ">
                            {calendar}
                        </div>
                        <div> {checkout}</div>
                    </div>

                </div>
            </Page>

        );
    }
}
