"use strict";

import React from 'react';
import Styled from 'styled-components';


class PlainFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w3-container" id="footer">
                <div className="footer center">
                    <div className="social">
                        <a href="#"><i className="fab fa-facebook-f"></i><span>Facebook</span></a>
                        <a href="#"><i className="fab fa-twitter"></i><span>Twitter</span></a>
                        <a href="#"><i className="fab fa-envelope"></i><span>Mail</span></a>
                    </div>
                </div>
                <div className="copyright center">
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