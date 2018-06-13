import Carousel from 're-carousel'
import React from 'react';

export class Slider extends React.Component {
    render() {
        return (
            <Carousel>
                <div style={{backgroundColor: 'https://i.imgur.com/BpfkQuT.jpg', height: '100%'}}>Frame 1</div>
                <div style={{backgroundColor: 'orange', height: '100%'}}>Frame 2</div>
                <div style={{backgroundColor: 'orchid', height: '100%'}}>Frame 3</div>
            </Carousel>);
    }
}