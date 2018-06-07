import React, {Component} from 'react';
import Page from './Page';
import ImageGallery from 'react-image-gallery';
import {Avatar, Button } from 'react-md';
import ava from '../img/avatar/ava.png';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import photographerDescription from './PhotographerDescription';
import format from 'date-fns/format';


export class PhotographerProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            date: '',

        };
        this.handleDate = this.handleDate.bind(this);
        /*this.handleInputChange = this.handleInputChange.bind(this);*/
    }

    //TODO: get and set min,maxDate
    handleDate(e) {
        const newDate = format(e, "DD.MM.YYYY");
        this.setState({date: newDate});
    }
    //TODO: Fix manually input change
    /*
    handleInputChange(e) {
        console.log(e);
        this.setState({date: e});
    }*/


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

        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);


        const location = "Munich"
        const descriptionText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

        const images = [
            {
                original: 'https://lorempixel.com/1000/600/nature/1/',
                thumbnail: 'https://lorempixel.com/250/150/nature/1/',
            },
            {
                original: 'https://lorempixel.com/1000/600/nature/2/',
                thumbnail: 'https://lorempixel.com/250/150/nature/2/'
            },
            {
                original: 'https://lorempixel.com/1000/600/nature/3/',
                thumbnail: 'https://lorempixel.com/250/150/nature/3/'
            }
        ]

        return (
            <Page>
                <div id="content">

                    <div className="w3-container w3-row">
                        <div className="w3-col m2"><Avatar src={ava} className="avatar float-left"/></div>
                        <div className="w3-col m10"><h1 className="w3-left"> MAX MUSTERMAN <span
                            className="w3-tag w3-small" style={styles.tagStyle}>Premium</span></h1>
                            <div className="w3-cell-row photographerAttr">
                                <p className="w3-cell w3-center w3-border-right"><i className="material-icons">place</i>
                                    Location: {location}</p>
                                <p className="w3-cell w3-center w3-border-right">100 successful order</p>
                                <p className="w3-cell w3-center"> 100 Reviews</p>
                            </div>
                            <div className="descriptionText w3-opacity">{descriptionText}</div>
                        </div>
                    </div>


                    <div className="w3-container gallery w3-center col-md-6 col-md-offset-3" style={styles.galleryStyle}>
                        <ImageGallery
                            items={images}
                            className="w3-center"
                        />
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
                                    minDate={lastWeek}
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
                                    <Button flat primary swapTheming>Confirm</Button>
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
