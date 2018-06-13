"use strict"

import React from 'react';
import CategoryListItem from "./CategoryListItem";
import Page from "./Page";

export const CategoryList = ({data}) => (
        <div className="categories container">
            <div className="row">
                {data.map((item, i) => (<CategoryListItem category={item} key={i}/>))}
            </div>
        </div>
);