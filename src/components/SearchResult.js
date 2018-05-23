"use strict"

import React from 'react';
import Page from './Page';
import SearchFields from "./SearchFields";
import { GridList, GridTile } from "material-ui";
import img1 from '../img/stock-img/wedding.jpg';
import img2 from '../img/stock-img/portrait.jpg';
import img3 from '../img/stock-img/landscape.jpg';
import img4 from '../img/stock-img/food.jpg';

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

const tilesData = [
    {
        img: '../../src/img/stock-img/wedding.jpg',
        title: 'Wedding',
        author: 'Max Mustermann'
    },
    {
        img: '../../src/img/stock-img/portrait.jpg',
        title: 'Portrait',
        author: 'pashminu',
    },
    {
        img: '../../src/img/stock-img/landscape.jpg',
        title: 'Landscape',
        author: 'Danson67',
    },
    {
        img: '../../src/img/stock-img/food.jpg',
        title: 'Food',
        author: 'fancycrave1',
    }
];

const SearchResult = () => (
    <Page>
        <SearchFields/>
        <div style={styles.root}>
            <GridList style={styles.gridList} cols={4}>
                {tilesData.map((tile, key) => (
                    <GridTile
                        key={key}
                        title={tile.title}
                        titleStyle={styles.titleStyle}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                        <img src={tile.img} />
                    </GridTile>
                ))}
            </GridList>
        </div>
    </Page>
);

export default SearchResult;