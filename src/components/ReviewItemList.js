"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField } from 'react-md';

import Page from './Page'
import ReviewListItem from './ReviewListItem'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

export const ReviewItemList = ({data}) => (

      <Page>
        <div id="review item list" classname="reviewitemlist">
          <ul>

                {data.map((review, i) => <ReviewListItem key={i} review={review} />)}

          </ul>
        </div>
      </Page>

);
