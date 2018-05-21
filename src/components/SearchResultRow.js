"use strict";

import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

const tilesData = [
    {
        img: '../../public/img/stock-img/wedding.jpg',
        title: 'Wedding',
        author: 'Max Mustermann'
    },
    {
        img: '../../public/img/stock-img/portrait.jpg',
        title: 'Portrait',
        author: 'pashminu',
    },
    {
        img: '../../public/img/stock-img/landscape.jpg',
        title: 'Landscape',
        author: 'Danson67',
    },
    {
        img: '../../public/img/stock-img/food.jpg',
        title: 'Food',
        author: 'fancycrave1',
    }
];

class SearchResultRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
                    <Subheader>December</Subheader>
                    {tilesData.map((tile) => (
                        <GridTile
                            key={tile.img}
                            title={tile.title}
                            subtitle={<span>by <b>{tile.author}</b></span>}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        >
                            <img src={tile.img} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default SearchResultRow;