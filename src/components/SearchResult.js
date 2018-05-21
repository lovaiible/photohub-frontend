"use strict"

import React from 'react';
import Page from './Page';
import {DataTable, TableHeader, TableRow, TableColumn, TableBody} from "react-md";
import SearchFields from "./SearchFields";
import SearchResultRow from "./SearchResultRow";

const SearchResult = ({data}) => (
    <Page>
        <SearchFields/>
        <DataTable plain>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((entry, i) => <SearchResultRow key={i} entry={entry} />)}
            </TableBody>
        </DataTable>
    </Page>
);

export default SearchResult;