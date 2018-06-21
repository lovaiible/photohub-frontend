import React, {Component} from 'react';
import Page from './page/Page.js';
import { Button } from 'react-md';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import PhotographerDescription from './PhotographerDescription';
import format from 'date-fns/format';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from "axios";


export class PhotographerProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            date: '',
            gallery: []
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
    // create profileID in order to call image.

    componentDidMount() {
        // Request for images tagged xmas
        axios.get('https://res.cloudinary.com/dn0x8apyr/image/list/profile.json')
            .then(res => {
                console.log(res.data.resources);
                this.setState({gallery: res.data.resources});
            });
    }

    uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'dn0x8apyr', upload_preset: 'qyoaprdm', tags:["profile"]},
            function(error, result) {
                console.log(result);
            });
    }

/*<div className="w3-container gallery w3-center col-md-6 col-md-offset-3" style={styles.galleryStyle}>
<ImageGallery
items={images}
className="w3-center"
/>
</div>*/

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


       /* const images = [
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
        ]*/

        return (
            <Page>
                <div id="content">
                    <div> <PhotographerDescription  profile={this.props.profile}  pID={this.props.pID}></PhotographerDescription></div>



                    <div className="w3-container gallery w3-center col-md-6 col-md-offset-3" style={styles.galleryStyle}>
                    <CloudinaryContext cloudName="dn0x8apyr">
                        {
                            this.state.gallery.map(data => {
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="img">
                                            <a target="_blank" href={`https://res.cloudinary.com/dn0x8apyr/image/upload/${data.public_id}.jpg`}>
                                                <Image publicId={data.public_id}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="300"
                                                        height="200"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                                                </Image>
                                            </a>
                                            <div className="desc">Created at {data.created_at}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
                    </div>

                    <div className="upload w3-container w3-center">
                        <Button flat primary onClick={this.uploadWidget.bind(this)} className="upload-button">
                            Add Image
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
