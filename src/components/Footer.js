"use strict";

import React from 'react';
import Styled from 'styled-components';
import img from '../img/logo/logo-dark.png';

class PlainFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="footer" className="center">
                <div className="footer-links">
                    <ul>
                        <li><a href="/"><img src={img}/>photohub</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Career</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Terms of use</a></li>
                        <li><a href="#">Privacy policy</a></li>
                        <li><a href="#">Legal disclosure</a></li>
                    </ul>
                </div>
                <div className="social">
                    <a href="http://www.facebook.com"><i className="fab fa-facebook-f"></i><span>Facebook</span></a>
                    <a href="http://www.twitter.com"><i className="fab fa-twitter"></i><span>Twitter</span></a>
                    <a href="mailto:anh.nguyen@tum.de"><i className="fas fa-envelope"></i><span>Mail</span></a>
                    <a href="tel:+491731511778"><i className="fas fa-phone"></i><span>Support</span></a>
                </div>
                <div className="copyright">
                    Copyright © 2018 <a href="#">Photohub</a>. All rights reserved.
                </div>
            </div>
        );
    }
}

export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: white;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;