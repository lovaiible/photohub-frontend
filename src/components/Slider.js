import React from 'react';
import {SearchFieldView} from "../views/SearchFieldView";

export class Slider extends React.Component {
    render() {
        return (
            <div id="slider">
                <div className="container">
                    <h1>Photohub</h1>
                    <h4>Connect with photographers and book their services easily</h4>
                    <div className="overlay">
                        <SearchFieldView/>
                    </div>
                </div>
            </div>
        )
    }
}