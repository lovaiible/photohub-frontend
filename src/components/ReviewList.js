"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, TextField } from 'react-md';

import { ReviewListRow } from './ReviewListRow';
import Page from './Page'


export const ReviewList = ({data, onDelete}) => (
    <Page>
        <Button onClick={() => this.props.history.push('/addReview')} icon>add</Button>
        <DataTable plain>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Text</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Delete</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((review, i) => <ReviewListRow key={i} review={review} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
    </Page>
);
