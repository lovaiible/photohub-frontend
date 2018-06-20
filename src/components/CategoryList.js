"use strict"

import React from 'react';
import CategoryListItem from "./CategoryListItem";
import Page from "./Page";

export const CategoryList = ({data}) => (
        <div className="categories container">
            <div>
                <h2>Explore our categories</h2>
            </div>
            <div className="row">
                {data.map((item, i) => (<CategoryListItem category={item} key={i}/>))}
            </div>
        </div>
);