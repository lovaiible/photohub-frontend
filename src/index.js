"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import WebFontLoader from 'webfontloader';
import 'react-md/dist/react-md.indigo-pink.min.css';
import './style.css'
import "react-image-gallery/styles/css/image-gallery.css";


WebFontLoader.load({
    google: {
        families: ['Lato','Material Icons'],
        families: ['Roboto:300,400,500,700', 'Material Icons']
    },
});

ReactDOM.render(<App />, document.getElementById('app'));
