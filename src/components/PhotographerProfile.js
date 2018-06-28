import React, {Component} from 'react';
import Page from './page/Page.js';
import {Button, DatePicker} from 'react-md';
import InfiniteCalendar, {Calendar, withRange} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import PhotographerDescription from './PhotographerDescription';
import format from 'date-fns/format';
import {CloudinaryContext, Transformation, Image} from 'cloudinary-react';
import axios from "axios";
import ImageGallery from "react-image-gallery";
import UserService from "../services/UserService";
import ProfileEdit from "./ProfileEdit";
import {Link} from 'react-router-dom';
import ProfileService from "../services/ProfileService";
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import moment from "moment/moment";


export class PhotographerProfile extends Component {


    constructor(props) {
        const currentUser = UserService.getCurrentUser().id;
        super(props);
        this.state = {
            selectedDate: '',
            gallery: this.props.gallery,
            currentUser: currentUser,
            disabledEdit: true,
            searchLink: '',
            minDate: this.props.profile.minDate,
            maxDate: this.props.profile.maxDate
        };
        this.handleDate = this.handleDate.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleMinDate = this.handleMinDate.bind(this);
        this.handleMaxDate = this.handleMaxDate.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDate(e) {
        const newDate = format(e, "DD.MM.YYYY");
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
            localStorage.setItem('notification', 'successUpdated');
        }).catch((e) => {
            console.error(e);
        });
        window.location.reload();
    }

    componentWillMount() {
        if (localStorage.getItem('city') == null) {
            this.setState({
                searchLink: '/'
            });
        } else {
            this.setState({
                searchLink: '/results?city=' + localStorage.getItem('city') + '&category=' + localStorage.getItem('category') + '&date=' + localStorage.getItem('date')
            });
        }
        if (Object.is(this.props.profile.user, this.state.currentUser)) {
            this.setState({disabledEdit: false});
        }
    }

    uploadWidget() {
        window.cloudinary.openUploadWidget({
                cloud_name: 'dn0x8apyr',
                upload_preset: 'qyoaprdm',
                tags: [this.props.pID],
                theme: "white",
                sign_url: false
            },
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
                console.log(newImage);
                currentGallery.push(...newImage);
                this.setState({gallery: currentGallery});

                //save gallery to backend
                let newProfile = this.props.profile;
                newProfile.gallery = currentGallery;
                ProfileService.updateProfile(newProfile).then((data) => {
                    localStorage.setItem('notification', 'successUpdated');
                }).catch((e) => {
                    console.error(e);
                });
                window.location.reload();
            });
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


        var formatedMinDate = new Date(this.props.profile.minDate);
        var formatedMaxDate = new Date(this.props.profile.maxDate);
        let calendar;
        if (this.state.disabledEdit) {
            calendar = <div className="w3-container">
                <h2>Choose an appointment </h2>
                <InfiniteCalendar
                    width={400}
                    height={400}
                    minDate={formatedMinDate}
                    maxDate={formatedMaxDate}
                    onSelect={this.handleDate}
                    selected={false}
                /></div>;
        } else {
            calendar = <div className="w3-container"><DatePicker
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
        }

        return (
            <Page>
                <div className="breadcrumbs">
                    <Link to={'/'} className="breadcrumbLink">Home</Link> > <Link to={'' + this.state.searchLink}
                                                                                  className="breadcrumbLink">Search</Link> > <b>{this.props.title}</b>
                </div>
                <div id="content">
                    <div><PhotographerDescription profile={this.props.profile} pID={this.props.pID} avg={this.props.avg}
                                                  avgRating={this.props.avgRating}
                                                  title={this.props.title} city={this.props.city}
                                                  description={this.props.description} size={'small'}
                                                  disabledEdit={this.state.disabledEdit}
                                                  noReviews={this.props.noReviews}/>
                    </div>
                    <div></div>
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
                            {calendar}
                        </div>
                        <div className="w3-container w3-col m6"><h2>Process to check out: </h2>
                            <div className="w3-container">
                                <div className="w3-cell w3-container">
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
                                    <Button flat primary swapTheming
                                            onClick={this.handleConfirm}>Confirm</Button>
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
