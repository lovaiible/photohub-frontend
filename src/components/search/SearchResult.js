"use strict"

import React from 'react';
import Page from '../Page';
import SearchFields from "./SearchFields";
import PaginationNav from "../Pagination";
import {SearchResultItem} from "./SearchResultItem";

const data = [
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding 1',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait 1',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape 1',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding 2',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait 2',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape 2',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding 3',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait 3',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape 3',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding 4',
        category: 'Wedding Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Max Mustermann',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait 4',
        category: 'Portrait Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'pashminu',
        price: '100€'
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape 4',
        category: 'Landscape Photography',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        photographer: 'Danson67',
        price: '100€'
    }
];

const SearchResult = () => (
    <Page>
        <SearchFields/>
        <div className="search-container">
            <div className="row">
                {data.map((tile, i) => (<SearchResultItem tile={tile} key={i}/>))}
            </div>
            <PaginationNav/>
        </div>
    </Page>
);

export default SearchResult;