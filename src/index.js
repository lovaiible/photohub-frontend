"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import WebFontLoader from 'webfontloader';
import 'react-md/dist/react-md.indigo-pink.min.css';
import './style.css'

WebFontLoader.load({
    google: {
        families: ['Lato','Material Icons'],
    },
});

ReactDOM.render(<App />, document.getElementById('app'));
