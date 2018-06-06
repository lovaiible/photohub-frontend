"use strict"

import React from 'react';
import Page from './Page';
import SearchFields from "./SearchFields";
import PaginationNav from "./Pagination";
import {SearchResultItem} from "./SearchResultItem";
import img1 from "../img/stock-img/wedding.jpg"
import img2 from "../img/stock-img/portrait.jpg"
import img3 from "../img/stock-img/landscape.jpg"

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '15px'
    },
    gridList: {
        overflowY: 'auto',
        width: '100%'
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

const data = [
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
    },
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
    },
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
    },
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
    }
];

const SearchResult = () => (
    <Page>
        <SearchFields/>
        <div style={styles.root}>
            <div className="card-columns">
                {data.map((tile, key) => ( <SearchResultItem tile={tile} key={key}/> ))}
            </div>
            <PaginationNav/>
        </div>
    </Page>
);

export default SearchResult;