"use strict"

import React from 'react';
import CategoryListItem from "./CategoryListItem";
import Page from "./Page";

export const CategoryList = ({data}) => (
    <Page>
        <div className="categories">
            <div className="row">
                {data.map((item, i) => (<CategoryListItem category={item} key={i}/>))}
            </div>
        </div>
    </Page>
);